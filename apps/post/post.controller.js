const { Router } = require("express");

const postController = Router();

postController.get('/example', (req, res) => {
    res.send({ message: 'Post Controller Success' });
});

module.exports = postController;