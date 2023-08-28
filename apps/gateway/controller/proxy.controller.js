const { getService } = require('../service/app.service');
const { HTTP_AUTH_USERNAME, HTTP_AUTH_PASSWORD } = require('../../config/env');

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
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${HTTP_AUTH_USERNAME}:${HTTP_AUTH_PASSWORD}`).toString('base64')
            },
            signal: AbortSignal.timeout(service.requestTimeout * 1000)
        };

        // Making Http request using Fetch API
        const response = await fetch(`${service.server}/${path}`, requestOptions);

        if (!response.ok || response.status !== 200) throw new Error('Request failed');
        const data = await response.json();

        service.onRequestSuccess(endpoint);

        return res.send(data);
    } catch (err) {
        service.onRequestFailure(endpoint);
        console.error(err);
        return res.status(500).send({ message: err.message || 'Something went wrong' });
    }
};