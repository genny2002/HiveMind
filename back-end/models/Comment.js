import { DataTypes } from "sequelize";

export function createModel(database) {
    database.define('Comment', {    //Definizione degli attributi di "Comment"
        id: {   //identificatore univoco del commento
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        testo: {   //testo del commento
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {

    });
}