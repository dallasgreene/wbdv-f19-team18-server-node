const userDAO = require('../user/user.dao.server');
const recipeDAO = require('../recipe/recipe.dao.server');
const commentDAO = require('./comment.dao.server');
const recipeIntDAO = require('../recipeInteraction/recipeInteraction.dao.server');
require('../../data/db')();

// commentDAO.createComment({
//     recipe: '5deddafb7896b7c1fc4372db',
//     title: "This recipe is good",
//     postedBy: '5deddf899d9d59c22c5b6bbe',
//     body: "I made this for my sister and we both liked it"
// })
//     .then(response => console.log(response));

// commentDAO.createComment({
//     recipe: '5deddafb7896b7c1fc4372db',
//     parent: '5dedfab9386ea4c3df533ad0',
//     title: '^^ You Should Try It!!',
//     postedBy: '5deddafb7896b7c1fc4372dc',
//     body: 'My brother made this and it was awesome!'
// })
//     .then(response => console.log(response));

// commentDAO.createComment({
//     recipe: '5deddafb7896b7c1fc4372db',
//     parent: '5dedfaf09d7eb0c3e8a44a62',
//     title: 'Okay, it wasnt THAT good',
//     postedBy: '5deddf899d9d59c22c5b6bbe',
//     body: 'I know you liked this a lot, but c\'mon it was just good.'
// })
//     .then(response => console.log(response));

// commentDAO.findAllComments()
//     .then(response => console.log(response));

// commentDAO.deleteComment('5dedf76d01a1b1c3be787f2e')
//     .then(response => console.log(response));

// commentDAO.updateComment('5dedf6e6ce356ac3b4a1d997', { parent: '5dedf76d01a1b1c3be787f2e' })
//     .then(response => console.log(response));

// commentDAO.findCommentById('5dedfab9386ea4c3df533ad0')
//     .then(response => {
//         console.log(response.children[0].children)
//         console.log(response)
//     });

commentDAO.findCommentsForRecipe('5deddafb7896b7c1fc4372db')
    .then(response => {
        console.log(response)
        console.log(response[0].children)
        console.log(response[0].children[0].children)
    });