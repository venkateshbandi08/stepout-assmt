const adminMiddleware = (req, res, next) => {
    const { role } = req.user; // Get user role from req.user (set by authMiddleware)
    if (role !== 'admin') {
        return res.status(403).json({ success: false, message: "Access denied. You are not an admin." });
    }

    next(); 
};

export default adminMiddleware;