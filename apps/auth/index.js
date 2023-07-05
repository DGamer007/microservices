const express = require('express');
const authController = require('./auth.controller');

let app = express();

app.use(authController);

app = app.listen(0, () => {
    const PORT = app.address().port;
    console.log(`Auth Service is up on PORT: ${PORT}`);
});