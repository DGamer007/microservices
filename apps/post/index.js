const express = require('express');
const postController = require('./post.controller');

let app = express();

app.use(postController);

app = app.listen(0, () => {
    const PORT = app.address().port;
    console.log(`Post Service is up on PORT: ${PORT}`);
});