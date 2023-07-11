const express = require('express');
const axios = require('axios');
const authController = require('./auth.controller');

let app = express();
app.use(authController);

function bootstrapApp() {
    const PORT = process.env.PORT;

    app.listen(PORT, () => {
        console.log(`Auth App is up on PORT: ${PORT}`);
    });
}

function bootstrapService() {
    app = app.listen(0, () => {
        const PORT = app.address().port;
        const [, , KEY, VERSION] = process.argv;

        console.log(`Auth Service is up on PORT: ${PORT}`);
        registerService();

        const heartBeat = setInterval(() => {
            registerService();
        }, 20 * 1000);

        async function registerService() {
            return axios({
                method: 'PUT',
                url: `${process.env.GATEWAY_URL}:${process.env.PORT}/service/${KEY}/${VERSION}/${PORT}`
            });
        }

        async function cleanup() {
            clearInterval(heartBeat);
            try {
                await axios({
                    method: 'DELETE',
                    url: `${process.env.GATEWAY_URL}:${process.env.PORT}/service/${KEY}/${VERSION}`
                });
            } catch (err) {
                console.error(err);
            }
            process.exit(0);
        }

        process.on('uncaughtException', cleanup);
        process.on('SIGINT', cleanup);
        process.on('SIGTERM', cleanup);
    });
}

process.env.USE_GATEWAY ? bootstrapService() : bootstrapApp();