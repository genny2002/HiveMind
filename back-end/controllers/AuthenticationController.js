import { User, Idea, Vote, Comment } from "../models/Database.js";
import Jwt from "jsonwebtoken";

export class AuthenticationController {
    static async checkCredentials(req, res) {    //controlla se esiste un utente con 'req.body.usr' e 'req.body.pwd'
        let user = new User({   //dati dell'utente nella richiesta
            userName: req.body.usr,   //username dell'utente
            password: req.body.pwd    //password dell'utente
        });

        let found = await User.findOne({    //controlla se esiste un utente con le credenziali ricevute
            where: {
                userName: user.userName,
                password: user.password
            }
        });

        return found !== null;
    }//fine checkCredentials

    static async saveUser(req, res) {    //tenta di creare un nuovo utente con 'req.body.usr' e 'req.body.pwd'
        let user = new User({   //dati dell'utente da inserire
            userName: req.body.usr,
            password: req.body.pwd
        });

        return user.save();
    }//fine saveUser

    static issueToken(username) {    //genera un token per l'utente 'username' valido per 24 ore
        return Jwt.sign({ user: username }, process.env.TOKEN_SECRET, { expiresIn: `${24 * 60 * 60}s` });
    }//fine issueToken

    static isTokenValid(token, callback) {   //controlla se il token è valido
        Jwt.verify(token, process.env.TOKEN_SECRET, callback);
    }//fine isTokenValid

    static async canUserModifyIdea(user, ideaId) {   //controlla se l'utente 'user' può modificare l'idea 'ideaId'
        const idea = await Idea.findByPk(ideaId);

        return idea && idea.UserUserName === user;
    }//fine canUserModifyIdea

    static async canUserModifyComment(user, commentId) {   //controlla se l'utente 'user' può modificare il commento 'commentId'
        const comment = await Comment.findByPk(commentId);

        return comment && comment.UserUserName === user;
    }//fine canUserModifyComment

    static async canUserModifyVote(user, ideaId) {   //controlla se l'utente 'user' può modificare il voto 'votoId'
        let vote = await Vote.findOne({    //cerca un voto positivo dell utente all'idea
            where: {
                UserUserName: user,
                IdeaId: ideaId,
            }
        });

        return vote !== null;
    }//fine canUserModifyVote

    static async canUserVoteIdea(user, ideaId) {   //controlla se l'utente 'user' può votare l'idea 'ideaId'
        const idea = await Idea.findByPk(ideaId);

        return idea && idea.UserUserName != user;
    }//fine canUserVoteIdea

    static async userVotedIdea(user, ideaId) {  //controlla se l'utente 'user' ha votato l'idea 'ideaId', quindi ritorna il valore del voto oppure NULL
        const vote = await Vote.findOne({
            where: {
                [Op.and]: [{ userName: user }, { id: ideaId }],
            },
            attributes: ['valore']
        })

        return vote ? vote.valore : null;
    }//fine userVotedIdea
}