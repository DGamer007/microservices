const axios = require('axios');

module.exports = async (req, res) => {

    console.log(req.method);
    console.log(req.baseUrl);
    console.log(req.originalUrl);
    console.log(req.url);

    const something = await axios({
        method: 'get',
        url: 'http://localhost:45389'
    });

    res.send(something.data);
};