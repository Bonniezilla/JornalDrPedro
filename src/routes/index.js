const express = require('express')

const router =  express.Router();

router.get('/', (req, res) => {
    if (req.session.login) {
        res.render('index', { session: req.session });
    } else {
        res.render('index', {session: undefined});
    }
});

module.exports = router;