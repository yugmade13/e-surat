import {DataTypes, UUIDV4} from "sequelize";
import Database from "../config/Database.js";
import Users from "./Users.js";
import Letters from "./Letters.js";

const LetterRequests = Database.define("letter_requests", {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    letter_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    note: {
        type: DataTypes.TEXT,
    }
});

Users.hasMany(LetterRequests);
Letters.hasMany(LetterRequests);
LetterRequests.belongsTo(Users, {foreignKey: "user_id", onDelete: "set null", onUpdate: "cascade"});
LetterRequests.belongsTo(Letters, {foreignKey: "letter_id", onDelete: "set null", onUpdate: "cascade"});

export default LetterRequests;