import userModel from "./userModel.js"


async function findByEmail(email){
    return await userModel.findByEmail(email);
};
async function findById(userId){
    return await userModel.findById(userId)
}
async function deleteById(userId, context) {
	return await userModel.deleteById(userId, context);
}
async function createUser(email, password){
    const user = await userModel.createUser(email, password);
    return user
}
async function patchOne(userId, newData){
    const result = await userModel.patchUser(userId, newData);
    return result
}


export default {
	findByEmail,
	createUser,
	findById,
	deleteById,
	patchOne,
};