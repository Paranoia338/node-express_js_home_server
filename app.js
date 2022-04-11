const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv/config');



//Utilizare bodyParser pentru a transforma fiecare obiect de tip body in json
app.use(bodyParser.json());

// Conectare la baza de date
mongoose.connect(process.env.DB_CONNECTION, ()=>{
    console.log('Conectat la baza de date');
});

 //Middlewares - mini aplicatii/functii ce ruleaza in momentul in care se apeleaza o ruta anume/specifica

//Importarea rutelor pentru Middlewares
const ruta_autentificare = require('./rute/autentificare');
const ruta_inregistrare = require('./rute/inregistrare');
const ruta_utilizatori = require('./rute/utilizatori');
const ruta_citat = require('./rute/citat');
const ruta_vreme = require('./rute/vreme');
// const ruta_autentificare = require('./rute/autentificare');
// const ruta_autentificare = require('./rute/autentificare');
// const ruta_autentificare = require('./rute/autentificare');

//Utilizarea rutelor din Middlewares
app.use('/autentificare', ruta_autentificare);
app.use('/inregistrare', ruta_inregistrare);
app.use('/utilizatori', ruta_utilizatori);
app.use('/citat', ruta_citat);
app.use('/vreme', ruta_vreme);
// app.use('/inregistrare', ruta_inregistrare);
// app.use('/inregistrare', ruta_inregistrare);

// Rute
app.get('/', (req, res)=>{
    res.send('Suntem pe prima pagina!')
});

//  app.use('/vreme', (req, res)=>{
//      console.log("Vremea este frumoasa astazi!");
//  });

// Asculatare la portul 3000
app.listen(3000);