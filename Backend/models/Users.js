import {DataTypes, UUIDV4} from "sequelize";
import Database from "../config/Database.js";
import UserProfiles from "./UserProfiles.js";

const Users = Database.define("users", {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'unactive',
        validate: {
            isIn: [['active', 'unactive']]
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
        validate: {
            isIn: [['admin', 'user']]
        }
    }
});

Users.hasOne(UserProfiles, {onDelete: "cascade", onUpdate: "cascade"});
UserProfiles.belongsTo(Users, {foreignKey: "user_id"})

export default Users;