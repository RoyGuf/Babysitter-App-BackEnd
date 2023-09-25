import path from 'path';
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(dirname, '../.env') });

import { Router } from 'express';
import CustomerService from '../customers/service.js';
import BabysitterService from '../babysitters/service.js';
import ReviewService from '../reviews/service.js';
import CloudinaryService from '../cloud/cloudinary/service.js';
import logger from '../logger/service.js';
import config from '../config/config.js';
import bcrypt from 'bcryptjs' 
import jwt  from 'jsonwebtoken'

const router = Router();

// register new bebysitter
router.post('/register', async (req, res, next) => {
    // console.log(req.body);
    logger.log(`Register new Babysitter`);
    const salt           = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    req.body.password    = hashedPassword;
    if(req.body.imgUrl != ''){
        let imgObject      = {public_id:'', url:''};
        let babysitterName = `${req.body.firstName} ${req.body.lastName} ${req.body.phone}`
        return CloudinaryService.uploadImage(req.body.imgUrl, babysitterName)
        .then(result => {
            imgObject.public_id = result.public_id;
            imgObject.url       = result.secure_url;
            req.body.avatar     = imgObject;
            return BabysitterService.createBabysitter(req.body)
            .then(babysitter => {
                const { password, ...data } =  babysitter.toJSON()
                res.send(data)
            })
            .catch(next); 
        })
    }else{
        return BabysitterService.createBabysitter(req.body)
        .then(babysitter => {
            const { password, ...data } =  babysitter.toJSON()
            res.send(data)
        })
        .catch(next); 
    }
})
// login a babysitter
router.post('/login', async (req, res) => {
    logger.log(`Login Babysitter`);
    const user = await BabysitterService.getBabysitterByEmail(req.body.email)
    if (!user) {
        return res.status(404).send({
            message: 'user not found'
        })
    }
    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: 'invalid credentials'
        })
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    let secureReq = process.env.NODE_ENV === 'production' ? true : false
    res.cookie('jwt', token, {
        secure: secureReq,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })
    res.send({
        message: 'success'
    })
})
// verify JWT token
router.get('/user', async (req, res) => {
    logger.log(`Get Babysitter auth`);
    try {
        const cookie = req.cookies['jwt'];
        const claims = jwt.verify(cookie, process.env.JWT_SECRET)
        if (!claims) {
            return res.status(401).send({
                message: 'unauthenticated'
            })
        }
        const user = await BabysitterService.getBabysitterById(claims._id)
        const { password, ...data } = user;
        res.send(data)
    } catch (e) {
        return res.status(401).send({
            message: 'unauthenticated'
        })
    }
})
// logout a babysitter
router.post('/logout', (req, res) => {
    logger.log(`Logout Babysitter`);
    let secureReq = process.env.NODE_ENV === 'production' ? true : false
    res.cookie('jwt', '', { secure: secureReq, maxAge: 0 })
    res.send({
        message: 'success'
    })
})


export default router;