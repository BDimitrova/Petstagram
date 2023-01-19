const router = require('express').Router();

const photoServices = require('../services/photoServices');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/catalog', async (req, res) => {
    let photo = await photoServices.getAll();   
    res.render('photo/catalog', { photo });
});

router.get('/create-photo-post', isAuth, async (req, res) => {
    res.render('photo/create');
});

router.post('/create-photo-post', isAuth, async (req, res) => {
    try {
        await photoServices.create({ ...req.body, owner: req.user});
        res.redirect('/photo/catalog');
    } catch (error) {
        console.log(error);
        res.render('photo/create', { error: getErrorMessage(error) })
    }

});

function getErrorMessage(error) {
    let errorsArr = Object.keys(error);

    if (errorsArr.length > 0) {
        return error.errors[errorsArr[0]];
    } else {
        return error.message
    }

}

module.exports = router