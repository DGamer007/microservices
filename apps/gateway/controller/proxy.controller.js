const axios = require('axios');
const { getService } = require('../service/app.service');

/*
    Proxy Controller to
    route requests from Gateway
    to certain Service
 */
module.exports = async (req, res) => {

    // Path Pattern
    const routePattern = /\/(?<key>[^\/]+)\/(?<version>[^\/]+)\/(?<path>.*)/;

    if (!routePattern.test(req.baseUrl))
        return res.status(400).send({ message: 'Invalid Service path' });

    const { groups: { key, version, path } } = routePattern.exec(req.baseUrl);

    const service = getService(key, version);
    const endpoint = `/${path}`;

    // Utilizing Circuit Breaker implementation
    if (!service || !service.canRequest(endpoint))
        return res.status(500).send({ message: 'Service Unavailable' });

    try {
        const requestOptions = {
            method: req.method,
            url: `${service.server}/${path}`,
            timeout: service.requestTimeout * 1000
        };

        // Making Axios call to Service
        const response = await axios(requestOptions);
        service.onRequestSuccess(endpoint);

        return res.send(response.data);
    } catch (err) {
        service.onRequestFailure(endpoint);
        console.error(err);
        return res.status(500).send({ message: err.message || 'Something went wrong' });
    }
};