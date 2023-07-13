const { Router } = require('express');
const appService = require('../service/app.service');

const appController = Router();

// Get Service info Route
appController.get('/:key/:version/', async (req, res) => {
    const { key, version } = req.params;
    const service = appService.getService(key, version);
    if (!service) return res.status(404).send({ message: 'Service not found' });
    res.send({ message: 'Get Service Success', data: service });
});

// Get All Services info Route
appController.get('/all', async (req, res) => {
    const services = appService.getAllServices();
    if (!services.length) return res.status(404).send({ message: 'Services not found' });
    res.send({ message: 'Get All Services Success', data: services });
});

// Register Service Route
appController.put('/:key/:version/:port', async (req, res) => {
    const { key, version, port } = req.params;
    const ip = req.socket.remoteAddress;
    const host = ip.includes(':') ? `[${ip}]` : ip;
    const service = appService.saveService(host, key, version, port);

    res.send({ message: 'Update Service Success', data: service });
});

// Unregister Service Route
appController.delete('/:key/:version', async (req, res) => {
    const { key, version } = req.params;
    if (!appService.deleteService(key, version)) return res.status(404).send({ message: 'Service not found' });

    res.send({ message: 'Unregister Service Success' });
});

module.exports = appController;