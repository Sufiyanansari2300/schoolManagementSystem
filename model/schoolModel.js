import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    classIds: [{
        type: mongoose.Schema.Types.ObjectId,
        default: [],
    }],
}, {
    timestamps: true,
});
export default mongoose.model("schools", schoolSchema);