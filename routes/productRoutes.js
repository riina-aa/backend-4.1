const express = require("express"); 
const router = express.Router();
const Webbshop = require("../models/schemas");

router.get("/products" , async (req, res) => {
    res.json({message: "GET-anropet fungerar"})
}); 

router.post("/products", async (req, res) => {
    try {
        
        let result = await Webshop.create(req.body); 
        return res.status(201).json(result)

    } catch (error) {
        
        return res.status(400).json(error); 

    }
}); 

router.put("/products/:id", async (req, res) => {

    const { productName, description, productPrice } = req.body;

    try {
        let result = await Webshop.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    productName: productName, 
                    description: description,
                    productPrice: productPrice
                },
            });
        res.json({message: "Produkten har uppdaterats"})

    } catch (error) {

        res.json({message: "Något gick fel" + error})

    }
});

router.delete("/products/:id", async (req, res) => {

    try {
        let result = await Webshop.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Produkten borttagen" });

    } catch (error) {
        res.status(500).json({ message: "Något gick fel: " + error })
    }
})

module.exports = router; 