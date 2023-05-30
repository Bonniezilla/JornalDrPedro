const express = require('express');
const router = express.Router();
const { prisma } = require('../prisma');

router.get('/', (req, res) => {
    if (req.session.identifier) {
        try {
            const identifier = req.session.identifier;
            console.log(identifier)
            prisma.user.deleteMany({
                where: {
                    OR: [
                        { username: identifier },
                        { email: identifier }
                    ]
                }
            })
            .then(() => {
                console.log('Usuário deletado com sucesso');
            })
            .catch((err) => {
                console.error('Erro encontrado:', err);
            })
            req.session.destroy((err) => {
                if (err) {
                    console.log('Erro ao encerrar sessão:', err);
                    res.status(500).send('Erro interno do servidor');
                }
                console.log('Sessão encerrada com sucesso');
            });
        } catch {
            if (!identifier) {
                console.log('Usuário não encontrado');
            }
            return res.redirect('/');
        }
    }
    return res.redirect('/');
});

module.exports = router;