const mongoose = require("mongoose"); 
const bcrypt = require("bcrypt"); 

//Product schema
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

//User schema 
const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: [true, "Du måste ange ett användarnamn"], 
        unique: [true, "Användarnamnet finns redan. Vänligen välj ett nytt."], 
        trim: true
    }, 
    password: {
        type: String, 
        required: [true, "Du måste ange ett lösenord"]
    }
}); 

userSchema.pre("save", async function(next) {
    try {
        if(this.isNew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword; 
        }

        next()

    } catch (error) {
        
        next(error); 
    }
})

const Webshop = mongoose.model("webshop", webshopSchema); 
const Users = mongoose.model("users", userSchema); 

module.exports = Webshop;
module.exports = Users; 