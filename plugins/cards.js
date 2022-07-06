const fp = require("fastify-plugin");
module.exports = fp(async (app, opts) => {
  app.decorate("info", {
    cards: [
      {
        key: 1,
        heading: "Projects",
        data: [
          {
            url: "https://res.cloudinary.com/dxrtzusla/video/upload/v1644590054/Screen_Recording_2022-02-11_at_8.28.54_AM_rrryoh.mov",
            ftitle: "Messenger App",
            contributions:
              "Implemented styles for the login / registration page, fixed some message rendering issues due to immutability not being enforced and added image upload functionality.",
            takeaways:
              "Better understanding of React, Redux, Material UI, Axios, Express, Node.js, concurrent requests with JavaScript and what's expected in a collaborative team environment.",
          },
          {
            url: "https://res.cloudinary.com/dxrtzusla/video/upload/v1644590653/Screen_Recording_2022-02-11_at_8.40.42_AM_pf4dye.mov",
            ftitle: "Tic-Tac-Toe",
            contributions:
              "I created a simple, unstyled tic-tac-toe app using pure HTML, CSS and JavaScript. Then I recreated the app in React and deployed it to GitHub Pages.",
            takeaways:
              "Better understanding of the core JavaScript principles that React uses under the hood. How to deploy a React app to GH-Pages and how to incorporate routing in a SPA in GH-Pages (a feature that was not implemented on this tic-tac-toe app).",
          },
          {
            url: "https://res.cloudinary.com/dxrtzusla/video/upload/v1644595149/Screen_Recording_2022-02-11_at_9.54.43_AM_yyivri.mov",
            ftitle: "Simple API",
            contributions: "A backend assessment for Hatchways.",
            takeaways:
              "Learned a lot about Python & backend development in this and other API projects, such as caching, multithreading, generator functions, creating/using decorators, class methods, using tools such as Postman, cURL, python requests library to interact with APIs, document databases, etc.",
          },
        ],
      },
      {
        key: 2,
        heading: "Skills",
        info: [
          "Python",
          "JavaScript",
          "React",
          "Redux",
          "Django",
          "NodeJS",
          "Flask",
          "Fastify",
          "Restful APIs",
          "HTML5",
          "CSS3",
          "Bootstrap",
          "Material UI",
          "jQuery UI",
          "VsCode",
          "VIM",
          "Bash/ZSH",
          "Git",
          "PIP / NPM web scraping libraries",
          "MTV/MVC Development Pattern",
          "SQL - NoSQL, MySQL, PostgreSQL, MSSQL",
          "ORM's",
          "AWS",
          "JSON / XML",
          "jQuery",
          "Mac / Linux",
          "SASS / LESS",
        ],
      },
      {
        key: 3,
        heading: "Links",
        links: [
          {
            href: "https://www.linkedin.com/in/alejandro-yanez-995552220/",
            text: "LinkedIn",
            //icon: <LinkedInIcon />,
          },
          {
            href: "https://github.com/since9teen94",
            text: "GitHub",
            //icon: <GitHubIcon />,
          },
        ],
      },
    ],
    joke: async function () {
      let request = await fetch("https://www.officeapi.dev/api/quotes/random");
      let response = await request.json();
      let data = {
        quote: `"${response.data.content}"`,
        fullName: `- ${response.data.character.firstname} ${response.data.character.lastname}`,
      };
      return data;
    },
  });
});
