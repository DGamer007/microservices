class CircuitBreaker {
    constructor() {
        this.serviceStates = {};
        this.failureThreshold = 5;
    }
}