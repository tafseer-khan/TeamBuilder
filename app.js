const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { ADDRGETNETWORKPARAMS } = require("dns");

let builtTeam = [];

function start(){
    inquirer.prompt([
        {
            message:"What is your team name?",
            name:"team"
        }
    ])
    .then(function(data){
        const team = data.team
        builtTeam.push(team)
        addManager()
    })
    function addManager() {
        inquirer.prompt([
            {
                message: "What is your team manager's name?",
                name: "name"
            },
            {
                message: "What is your team manager's id ?",
                name: 'id'
            },
            {
                message: "What is your team manager's email address?",
                name: "email"
            },
    
            {
                type: "number",
                message: "What is your team manager's office number?",
                name: "officeNumber"
            },
        ])
        .then(function (data){
            const name = data.name;
            const id = data.id;
            const email = data.email;
            const officeNumber = data.officeNumber;
            const teamMember = new Manager(name, id, email, officeNumber)
            builtTeam.push(teamMember)
            addTeam();
        })
}
function addTeam(){
    inquirer.prompt([
        {
            type:"list",
            message: "Would you like to add Team Members?",
            choices: ["Add Engineer","Add Intern","No more Team Members"],
            name: "addMembers"
        }
    ])
    .then(function(data){
        switch (data.addMemberData){
            case "Add Engineer": 
            addEngineer();
            break;

            case "Add Intern": 
            addIntern();
            break;

            case "No more Team Members":
                buildTeam();
                break;
        }

    });
}
function addEngineer(){
    inquirer.prompt([
        {
            message: "What is the engineer's name?",
            name: "name"
        },
        {
            message: "What is the engineer's id?",
            name: "id"
        },
        {
            message: "What is the engineer's email?",
            name:"email"
        },
        {
            message: "What is the engineer's Github username?",
            name:"github"
        }
    ])
    .then(function(data){
        const name = data.name;
        const id = data.id;
        const email = data.email;
        const github = data.github;
        const teamMember = new Engineer(name,id,email,github);
        builtTeam.push(teamMember)
        addTeamMembers();
    });
};
function addIntern(){
    inquirer.prompt([
        {
            message: "What is the intern's name?",
            name: "name"
        },
        {
            message: "What is the intern's id?",
            name: "id"
        },
        {
            message: "What is teh intern's email?",
            name: "email"
        },
        {
            message: "Where did the intern go to school?",
            name: "school"
        }
    ])
    .then(function(data){
        const name = data.name;
        const id = data.id;
        const email = data.email;
        const school = data.school;
        const teamMember = new Intern(name,id,email,school)
        builtTeam.push(teamMember);
        addTeamMembers();
    })
}
}
start();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
