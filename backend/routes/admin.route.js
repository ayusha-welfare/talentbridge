import express from "express";
import {
    getPendingRecruiters,
    getApprovedRecruiters,
    approveRecruiter,
    rejectRecruiter,
    getAllStudents
} from "../controllers/admin.controller.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

router.route("/recruiters/pending").get(isAdmin, getPendingRecruiters);
router.route("/recruiters/approved").get(isAdmin, getApprovedRecruiters);
router.route("/recruiters/approve/:id").put(isAdmin, approveRecruiter);
router.route("/recruiters/reject/:id").delete(isAdmin, rejectRecruiter);
router.route("/students").get(isAdmin, getAllStudents);

export default router;