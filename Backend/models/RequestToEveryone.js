import {DataTypes, UUIDV4} from "sequelize";
import Database from "../config/Database.js";
import LetterRequests from "./LetterRequests.js";

const RequestToEveryone = Database.define("request_to_everyone", {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    letter_request_id: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false
    },
    no_kk: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
            isNumeric: true,
            notEmpty: true,
            len: [16, 16]
        }
    },
    nik: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
            isNumeric: true,
            notEmpty: true,
            len: [16, 16],
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    place_of_birth: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: true,
            isDate: true
        }
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isIn: [['L', 'P']]
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    religion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    profession: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    citizen: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    marital_status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    phone: {
        type: DataTypes.STRING,
    },
}, {
    freezeTableName: true
})

RequestToEveryone.belongsTo(LetterRequests, {foreignKey: "letter_request_id", onDelete: "cascade", onUpdate: "cascade"})

export default RequestToEveryone;