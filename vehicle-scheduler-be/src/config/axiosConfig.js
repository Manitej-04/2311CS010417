const axios = require("axios");

const api = axios.create({

    baseURL: process.env.BASE_URL,

    headers: {

        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`

    }

});

module.exports = api;