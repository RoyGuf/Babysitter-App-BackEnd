import { Router } from 'express';
import CloudinaryService from './service.js';
import logger from '../../logger/service.js';
import config from '../../config/config.js';

const router = Router();

router.post('/uploadImage', function(req, res, next) {
    // console.log(req.body);
    logger.log(`Uploading image to cloudinary, babysitter name: ${req.body.name}`);
    return CloudinaryService.uploadImage(req.body.image, req.body.name)
    .then(result => {
        console.log(result);
        res.send(result)
    })
    .catch(next);
});

export default router;
