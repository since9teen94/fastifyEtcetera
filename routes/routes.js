module.exports = async (app, opts) => {
  app.get("/test", async (req, res) => {
    const { rows } = await app.pg.query("select * from users");
    return rows;
  });
  app.get("/logout", async (req, res) => {
    if (req.session.userid) req.session.destroy();
    return res.redirect("/login");
  });
  app.get("/", async (req, res) => {
    return res.redirect("/home");
  });
  app.get("/login", async (req, res) => {
    context = { title: "Log In", year: app.utils.year() };
    return res.view("logReg.html", context);
  });
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let errors = {
        email: {},
        password: {},
      },
      passwordValid = false,
      emailValid = false;

    if (email == undefined || email.length < 1)
      errors.email.required = "Required";
    else if (!app.utils.emailIsValid(email))
      errors.email.invalid = "Please enter a valid email";
    else {
      const emailRegistrationQuery = await app.pg.query(
        "select email from users where email=$1",
        [email]
      );
      if (emailRegistrationQuery.rows.length != 1) {
        errors.email.invalid = "Invalid Credentials";
        errors.password.invalid = "Invalid Credentials";
      } else emailValid = true;
    }

    if (password == undefined || password.length < 1)
      errors.password.required = "Required";
    else if (password.length < 8)
      errors.password.length = "Password must be at least 8 characters";
    else if (emailValid) {
      const userPasswordQuery = await app.pg.query(
        "select password from users where email=$1",
        [email]
      );
      const userPassword = userPasswordQuery.rows[0].password;
      const validPassword = await app.bcrypt.compare(password, userPassword);
      if (!validPassword) {
        errors.email.invalid = "Invalid Credentials";
        errors.password.invalid = "Invalid Credentials";
      }
    }
    if (app.utils.has(errors)) return errors;
    return { status: 200, msg: "User logged in successfully" };
  });
  app.get("/register", async (req, res) => {
    context = { title: "Register", year: app.utils.year() };
    return res.view("logReg.html", context);
  });
  app.post("/register", async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    let errors = {
        firstName: {},
        lastName: {},
        email: {},
        password: {},
        confirmPassword: {},
      },
      passwordValid = false,
      confirmPasswordValid = false;
    if (firstName == undefined || firstName.length < 1)
      errors.firstName.required = "Required";
    else if (firstName)
      if (lastName == undefined || lastName.length < 1)
        errors.lastName.required = "Required";

    if (email == undefined || email.length < 1)
      errors.email.required = "Required";
    else if (!app.utils.emailIsValid(email))
      errors.email.invalid = "Please enter a valid email";
    else {
      const emailRegistrationQuery = await app.pg.query(
        "select email from users where email=$1",
        [email]
      );
      if (emailRegistrationQuery.rows.length != 0)
        errors.email.invalid = "Please enter a valid email";
    }

    if (password == undefined || password.length < 1)
      errors.password.required = "Required";
    else if (password.length < 8)
      errors.password.length = "Password must be at least 8 characters";
    else passwordValid = true;

    if (confirmPassword == undefined || confirmPassword.length < 1)
      errors.confirmPassword.required = "Required";
    else if (confirmPassword.length < 8)
      errors.confirmPassword.length = "Password must be at least 8 characters";
    else confirmPasswordValid = true;

    if (passwordValid && confirmPasswordValid && password != confirmPassword) {
      errors.password.match = "Passwords must match";
      errors.confirmPassword.match = "Passwords must match";
    }

    if (app.utils.has(errors)) return errors;
    const hashedPassword = await app.bcrypt.hash(password);
    const newUser = await app.pg.query(
      "insert into users (firstName, lastName, email, password) values ($1, $2, $3, $4) returning id",
      [firstName, lastName, email, hashedPassword]
    );
    req.session.userid = newUser.rows[0].id;
    return { status: 201, msg: "User registered successfully" };
  });
};
