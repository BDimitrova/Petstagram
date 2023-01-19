const router = require('express').Router();

const homeController = require('./controller/homeController');
const authController = require('./controller/authController');
const photoController = require('./controller/photoController');

router.use(homeController);
router.use('/auth', authController);
router.use('/photo', photoController);
router.use('/*', (req, res) => {
    res.render('404');
})

module.exports = router;