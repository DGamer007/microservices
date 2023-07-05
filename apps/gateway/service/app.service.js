const registeredServices = new WeakMap();

module.exports = {
    getService() {
        console.log(registeredServices.get(this));
    },
    getAllServices() {
    },
    registerService() {
        registeredServices.set(this, ['Something']);
    },
    deleteService() {

    }
};