const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const methodOverride = require('method-override');


const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const indexRouter = require('./routes/indexRoutes');
const contactoRouter = require('./routes/contactosRoutes');

const APP_PORT = process.env.APP_PORT || 10000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', indexRouter);
app.use('/contactos', contactoRouter);
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static('./public'));
app.use(methodOverride('_method'));




app.listen(APP_PORT, () => {
    console.log(`App escuchando en http://localhost:${APP_PORT}`);
})