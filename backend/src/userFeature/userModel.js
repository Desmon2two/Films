import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    }
})
const User = mongoose.model("User", userSchema);

async function findByEmail(email){
    const user = await User.findOne({
        email: email
    })
    // const user = users.find(user => user.email === userEmail);
    return user || null
};

async function findById(userId){
    const user = await User.findOne({
        _id: userId
    })
    return user || null
}
async function createUser(email, password){
    const newUser = await User.create({
        email,
        password
    })
    return newUser
};

// const newUser = {id: crypto.randomUUID() ,email: userEmail, password: userPassword}
// users.push(newUser);


export default {findByEmail, findById, createUser}