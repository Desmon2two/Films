const users = [];

async function findByEmail(userEmail){
    const user = users.find(user => user.email === userEmail);
    return user || null
};
async function createUser(userEmail, userPassword){
    const newUser = {id: crypto.randomUUID() ,email: userEmail, password: userPassword}
    users.push(newUser);
    return newUser
};



export default {findByEmail, createUser}