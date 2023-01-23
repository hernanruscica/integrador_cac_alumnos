const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const indexRouter = require('./routes/indexRoutes');
const contactoRouter = require('./routes/contactosRoutes');

const PORT = process.env.port || 10000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', indexRouter);
app.use('/contactos', contactoRouter);
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static('./public'));

app.listen(PORT, () => {
    console.log(`App escuchando en http://localhost:${PORT}`);
})