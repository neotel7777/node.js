// In src/index.js
const express = require('express');

const bodyParser = require('body-parser');

const v1WorkoutRouter = require('./routes/workoutRoutes');
const {
    swaggerDocs: V1SwaggerDocs,
} = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = 'app.qiwi.loc';

app.use(bodyParser.json());
app.use('/v1/faq', v1WorkoutRouter);

app.listen(PORT, HOST, () => {
    console.log(`API is listening on port ${PORT}`);
    V1SwaggerDocs(app, PORT);
});