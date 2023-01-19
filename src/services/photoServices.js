const Photo = require('../models/Photo');
const User = require('../models/User');

exports.create = (photoData) => Photo.create(photoData);

exports.getAll = () => Photo.find().lean();

exports.findUser = (userId) => User.findById(userId);

exports.findOwner = (userId) => User.findById(userId);

exports.getMyCommentPhoto = (userId) => Photo.find({ commentList: userId }).lean();

exports.getMyCreatedPhoto = (userId) => Photo.find({ owner: userId }).lean();

exports.getOne = (photoId) => Photo.findById(photoId).populate('followList');

exports.delete = (photoId) => Photo.findByIdAndDelete(photoId);

exports.update = (photoId, photoData) => Photo.findByIdAndUpdate(photoId, photoData);
