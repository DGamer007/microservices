const { Router } = require('express');
const appService = require('../service/app.service');

const appController = Router();

appController.get('/:key/:version/', async (req, res) => {
    const { key, version } = req.params;
    return service = appService.getService(key, version);
    if (!service) return res.status(404).send({ message: 'Service not found' });
    res.send({ message: 'Get Service Success', data: service });
});

appController.get('/all', async (req, res) => {
    const services = appService.getAllServices();
    if (!services.length) return res.status(404).send({ message: 'Services not found' });
    res.send({ message: 'Get All Services Success', data: services });
});

appController.put('/:key:/:version:/:port', async (req, res) => {
    const { key, version, port } = req.params;
    const service = appService.saveService(req.hostname, key, version, port);

    res.send({ message: 'Update Service Success', data: service });
});

appController.delete('/:key/:version', async (req, res) => {
    const { key, version } = req.params;
    if (!appService.deleteService(key, version)) return res.status(404).send({ message: 'Service not found' });

    res.send({ message: 'Unregister Service Success' });
});

module.exports = appController;