import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    UserName:String,
    Points:Number,
    lastClaimedAt: { type: Date, default: null }
})

export default mongoose.models.User || mongoose.model('User',userSchema)
