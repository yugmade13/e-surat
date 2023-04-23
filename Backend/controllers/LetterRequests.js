import LetterRequests from "../models/LetterRequests.js";
import RequestToEveryone from "../models/RequestToEveryone.js"
import Users from "../models/Users.js"
import Letters from "../models/Letters.js";
import Database from "../config/Database.js";
import UserProfiles from "../models/UserProfiles.js";
import letters from "../template/index.js";
import {Op} from "sequelize"
import puppeteer from "puppeteer";
import template5 from "../template/template5.js";
import md5 from "md5";


// GET -----------------------------------------------------------------------------------

export const getLetterRequests = async (req, res) => {
    try {
        let letters;
        if (req.role === "admin") {
            letters = await LetterRequests.findAll({
                attributes: ["id", "created_at", "note"],
                include: [
                    {
                        model: Letters,
                        attributes: ["name"]
                    },
                    {
                        model: Users,
                        attributes: ["id"],
                        include: [{
                            model: UserProfiles,
                            attributes: ["name"]
                        }]
                    }
                ],
                order: [
                    ["created_at", "DESC"]
                ]
            });
        } else {
            letters = await LetterRequests.findAll({
                where: {
                    user_id: req.userId
                },
                attributes: ["created_at", "note"],
                include: [{
                    model: Letters,
                    attributes: ["name"]
                }]
            });
        }

        if (letters.length === 0) {
            return res.status(200).json({message: "Data is Empty"});
        }
        console.log(letters);
        res.status(200).json(letters);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const getLetterRequestsMonth = async (req, res) => {
    const {fromDate, toDate} = req.body;

    const letters = await LetterRequests.findAll({
        attributes: ["id", "created_at", "note"],
        where: {
            created_at: {
                [Op.between]: [`${fromDate}`, `${toDate}`]
            }
        },
        include: [
            {
                model: Letters,
                attributes: ["name"]
            },
            {
                model: Users,
                attributes: ["id"],
                include: [{
                    model: UserProfiles,
                    attributes: ["name"]
                }]
            }
        ]
    });

    if (!letters.length) {
        return res.json({message: "Data kosong"})
    }

    const fileName = md5(new Date().toLocaleString());

    try {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();

        await page.setContent(template5(letters));

        await page.pdf({
            path: `public/pdf/${fileName}.pdf`,
            format: "A4",
            printBackground: true,
        });

        await browser.close();

        res.status(201).json({message: `pdf/${fileName}.pdf`});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const getLetterRequestById = async (req, res) => {
    try {
        const letter = await LetterRequests.findOne({
            attributes: ["id", "user_id", "letter_id", "note"],
            where: {
                id: req.params.id
            }
        });

        if (!letter) {
            return res.status(200).json({message: "Data is Empty"});
        }

        res.status(200).json(letter);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


// CREATE -----------------------------------------------------------------------------------

export const createLetterRequest = async (req, res) => {
    const {user_id, letter_id, note, letter_name} = req.body;

    const user = await Users.findOne({
        where: {
            id: user_id,
        }
    });

    if (!user) {
        return res.status(404).json({message: "Not Found"});
    }

    if (user.status !== "active") {
        return res.status(400).json({message: "Your acoount doesn't active"});
    }

    if (!letters.includes(letter_name)) {
        return res.status(400).json({message: "Surat ini sedang dalam tahap pengembangan"})
    }

    try {
        await LetterRequests.create({
            user_id,
            letter_id,
            note
        });

        res.status(200).json({message: "Success! your letter has been created"})
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const createLetterRequestForEveryone = async (req, res) => {
    const {
        user_id,
        letterID,
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
        phone,
        note,
        letter_name
    } = req.body;

    const user = await Users.findOne({
        where: {
            id: user_id,
        }
    });

    if (!user) {
        return res.status(404).json({message: "Not Found Found"});
    }

    if (user.status !== "active") {
        return res.status(400).json({message: "Your acoount doesn't active"});
    }

    if (!letters.includes(letter_name)) {
        return res.status(400).json({message: "Surat ini sedang dalam tahap pengembangan"})
    }

    let transaction = await Database.transaction();
    try {
        const letterRequest = await LetterRequests.create({
            user_id,
            letter_id: letterID,
            note
        }, {transaction});

        console.log(letterRequest);

        await RequestToEveryone.create({
            letter_request_id: letterRequest.id,
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
        }, {transaction});

        res.status(201).json({message: "Success! your letter has been created"});
        await transaction.commit();
    } catch (error) {
        res.status(400).json({message: error.message});
        if (transaction) {
            await transaction.rollback();
        }
    }
}


// UPDATE -----------------------------------------------------------------------------------

export const updateLetterRequest = async (req, res) => {
    const letter = await LetterRequests.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!letter) {
        return res.status(404).json({message: "Not Found"});
    }

    const {user_id, letter_id, note} = req.body;

    try {
        await LetterRequests.update({
            user_id,
            letter_id,
            note
        }, {
            where: {
                id: letter.id
            }
        });

        res.status(200).json({message: "Success! Letter has been updated"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


// DELETE -----------------------------------------------------------------------------------

export const deleteLetterRequest = async (req, res) => {
    const letter = await LetterRequests.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!letter) {
        return res.status(404).json({message: "Not Found"});
    }

    try {
        await LetterRequests.destroy({
            where: {
                id: letter.id
            }
        });

        res.status(200).json({msg: "Success! Letter has been deleted"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}