import Database from "../config/Database.js";
import {DataTypes, UUIDV4} from "sequelize";

const Counter = Database.define("counter", {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

export default Counter;