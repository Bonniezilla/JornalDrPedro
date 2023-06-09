const express = require('express');
const session = require('express-session');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');

const port = 3333;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: "ha8T_otE'<(@F=.ZJ]C'14",
    resave: false,
    saveUninitialized: false
}));

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/logup');
const signupRouter = require('./routes/signup');
const logoutRouter = require('./routes/logout');
const deleteUserRouter = require('./routes/deleteuser')

app.use('/', indexRouter);
app.use('/logup', loginRouter);
app.use('/signup', signupRouter);
app.use('/logout', logoutRouter);
app.use('/deleteuser', deleteUserRouter);

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || port, () => {
    console.log(`Servidor Rodando na porta ${process.env.PORT || port}`);
});