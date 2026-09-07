const mongoose = require("mongoose"); 
const bcrypt = require("bcrypt"); 

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

//Hasha lösenordet innan sparning
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
}); 

//Registrera användare 
userSchema.statics.register = async (username, password) => {
    try {

        const user = new this({ username, password }); 
        await user.save(); 
        return user; 

    } catch (error) {

        throw error; 
    }
}; 

//Jämföra lösenord 
userSchema.methods.comparePassword = async function(password) {

    try {
        return await bcrypt.compare(password, this.password); 
        
    } catch (error) {
        throw error; 
    }
}

//Logga in användare 
userSchema.statics.login = async (username, password) => {

    try {
        const user = await this.findOne({ username })

        if(!user) {
            throw new Error("Användarnamn eller lösenord stämmer inte")
        }

        const isPasswordMatch = await user.comparePassword(password); 

        //Fel lösenord 
        if(!isPasswordMatch) {
            throw new Error("Användarnamn eller lösenord stämmer inte")
        }

        //Rätt lösenord 
        return user; 
        
    } catch (error) {
        throw error; 
    }
}

const Users = mongoose.model("users", userSchema); 

module.exports = Users; 