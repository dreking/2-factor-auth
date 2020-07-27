const app = require('express')();
const bodyParser = require('body-parser');

const routes = require('./routes/index');

const PORT = 3030 || process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/2fa', routes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
