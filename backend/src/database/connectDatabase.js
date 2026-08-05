import mongoose from "mongoose"
async function connectDatabase(){
    console.log(process.env.MONGOURI)
    await mongoose.connect(process.env.MONGOURI);
    console.log("Database connected")
};
export default connectDatabase ;