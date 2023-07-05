const { Router } = require("express");

const userController = Router();

userController.get('/example', (req, res) => {
    res.send({ message: 'User Controller Success' });
});

module.exports = userController;