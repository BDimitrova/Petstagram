const Photo = require('../models/Photo');
const User = require('../models/User');

exports.create = (photoData) => Photo.create(photoData);

exports.getAll = () => Photo.find().lean();

exports.findUser = (userId) => User.findById(userId);

exports.findOwner = (userId) => User.findById(userId).lean();

exports.getMyCommentPhoto = (photoId) => Photo.find(photoId).lean();

exports.getMyCreatedPhoto = (userId) => Photo.find({ owner: userId }).lean();

exports.getOne = (photoId) => Photo.findById(photoId).populate('commentList');

exports.delete = (photoId) => Photo.findByIdAndDelete(photoId);

exports.update = (photoId, photoData) => Photo.findByIdAndUpdate(photoId, photoData);
