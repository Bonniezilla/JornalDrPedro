// require('dotenv').config()
const express = require('express');
const session = require('express-session');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require('path');
const { pool } = require('./connection');

const port = 3333;
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
    pool.connect()
        .then(client => {
            const { username, password } = req.body;
            const query = `SELECT * FROM usuarios WHERE username = $1 AND password = $2`;

            client.query(query, [username, password])
                .then((result) => {
                    if (result.rowCount === 0) {
                        console.log('Credenciais inválidas tente novamente');
                        return res.redirect('/');
                    }
                    console.log(`Seja bem vindo, ${username}!`);
                    req.session.login = true;
                    return res.redirect('/');
                })
                .catch((err) => {
                    console.error('Erro encontrado:', err);
                    return res.redirect('/');
                })
                .finally(() => {
                    client.release();
                })
        })
        .catch((err) => {
            console.error('Erro encontrado:', err);
            return res.redirect('/');
        });

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