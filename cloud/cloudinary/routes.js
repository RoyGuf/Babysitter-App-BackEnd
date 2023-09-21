import { Router } from 'express';
import CloudinaryService from './service';
import logger from '../../logger/service';
import config from '../../config/config';

const router = Router();

router.post('/uploadImage', function(req, res, next) {
    console.log(req.body);
    logger.log(`Uploading image to cloudinary, babysitter name: ${req.body.name}`);
    return CloudinaryService.uploadImage(req.body.image)
    .then(result => {
        console.log(result);
        res.send(result)
    })
    .catch(next);
});

export default router;
