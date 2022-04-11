const express = require("express");
const router = express.Router();
const axios = require('axios').default;


const axiosVreme = (nume_oras) => {
    return axios.get(nume_oras).then(response => response.data)
};

const proceseazaDatele2Json = (data) => {
    let descriere_vreme = data.weather[0].description;
    let descriere_poza = data.weather[0].icon;
    let temperatura = data.main["temp"];
    let feels_like = data.main["feels_like"];
    let temp_min = data.main["temp_min"];
    let temp_max = data.main["temp_max"];
    let presiune = data.main["pressure"];
    let umiditate = data.main["humidity"];
    let viteza_vant = data.wind["speed"];
    let directie_vant = data.wind["deg"];
    let prezenta_nori = data.clouds["all"];
    let nume_tara = data.sys["country"];
    let rasarit = data.sys["sunrise"];
    let apus = data.sys["sunset"];
    let nume_oras = data.name;
    let cod_status = data.cod;
    let obiect_returnat = {
        "nume_oras": nume_oras,
        "nume_tara" : nume_tara,
        "descriere_vreme": descriere_vreme,
        "temperatura": temperatura,
        "feels_like" : feels_like,
        "temp_max" : temp_max,
        "temp_min" : temp_min,
        "descriere_poza": descriere_poza,
        "prezenta_nori" : prezenta_nori,
        "rasarit" : rasarit,
        "apus" : apus,
        "presiune" : presiune,
        "umiditate" : umiditate,
        "viteza_vant" : viteza_vant,
        "directie_vant" : directie_vant,
        "cod_status" : cod_status
    };
    return obiect_returnat;
};

router.get('/', (req, res) => {
    const nume_oras = req.query.locatie;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${nume_oras}&appid=3bcff5f73c4ebfc654b1ace455491869&lang=ro&units=metric`;
    axiosVreme(url)
    .then(data => {
        let returned_json = proceseazaDatele2Json(data);
        // console.log(returned_json);
        res.status(200).send(returned_json);
    })
    .catch(err => {
        // console.log(err);
        res.status(404).send("<h1>The provider can't find the city you asked for!</h1>");
    })
});

// router.get('/', (req, res) => {
//     const nume_oras = reg
//     const url = `http://api.openweathermap.org/data/2.5/weather?q=${nume_oras}&appid=3bcff5f73c4ebfc654b1ace455491869&lang=ro&units=metric`;
//     axiosVreme()
//     .then(data => {
//         res.send(json(data));
//     })
//     .catch(err => console.log(err))
// });

module.exports = router;