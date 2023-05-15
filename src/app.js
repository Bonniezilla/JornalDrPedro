require('dotenv').config()
const express = require('express');
const session = require('express-session');
const ejs = require('ejs');
const path = require('path');

const bodyParser = require('body-parser');

const port = 3333;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: '123456',
    resave: false,
    saveUninitialized: false
}));

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const logupRouter = require('./routes/logup');

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/logup', logupRouter);

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || port, () => {
    console.log('Servidor Rodando');
});