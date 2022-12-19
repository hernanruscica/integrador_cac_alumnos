const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const puerto = 3000;
const routes = require('./routes');



app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
app.use('/public', express.static('public'));
app.use(bodyparser.json());
app.use(routes);

app.listen(puerto, (req, res) => {
    console.log(`app escuchando en: http://localhost:${puerto}`);    
});