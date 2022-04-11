const express = require("express");
const router = express.Router();


//Adaugare logica de validare folosind modulul Joi


router.get('/', (req, res)=>{
    res.send({"html": "on"});
    // Aici trebuie randat html-ul cu camp-urile de completat pentru logare (username, parola) de catre Angular app.
});

// router.post('/', (req, res)=>{
//     let 
//     res.send({"html": "on"});
//     // Aici trebuie randat html-ul cu camp-urile de completat pentru logare (username, parola) de catre Angular app.
// });

module.exports = router;