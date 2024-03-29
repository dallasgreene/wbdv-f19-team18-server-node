const express = require('express');
const app = express();

require('./data/db')();

const bodyParser = require('body-parser');

app.listen(process.env.PORT || 4000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


app.get("/hello", (req, res) => {
    res.json({ message: "hello!!" });
});

require('./services/user.service.server')(app);
require('./services/admin.service.server')(app);
require('./services/recipe.service.server')(app);
require('./services/recipeInteraction.service.server')(app);
require('./services/comment.service.server')(app);
