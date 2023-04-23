import RequestToEveryone from "../models/RequestToEveryone.js"


// GET -----------------------------------------------------------------------------------

export const getRequestToEveryone = async (req, res) => {
    try {
        const letters = await RequestToEveryone.findAll({
            attributes: ["id", "letter_request_id", "no_kk", "nik", "name", "place_of_birth", "date_of_birth", "gender", "address", "religion", "profession", "citizen", "marital_status", "phone"]
        });

        if (letters.length === 0) {
            return res.status(200).json({message: "Data is Empty"});
        }

        res.status(200).json(letters);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const getRequestToEveryoneById = async (req, res) => {
    try {
        const letter = await RequestToEveryone.findOne({
            attributes: ["id", "letter_request_id", "no_kk", "nik", "name", "place_of_birth", "date_of_birth", "gender", "address", "religion", "profession", "citizen", "marital_status", "phone"],
            where: {
                letter_request_id: req.params.id
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

export const createRequestToEveryone = async (req, res) => {
    const {
        letter_request_id,
        no_kk,
        nik,
        name,
        place_of_birth,
        date_of_birth,
        gender,
        address,
        religion,
    } = req.body

    try {
        await RequestToEveryone.create({
            letter_request_id,
            no_kk,
            nik,
            name,
            place_of_birth,
            date_of_birth,
            gender,
            address,
            religion,
        });
        res.status(201).json({message: "Success! your letter has been created"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


// UPDATE -----------------------------------------------------------------------------------

export const updateRequestToEveryone = async (req, res) => {
    const letter = await RequestToEveryone.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!letter) {
        return res.status(404).json({message: "Not Found"});
    }

    const {
        no_kk,
        nik,
        name,
        place_of_birth,
        date_of_birth,
        gender,
        address,
        religion,
    } = req.body;

    try {
        await RequestToEveryone.update({
            no_kk,
            nik,
            name,
            place_of_birth,
            date_of_birth,
            gender,
            address,
            religion,
        }, {
            where: {
                id: letter.id
            }
        });
        res.status(200).json({message: "Success! letter has been updated"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


// DELETE -----------------------------------------------------------------------------------

export const deleteRequestToEveryone = async (req, res) => {
    const letter = await RequestToEveryone.findOne({
        where: {
            id: req.params.id
        }
    })

    if (!letter) {
        return res.status(404).json({message: "Not Found"});
    }

    try {
        await RequestToEveryone.destroy({
            where: {
                id: letter.id
            }
        });
        res.status(200).json({ msg: "Success! Letter has been deleted" });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}