import mongoose from "mongoose";

const connectdb=async()=>{

await mongoose.connect(process.env.MONGODB_URI,{
//useNewurlparser can be used but not needed in newer version of nodejs
})
}

export default connectdb