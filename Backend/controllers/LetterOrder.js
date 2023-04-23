import LetterOrder from "../models/LetterOrder.js";
import path from "path";
import fs from "fs";
import md5 from "md5";
import puppeteer from "puppeteer";
import template1 from "../template/template1.js";
import template2 from "../template/template2.js";
import template3 from "../template/template3.js";
import template4 from "../template/template4.js";
import Letters from "../models/Letters.js";
import Users from "../models/Users.js";
import UserProfiles from "../models/UserProfiles.js";
import Counter from "../models/Counter.js";
import moment from "moment/moment.js";


// GET -----------------------------------------------------------------------------------

export const getLetterOrder = async (req, res) => {
    try {
        let orders;
        if (req.role === "admin") {
            orders = await LetterOrder.findAll({
                attributes: ["id", "request_letter_id", "user_id", "letter_id", "pdf", "url", "created_at"],
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
            orders = await LetterOrder.findAll({
                where: {
                    user_id: req.userId
                },
                attributes: ["id", "request_letter_id", "user_id", "letter_id", "pdf", "url"],
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
        }

        if (orders.length === 0) {
            return res.status(200).json({message: "Data is Empty"});
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const getLetterOrderById = async (req, res) => {
    try {
        const order = await LetterOrder.findOne({
            attributes: ["id", "request_letter_id", "user_id", "letter_id", "pdf", "url"],
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Letters,
                    attributes: ["name"]
                },
                {
                    model: Users,
                    attributes: ["id", "email"],
                    include: [{
                        model: UserProfiles,
                        attributes: ["name"]
                    }]
                }
            ]
        });

        if (!order) {
            return res.status(200).json({message: "Data is Empty"});
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


// CREATE -----------------------------------------------------------------------------------

export const createLetterOrder = (req, res) => {
    if (req.files === null) {
        return res.status(400).json({message: "No file uploaded"});
    }

    const {
        request_letter_id,
        letter_id,
        user_id,
    } = req.body;

    const file = req.files.file;
    const ext = path.extname(file.name)

    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/pdf/${fileName}`;

    const allowedType = ".pdf";
    if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(422).json({message: "Invalid .pdf"});
    }

    const fileSize = file.data.length;
    if(fileSize > 5000000) {
        return res.status(422).json({message: "pdf must be less than 5 MB"});
    }

    file.mv(`./public/pdf/${fileName}`, async (error) => {
        if (error) {
            return res.status(500).json(error.message);
        }

        try {
            await LetterOrder.create({
                request_letter_id,
                user_id,
                letter_id,
                pdf: fileName,
                url: url
            });

            res.status(201).json({message: "File Created Successfully"});
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    });
}


export const createOrder = async (req, res) => {
    const {
        someone,
        id,
        letterID,
        userID,
        letter,
        nik,
        name,
        placeOfBirth,
        dateOfBirth,
        gender,
        address,
        citizen,
        religion,
        profession,
        note,
    } = req.body;

    const order = await LetterOrder.findOne({
        where: {
            request_letter_id: id
        }
    });

    if (order) {
        return res.status(200).json({message: "Surat sudah dibuat"})
    }

    let username;

    if (someone) {
        username = someone
    } else {
        username = name
    }

    let template;

    if (letter === "Surat Keterangan Domisili") {
        template = template1;
    } else if (letter === "Surat Pengantar Pembuatan SKCK") {
        template = template2;
    } else if (letter === "Surat Keterangan Tidak Mampu") {
        template = template3;
    } else if (letter === "Surat Keterangan Usaha") {
        template = template4;
    } else {
        return res.status(200).json({message: "Template belum dibuat"});
    }

    const fileName = md5(new Date().toLocaleString());
    const url = `${req.protocol}://${req.get("host")}/pdf/${fileName}.pdf`;

    let getCount;
    const counters = await Counter.findAll();

    if (counters.length === 0) {
        try {
            const counter = await Counter.create({
                value: 1
            });

            getCount = counter.value;
        } catch (error) {
            console.log(error);
        }
    } else {
        const counter = await Counter.findOne({
            where: {
                id: counters[0].id
            }
        })

        const month = moment(counter.updatedAt).format("M");
        const now = new Date();
        const monthNow = moment(now).format("M");

        try {
            if (month === monthNow) {
                await Counter.update({
                    value: counter.value + 1
                }, {
                    where: {
                        id: counter.id
                    }
                });
            } else {
                await Counter.update({
                    value: 1
                }, {
                    where: {
                        id: counter.id
                    }
                });
            }

            const count = await Counter.findOne({
                where: {
                    id: counter.id
                }
            })

            getCount = count.value;
        } catch (error) {
            console.log(error)
        }
    }

    const count = getCount;

    try {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();

        await page.setContent(template({
            nik,
            name: username,
            place_of_birth: placeOfBirth,
            date_of_birth: dateOfBirth,
            gender,
            address,
            citizen,
            religion,
            profession,
            note,
            count
        }));

        await page.pdf({
            path: `public/pdf/${fileName}.pdf`,
            format: "A4",
            printBackground: true,
        });

        await browser.close();

        await LetterOrder.create({
            request_letter_id: id,
            user_id : userID,
            letter_id : letterID,
            pdf: fileName,
            url: url
        });

        res.status(201).json({message: "File Created Successfully"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// UPDATE -----------------------------------------------------------------------------------

export const updateLetterOrder = async (req, res) => {
    const order = await LetterOrder.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!order) {
        return res.status(404).json({message: "Data not found"})
    }

    const {
        request_letter_id,
        letter_id,
        user_id,
    } = req.body;

    let fileName;
    if (req.files === null) {
        fileName = order.pdf;
    } else {
        const file = req.files.file;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;

        const allowType = ".pdf";
        if (!allowType.includes(ext.toLowerCase())) {
            return res.status(422).json({message: "Invalid file"});
        }

        const fileSize = file.data.length;
        if (fileSize > 5000000) {
            return res.status(422).json({message: "File must be less than 5 MB"});
        }

        const filePath = `./public/pdf/${order.pdf}`;
        fs.unlinkSync(filePath);

        file.mv(`./public/pdf/${fileName}`, (error) => {
            if (error) {
                return res.status(500).json(error.message);
            }
        });
    }

    const url = `${req.protocol}://${req.get("host")}/pdf/${fileName}`;

    try {
        await LetterOrder.update({
            request_letter_id,
            user_id,
            letter_id,
            pdf: fileName,
            url: url
        }, {
            where: {
                id: order.id
            }
        });

        res.status(201).json({message: "File Updated Successfully"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const updateOrder = async (req, res) => {
    console.log(req.body, req.files)
}

// DELETE -----------------------------------------------------------------------------------

export const deleteLetterOrder = async (req, res) => {
    const order = await LetterOrder.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!order) {
        return res.status(404).json({message: "Data not found"})
    }

    try {
        const filePath = `./public/pdf/${order.pdf}`
        fs.unlinkSync(filePath);

        await LetterOrder.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(200).json({message: "Delete successfully"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}