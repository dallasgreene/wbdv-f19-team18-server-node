const userModel = require('./user.dao.server');
require('../../data/db')();

console.log("working!");

userModel.updateUser('5dedae1caf6ad0bedcebc17e', {username: 'coolman44'}) //5dedae1caf6ad0bedcebc17e
    .then(response => console.log(response));

// userModel.createUser({
//     firstName: "Sammy",
//     lastName: "Wilson",
//     username: "swilson",
//     followers: [],
//     following: [],
//     email: "swilson234@example.com",
//     diets: ["vegan", "whole30"],
//     likedRecipes: [
//         {
//             title: "Indian Potato Curry",
//             readyInMinutes: 40,
//             servings: 4,
//             image: "https://spoonacular.com/recipeImages/six-ingredient-indian-potato-curry-849494.jpg"
//         }
//     ],
//     comments: []
// })
//     .then(() => userModel.findAllUsers())
//     .then(response => console.log(response));

// userModel.updateUser(123, {username: 'dallas'})
//     .then(response => console.log(response));