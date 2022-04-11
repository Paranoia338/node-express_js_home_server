const express = require("express");
const router = express.Router();
const User = require("../modele_db/utilizator");
const Joi = require('joi');


const user_schema = Joi.object({
    nume: Joi.string(),
    prenume: Joi.string(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    telefon: Joi.string(),
    parola: Joi.string(),
    repetare_parola: Joi.ref("parola"),
    token: [Joi.string()],
    an_nastere: Joi.number().min(1900).max(2013),
    locatie: Joi.string(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org", "ro", "io"] } } )
  }).with('username', 'an_nastere').with('parola', 'repetare_parola');


//Functie generare numar random
const rand = () => {
    return Math.random().toString(36).substr(2);
  };

//Functie generare token
const creare_token = () => {
    // return rand() + rand();
    return rand();
  };

router.get('/', (req, res)=>{
    res.send('Introduceti datele contului in sectiunea body a requestului!')
});

router.post('/', (req, res)=>{
    const result = user_schema.validate(req.body);
    if (result.error) {
        res.status(400).json({"error": "You have entered an incorrect key or value"});
    } else {
        const numar = creare_token();
        const new_user = new User({
            nume: req.body.nume,
            prenume: req.body.prenume,
            username: req.body.username,
            telefon: req.body.telefon,
            an_nastere: req.body.an_nastere,
            email: req.body.email,
            token: numar,
            parola: req.body.parola,
            locatie: req.body.locatie
        });

        new_user.save()
            .then(data => {
                res.status(200).send({"result":"success"})
                // res.json(data);
            })
            .catch(err => {
                res.json({"Eroare:": err});
            });
    }
});


module.exports = router;