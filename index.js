//Include packages needed for this application
const fs = require("fs");

const inquirer = require("inquirer");

const generateMarkdown = require("./utils/generateMarkdown");

//inquirer prompts for user to input within terminal
const questions = [
    {
        type: "input",
            name: "title",
            message: "What is the title of your project?",
            validate: validateMessage,

    },

    {
        type: "input",
            name: "description",
            message: "Enter a description of your project",
            validate: validateMessage,
    },
    
    {
        type: "input",
            name: "installation",
            message: "Enter an explanation for installation. (software, commands, programs, etc.)",
            validate: validateMessage,
        },

    {
        type: "input",
            name: "usage",
            message: "Describe how we can use this project",
            validate: validateMessage,
        },

    {
        type: "list",
            name: "license",
            message: "Please select a license for this project.",
            choices: [
                "GNU AGPLv3",
                "GNU GPLv3",
                "GNU LGPLv3",
                "Apache 2.0",
                "MIT",
            ],
            validate: validateMessage,
        },

    {
        type: "input",
            name: "contribute",
            message: "How can users contribute to your project?",
            validate: validateMessage,
        },

    {
        type: "input",
            name: "tests",
            message: "Please input any testing instructions for your project.",
            validate: validateMessage,
        },
    {
        type: 'input',
            name: "credits",
            message: 'Enter any credits for the project',
        },

    {
        type: "input",
            name: "github",
            message: "What is your GitHub username?",
            validate: validateMessage,
        }, 

];

// function to validate the message that users input. if there is no user input, it will return back and tells the user to input an answer
function validateMessage(value) {
    if (value !="") {
        return true;
    } else {
        return "Please input an answer."
    }
}

// function that will get the value for each type of license by using if/else statements
function getLicense(value) {
    if (value === "GNU AGPLv3") {
        return "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)";
    } else if (value === "GNU GPLv3") {
        return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
    } else if (value === "GNU LGPLv3") {
        return "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)";
    } else if (value === "Apache 2.0") {
        return "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    } else {
        return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    }
}


// a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, generateMarkdown(data), function (err) {
        if (err) {
            return console.log(err);
        }
    })
}

// a function to initialize app
function init() {
    inquirer.prompt(questions).then((data) => {
        console.log(JSON.stringify(data, null, " "));
        data.getLicense = getLicense(data.license);
        writeToFile("./example/README.md", data);
    });
}

// Function call to initialize app
init();