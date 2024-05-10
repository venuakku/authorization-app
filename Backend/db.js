import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const dbAddress = process.env.Database_URL

mongoose.connect(dbAddress);

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    authorised: Boolean
});

export const user = mongoose.model('users', userSchema);