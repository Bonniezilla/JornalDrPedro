const express = require('express')

const router =  express.Router();

router.get('/', (req, res) => {
    if (req.session.login) {
        res.render('index');
    } else {
        res.render('login');
    }
});

module.exports = router;