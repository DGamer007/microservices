const express = require('express');
const userController = require('./user.controller');

let app = express();

app.use(userController);

app = app.listen(0, () => {
    const PORT = app.address().port;
    console.log(`User Service is up on PORT: ${PORT}`);
})


