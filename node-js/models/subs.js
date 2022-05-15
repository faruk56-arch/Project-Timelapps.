const mongoose = require('mongoose');
const subscriptionSchema = new mongoose.Schema({
    nom: {
        type: String
    },
    prenom: {
        type: String

    },
    Club: {
        type: String

    },
    Age: {
        type: Number
    },
    Taille: {
        type: Number
    },
    Sexe: {
        type: String
    },
    PiedFort: {
        type: String
    },
    Description: {
        type: String

    },
    img:
    {
        data: Buffer,
        contentType: String
    },
    PlayerCreatedDate: {
        type: Date,
        default: Date.now

    }
});
module.exports = mongoose.model('subs', subscriptionSchema);