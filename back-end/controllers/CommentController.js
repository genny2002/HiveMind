import { Comment } from "../models/Database.js";

export class CommentController {
    static async getCommentForIdea(req) {  //ritorna tutti i commenti di un'idea
        return Comment.findAll({
            where: {
                IdeaId: req.params.ideaId
            }
        })
    }

    static async saveComment(req) {    //inserisce un nuovo commento nel DB
        let comment = Comment.build(req.body);    //crea il nuovo commento
        comment.UserUserName = req.username;    //imposta l'username dell'utente del nuovo commento
        comment.IdeaId = req.params.ideaId;    //imposta l'ID dell'idea commentata
        return comment.save();
    }// fine saveComment

    static async update(id, updated) {  //modifica il commento con id 'id'
        let comment = await Comment.findByPk(id); //cerca il commento da modificare
        comment.set(updated);  //modifica il commento
        return comment.save();
    }//fine update

    static async findById(req) {    //ritorna il commento con id 'req.params.id'
        return Comment.findByPk(req.params.id);
    }//fine findById

    static async delete(req) {  //elimina il commento richiesto
        return new Promise((resolve, reject) => {
            this.findById(req).then(item => {
                item.destroy().then(() => { resolve(item) })
            })
        })
    }//fine delete
}