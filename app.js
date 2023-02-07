const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const methodOverride = require('method-override');
const cookieSession = require("cookie-session");
 

const app = express();

app.use(cookieSession({
  name: "session",
  keys: ["secret-key"],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

const handle404 = (req, res, next) => {
  res.status(404).send("<h1>ERROR 404</h1> <h2>Ruta No encontrada</h2><p><a href='/'>Puede volver al inicio</a><br></p>");
};

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const indexRouter = require('./routes/indexRoutes');
const contactoRouter = require('./routes/contactosRoutes');

const APP_PORT = process.env.APP_PORT || 10000;
const APP_URL = process.env.APP_URL

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', indexRouter);
app.use('/contactos', contactoRouter);
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static('./public'));
app.use(methodOverride('_method'));
app.use(handle404);

app.listen(APP_PORT, () => {
    console.log(`App escuchando en ${APP_URL}:${APP_PORT}`);
})