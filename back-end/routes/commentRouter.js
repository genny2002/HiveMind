import express from "express";
import { CommentController } from "../controllers/CommentController.js";
import { ensureUsersModifyOnlyOwnComments } from "../middleware/authorization.js";

export const commentRouter = new express.Router();

/**
 * @swagger
 *  /comments/{ideaId}:
 *    get:
 *      description: Search a idea's comments
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: ideaId
 *          in: path
 *          required: true
 *          description: ID of the idea to retrieve comments for
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
 *          description: Found comments
 *        500:
 *          description: No comment found
 */
commentRouter.get("/comments/:ideaId", (req, res, next) => {    //tenta di trovare tutti i commenti di una certa idea e invia una risposta
    CommentController.getCommentForIdea(req).then(commentItems => {
        res.json(commentItems)  //invia una risposta con i commenti trovati
    }).catch(err => {
        next(err);  //invia una risposta con un messaggio di errore
    });
});

/**
 * @swagger
 *  /comments/{ideaId}:
 *    post:
 *      description: Register a idea's new comments
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: ideaId
 *          in: path
 *          required: true
 *          description: ID of the idea to register comments for
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
 *        description: new comment's text
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                testo:
 *                  type: text
 *                  example: testo del commento
 *      responses:
 *        200:
 *          description: Comment registered
 *        500:
 *          description: Comment not registered
 */
commentRouter.post("/comments/:ideaId", (req, res, next) => {   //tenta di registrare un nuovo commento e invia una risposta
    CommentController.saveComment(req).then(result => {
        res.json(result);   //invia una risposta
    }).catch(err => {
        next(err);  //invia una risposta con un messaggio di errore
    });
});


/**
 * @swagger
 *  /comments/{id}:
 *    put:
 *     description: Update a comment's text
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the comment to upadte text for
 *         schema:
 *           type: integer
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: Bearer token for authentication
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiamFuZXQiLCJpYXQiOjE3MTg3MzAzMzcsImV4cCI6MTcxODgxNjczN30.e5mfeDTP8PTwlV9HKaOewrB-t-E4Bsw9Fg0Ulgwdf60
 *     requestBody:
 *       description: new comment's text
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               testo:
 *                 type: text
 *                 example: testo modificato del commento
 *      responses:
 *        200:
 *          description: Update registered
 *        403:
 *          description: Forbidden! User not authorized 
 *        404:
 *          description: Comment not found
 *        500:
 *          description: Comment not updated
 */
commentRouter.put("/comments/:id", ensureUsersModifyOnlyOwnComments, (req, res, next) => {  //tenta di modificare il testo di un certo commento e invia una risposta
    CommentController.update(req.params.id, req.body).then((item) => {
        if (item)   //controlla se il commento è stato modificato
            res.json(item); //invia una risposta
        else
            next({ status: 404, message: "Comment not found" });    //invia una risposta con un messaggio di errore
    }).catch(err => {
        next(err);   //invia una risposta con un messaggio di errore
    })
});

/**
 * @swagger
 *  /comments/{id}:
 *    delete:
 *      description: Delete a comment
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: ID of the comment to delete
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
 *          description: Comment deleted
 *        403:
 *          description: Forbidden! User not authorized
 *        404:
 *          description: Comment not found
 *        500:
 *          description: Comment not deleted
 */
commentRouter.delete("/comments/:id", ensureUsersModifyOnlyOwnComments, (req, res, next) => {   //tenta di eliminare un certo commento e invia una risposta
    CommentController.delete(req).then((item) => {
        if (item)   //controlla se il commento è stato eliminato
            res.json(item); //invia una risposta
        else
            next({ status: 404, message: "Comment not found" });    //invia una risposta con un messaggio di errore
    }).catch(err => {
        next(err);  //invia una risposta con un messaggio di errore
    })
});