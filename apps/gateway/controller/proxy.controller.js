const axios = require('axios');
const { getService } = require('../service/app.service');

module.exports = async (req, res) => {

    const routePattern = /\/(?<key>[^\/]+)\/(?<version>[^\/]+)\/(?<path>.*)/;

    if (!routePattern.test(req.baseUrl))
        return res.status(400).send({ message: 'Invalid Service path' });

    const { groups: { key, version, path } } = routePattern.exec(req.baseUrl);


    const service = getService(key, version);

    const something = await axios({
        method: req.method,
        url: `${service.server}/${path}`
    });

    console.log(something.data);

    res.send('Hello World');
};