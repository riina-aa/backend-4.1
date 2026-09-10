
//Hämtar paket
const express = require("express");
const jwt = require("jsonwebtoken"); 
const cors = require("cors"); 
const mongoose = require("mongoose"); 
require("dotenv").config(); 

//Hämtar routes
const prodRoutes = require("./routes/productRoutes")
const authRoutes = require("./routes/authRoutes"); 

const app = express(); 
const port = process.env.PORT || 3001; 

app.use(cors()); 
app.use(express.json()); 

//Ansluter till mongoDb
mongoose.connect("mongodb://localhost:27017/laboration4").then(() => {
    console.log("Connected to database")
}).catch((error) => {
    console.log("Failed to connect to database: " + error)
}); 

//Routes 
app.use("/webshop", prodRoutes); 
app.use("/webshop", authRoutes); 

//Kontrollerar token 
export async function authenticateToken(req, res, next) {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' '[1]); //Token 

    if(token == null) res.status(400).json({ message: "Åtkomst nekad"}); 

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if(err) return res.status(403).json({ message: "Din token är inte giltig"}); 

        req.username = username; 

        next(); 
    })
}

//Startar server
app.listen(port, () => {
    console.log("Server is running on port: " + port);
}); 

