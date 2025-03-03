require('dotenv').config();
module.exports = {
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    baseURL: process.env.BASE_URL || 'https://apisandbox.safaricom.et'
};