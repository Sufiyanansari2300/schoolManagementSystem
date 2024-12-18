import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    classId: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});

export default mongoose.model("students", studentSchema);