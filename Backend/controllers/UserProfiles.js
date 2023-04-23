import UserProfiles from "../models/UserProfiles.js";
import Users from "../models/Users.js";

// GET -----------------------------------------------------------------------------------

export const getUserProfiles = async (req, res) => {
    try {
        const users = await UserProfiles.findAll({
            attributes: ["id","nik", "name", "created_at"],
            include: [{
                model: Users,
                right: true,
                attributes: ["id", "role"]
            }],
            order: [
                ["created_at", "DESC"]
            ]
        });

        if (users.length === 0) {
            return res.status(200).json({message: "Data is Empty"});
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const getUserProfileById = async (req, res) => {
    try {
        const user = await UserProfiles.findOne({
            attributes: ["id", "user_id", "no_kk", "nik", "name", "place_of_birth", "date_of_birth", "gender", "address", "religion", "profession", "citizen", "marital_status", "phone"],
            where: {
                user_id: req.params.id
            },
            include: [{
                model: Users,
                attributes: ["email", "role", "status"]
            }]
        });

        if (!user) {
            return res.status(404).json({message: "Not Found"});
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const getUserByIdWithProfile = async (req, res) => {
    try {
        const user = await UserProfiles.findOne({
            where: {
                user_id: req.params.id
            },
            include: [{
                model: Users,
                attributes: ["id", "email"]
            }]
        });

        if (!user) {
            return res.status(404).json({message: "Not Found"});
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// CREATE -----------------------------------------------------------------------------------

export const createUserProfile = async (req, res) => {
    const {
        user_id,
        noKK,
        nik,
        name,
        placeOfBirth,
        dateOfBirth,
        gender,
        address,
        religion,
        maritalStatus,
        phone
    } = req.body;

    try {
        await UserProfiles.create({
            user_id,
            no_kk: noKK,
            nik,
            name,
            place_of_birth: placeOfBirth,
            date_of_birth: dateOfBirth,
            gender,
            address,
            religion,
            marital_status: maritalStatus,
            phone
        });

        res.status(201).json({message: "Success! your profile account has been created"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


// UPDATE -----------------------------------------------------------------------------------

export const updateUserProfile = async (req, res) => {
    const user = await UserProfiles.findOne({
        where: {
            user_id: req.params.id
        }
    });

    if (!user) {
        return res.status(404).json({message: "Not Found"});
    }

    const {
        noKK,
        nik,
        name,
        placeOfBirth,
        dateOfBirth,
        gender,
        address,
        religion,
        maritalStatus,
        phone
    } = req.body;

    try {
        await UserProfiles.update({
            no_kk: noKK,
            nik,
            name,
            place_of_birth: placeOfBirth,
            date_of_birth: dateOfBirth,
            gender,
            address,
            religion,
            marital_status: maritalStatus,
            phone
        }, {
            where: {
                user_id: user.user_id
            }
        });

        res.status(200).json({message: "Success! your profile has been updated"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


// DELETE -----------------------------------------------------------------------------------

export const deleteUserProfile = async (req, res) => {
    const user = await UserProfiles.findOne({
        where: {
            user_id: req.params.id
        }
    });

    if (!user) {
        return res.status(404).json({message: "Not Found"});
    }

    try {
        await UserProfiles.destroy({
            where: {
                id: user.id
            }
        });

        res.status(200).json({ msg: "Success! user profile has been deleted" });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}