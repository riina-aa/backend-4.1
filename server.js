//Hämtar paket
const express = require("express");
const cors = require("cors"); 
const mongoose = require("mongoose"); 
require("dotenv").config(); 

//Hämtar routes
const authRoutes = require("./routes/authRoutes"); 

const app = express(); 
const port = process.env.PORT; 

app.use(cors()); 
app.use(express.json()); 

//Ansluter till mongoDb
mongoose.connect("").then(() => {
    console.log("Connected to database")
}).catch((error) => {
    console.log("Failed to connect to database: " + error)
}); 

//Schema till databas
const webshopSchema = new mongoose.Schema({
    productName: {
        type: String, 
        required: [true, "Du måste ange ett produktnamn"]
    }, 
    description: {
        type: String, 
        required: false
    }, 
    productPrice: {
        type: Number, 
        required: [true, "Du måste ange ett produktpris"]
    }
}); 

const Webshop = mongoose.model("webshop", webshopSchema); 

//Routes 
app.use("/webshop/login", authRoutes); 

app.get("/webshop/products" , async (req, res) => {

    try {
        
        let result = await Webshop.find0({}); 
        return res.json(result); 

    } catch (error) {
        
        return res.status(500).json(error); 

    }
}); 

app.post("/webshop/products", async (req, res) => {

    try {
        
        let result = await Webshop.create(req.body); 
        return res.status(201)

    } catch (error) {
        
        return res.status(400).json(error); 

    }
}); 

app.put("/webshop/products/:id", async (req, res) => {

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

app.delete("/webshop/products/:id", async (req, res) => {

    try {
        let result = await Webshop.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Produkten borttagen" });

    } catch (error) {
        res.status(500).json({ message: "Något gick fel: " + error })
    }
})

//Startar server
app.listen(port, () => {
    console.log("Server is running on port: " + port);
}); 

