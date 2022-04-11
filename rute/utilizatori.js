const express = require("express");
const router = express.Router();


router.get('/', (req, res)=>{
    res.send('Lista utilizatori')
});

module.exports = router;