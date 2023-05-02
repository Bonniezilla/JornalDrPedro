const express = require('express');
<<<<<<< HEAD
const ejs = require('ejs');
const path =  require('path');

const app = express();

const indexRouter = require('./routes/index');

app.use('/', indexRouter);

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.static(path.join(__dirname, 'src/public')));

app.listen(3000, () => {
=======
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

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');

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
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || port, () => {
>>>>>>> 5f38b11edee1fd4f3e7cb29037448bfee12a0743
    console.log('Servidor Rodando');
});