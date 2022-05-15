const subs = require("../models/subs");
const express = require("express");
const router = express.Router();
const multer = require("multer");

const { getAll, addPlayer } = require("../controllers/newNameController");

// router.post("/upload"

router.get("/", getAll);
router.post("/add", addPlayer);

const Storage = multer.diskStorage({
  destination: "UPLOAD",
  filename: (req, file, cb) => {
    cb(null, file.originalname + "-" + Date.now());
  },
});

const upload = multer({ storage: Storage }).single("testImage");

router.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const newImage = new subs({
        nom: req.body.nom,
        prenom: req.body.prenom,
        Club: req.body.Club,
        Age: req.body.Age,
        Sexe: req.body.Sexe,
        PiedFort: req.body.PiedFort,
        Description: req.body.Description,
        Taille: req.body.Taille,
        PlayerCreatedDate: req.body.PlayerCreatedDate,
        img: {
          data: req.file.filename,
          contentType: "image/png",
        },
      });
      newImage
        .save()
        .then(() =>
          res
            .send("image successfully uploaded")
            .catch((err) => console.log(err))
        );
    }
  });
});

module.exports = router;
