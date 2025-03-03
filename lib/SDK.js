const axios = require('axios');
const logger = require('./Logger');
const SDKError = require('./ErrorHandler');
const { consumerKey, consumerSecret, baseURL } = require('./Security');

class SDK {
    constructor() {
        this.consumerKey = consumerKey;
        this.consumerSecret = consumerSecret;
        this.baseURL = baseURL;
        this.token = null;
    }

    async authenticate() {
        try {
            logger.info('Authenticating with Safaricom API...');
            const credentials = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');
            const response = await axios.get(`${this.baseURL}/v1/token/generate?grant_type=client_credentials`, {
                headers: { Authorization: `Basic ${credentials}` }
            });
            this.token = response.data.access_token;
            return this.token;
        } catch (error) {
            logger.error(`Authentication failed: ${error.message}`);
            throw new SDKError(`Authentication failed: ${error.message}`, error.response?.status);
        }
    }

    async request({ method, endpoint, data }) {
        if (!this.token) await this.authenticate();
        try {
            logger.info(`Sending ${method.toUpperCase()} request to ${endpoint}`);
            const response = await axios({
                method,
                url: `${this.baseURL}${endpoint}`,
                headers: { Authorization: `Bearer ${this.token}` },
                data
            });
            return response.data;
        } catch (error) {
            logger.error(`Request failed: ${error.message}`);
            throw new SDKError(`Request failed: ${error.message}`, error.response?.status);
        }
    }
}
module.exports = SDK;