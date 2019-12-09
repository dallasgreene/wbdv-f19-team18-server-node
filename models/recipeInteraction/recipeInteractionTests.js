const userDAO = require('../user/user.dao.server');
const recipeDAO = require('../recipe/recipe.dao.server');
const commentDAO = require('../comment/comment.dao.server');
const recipeIntDAO = require('./recipeInteraction.dao.server');
require('../../data/db')();

// recipeIntDAO.createRecipeInt({
//     recipe: '5deddafb7896b7c1fc4372db',
//     likedBy: [],
//     comments: []
// })
//     .then(response => console.log(response));

// recipeIntDAO.updateRecipeInt('5dee14cf87b448c54181331f', { comments: ['5dedfab9386ea4c3df533ad0'] })
//     .then(response => console.log(response));

// recipeIntDAO.updateRecipeInt('5dee14cf87b448c54181331f', { likedBy: ['5deddafb7896b7c1fc4372dc', '5deddf899d9d59c22c5b6bbe'] })
//     .then(response => console.log(response));

recipeIntDAO.findAllRecipeInts()
    .then(response => console.log(response));

// recipeIntDAO.deleteRecipeInt('5dee14cf87b448c54181331f')
//     .then(response => console.log(response));

// recipeIntDAO.findRecipeIntById("5dee14cf87b448c54181331f")
//     .then(response => console.log(response));
//
// recipeIntDAO.findInteractionForRecipeId('5deddafb7896b7c1fc4372db')
//     .then(response => console.log(response));