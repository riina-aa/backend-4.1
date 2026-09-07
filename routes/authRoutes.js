const express = require("express"); 
const router = express.Router();
const Users = require("../models/userSchema");

router.post("/register", async (req, res) => {
    
    try {
        const { username, password } = req.body; 

        //Validerar input
        if(!username || !password ) {
            return res.status(400).json({ message: "Användarnamn eller lösenord får inte vara tomt."}); 
        }

        //Korrekt input - spara användare 
        const user = new User({ username, password}); 
        await user.save(); 

        res.status(200).json({ message: "Användaruppgifterna är sparade."}); 

    } catch (error) {
        
        res.status(500).json({ message: "Serverfel. Vänligen pröva igen om en stund."})
    }
}); 

router.post("/login", async (req, res) => {
    
    try {
        const { username, password } = req.body; 

        //Validerar input
        if(!username || !password ) {
            return res.status(400).json({ message: "Användarnamn eller lösenord får inte vara tomt."}); 
        }

        //Kontrollerar inloggningsuppgifter 
        const user = await Users.findOne({ username}); 
        
        if(!user) {
            return res.status(401).json({ message: "Användarnamn eller lösenord är fel."}); 
        }

        const isPasswordMatch = await Users.comparePassword(password); 

        if(!isPasswordMatch) {
            return res.status(401).json({ message: "Användarnamn eller lösenord är fel."}); 
        } else {
            res.status(200).json({ message: "Inloggningen lyckades"}); 
        }



    } catch (error) {
        
    }
})

module.exports = router; 