import { Router } from 'express';
import ReviewService from './service.js';
import BabysitterService from '../babysitters/service.js';
import CustomerService from '../customers/service.js';
import logger from '../logger/service.js';
import config from '../config/config.js';

const router = Router();

// get all Reviews
router.get('/list', function(req, res, next) {
    logger.log(`Get all Reviews`);
    return ReviewService.getAllReviews().collation({ locale: "en" }).sort({ firstName: 1 })
    .then(reviews => res.send(reviews))
    .catch(next);
});
// get all Reviews and their reviews
router.get('/listFull', function(req, res, next) {
    logger.log(`Get all Reviews with reviews`);
    return ReviewService.getAllReviewsWithBabysitters().collation({ locale: "en" }).sort({ firstName: 1 })
    .then(reviews => res.send(reviews))
    .catch(next);
});
// get Review by ID
router.get('/:id', function(req, res, next) {
    logger.log(`Get Review by ID: ${req.params.id}`);
    return ReviewService.getReviewById(req.params.id)
    .then(review => res.send(review))
    .catch(next);
});
// create Review
router.post('/', function(req, res, next) {
    // if(req.orgId) return res.status(400).send(req.user.name+' already has an organization');
    logger.log(`Create new Review`);
    let currentReview;
    let createCustomer = false
    return CustomerService.getCustomerByEmail(req.body.customer_email)
    .then(customer => {
        let review;
        if(!customer) { // check if customer exist by mail
            createCustomer = true;
            review = Object.assign({}, req.body);
        }
        else review = Object.assign({}, {customer_id:customer._id}, req.body);
        return ReviewService.createReview(review)
    })
    .then(review => {
        currentReview = review;
        if(!createCustomer) return CustomerService.addReviewToCustomer(currentReview.customer_id, currentReview._id);
        else { // create new customer
            const customerObj = {
                email: currentReview.customer_email,
                name: currentReview.customer_name,
                reviews: [currentReview._id],
            }
            return CustomerService.createCustomer(customerObj)
            .then(customer => {
                return ReviewService.updateReview(currentReview._id, {customer_id: customer._id})
            })
            .catch(next);
        }
    })
    .then(customer => {
        if(currentReview.babysitter_id) return BabysitterService.addReviewToBabysitter(currentReview.babysitter_id, currentReview._id);
    })
    .then(babysitter => res.send(currentReview))
    .catch(next);
});


// update Review
router.post('/:id', function(req, res, next) {
    logger.log(`Update Review ${req.params.id}`);
    return ReviewService.updateReview(req.params.id, req.body)
    .then(review => res.send(review))
    .catch(next);
});

export default router;