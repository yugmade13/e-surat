import Letters from "../models/Letters.js";


// GET -----------------------------------------------------------------------------------

export const getLetters = async (req, res) => {
    try {
        const letters = await  Letters.findAll({
            attributes: ["id", "name"]
        });

        if (letters.length === 0) {
            return res.status(200).json({message: "Data is Empty"});
        }

        res.status(200).json(letters);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const getLetterById = async (req, res) => {
    try {
        const letter = await Letters.findOne({
            attributes: ["id", "name"],
            where: {
                id: req.params.id
            }
        });

        if (!letter) {
            return res.status(404).json({message: "Not Found"});
        }

        res.status(200).json(letter);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


// CREATE -----------------------------------------------------------------------------------

export const createLetter = async (req, res) => {
    const { name } = req.body;

    try {
        await Letters.create({
            name: name
        });

        res.status(200).json({message: "Success! your letter has been created"})
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


// UPDATE -----------------------------------------------------------------------------------

export const updateLetter = async (req, res) => {
    const letter = await Letters.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!letter) {
        return res.status(404).json({message: "Not Found"});
    }

    const { name } = req.body;

    try {
        await Letters.update({
            name: name
        },{
            where: {
                id: req.params.id
            }
        });

        res.status(200).json({message: "Success! letter has been deleted"})
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


// DELETE -----------------------------------------------------------------------------------

export const deleteLetter = async (req, res) => {
    const letter = await Letters.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!letter) {
        return res.status(404).json({message: "Not Found"});
    }

    try {
        await Letters.destroy({
            where: {
                id: letter.id
            }
        });

        res.status(200).json({message: "Success! letter has been deleted"})
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}