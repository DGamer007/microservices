const express = require('express');
const { PORT } = require('../config/env');
const appController = require('./controller/app.controller');
const proxyController = require('./controller/proxy.controller');

const app = express();

app.use('/service', appController);
app.use(/^(?!\/\bservice\b).*$/, proxyController);

app.listen(PORT, () => {
    console.log('Gateway is up on PORT:', PORT);
});