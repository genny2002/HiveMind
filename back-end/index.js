import express from "express";
import morgan from 'morgan';
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import { ideaRouter } from "./routes/ideaRouter.js";
import { commentRouter } from "./routes/commentRouter.js";
import { voteRouter } from "./routes/voteRouter.js";
import { authenticationRouter } from "./routes/authenticationRouter.js";
import { enforceAuthentication } from "./middleware/authorization.js";

const app = express();  //crea un'istanza dell'applicazione
const PORT = 3000;  //porta sulla quale l'applicazione acolterà le richieste HTTP

app.use(morgan('dev')); //aggiunge il middleware morgan per registrare le informazioni delle richieste HTTP nel formato "dev"

app.use(cors());    //aggiunge il middleware cors

app.use(express.json());    //aggiunge il middleware express.json per analizzare le richieste i body delle richieste con payload JSON e li rende disponibili in un oggetto JS

app.use((err, req, res, next) => {  //middleware di gestione degli errori
    console.log(err.stack); //stampa lo stack trace contenente le informazioni dell'errore
    res.status(err.status || 500).json({    //imposta il codice di stato della risposta e la invia con un codice e una descrizione dell'errore
        code: err.status || 500,    //codice dell'errore
        description: err.message || "An error occurred" //descrizione dell'errore
    });
});

const swaggerSpec = swaggerJSDoc({  //genera le specifiche OpenAPI leggendo le annotazioni in "./routes/*.js", e ritorna un oggeto JSON che le rappresenta
    definition: {
        openapi: '3.1.0',   //versione dello standard OpenAPI utilizzata per definire l'API
        info: {
            title: 'HiveMind REST API', //titolo dell'API documentata
            version: '1.0.0',   //versione dell'API documentata
        },
    },
    apis: ['./routes/*.js'], //percorso dei file contenenti le annotazioni
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));    //rende disponibili le specifiche OpenAPI all'indirizzo "/api-docs"

app.use(authenticationRouter);  //aggiunge la route 'authenticationRouter'
app.use(enforceAuthentication); //garantisce l'autenticazione
app.use(ideaRouter);    //aggiunge la route 'ideaRouter'
app.use(commentRouter); //aggiunge la route 'commentRouter'
app.use(voteRouter);    //aggiunge la route 'voteRouter'

app.listen(PORT);   //ascolta le richieste in arrivo