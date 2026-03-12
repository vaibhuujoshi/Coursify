export default function authorization(req, res, next) {
    try {
        if (req.user.role === "admin") {
            next();
        } else {
            return res.status(403).json({
                message: "You are authenticated but not allowed"
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: "Error in server side"
        })
    }
}