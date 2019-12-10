const userDAO = require('./user.dao.server');
const recipeDAO = require('../recipe/recipe.dao.server');
const commentDAO = require('../comment/comment.dao.server');
require('../../data/db')();

console.log("working!");

// userDAO.findAllUsers()
//     .then(response => console.log(response));

// userDAO.findUserById('5deddf899d9d59c22c5b6bbe') //5deddafb7896b7c1fc4372dc
//     .then(response => console.log(response));

// recipeDAO.createRecipe({
//     title: "Chicken Curry",
//     image: "https://spoonacular.com/recipeImages/six-ingredient-indian-potato-curry-849494.jpg",
//     instructions: "Put it all in a pot and like make it.\n" +
//         "1. Make sure you don't burn it\n" +
//         "2. Make sure you cook it for 30 minutes",
//     servings: 4,
//     readyInMinutes: 40,
//     preparationMinutes: 10,
//     cookingMinutes: 30,
//     diets: ["vegetarian", "vegan", "whole30"]
// })
//     .then(curry => {
//         return
//         userDAO.createUser({
//             firstName: "Willy",
//             lastName: "Wilson",
//             username: "sillywilly4",
//             followers: ['5deddafb7896b7c1fc4372dc'],
//             following: ['5deddafb7896b7c1fc4372dc'],
//             email: "sillywilly4@example.com",
//             diets: ["vegetarian"],
//             likedRecipes: [ '5deddafb7896b7c1fc4372db' ],
//             comments: []
//         })
//     // })
//     .then(response => console.log(response));

// userDAO.updateUser('5deee4ea0207bacae2f68060', {password: 'password'})
//     .then(response => console.log(response));

// userDAO.deleteUser('5deddfab8a3cdec22ffba7c4') // 5dedc769c4f31ac0a66dfc5c 5dedc7582fb778c0a385b23b
//     .then(response => console.log(response));