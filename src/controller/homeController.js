const router = require('express').Router();

const photoServices = require('../services/photoServices');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {
    res.render('home');
});

router.get('/profile', isAuth, async (req, res) => {
    let userId = req.user._id
    let photosCount = (await photoServices.getMyCreatedPhoto(userId)).length;
    let photos = (await photoServices.getMyCreatedPhoto(userId));
    let userEmail = (await photoServices.findUser(userId)).email;
    res.render('profile', { photos, userEmail, photosCount});
});

module.exports = router