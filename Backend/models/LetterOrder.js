import {DataTypes, UUIDV4} from "sequelize";
import Database from "../config/Database.js";
import Users from "./Users.js";
import Letters from "./Letters.js";
import LetterRequests from "./LetterRequests.js";

const LetterOrder = Database.define("letter_order", {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    request_letter_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    letter_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    pdf: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
}, {
    freezeTableName: true
});

Users.hasMany(LetterOrder);
Letters.hasMany(LetterOrder);
LetterOrder.belongsTo(Users);
LetterOrder.belongsTo(Letters);
LetterOrder.belongsTo(LetterRequests, {foreignKey: "request_letter_id", onDelete: "cascade", onUpdate: "cascade"})

export default LetterOrder;