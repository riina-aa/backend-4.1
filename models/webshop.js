const mongoose = require("mongoose"); 


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

module.exports = Webshop;