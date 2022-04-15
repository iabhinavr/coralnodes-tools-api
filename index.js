const express = require('express');

const app = new express();

const indexRoute = require('./routes/index');
const criticalRoute = require('./routes/critical');

app.use(express.json());

app.use('/', indexRoute);
app.use('/critical', criticalRoute);

const port = process.env.PORT || 3000;

app.listen(port, 'localhost', () => {
    console.log(`Listening on port ${port}`);
});