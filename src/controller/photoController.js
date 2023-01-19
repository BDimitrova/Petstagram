const router = require('express').Router();

router.get('/create-photo-post', async (req, res) => {
    res.render('photo/create');
});

module.exports = router