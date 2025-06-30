import { AuthenticationController } from "../controllers/AuthenticationController.js";

export function enforceAuthentication(req, res, next) {
    const authHeader = req.headers['authorization'];    //heaeder della richiesta 
    const token = authHeader?.split(' ')[1];    //token nell'header della richiesta

    if (!token) {   //controlla se non c'è il token
        next({ status: 401, message: "Unauthorized" }); //passa un'errore 401 con un messaggio al gestore degli errori
        return;
    }

    AuthenticationController.isTokenValid(token, (err, decodedToken) => { //verifica se il token è valido
        if (err) {  //controlla se c'è stato un errpre
            next({ status: 401, message: "Unauthorized" }); //passa un'errore 401 con un messaggio al gestore degli errori
        } else {
            req.username = decodedToken.user;   //aggiunge il nome utente decodificato alla richiesta
            next(); //passa al middleware successivo
        }
    });
}

export async function ensureUsersModifyOnlyOwnIdeas(req, res, next) {
    const user = req.username;  //username dell'utente della richiesta
    const ideaId = req.params.id;   //ID dell'idea
    const userHasPermission = await AuthenticationController.canUserModifyIdea(user, ideaId);   //controlla se l'utente può modificare l'idea 'ideaId'

    if (userHasPermission) {    //controlla se l'utente ha il permesso
        next(); //passa al middleware successivo 
    } else {
        next({  //invia un messaggio di errore al gestore degli errori
            status: 403,
            message: "Forbidden! You do not have permissions to view or modify this resource"
        });
    }
}

export async function ensureUsersModifyOnlyOwnComments(req, res, next) {
    const user = req.username;  //username dell'utente della richiesta
    const commentId = req.params.id;    //ID del commento
    const userHasPermission = await AuthenticationController.canUserModifyComment(user, commentId); //controlla se l'utente può modificare il commento 'commentId'

    if (userHasPermission) {    //controlla se l'utente ha il permesso
        next(); //passa al middleware successivo 
    } else {
        next({  //invia un messaggio di errore al gestore degli errori
            status: 403,
            message: "Forbidden! You do not have permissions to view or modify this resource"
        });
    }
}

export async function ensureUsersModifyOnlyOwnVotes(req, res, next) {
    const user = req.username;  //username dell'utente della richiesta
    const ideaId = req.params.ideaId;   //ID dell'idea
    const userHasPermission = await AuthenticationController.canUserModifyVote(user, ideaId);   //controlla se l'utente può modificare il voto 'voteId'

    if (userHasPermission) {    //controlla se l'utente ha il permesso
        next(); //passa al middleware successivo
    } else {
        next({  //invia un messaggio di errore al gestore degli errori
            status: 403,
            message: "Forbidden! You do not have permissions to view or modify this resource"
        });
    }
}

export async function ensureUsersVoteOnlyOtherUserIdeas(req, res, next) {
    const user = req.username;  //username dell'utente della richiesta
    const ideaId = req.params.ideaId;   //ID dell'idea
    const userHasPermission = await AuthenticationController.canUserVoteIdea(user, ideaId); //controlla se l'utente può votare l'idea 'ideaId'

    if (userHasPermission) {    //controlla se l'utente ha il permesso
        next(); //passa al middleware successivo
    } else {
        next({  //invia un messaggio di errore al gestore degli errori
            status: 403,
            message: "Forbidden! You do not have permissions to view or modify this resource"
        });
    }
}