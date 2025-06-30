import { Vote, Idea } from "../models/Database.js";

export class VoteController {
    static async saveUpVote(req) {    //inserisce un nuovo voto positivo nel DB
        let idea = await Idea.findByPk(req.params.ideaId); //cerca l'idea da modificare
        let downVote = await Vote.findOne({    //cerca un voto negativo dell utente all'idea
            where: {
                UserUserName: req.username,
                IdeaId: idea.id,
                valore: -1
            }
        });

        if (downVote)    //controlla se l'utente ha già inserito un voto negativo all'idea
        {
            idea.downVotes--;   //decrementa il numero di voti negativi dell'idea
            await downVote.destroy();  //elimina il voto negativo
        }

        let upVote = await Vote.findOne({    //cerca un voto positivo dell utente all'idea
            where: {
                UserUserName: req.username,
                IdeaId: idea.id,
                valore: 1
            }
        });

        if (upVote) { //controlla se l'utente ha già dato un voto positivo all'idea
            throw new Error("User has already upvoted this idea");
        } else {
            let vote = Vote.build(req.body);    //crea il nuovo voto

            vote.UserUserName = req.username;    //imposta l'username dell'utente del nuovo voto
            vote.IdeaId = req.params.ideaId;    //imposta l'ID dell'idea votata
            vote.valore = 1;   //imposta il valore del voto
            idea.upVotes++; //incrementa il numero di voti positivi dell'idea votata
            await idea.save();  //salva la modifica dell'idea votata 

            return vote.save();
        }
    }// fine saveUpVote

    static async saveDownVote(req) {    //inserisce un nuovo voto negativo nel DB
        let idea = await Idea.findByPk(req.params.ideaId); //cerca l'idea da modificare
        let upVote = await Vote.findOne({    //cerca un voto positivo dell utente all'idea
            where: {
                UserUserName: req.username,
                IdeaId: idea.id,
                valore: 1
            }
        });

        if (upVote)    //controlla se l'utente ha già inserito un voto positivo all'idea
        {
            idea.upVotes--;   //decrementa il numero di voti positivi dell'idea
            await upVote.destroy();  //elimina il voto positivo
        }

        let downVote = await Vote.findOne({    //cerca un voto negativo dell utente all'idea
            where: {
                UserUserName: req.username,
                IdeaId: idea.id,
                valore: -1
            }
        });

        if (downVote) { //controlla se l'utente ha già dato un voto negativo all'idea
            throw new Error("User has already downvoted this idea");
        } else {
            let vote = Vote.build(req.body);    //crea il nuovo voto

            vote.UserUserName = req.username;    //imposta l'username dell'utente del nuovo voto
            vote.IdeaId = req.params.ideaId;    //imposta l'ID dell'idea votata
            vote.valore = -1;   //imposta il valore del voto
            idea.downVotes++; //incrementa il numero di voti negativi dell'idea votata
            await idea.save();  //salva la modifica dell'idea votata 

            return vote.save();
        }
    }// fine saveDownVote

    static async deleteUpVote(req) {    //elimina un voto positivo nel DB
        let upVote = await Vote.findOne({    //cerca un voto positivo dell utente all'idea
            where: {
                UserUserName: req.username,
                IdeaId: req.params.ideaId,
                valore: 1
            }
        });
        let idea = await Idea.findByPk(upVote.IdeaId); //cerca l'idea da modificare

        idea.upVotes--; //decrementa il numero di voti positivi
        await idea.save();  //salva la modifica dell'idea

        return upVote.destroy();  //elimina il voto positivo
    }//fine deleteUpVote

    static async deleteDownVote(req) {    //elimina un voto negativo nel DB
        let downVote = await Vote.findOne({    //cerca un voto negativo dell utente all'idea
            where: {
                UserUserName: req.username,
                IdeaId: req.params.ideaId,
                valore: -1
            }
        });
        let idea = await Idea.findByPk(downVote.IdeaId); //cerca l'idea da modificare

        idea.downVotes--;    //decrementa il numero di voti negativi
        await idea.save();  //salva la modifica dell'idea

        return downVote.destroy();  //elimina il voto positivo
    }//fine deleteUpVote

    static async findByUser(req) {    //ritorna i voti dell'utente 'req.username'
        return Vote.findAll({    //cerca i voti dell'utente
            where: {
                UserUserName: req.username,
            }
        });
    }//fine findByUser
}