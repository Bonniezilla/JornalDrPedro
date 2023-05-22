const express = require('express');
const { prisma } = require('../prisma');
const { z } = require('zod');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const createUserSchema = z.object({
            username: z.string().min(3),
            email: z.string().email(),
            password: z.string().min(8)
        });

        const { username, email, password } = createUserSchema.parse(req.body)

        const checkUsername = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        const checkUserEmail = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (checkUsername) {
            return res.redirect('/signup');
        };

        if (checkUserEmail) {
            return res.redirect('/signup');
        };

        const newUser = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: password
            }
        });

        return res.send(newUser);
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            const validationErrors = err.errors.map((err) => err.message);
            
            console.log(validationErrors.toString());
            return res.status(400).redirect('/signup');
        } else {
            res.status(500).send('Erro interno encontrado');
        }
    }
});

router.get('/', (req, res) => {
    res.render('signup');
});

module.exports = router;