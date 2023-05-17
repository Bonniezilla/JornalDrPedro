const express = require('express');
const { prisma } = require('../connection');
const router = express.Router();

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    })
    if (!user) {
        console.log('Usuário não existe');
        return res.redirect('/logup');
    } else if (password !== user.password) {
        console.log('Senha inválida');
        return res.redirect('/logup');
    }
    
    req.session.login = true;
    console.log(`Usuário ${user.username} conectado com sucesso!`);
    return res.redirect('/');
});

router.get('/', (req, res) => {
    if (req.session.login) {
        return res.redirect('/');
    } else {
        return res.render('logup');
    }
});

module.exports = router;