import { DataTypes } from "sequelize";

export function createModel(database) {
    database.define('Idea', {   //Definizione degli attributi di "Idea"
        id: {   //identificatore univoco dell'idea 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        titolo: {   //titolo dell'idea
            type: DataTypes.STRING,
            allowNull: false
        },
        testo: {    //testo dell'idea
            type: DataTypes.TEXT,
            allowNull: false,
        },
        upVotes: {   //numero di voti positivi dell'idea
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        downVotes: {  //numero di voti negativi dell'idea
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0

        }
    }, {

    });
}