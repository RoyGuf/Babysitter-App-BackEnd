import Review from '../db/models/review.js'
import loggerService from '../logger/service.js';

function getAllReviews(orgId, query) {
    return Review.find({});
}
function getAllReviewsWithBabysitters(orgId, query) {
    return Review.find({}).populate('babysitter_id');
}
function getReviewById(reviewId) {
    return Review.findOne({_id: reviewId}).populate('babysitter_id').lean().exec();
}
function getReviewByIdFull(reviewId) {
    return Review.findOne({_id: reviewId}).populate('babysitter_id');
}
function createReview(payoad = {}) {
    return Review.create(payoad);
}
function updateReview(reviewId, reviewObject) {
    if(!reviewId) throw new Error('reviewId is a mandatory field');
    return Review.findOneAndUpdate({_id: reviewId}, reviewObject, {new: true}).populate('babysitter_id');
}

export default {
    getAllReviews,
    getAllReviewsWithBabysitters,
    getReviewById,
    getReviewByIdFull,
    createReview,
    updateReview,
  }