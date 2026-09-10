const express = require("express"); 
const router = express.Router();
const Webbshop = require("../models/productSchema");
const authenticateToken = require("../middleware/authenticateToken")

router.get("/products" , async (req, res) => {
     
    try {
        let result = await Webbshop.find({}); 
        return res.status(200).json(result); 

    } catch (error) {

         return res.json(error); 
    }
}); 

router.post("/products", authenticateToken, async (req, res) => {
    
    try {
        
        let result = await Webbshop.create(req.body); 
        return res.status(201).json(result)

    } catch (error) {
        
        return res.status(400).json(error); 

    }
}); 

router.delete("/products/:id", authenticateToken, async (req, res) => {

    try {
        let result = await Webbshop.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Produkten borttagen" });

    } catch (error) {
        res.status(500).json({ message: "Något gick fel: " + error })
    }
})

module.exports = router; 