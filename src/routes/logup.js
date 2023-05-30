const express = require('express');
const { prisma } = require('../prisma');
const { z } = require('zod');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const loginUserSchema = z.object({
            identifier: z.union([ z.string().email(), z.string()]),
            password: z.string()
        });
        
        const { identifier , password } = loginUserSchema.parse(req.body);
    
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: identifier },
                    { email: identifier }
                ],
                password: password
            }
        })
        if (!user) {
            console.log('Crendeciais inválidas');
            return res.redirect('/logup');
        }
    
        req.session.login = true;
        console.log(`Usuário ${user.username} conectado com sucesso!`);
        return res.redirect('/');
    }

    catch (err) {
        if (err instanceof z.ZodError) {
            const validationErrors = err.errors.map((err) => err.message);

            console.log(validationErrors.toString());
            return res.status(400).redirect('/logup');
        } else {
            res.status(500).send('Erro interno encontrado');
        }
    }
});

router.get('/', (req, res) => {
    if (req.session.login) {
        return res.redirect('/');
    } else {
        return res.render('logup');
    }
});

module.exports = router;