import { Router } from 'express';
import CustomerService from './service.js';
import logger from '../logger/service.js';
import config from '../config/config.js';
import bcrypt from 'bcryptjs' 
import jwt  from 'jsonwebtoken'

const router = Router();

// get all Customers
router.get('/list', function (req, res, next) {
    logger.log(`Get all Customers`);
    return CustomerService.getAllCustomers().collation({ locale: "en" }).sort({ firstName: 1 })
        .then(customers => res.send(customers))
        .catch(next);
});
// get all Customers and their reviews
router.get('/listFull', function (req, res, next) {
    logger.log(`Get all Customers with reviews`);
    return CustomerService.getAllCustomersWithReviews().collation({ locale: "en" }).sort({ firstName: 1 })
        .then(customers => res.send(customers))
        .catch(next);
});
// get Customer by ID
router.get('/:id', function (req, res, next) {
    logger.log(`Get Customer by ID: ${req.params.id}`);
    return CustomerService.getCustomerById(req.params.id)
        .then(customer => res.send(customer))
        .catch(next);
});
// create Customer
router.post('/', function (req, res, next) {
    // if(req.orgId) return res.status(400).send(req.user.name+' already has an organization');
    logger.log(`Create new Customer`);
    return CustomerService.createCustomer(req.body)
        .then(customer => res.send(customer))
        .catch(next);
});
// update Customer
router.post('/:id', function (req, res, next) {
    logger.log(`Update Customer ${req.params.id}`);
    return CustomerService.updateCustomer(req.params.id, req.body)
        .then(customer => res.send(customer))
        .catch(next);
});
// add review to Customer
router.post('/addReview/:id', function (req, res, next) {
    logger.log(`Add review to Customer ${req.params.id}`);
    return CustomerService.addReviewToCustomer(req.params.id, req.body.review_id)
        .then(customer => res.send(customer))
        .catch(next);
});




export default router;

// router.get('/ages/:ages', function(req, res, next) {
//     logger.log(`Get Customer by age group: ${req.params.ages}`);
//     return CustomerService.getBabysitterByAges(req.params.ages)
//     .then(babysitter => res.send(babysitter))
//     .catch(next);
// });