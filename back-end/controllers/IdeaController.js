import { Idea, Vote, database } from "../models/Database.js";
import { Op } from "sequelize";

export class IdeaController {
    static async getCountIdeas() {  //conta le idee
        return Idea.count();
    }//fine getCountIdeas

    static async getAllIdea(req) { //ritorna tutte le idee
        return Idea.findAll({
            offset: (req.params.page - 1) * 10,
            limit: 10
        });
    }//fine getAllIdea

    static async getCountControversialIdeas() {  //conta le idee controverse
        return Idea.count({
            where: {
                createdAt: {
                    [Op.gte]: database.literal('CURRENT_DATE - INTERVAL \'7 days\'')
                },
                [Op.and]: [
                    database.literal('"upVotes" - "downVotes" BETWEEN -2 AND 2')
                ]
            },
            order: database.literal('"upVotes" + "downVotes" DESC')
        });
    }//fine getCountControversialIdeas

    static async getControversialIdea(req) {   //ritorna tutte le idee pubblicate nell'ultima settimana con un saldo complessivo in [-2,2] ordinati per il numero di voti totali
        return Idea.findAll({
            offset: (req.params.page - 1) * 10,
            limit: 10,
            where: {
                createdAt: {
                    [Op.gte]: database.literal('CURRENT_DATE - INTERVAL \'7 days\'')
                },
                [Op.and]: [
                    database.literal('"upVotes" - "downVotes" BETWEEN -2 AND 2')
                ]
            },
            order: database.literal('"upVotes" + "downVotes" DESC')
        })
    }//fine getControversialIdea

    static async getCountUnpopularMainstreamIdeas() {  //conta le idee unpopular/mainstream
        return Vote.count({
            where: {
                createdAt: {
                    [Op.gte]: database.literal('CURRENT_DATE - INTERVAL \'7 days\'')
                },

                IdeaId: {
                    [Op.ne]: null
                }
            },
            group: ['IdeaId'],
            //order: [[database.fn('SUM', database.col('valore')), 'ASC']]
        });
    }//fine getCountUnpopularMainstreamIdeas

    static async getUnpopularIdea(req) {   //ritorna tutte le idee unpopular degli ultimi 7 giorni
        return Vote.findAll({
            offset: (req.params.page - 1) * 10,
            limit: 10,
            attributes: ['IdeaId'],
            where: {
                createdAt: {
                    [Op.gte]: database.literal('CURRENT_DATE - INTERVAL \'7 days\'')
                },

                IdeaId: {
                    [Op.ne]: null
                }
            },
            group: ['IdeaId'],
            order: [[database.fn('SUM', database.col('valore')), 'ASC']]
        });
    }//fine getUnpopularIdea

    static async getMainstreamIdea(req) {   //ritorna tutte le idee mainstream degli ultimi 7 giorni
        return Vote.findAll({
            offset: (req.params.page - 1) * 10,
            limit: 10,
            attributes: ['IdeaId'],
            where: {
                createdAt: {
                    [Op.gte]: database.literal('CURRENT_DATE - INTERVAL \'7 days\'')
                },

                IdeaId: {
                    [Op.ne]: null
                }
            },
            group: ['IdeaId'],
            order: [[database.fn('SUM', database.col('valore')), 'DESC']]
        });
    }//fine getMainstreamIdea

    static async saveIdea(req) {    //inserisce una nuova idea nel DB
        let idea = Idea.build(req.body);    //crea la nuova idea
        idea.UserUserName = req.username;   //imposta l'username dell'utente della nuova idea
        return idea.save();
    }// fine saveIdea

    static async findById(req) {    //ritorna l'idea con id 'req.params.id'
        return Idea.findByPk(req.params.id);
    }//fine findById

    static async update(id, updated) {  //modifica l'idea con id 'id'
        let idea = await Idea.findByPk(id); //cerca l'idea da modificare
        idea.set(updated);  //modifica l'idea
        return idea.save();
    }//fine update

    static async delete(req) {  //elimina l'idea richiesta
        return new Promise((resolve, reject) => {
            this.findById(req).then(item => {
                item.destroy().then(() => { resolve(item) })
            })
        })
    }//fine delete
}