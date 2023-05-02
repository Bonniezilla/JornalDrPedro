const express = require('express');
const ejs = require('ejs');
const path =  require('path');

const app = express();

const indexRouter = require('./routes/index');

app.use('/', indexRouter);

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.static(path.join(__dirname, 'src/public')));

app.listen(3000, () => {
    console.log('Servidor Rodando');
});