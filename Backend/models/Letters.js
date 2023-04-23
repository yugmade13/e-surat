import {DataTypes, UUIDV4} from "sequelize";
import Database from "../config/Database.js";

const Letters = Database.define("letters", {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    }
});

export default Letters;