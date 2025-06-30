import express from "express";
import { VoteController } from "../controllers/VoteController.js";
import { ensureUsersModifyOnlyOwnVotes, ensureUsersVoteOnlyOtherUserIdeas } from "../middleware/authorization.js";

export const voteRouter = new express.Router();

/**
 * @swagger
 *  /upVotes/{ideaId}:
 *    post:
 *      description: Register a new upVote for an idea
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: ideaId
 *          in: path
 *          required: true
 *          description: ID of the idea to upvote
 *          schema:
 *            type: integer
 *        - name: Authorization
 *          in: header
 *          required: true
 *          description: Bearer token for authentication
 *          schema:
 *            type: string
 *            example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiamFuZXQiLCJpYXQiOjE3MTg3MzAzMzcsImV4cCI6MTcxODgxNjczN30.e5mfeDTP8PTwlV9HKaOewrB-t-E4Bsw9Fg0Ulgwdf60
 *      requestBody:
 *        description: new upVote
 *        required: true
 *        content:
 *      responses:
 *        200:
 *          description: upVote registered
 *        403:
 *          description: Forbidden! User not authorized
 *        500:
 *          description: upVote not registered
 */
voteRouter.post("/upVotes/:ideaId", ensureUsersVoteOnlyOtherUserIdeas, (req, res, next) => {    //tenta di registrare un nuovo voto positivo assicurando che ogni utente non voti le proprie idee e invia una risposta
    VoteController.saveUpVote(req).then(result => {
        res.json(result);   //invia una risposta
    }).catch(err => {
        next(err);  //invia una risposta con un messaggio di errore
    });
});

/**
 * @swagger
 *  /downVotes/{ideaId}:
 *    post:
 *      description: Register a new downVote for an idea
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: ID of the idea to downvote
 *          schema:
 *            type: integer
 *        - name: Authorization
 *          in: header
 *          required: true
 *          description: Bearer token for authentication
 *          schema:
 *            type: string
 *            example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiamFuZXQiLCJpYXQiOjE3MTg3MzAzMzcsImV4cCI6MTcxODgxNjczN30.e5mfeDTP8PTwlV9HKaOewrB-t-E4Bsw9Fg0Ulgwdf60
 *      requestBody:
 *        description: new downVote
 *        required: true
 *        content:
 *      responses:
 *        200:
 *          description: downVote registered
 *        403:
 *          description: Forbidden! User not authorized
 *        500:
 *          description: downVote not registered
 */
voteRouter.post("/downVotes/:ideaId", ensureUsersVoteOnlyOtherUserIdeas, (req, res, next) => {  //tenta di registrare un nuovo voto negativo assicurando che ogni utente non voti le proprie idee e invia una risposta
    VoteController.saveDownVote(req).then(result => {
        res.json(result);   //invia una risposta
    }).catch(err => {
        next(err);  //invia una risposta con un messaggio di errore
    });
});

/**
 * @swagger
 *  /upVotes/{id}:
 *    delete:
 *      description: Delete an upVote
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: ideaId
 *          in: path
 *          required: true
 *          description: ID of the upVote to delete
 *          schema:
 *            type: integer
 *        - name: Authorization
 *          in: header
 *          required: true
 *          description: Bearer token for authentication
 *          schema:
 *            type: string
 *            example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiamFuZXQiLCJpYXQiOjE3MTg3MzAzMzcsImV4cCI6MTcxODgxNjczN30.e5mfeDTP8PTwlV9HKaOewrB-t-E4Bsw9Fg0Ulgwdf60
 *      responses:
 *        200:
 *          description: upVote deleted
 *        403:
 *          description: Forbidden! User not authorized
 *        404:
 *          description: upVote not found
 *        500:
 *          description: upVote not deleted
 */
voteRouter.delete("/deleteUpVotes/:ideaId", ensureUsersModifyOnlyOwnVotes, (req, res, next) => {    //tenta di eliminare un voto positivo assicurando che ogni utente elimini solo i propri voti e invia una risposta
    VoteController.deleteUpVote(req).then((item) => {
        if (item)   //controlla se è stato trovato il voto da eliminare
            res.json(item); //invia una risposta
        else
            next({ status: 404, message: "Comment not found" });    //invia una risposta con un messaggio di errore
    }).catch(err => {
        next(err);  //invia una risposta con un messaggio di errore
    })
});

/**
 * @swagger
 *  /downVotes/{id}:
 *    delete:
 *      description: Delete an downVote
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: ideaId
 *          in: path
 *          required: true
 *          description: ID of the dowVote to delete
 *          schema:
 *            type: integer
 *        - name: Authorization
 *          in: header
 *          required: true
 *          description: Bearer token for authentication
 *          schema:
 *            type: string
 *            example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiamFuZXQiLCJpYXQiOjE3MTg3MzAzMzcsImV4cCI6MTcxODgxNjczN30.e5mfeDTP8PTwlV9HKaOewrB-t-E4Bsw9Fg0Ulgwdf60
 *      responses:
 *        200:
 *          description: downVote deleted
 *        403:
 *          description: Forbidden! User not authorized
 *        404:
 *          description: downVote not found
 *        500:
 *          description: downVote not deleted
 */
voteRouter.delete("/deleteDownVotes/:ideaId", ensureUsersModifyOnlyOwnVotes, (req, res, next) => {  //tenta di eliminare un voto negativo assicurando che ogni utente elimini solo i propri voti e invia una risposta
    VoteController.deleteDownVote(req).then((item) => {
        if (item)   //controlla se è stato trovato il voto da eliminare
            res.json(item); //invia una risposta
        else
            next({ status: 404, message: "Vote not found" });    //invia una risposta con un messaggio di errore
    }).catch(err => {
        next(err);   //invia una risposta con un messaggio di errore
    })
});

/**
 * @swagger
 *  /ideas:
 *    post:
 *      description: Search all user's votes
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: Authorization
 *          in: header
 *          required: true
 *          description: Bearer token for authentication
 *          schema:
 *            type: string
 *            example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiamFuZXQiLCJpYXQiOjE3MTg3MzAzMzcsImV4cCI6MTcxODgxNjczN30.e5mfeDTP8PTwlV9HKaOewrB-t-E4Bsw9Fg0Ulgwdf60
 *      responses:
 *        200:
 *          description: Found votes
 *        500:
 *          description: User not authenticated
 */
voteRouter.get("/findByUser", (req, res, next) => {
    VoteController.findByUser(req).then((item) => {
        if (item)   //contra se l'idea è stata trovata
            res.json(item); //invia una risposta
        else
            next({ status: 404, message: "Vote not found" });   //invia una risposta con un messaggio di errore
    }).catch(err => {
        next(err);  //invia una risposta con un messaggio di errore
    })
})