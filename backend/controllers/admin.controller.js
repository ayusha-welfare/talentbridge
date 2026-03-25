import User from "../models/user.model.js";

// GET ALL PENDING RECRUITERS
export const getPendingRecruiters = async (req, res) => {
    try {
        const recruiters = await User.find({
            role: "recruiter",
            isApproved: false
        }).select("-password");

        return res.status(200).json({
            recruiters,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// GET ALL APPROVED RECRUITERS
export const getApprovedRecruiters = async (req, res) => {
    try {
        const recruiters = await User.find({
            role: "recruiter",
            isApproved: true
        }).select("-password");

        return res.status(200).json({
            recruiters,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// APPROVE RECRUITER
export const approveRecruiter = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user || user.role !== "recruiter") {
            return res.status(404).json({
                message: "Recruiter not found",
                success: false
            });
        }

        user.isApproved = true;
        await user.save();

        return res.status(200).json({
            message: `${user.fullname} has been approved successfully!`,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// REJECT RECRUITER
export const rejectRecruiter = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user || user.role !== "recruiter") {
            return res.status(404).json({
                message: "Recruiter not found",
                success: false
            });
        }

        await User.findByIdAndDelete(id);

        return res.status(200).json({
            message: `${user.fullname} has been rejected and removed.`,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// GET ALL STUDENTS
export const getAllStudents = async (req, res) => {
    try {
        const students = await User.find({
            role: "student"
        }).select("-password");

        return res.status(200).json({
            students,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};