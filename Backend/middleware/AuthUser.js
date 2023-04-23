import Users from "../models/Users.js";

export const verifyUser = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Please login your account" });
    }

    const user = await Users.findOne({
        where: {
            id: req.session.userId
        }
    });

    if (!user) {
        return res.status(404).json({ msg: "User not Found" });
    }

    req.userId = user.id;
    req.role = user.role;

    next();
}

export const adminOnly = async (req, res, next) => {
    const user = await Users.findOne({
        where: {
            id: req.session.userId
        }
    });

    if (!user) {
        return res.status(404).json({ msg: "User not Found" });
    }

    if (user.role !== "admin") {
        return res.status(403).json({ msg: "Your account cannot access" });
    }

    next();
}

