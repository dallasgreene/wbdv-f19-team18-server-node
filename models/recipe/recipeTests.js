const userDAO = require('../user/user.dao.server');
const recipeDAO = require('./recipe.dao.server');
const commentDAO = require('../comment/comment.dao.server');
const recipeIntDAO = require('../recipeInteraction/recipeInteraction.dao.server');
require('../../data/db')();


// recipeDAO.findAllRecipes()
//     .then(response => console.log(response));

recipeDAO.findRecipeById('5deddafb7896b7c1fc4372db')
    .then(response => {
        console.log(response.interactions.likedBy)
        console.log("\n\n")
        console.log(response.interactions.comments)
        console.log("\n\n")
        console.log(response.interactions)
        console.log("\n\n")
        console.log(response)
    });

// recipeDAO.updateRecipe('5deddafb7896b7c1fc4372db', { interactions: '5dedf19b151e60c38c57de7e' })
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
//     .then(response => console.log(response));