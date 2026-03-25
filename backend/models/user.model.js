import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "recruiter", "admin"],
        required: true
    },
    isApproved: {
        type: Boolean,
        default: function () {
            return this.role === "student" ? true : false
        }
    },
    profile: {
        bio: String,
        skills: [String],
        resume: String,
        resumeOriginalName: String,
        profilePhoto: {
            type: String,
            default: ""
        }
    }
}, { timestamps: true });

export default mongoose.model("User", userSchema);