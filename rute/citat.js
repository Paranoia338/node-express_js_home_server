const express = require("express");
const router = express.Router();
const axios = require('axios').default;


const url = 'https://api.kanye.rest/';

const axiosCitat = () => {
    return axios.get(url).then(response => response.data)
};

router.get('/', (req, res) => {
    axiosCitat()
    .then(data => {
        res.send(`<h1>${data.quote}</h1>`);
    })
    .catch(err => console.log(err))
});

module.exports = router;