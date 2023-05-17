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
        return res.redirect('/');
    } else if (password !== user.password) {
        console.log('Senha inválida');
        return res.redirect('/');
    }
    req.session.login = true;
    
    console.log(`Usuário ${user.username} conectado com sucesso!`);
    return res.redirect('/');
});

router.get('/', (req, res) => {
    return res.redirect('/');
});

module.exports = router;