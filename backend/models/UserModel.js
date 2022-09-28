import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    createdAt:{
        type: DataTypes.DATE
    },
    lastLogInAt:{
        type: DataTypes.DATE
    },
    blocked:{
        type: DataTypes.BOOLEAN
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

export default Users;
