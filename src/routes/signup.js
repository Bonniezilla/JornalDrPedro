const express = require('express');
const { prisma } = require('../connection');
const { Console } = require('console');
const router = express.Router();

router.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    const checkUsername = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    if (checkUsername) {
        return new Error('Nome de usuário já está sendo utilizado');
    }

    const checkUserEmail = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (checkUserEmail) {
        return new Error('Este email já está sendo utilizado');
    }

    const newUser = await prisma.user.create({
        data: {
            username: username,
            email: email,
            password: password
        }
    })
    console.log("Usuário cadastrado com sucesso");
    return res.send(newUser)
});

router.get('/', (req, res) => {
    res.render('signup');
})

module.exports = router;