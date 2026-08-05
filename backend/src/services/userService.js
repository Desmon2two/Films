import userModel from "../models/userModel.js"


async function findByEmail(email){
    return await userModel.findByEmail(email);
}
async function createUser(email, password){
    const result = await userModel.createUser(email, password);
    return result
}


export default {findByEmail, createUser}