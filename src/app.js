import express from 'express';
import peopleRoutes from "./routes/people.routes.js";

const app = express();

app.use(express.json());

//Vamos adicionar o seguinte trecho de código no arquivo src/app.js para que o express publique nossa rota:
app.get('/', (_req, res) => {
    res.status(200).send("It works")
})

app.use('/people', peopleRoutes);

export default app;