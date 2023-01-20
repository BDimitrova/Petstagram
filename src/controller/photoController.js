const router = require('express').Router();

const photoServices = require('../services/photoServices');
const { isAuth } = require('../middlewares/authMiddleware');

async function checkIsOwner(req, res, next) {
    let photo = await photoServices.getOne(req.params.photoId);

    if (photo.owner == req.user._id) {
        next();
    } else {
        res.redirect(`/photo/${req.params.photoId}/details`);
    }
}

router.get('/catalog', async (req, res) => {
    let photo = await photoServices.getAll();
    res.render('photo/catalog', { photo });
});

router.get('/create-photo-post', isAuth, async (req, res) => {
    res.render('photo/create');
});

router.post('/create-photo-post', isAuth, async (req, res) => {
    try {
        await photoServices.create({ ...req.body, owner: req.user, ownerUsername: req.user.username });
        res.redirect('/photo/catalog');
    } catch (error) {
        console.log(error);
        res.render('photo/create', { error: error.message })
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

router.get('/:photoId/details', async (req, res) => {
    let photo = await photoServices.getOne(req.params.photoId);
    let photoData = photo.toObject();

    let isOwner = photoData.owner == req.user?._id;

    let photoOwner = await photoServices.findOwner(photo.owner).lean();

    let photoComment = photoData.commentList;
    // let getCommentUser = await photoService.findUser(photo)
    console.log(photoComment);

    res.render('photo/details', { ...photoData, isOwner, photoOwner, photoComment });
});

router.get('/:photoId/edit', checkIsOwner, async (req, res) => {
    const photoId = req.params.photoId
    let photo = await photoServices.getOne(photoId);
    res.render('photo/edit', { ...photo.toObject() })
});

router.post('/:photoId/edit', checkIsOwner, async (req, res) => {
    try {
        const photoId = req.params.photoId;
        const photoData = req.body;
        await photoServices.update(photoId, photoData);
        res.redirect(`/photo/${photoId}/details`);
    } catch (error) {
        res.render('photo/edit', { error: getErrorMessage(error) })
    }

});

router.get('/:photoId/delete', checkIsOwner, async (req, res) => {
    const photoId = req.params.photoId;
    await photoServices.delete(photoId);
    res.redirect('/photo/catalog');
});

router.post('/:photoId/comment', async (req, res) => {
    const photoId = req.params.photoId;
    let photo = await photoServices.getOne(photoId);
    photo.commentList.push({ content: req.body.commentArea, username: req.user.username });
    await photo.save();
    res.redirect(`/photo/${req.params.photoId}/details`);
});

module.exports = router