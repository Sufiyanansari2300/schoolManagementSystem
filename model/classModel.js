import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: false,
    },
    resources: {
        type: [String],
        required: false,
    },
    studentIds: {
        type: [String],
        required: false,
    },
    schoolId: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model("classes", classSchema);