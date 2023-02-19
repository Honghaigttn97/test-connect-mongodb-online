import mongoose from "mongoose";

const initializeSchema = mongoose.Schema;

const TextSchema = new initializeSchema({
    text: { type: String }
}, {
    timestamps: true
})

export default mongoose.model('Texts', TextSchema)