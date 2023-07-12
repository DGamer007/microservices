const { DEFAULT_FAILURE_THRESHOLD, DEFAULT_REQUEST_TIMEOUT, DEFAULT_COOLDOWN_PERIOD } = require('../../config/env');

class ServiceState {
    constructor({ coolDownPeriod }) {
        this.circuit = 'CLOSED';
        this.failures = 0;
        this.nextTry = 0;
        this.coolDownPeriod = coolDownPeriod;
    }

    reset() {
        this.circuit = 'CLOSED';
        this.nextTry = 0;
        this.failures = 0;
    }

    open() {
        this.circuit = 'OPEN';
        this.nextTry = new Date() / 1000 + this.coolDownPeriod;
    }
}

class Service {
    constructor(host, key, version, port, { failureThreshold, requestTimeout, coolDownPeriod } = {}) {
        this.host = host;
        this.key = key;
        this.version = version;
        this.port = port;
        this.states = new Map();
        this.failureThreshold = failureThreshold ?? DEFAULT_FAILURE_THRESHOLD;
        this.requestTimeout = requestTimeout ?? DEFAULT_REQUEST_TIMEOUT;
        this.coolDownPeriod = coolDownPeriod ?? DEFAULT_COOLDOWN_PERIOD;
    }

    get server() {
        return `http://${this.host}:${this.port}`;
    }

    canRequest(endpoint) {
        if (!this.states.has(endpoint))
            this.states.set(endpoint, new ServiceState({ coolDownPeriod: this.coolDownPeriod }));

        const state = this.states.get(endpoint);

        if (state.circuit === 'CLOSED')
            return true;

        const now = new Date() / 1000;

        if (state.nextTry <= now) {
            state.circuit = 'HALF';
            return true;
        }

        return false;
    }

    onRequestSuccess(endpoint) {
        const state = this.states.get(endpoint);
        state.reset();
    }

    onRequestFailure(endpoint) {
        const state = this.states.get(endpoint);

        state.failures += 1;

        if (state.failures > this.failureThreshold) {
            state.open();
            console.log(`Circuit for ${endpoint} is 'OPEN'.`);
        }
    }

};

module.exports = Service;