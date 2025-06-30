import { DataTypes } from "sequelize";

export function createModel(database) {
    database.define('Vote', {   //Definizione degli attributi di "Vote"
        id: {   //identificatore univoco del voto
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        valore: {   //valore del voto
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isIn: [[1, -1]] //assicura che il valore sia 1 o -1
            }
        }
    }, {
        indexes: [
            {
                unique: true,
                fields: ['valore', 'UserUserName', 'IdeaId']
            }
        ]
    });
}