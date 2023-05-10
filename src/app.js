const express = require('express');
const session = require('express-session');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require('path');
const { client, connection } = require('./connection');

const port = 3000;
const app = express();

var username = 'Pedro';
var password = '123';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: '123456',
    resave: false,
    saveUninitialized: false
}));

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');

app.post('/login', (req, res) => {
    connection.init();

    const { username, password } = req.body;

    const query = "SELECT * FROM usuarios WHERE username = $1 AND password = $2";

    client.query(query, [username, password], (err, result) => {
        connection.destroy();

        if (err) {
            console.error('Ocorreu um erro', err);
            return res.redirect('/');
        }

        if (result.rowCount === 0) {
            console.log('Crendenciais inválidas');
            return res.redirect('/');
        }
        
        console.log(`${username} foi logado com sucesso!`)
        req.session.login = true;
        return res.redirect('/');
    })
});

app.get('/login', (req, res) => {
    res.redirect('/');
});

app.get('/', (req, res) => {
    if (req.session.login) {
        res.render('index');
    } else {
        res.render('login');
    }
});

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || port, () => {
    console.log('Servidor Rodando');
});