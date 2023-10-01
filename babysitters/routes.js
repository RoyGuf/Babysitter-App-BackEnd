import { Router } from 'express';
import BabysitterService from './service.js';
import CloudinaryService from '../cloud/cloudinary/service.js';
import logger from '../logger/service.js';
import config from '../config/config.js';

const router = Router();

// get all Babysitters
router.get('/list', function(req, res, next) {
    logger.log(`Get all Babysitters`);
    return BabysitterService.getAllBabysitters().collation({ locale: "en" }).sort({ firstName: 1 })
    .then(babysitters => res.send(babysitters))
    .catch(next);
});
// get all Babysitters and their reviews
router.get('/listFull', function(req, res, next) {
    logger.log(`Get all Babysitters with reviews`);
    return BabysitterService.getAllBabysittersWithReviews().collation({ locale: "en" }).sort({ firstName: 1 })
    .then(babysitters => res.send(babysitters))
    .catch(next);
});
// get Babysitter by ID
router.get('/:id', function(req, res, next) {
    logger.log(`Get Babysitter by ID: ${req.params.id}`);
    return BabysitterService.getBabysitterById(req.params.id)
    .then(babysitter => res.send(babysitter))
    .catch(next);
});
// get Babysitters by age groups
router.get('/ages/:ages', function(req, res, next) {
    // console.log(req.headers.authorization);
    logger.log(`Get Babysitter by age group: ${req.params.ages}`);
    return BabysitterService.getBabysittersByAges(req.params.ages)
    .then(babysitter => res.send(babysitter))
    .catch(next);
});
// create Babysitter
router.post('/', function(req, res, next) {
    // if(req.orgId) return res.status(400).send(req.user.name+' already has an organization');
    logger.log(`Create new Babysitter`);
    if(req.body.imgUrl != ''){
        let imgObject = {public_id:'', url:''};
        let babysitterName = `${req.body.firstName} ${req.body.lastName} ${req.body.phone}`
        return CloudinaryService.uploadImage(req.body.imgUrl, babysitterName)
        .then(result => {
            imgObject.public_id = result.public_id;
            imgObject.url       = result.secure_url;
            req.body.avatar     = imgObject;
            return BabysitterService.createBabysitter(req.body)
            .then(babysitter => res.send(babysitter))
            .catch(next); 
        })
    }else{
        return BabysitterService.createBabysitter(req.body)
        .then(babysitter => res.send(babysitter))
        .catch(next);
    }
});
// update Babysitter
router.post('/:id', function(req, res, next) {
    // console.log(req.body);
    logger.log(`Update Babysitter ${req.params.id}`);
    if(req.body.imgUrl && req.body.imgUrl != ''){ //req.body.avatar.url.split('/')[0] == 'data:image'
        let imgObject      = {public_id:'', url:''};
        let babysitterName = `${req.body.firstName} ${req.body.lastName} ${req.body.phone}`
        return CloudinaryService.uploadImage(req.body.imgUrl, babysitterName)
        .then(result => {
            imgObject.public_id = result.public_id;
            imgObject.url       = result.secure_url;
            req.body.avatar     = imgObject;
            return BabysitterService.updateBabysitter(req.params.id, req.body)
            .then(babysitter => {
                res.send(babysitter)
            })
            .catch(next); 
        })
    }if(req.body.imgUrlArray && req.body.imgUrlArray.length){ // bulk upload
        return CloudinaryService.uploadMultipleImages(req.body.imgUrlArray, req.body.babysitterName)
        .then(mediaArray => {
            const newMedia = {media: mediaArray}
            return BabysitterService.addMediaToBabysitter(req.params.id, mediaArray)
            .then(babysitter => {
                res.send(babysitter)
            })
            .catch(next); 
        })
    }else{
        return BabysitterService.updateBabysitter(req.params.id, req.body)
        .then(babysitter => res.send(babysitter))
        .catch(next);
    }
});
// add review to Babysitter
router.post('/:id/addReview', function(req, res, next) {
    logger.log(`Add review to Babysitter ${req.params.id}`);
    return BabysitterService.addReviewToBabysitter(req.params.id, req.body.review_id)
    .then(babysitter => res.send(babysitter))
    .catch(next);
});
// remove review from Babysitter by review ID
router.delete('/:babysitterId/removeReview/:reviewId', function(req, res, next) {
    logger.log(`Remove review to Babysitter ${req.params.babysitterId}`);
    return BabysitterService.removeReviewFromBabysitter(req.params.babysitterId, req.params.reviewId)
    .then(babysitter => res.send(babysitter))
    .catch(next);
});
// remove media from Babysitter by media ID
router.delete('/:babysitterId/removeMedia/:mediaId', function(req, res, next) {
    logger.log(`Remove media to Babysitter ${req.params.babysitterId}, ${req.params.mediaId}`);
    return BabysitterService.removeMediaToBabysitter(req.params.babysitterId, req.params.mediaId)
    .then(babysitter => res.send(babysitter))
    .catch(next);
});


export default router;
