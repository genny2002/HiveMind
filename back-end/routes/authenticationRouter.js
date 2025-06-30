import express from "express";
import { AuthenticationController } from "../controllers/AuthenticationController.js";


export const authenticationRouter = express.Router();

/**
 * @swagger
 *  /auth:
 *    post:
 *      description: Authenticate user
 *      produces:
 *        - application/json
 *      requestBody:
 *        description: user credentials to authenticate
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                usr:
 *                  type: string
 *                  example: Kyle
 *                pwd:
 *                  type: string
 *                  example: p4ssw0rd
 *      responses:
 *        200:
 *          description: User authenticated
 *        401:
 *          description: Invalid credentials
 */
authenticationRouter.post("/auth", async (req, res) => {    //se le credenziali dell'utente sono corette invia una risposta con il token, altrimenti invia una risposta con un messaggio di errore
    let isAuthenticated = await AuthenticationController.checkCredentials(req, res);    //segnale se le credenziali sono corrette pr l'autenticazione

    if (isAuthenticated) {    //controla se l'utente è stato autenticato
        res.json(AuthenticationController.issueToken(req.body.usr));    //invia una risposta con il token generato
    } else {
        res.status(401);    //imposta lo stato della risposta
        res.json({ error: "Invalid credentials. Try again." });    //invia una risposta con un messaggio di errore
    }
});

/**
 * @swagger
 *  /signup:
 *    post:
 *      description: Sign up a new user
 *      produces:
 *        - application/json
 *      requestBody:
 *        escription: user credentials to register
 *        equired: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                usr:
 *                  type: string
 *                  example: Kyle
 *                pwd:
 *                  type: string
 *                  example: p4ssw0rd
 *      responses:
 *        200:
 *          description: User registered
 *        500:
 *          description: Could not save user
 */
authenticationRouter.post("/signup", (req, res, next) => {  //tenta di registrare un nuovo utente e invia una risposta
    AuthenticationController.saveUser(req, res).then((user) => {
        res.json(user); //invia una risposta con l'utente creato
    }).catch((err) => {
        next({ status: 500, message: "Could not save user" });  //invia una risposta con un messaggio di errore
    })
});