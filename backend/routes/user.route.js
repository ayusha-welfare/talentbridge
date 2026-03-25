import express from "express";
import { register, login, logout, updateProfile } from "../controllers/user.controller.js";
import { getPendingRecruiters, getApprovedRecruiters, approveRecruiter, rejectRecruiter, getAllStudents } from "../controllers/admin.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isAdmin from "../middlewares/isAdmin.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);

// Admin routes
router.route("/admin/recruiters/pending").get(isAdmin, getPendingRecruiters);
router.route("/admin/recruiters/approved").get(isAdmin, getApprovedRecruiters);
router.route("/admin/recruiters/approve/:id").put(isAdmin, approveRecruiter);
router.route("/admin/recruiters/reject/:id").delete(isAdmin, rejectRecruiter);
router.route("/admin/students").get(isAdmin, getAllStudents);

export default router;