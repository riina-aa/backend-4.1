const express = require("express"); 
const router = express.Router();
const Users = require("../models/schemas");

router.post("/register", async (req, res) => {
    res.json({message: "Registrering startad..."})
}); 

router.post("/login", async (req, res) => {
    res.json({message: "Inloggning startad..."})
})

module.exports = router; 