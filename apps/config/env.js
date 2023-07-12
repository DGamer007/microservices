module.exports = {
    PORT: (process.env.PORT && parseInt(process.env.PORT)) || 3000,
    DEFAULT_FAILURE_THRESHOLD: process.env.DEFAULT_FAILURE_THRESHOLD && parseInt(process.env.DEFAULT_FAILURE_THRESHOLD),
    DEFAULT_REQUEST_TIMEOUT: process.env.DEFAULT_REQUEST_TIMEOUT && parseInt(process.env.DEFAULT_REQUEST_TIMEOUT),
    DEFAULT_COOLDOWN_PERIOD: process.env.DEFAULT_COOLDOWN_PERIOD && parseInt(process.env.DEFAULT_COOLDOWN_PERIOD)
};