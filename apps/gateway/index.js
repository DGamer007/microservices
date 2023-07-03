const express = require('express');


const app = express();
const PORT = process.env.PORT || 3000;

app.use('/auth', async (req, res) => {
    console.log('Auth');
});

app.use('/user', async (req, res) => {
    console.log('User');
});

app.use('/post', async (req, res) => {
    console.log('Post');
});

app.use('/comment', async (req, res) => {
    console.log('Comment');
});

app.listen(PORT, () => {
    console.log('Server is up on PORT:', PORT);
});