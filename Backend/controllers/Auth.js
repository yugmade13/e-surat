import Users from "../models/Users.js";
import argon from "argon2";
import Database from "../config/Database.js";
import UserProfiles from "../models/UserProfiles.js";

export const Register = async (req, res) => {
    const {
        email,
        password,
        confirmPassword,
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

export const Login = async (req, res) => {
    const user = await Users.findOne({
        where: {
            email: req.body.email
        }
    });

    if (!user) {
        return res.status(404).json({msg: "Incorrects email address or password"});
    }

    const match = await argon.verify(user.password, req.body.password);

    if (!match) {
        return res.status(400).json({msg: "Incorrects email address or password"});
    }

    req.session.userId = user.id;
    const id = user.id;
    const email = user.email;
    const status = user.status;
    const role = user.role;

    res.status(200).json({id, email, status, role});
}

export const Me = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({msg: "Please login your account"});
    }

    const user = await Users.findOne({
        attributes: ["id", "email", "status", "role"],
        where: {
            id: req.session.userId
        }
    });

    if (!user) {
        return res.status(404).json({msg: "User not Found"});
    }

    res.status(200).json(user);
}

export const Logout = async (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            return res.send(400).json({msg: error});
        }

        res.status(200).json({msg: "Logout"});
    });
}