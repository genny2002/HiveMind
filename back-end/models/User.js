import { DataTypes } from "sequelize";
import { createHash } from "crypto";

export function createModel(database) {
    database.define('User', {   //definizione degli attributi di "User"
        userName: { //username dell'utente
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        password: { //password dell'utente
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {  //setter della password
                let hash = createHash("sha256");
                this.setDataValue('password', hash.update(value).digest("hex"));    //codifica la password con l'algoritmo "SHA-256"
            }
        }
    }, {

    });
}