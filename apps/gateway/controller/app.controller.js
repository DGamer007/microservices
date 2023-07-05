const { Router } = require('express');
const appService = require('../service/app.service');

const appController = Router();

appController.get('/:name/:version/:port', async (req, res) => {
    res.send({ message: 'Get Service Success' });
});

appController.get('/all', async (req, res) => {
    res.send({ message: 'Get All Services Success' });
});

appController.put('/:name:/:version:/:port', async (req, res) => {
    res.send({ message: 'Update Service Success' });
});

appController.delete('/:name/:version/:port', async (req, res) => {
    res.send({ message: 'Unregister Service Success' });
});

module.exports = appController;