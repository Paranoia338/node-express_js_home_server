const mongoose =  require('mongoose');


const UserSchema = mongoose.Schema({
    nume: String,
    prenume: String,
    username: String,
    telefon: String,
    an_nastere: Number,
    email: String,
    token: String,
    parola: String,
    locatie: String
});

module.exports = mongoose.model('user', UserSchema);