require("dotenv").config();
const cors = require("cors")


const express = require("express");
const app = express();
app.use(cors()); 

const route = require("./routes/route");
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
const port = 8000;

app.use("/subscribe", route);


// start server
app.listen(port, () => {
  console.log("Server started on port " + port);
});
