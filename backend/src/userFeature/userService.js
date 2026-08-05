import userModel from "./userModel.js"


async function findByEmail(email){
    return await userModel.findByEmail(email);
};
async function findById(userId){
    return await userModel.findById(userId)
}
async function createUser(email, password){
    const user = await userModel.createUser(email, password);
    return user
}


export default {findByEmail, createUser, findById}