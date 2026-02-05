import mongoose from "mongoose";


const dbconnetion = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connect succefullay")

    } catch (error) {
        console.log("MongoDB connetion  failed")
    }
}
export default dbconnetion;