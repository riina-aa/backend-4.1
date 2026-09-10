
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

//Startar server
app.listen(port, () => {
    console.log("Server is running on port: " + port);
}); 

