const { Router } = require("express");

const commentController = Router();

commentController.get('/example', (req, res) => {
    res.send({ message: 'Comment Service Success' });
});

module.exports = commentController;