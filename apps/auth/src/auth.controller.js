const { Router } = require('express');

const authController = Router();

authController.get('/example', (req, res) => {
    res.send({ message: 'Auth Service Success' });
});

module.exports = authController;