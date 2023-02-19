import mongoose from "mongoose";

const initializeSchema = mongoose.Schema;

const UserSchema = new initializeSchema({
    fullname: { type: String },
    username: { type: String, unique: true },
    email: { type: String },
    password: { type: String, default: '' },
}, {
    timestamps: true
})

export default mongoose.model('Users', UserSchema)