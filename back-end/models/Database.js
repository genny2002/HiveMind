import { Sequelize } from "sequelize";
import { createModel as createUserModel } from "./User.js";
import { createModel as createIdeaModel } from "./Idea.js";
import { createModel as createVoteModel } from "./Vote.js";
import { createModel as createCommentModel } from "./Comment.js";
import 'dotenv/config.js';

export const database = new Sequelize(process.env.DB_CONNECTION_URI, {  //apre la connessione al DB utilizzando le variabili del file ".env"
    dialect: process.env.DIALECT
});

createUserModel(database);  //definice il modello di User
createIdeaModel(database);  //definice il modello di Idea
createVoteModel(database);  //definice il modello di Vote
createCommentModel(database);   //definice il modello di Comment

export const { User, Idea, Vote, Comment } = database.models;  //esporta dallo schema del DB User, Idea, Vote, Comment

//configura una relazione 1-a-N tra User e Idea
User.Ideas = User.hasMany(Idea);
Idea.User = Idea.belongsTo(User);

//configura una relazione 1-a-N tra User e Comment
User.Comments = User.hasMany(Comment);
Comment.User = Comment.belongsTo(User);

//configura una relazione 1-a-N tra User e Vote
User.Votes = User.hasMany(Vote);
Vote.User = Vote.belongsTo(User);

//configura una relazione 1-a-N tra Idea e Comment
Idea.Comments = Idea.hasMany(Comment);
Comment.Idea = Comment.belongsTo(Idea);

//configura una relazione 1-a-N tra Idea e Vote
Idea.Votes = Idea.hasMany(Vote);
Vote.Idea = Vote.belongsTo(Idea);

database.sync().then(() => {    //sincronizza lo schema del DB con i modelli definiti
    console.log("Database synced correctly");
}).catch(err => {
    console.error("Error with database synchronization: " + err.message);
});