const express = require('express');
const session = require('express-session');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path =  require('path');

var name = 'Pedro';
var password = '123';

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret:'timmaianao'}));

const indexRouter = require('./src/routes/index');
const loginRouter = require('./src/routes/login');

app.post('/', (req, res) => {
    if(req.body.password === password && req.body.name === name) {
        res.render('index');
    } else {
        res.render('login');
    }
});

app.get('/', (req, res) => {
    if(req.session.login) {
        res.render('index');
    } else {
        res.render('login');
    }
});

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.static(path.join(__dirname, 'src/public')));

app.listen(process.env.PORT || port, () => {
    console.log('Servidor Rodando');
});