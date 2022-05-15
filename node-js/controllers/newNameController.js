const subs = require("../models/subs");

const getAll = async (req, res) => {
  try {
    /* Getting all the data from the database. */
    const allSubs = await subs.find();
    res.json(allSubs);
  } catch (err) {
    res.json({ message: err });
  }
};

const addPlayer = async (req, res) => {
  const newName = new subs({
    nom: req.body.nom,
    prenom: req.body.prenom,
    Club: req.body.Club,
    Age: req.body.Age,
    Sexe: req.body.Sexe,
    PiedFort: req.body.PiedFort,
    Description: req.body.Description,
    Taille: req.body.Taille,
    PlayerCreatedDate: req.body.PlayerCreatedDate,
  });
  try {
    const savedName = await newName.save();
    res.status(201).json(savedName);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};



module.exports = { addPlayer, getAll };
