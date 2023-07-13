const Service = require('../model/Service');

const serviceRegistry = new Map();

// Get Service
function getService(key, version) {
    const keyWord = key + version;
    return serviceRegistry.get(keyWord);
}

// Get all Services
function getAllServices() {
    const services = [];
    serviceRegistry.forEach(service => services.push(service));

    return services;
}

// Save Service
function saveService(host, key, version, port) {
    const keyWord = key + version;

    if (serviceRegistry.get(keyWord)) {
        console.log('Service already exists.');
        console.log('Updating existing Service...');
    }

    const service = new Service(host, key, version, port);

    serviceRegistry.set(keyWord, service);

    return service;
}

// Delete Service
function deleteService(key, version) {
    return serviceRegistry.delete(key + version);
}

module.exports = {
    serviceRegistry,
    getService,
    getAllServices,
    saveService,
    deleteService
};