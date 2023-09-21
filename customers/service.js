import Customer from '../db/models/customer'
import loggerService from '../logger/service';

function getAllCustomers(orgId, query) {
    return Customer.find({});
}
function getAllCustomersWithReviews(orgId, query) {
    return Customer.find({}).populate('reviews');
}
function getCustomerById(customerId) {
    if(!customerId) throw new Error('customerId is a mandatory field');
    return Customer.findOne({_id: customerId}).populate('reviews').lean().exec();
}
function getCustomerByIdFull(customerId) {
    if(!customerId) throw new Error('customerId is a mandatory field');
    return Customer.findOne({_id: customerId}).populate('reviews');
}
function createCustomer(payoad = {}) {
    return Customer.create(payoad);
}
function updateCustomer(customerId, customerObject) {
    if(!customerId) throw new Error('customerId is a mandatory field');
    return Customer.findOneAndUpdate({_id: customerId}, customerObject, {new: true}).populate('reviews');
}
function addReviewToCustomer(customerId, reviewId) {
    if(!customerId) throw new Error('customerId is a mandatory field');
    return Customer.findOneAndUpdate({_id: customerId}, { "$push": { "reviews": reviewId } }, {new: true}).populate('reviews');
}
function getCustomerByEmail(email) {
    return Customer.findOne({email: email}).populate('reviews');
}

export default {
    getAllCustomers,
    getCustomerById,
    getCustomerByIdFull,
    createCustomer,
    updateCustomer,
    getAllCustomersWithReviews,
    addReviewToCustomer,
    getCustomerByEmail,
  }