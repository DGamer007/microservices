const express = require('express');
const commentController = require('./comment.controller');

let app = express();

app.use(commentController);

app = app.listen(0, () => {
    const PORT = app.address().port;
    console.log(`Comment Service is up on PORT: ${PORT}`);
});