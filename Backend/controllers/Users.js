import Users from "../models/Users.js";
import argon from "argon2";
import Database from "../config/Database.js";
import UserProfiles from "../models/UserProfiles.js";


// GET -----------------------------------------------------------------------------------

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ["id", "email", "status", "role"],
        });

        if (users.length === 0) {
            return res.status(200).json({message: "Data is Empty"});
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ["id", "email", "status", "role"],
            where: {
                id: req.params.id
            }
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

export const createUser = async (req, res) => {
    const { email, password, confirmPassword, status, role } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({message: "Password and confirm password do not match"});
    }

    const hashPassword = await argon.hash(password);

    try {
        await Users.create({
            email: email,
            password: hashPassword,
            status: status,
            role: role
        });

        res.status(201).json({message: "Success! your account has been created"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const createUserWithProfile = async (req, res) => {
    const {
        email,
        password,
        confirmPassword,
        status,
        role,
        noKK,
        nik,
        name,
        placeOfBirth,
        dateOfBirth,
        gender,
        address,
        religion,
        profession,
        citizen,
        maritalStatus,
        phone
    } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({message: "Password and confirm password do not match"});
    }

    const hashPassword = await argon.hash(password);

    let transaction = await Database.transaction();
    try {
        const user = await Users.create({
            email: email,
            password: hashPassword,
            status,
            role
        }, { transaction });

        await UserProfiles.create({
            user_id: user.id,
            no_kk: noKK,
            nik,
            name,
            place_of_birth: placeOfBirth,
            date_of_birth: dateOfBirth,
            gender,
            address,
            religion,
            profession,
            citizen,
            marital_status: maritalStatus,
            phone
        }, { transaction });

        res.status(201).json({message: "Success! your account has been created"});
        await transaction.commit();
    } catch (error) {
        res.status(400).json({message: error.message});
        if (transaction) {
            await transaction.rollback();
        }
    }
}


// UPDATE -----------------------------------------------------------------------------------

export const updateUserWithoutPassword = async (req, res) => {
    const user = await Users.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!user) {
        return res.status(404).json({message: "Not Found"});
    }

    const { email, status, role } = req.body;

    try {
        await Users.update({
            email: email,
            status: status,
            role: role
        }, {
            where: {
                id: user.id
            }
        });

        res.status(200).json({message: "Success! your account has been updated"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const updateUserPassword = async (req, res) => {
    const user = await Users.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!user) {
        return res.status(404).json({message: "Not Found"});
    }

    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({message: "Password and confirm password do not match"});
    }

    let hashPassword;
    if (password === "" || password === null) {
        hashPassword = user.password;
    } else {
        hashPassword = await argon.hash(password);
    }

    try {
        await Users.update({
            password: hashPassword,
        },{
            where: {
                id: user.id
            }
        });

        res.status(200).json({message: "Success! updated your password"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


// DELETE -----------------------------------------------------------------------------------

export const deleteUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!user) {
        return res.status(404).json({message: "Not Found"})
    }

    try {
        await Users.destroy({
            where: {
                id: user.id
            }
        });

        res.status(200).json({ msg: "Success! user has been deleted" });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

