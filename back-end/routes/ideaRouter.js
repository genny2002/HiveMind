import express from "express";
import { IdeaController } from "../controllers/IdeaController.js";
import { ensureUsersModifyOnlyOwnIdeas } from "../middleware/authorization.js";

export const ideaRouter = new express.Router();

/**
 * @swagger
 *  /countIdeas:
 *    get:
 *      description: Count all ideas
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
 *          description: Number of ideas
 *        500:
 *          description: User not authorized
 */
ideaRouter.get("/countIdeas", (req, res, next) => {  //tenta di contare tutte le idee e invia una risposta
    IdeaController.getCountIdeas().then(ideaItems => {
        res.json(ideaItems) //invia una risposta con il numero di idee
    }).catch(err => {
        next(err);  //invia una risposta con un messaggio di errore
    });
});

/**
 * @swagger
 *  /ideas/{page}:
 *    get:
 *      description: Search all ideas
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: page
 *          in: path
 *          required: true
 *          description: ideas' page to compute the query's offset
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
 *          description: Found ideas
 *        500:
 *          description: User not authorized
 */
ideaRouter.get("/allIdeas/:page", (req, res, next) => {  //tenta di trovare tutte le idee e invia una risposta
    IdeaController.getAllIdea(req).then(ideaItems => {
        res.json(ideaItems) //invia una risposta con tutte le idee trovate
    }).catch(err => {
        next(err);  //invia una risposta con un messaggio di errore
    });
});

/**
 * @swagger
 *  /countControversialIdeas
 *    get:
 *      description: Count all controversial ideas
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: Authorization
 *          in: header
 *          required: true
 *          description: Bearer token for authentication
 *          schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiamFuZXQiLCJpYXQiOjE3MTg3MzAzMzcsImV4cCI6MTcxODgxNjczN30.e5mfeDTP8PTwlV9HKaOewrB-t-E4Bsw9Fg0Ulgwdf60
 *      responses:
 *        200:
 *          description: Number of controversial ideas
 *        500:
 *          description: User not authorized
 */
ideaRouter.get("/countControversialIdeas", (req, res, next) => {  //tenta di contare tutte le idee controverse e invia una risposta
    IdeaController.getCountControversialIdeas().then(ideaItems => {
        res.json(ideaItems) //invia una risposta con il numero di idee
    }).catch(err => {
        next(err);  //invia una risposta con un messaggio di errore
    });
});

/**
 * @swagger
 *  /controversialIdeas/{page}:
 *    get:
 *      description: Search all controversial ideas
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: page
 *          in: path
 *          required: true
 *          description: controversial ideas' page to compute the query's offset
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
 *          description: Found controversial ideas
 *        500:
 *          description: User not authorized
 */
ideaRouter.get("/controversialIdeas/:page", (req, res, next) => { //tenta di trovare tutte le idee controverse e invia una risposta
    IdeaController.getControversialIdea(req).then(ideaItems => {
        res.json(ideaItems) //invia una risposta con tutte le idee trovate
    }).catch(err => {
        next(err);  //invia una risposta con un messaggio di errore
    });
});

/**
 * @swagger
 *  /countUnpopularMainstreamIdeas
 *    get:
 *      description: Count all unpopular/mainstream ideas
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
 *          description: Number of unpopular/mainstream ideas
 *        500:
 *          description: User not authorized
 */
ideaRouter.get("/countUnpopularMainstreamIdeas", (req, res, next) => {  //tenta di contare tutte le idee unpopular/maistream e invia una risposta
    IdeaController.getCountUnpopularMainstreamIdeas().then(ideaItems => {
        res.json(ideaItems.length) //invia una risposta con il numero di idee
    }).catch(err => {
        next(err);  //invia una risposta con un messaggio di errore
    });
});

/**
 * @swagger
 *  /unpopularIdeaa/{page}:
 *  get:
 *    description: Search all unpopular ideas
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: page
 *        in: path
 *        required: true
 *        description: unpopular ideas' page to compute the query's offset
 *        schema:
 *          type: integer
 *      - name: Authorization
 *        in: header
 *        required: true
 *        description: Bearer token for authentication
 *        schema:
 *          type: string
 *          example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiamFuZXQiLCJpYXQiOjE3MTg3MzAzMzcsImV4cCI6MTcxODgxNjczN30.e5mfeDTP8PTwlV9HKaOewrB-t-E4Bsw9Fg0Ulgwdf60
 *    responses:
 *      200:
 *        description: Found unpopular ideas
 *      500:
 *        description: User not authorized
 */
ideaRouter.get("/unpopularIdeas/:page", (req, res, next) => { //tenta di trovare tutte le idee unpopular e invia una risposta
    IdeaController.getUnpopularIdea(req).then(ideaItems => {
        res.json(ideaItems) //invia una risposta con tutte le idee trovate
    }).catch(err => {
        next(err);  //invia una risposta con un messaggio di errore
    });
});

/**
 * @swagger
 *  /mainstreamIdeaa/{page}:
 *    get:
 *      description: Search all unpopular ideas
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: page
 *          in: path
 *          required: true
 *          description: mainstream ideas' page to compute the query's offset
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
 *          description: Found mainstream ideas
 *        500:
 *          description: User not authorized
 */
ideaRouter.get("/mainstreamIdeas/:page", (req, res, next) => {    //tenta di trovare tutte le idee mainstream e invia una risposta
    IdeaController.getMainstreamIdea(req).then(ideaItems => {
        res.json(ideaItems) //invia una risposta con tutte le idee trovate
    }).catch(err => {
        next(err);  //invia una risposta con un messaggio di errore
    });
});

/**
 * @swagger
 *  /ideas:
 *    post:
 *      description: Register a new idea
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
 *      requestBody:
 *        description: new idea's title and text
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                titolo:
 *                  type: string
 *                  example: titolo dell'idea
 *                testo:
 *                  type: text
 *                  example: testo dell'idea
 *      responses:
 *        200:
 *          description: Idea registered
 *        500:
 *          description: Idea not registered
 */
ideaRouter.post("/ideas", (req, res, next) => { //tenta di registrare una nuova idea e invia una risposta
    IdeaController.saveIdea(req).then(result => {
        res.json(result);   //invia una risposta
    }).catch(err => {
        next(err);  //invia una risposta con un messaggio di errore
    });
});

/**
 * @swagger
 *  /ideas/{id}:
 *    get:
 *      description: Search a idea
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: ID of the idea to retrieve
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
 *          description: Found idea
 *        403:
 *          description: Forbidden! User not authorized
 *        404:
 *          description: Idea not found
 *        500:
 *          description: Server Error
 */
ideaRouter.get("/ideas/:id", (req, res, next) => {   //tenta di trovare una certa idea assicurando che l'utente si autorizzato e invia una risposta
    IdeaController.findById(req).then((item) => {
        if (item)   //contra se l'idea è stata trovata
            res.json(item); //invia una risposta
        else
            next({ status: 404, message: "Idea not found" });   //invia una risposta con un messaggio di errore
    }).catch(err => {
        next(err);  //invia una risposta con un messaggio di errore
    })
});

/**
 * @swagger
 *  /ideas/{id}:
 *    put:
 *      description: Update a idea's text
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: ID of the idea to upadte text for
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
 *        description: new idea's text
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                testo:
 *                  type: text
 *                  example: testo modificato dell'idea
 *      responses:
 *        200:
 *          description: Update registered
 *        403:
 *          description: Forbidden! User not authorized 
 *        404:
 *          description: Idea not found
 *        500:
 *          description: Idea not updated
 */
ideaRouter.put("/ideas/:id", ensureUsersModifyOnlyOwnIdeas, (req, res, next) => {   //tenta di modifcare un'idea assicurando che ogni utente modifichi solo le proprie idee e invia una risposta
    IdeaController.update(req.params.id, req.body).then((item) => {
        if (item)   //contra se l'idea è stata modificata
            res.json(item); //invia una risposta
        else
            next({ status: 404, message: "Idea not found" });   //invia una risposta con un messaggio di errore
    }).catch(err => {
        next(err);  //invia una risposta con un messaggio di errore
    })
});

/**
 * @swagger
 *  /ideas/{id}:
 *    delete:
 *      description: Delete a idea
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: ID of the idea to delete
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
 *          description: Idea deleted
 *        403:
 *          description: Forbidden! User not authorized
 *        404:
 *          description: Idea not found
 *        500:
 *          description: Idea not deleted
 */
ideaRouter.delete("/ideas/:id", ensureUsersModifyOnlyOwnIdeas, (req, res, next) => {    //tenta di eliminare un'idea assicurando che ogni utente elimini solo le proprie idee e invia una risposta
    IdeaController.delete(req).then((item) => {
        if (item)   //contra se l'idea è stata eliminata
            res.json(item); //invia una risposta
        else
            next({ status: 404, message: "Idea not found" });   //invia una risposta con un messaggio di errore
    }).catch(err => {
        next(err);  //invia una risposta con un messaggio di errore
    })
});