import userModel from "../models/userModel.js"


async function findByEmail(email){
    return await userModel.findByEmail(email);
}
async function createUser(email, password){
    const user = await userModel.createUser(email, password);
    return user
}


export default {findByEmail, createUser}