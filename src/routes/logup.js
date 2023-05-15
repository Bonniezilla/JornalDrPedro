const express = require('express');
const { prisma } = require('../connection');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('logup');
})

module.exports = router;