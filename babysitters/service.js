import Babysitter from '../db/models/babysitter.js'
import Customer from '../db/models/customer.js'
import loggerService from '../logger/service.js';

function getAllBabysitters(orgId, query) {
    return Babysitter.find({});
}
function getAllBabysittersWithReviews(orgId, query) {
    return Babysitter.find({}).populate('reviews');
}
function getBabysitterById(babysitterId) {
    if(!babysitterId) throw new Error('babysitterId is a mandatory field');
    return Babysitter.findOne({_id: babysitterId}).populate({
        path: 'reviews',
        populate: {
            path: 'customer_id', model: Customer
        }
    }).lean().exec();
}
function getBabysitterByIdFull(babysitterId) {
    if(!babysitterId) throw new Error('babysitterId is a mandatory field');
    return Babysitter.findOne({_id: babysitterId}).populate('reviews');
}
function getBabysittersByAges(ages) {
    return Babysitter.find({ageGroups: ages}).populate('reviews');
}
function createBabysitter(payoad = {}) {
    return Babysitter.create(payoad);
}
function updateBabysitter(babysitterId, babysitterObject) {
    if(!babysitterId) throw new Error('babysitterId is a mandatory field');
    return Babysitter.findOneAndUpdate({_id: babysitterId}, babysitterObject, {new: true}).populate('reviews');
}
function addReviewToBabysitter(babysitterId, reviewId) {
    if(!babysitterId) throw new Error('babysitterId is a mandatory field');
    return Babysitter.findOneAndUpdate({_id: babysitterId}, { "$push": { "reviews": reviewId } }, {new: true}).populate('reviews');
}
function removeReviewFromBabysitter(babysitterId, reviewId) {
    if(!babysitterId) throw new Error('babysitterId is a mandatory field');
    return Babysitter.findOneAndUpdate({_id: babysitterId}, { "$pull": { "reviews": reviewId } }, {new: true}).populate('reviews');
}
function getBabysitterByEmail(email) {
    return Babysitter.findOne({email: email}).populate('reviews');
}

export default {
    getAllBabysitters,
    getBabysitterById,
    getBabysitterByIdFull,
    createBabysitter,
    getBabysittersByAges,
    updateBabysitter,
    getAllBabysittersWithReviews,
    addReviewToBabysitter,
    removeReviewFromBabysitter,
    getBabysitterByEmail,
  }