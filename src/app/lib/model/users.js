import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: String, 
    email: String,
    designation: String,
});
export const User = mongoose.models.users || mongoose.model("users", userSchema);