const express = require('express');
const app = express();

const routes = require('./routes/index');

const PORT = 3030 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/2fa', routes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
