import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (decoded.role !== "admin") {
            return res.status(403).json({
                message: "Access denied. Admins only.",
                success: false
            });
        }
        req.id = decoded.userId;
        req.role = decoded.role;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
            success: false
        });
    }
};

export default isAdmin;