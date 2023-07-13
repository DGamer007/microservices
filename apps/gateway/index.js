const express = require('express');
const { PORT } = require('../config/env');
const appController = require('./controller/app.controller');
const proxyController = require('./controller/proxy.controller');

const app = express();

// Applying Service Registry Controller to Gateway
app.use('/service', appController);

/*
    Applying Proxy Request Controller to
    every other route than '/service'
*/
app.use(/^(?!\/\bservice\b).*$/, proxyController);

// Gateway Express Server stars to listen for Requests...
app.listen(PORT, () => {
    console.log('Gateway is up on PORT:', PORT);
});