const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
import { Router } from 'express';
import CustomerService from '../customers/service';
import BabysitterService from '../babysitters/service';
import ReviewService from '../reviews/service';
import CloudinaryService from '../cloud/cloudinary/service';
import logger from '../logger/service';
import config from '../config/config';
import bcrypt from 'bcryptjs' 
import jwt  from 'jsonwebtoken'

const router = Router();


router.post('/register', async (req, res, next) => {
    console.log(req.body);
    logger.log(`Register new Babysitter`);
    const salt           = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    req.body.password    = hashedPassword;
    if(req.body.imgUrl != ''){
        let imgObject = {public_id:'', url:''};
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
    // const result                = await BabysitterService.createBabysitter(user)
    // const { password, ...data } = await result.toJSON()

    // res.send(data)
})

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
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })
    res.send({
        message: 'success'
    })
})

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

router.post('/logout', (req, res) => {
    logger.log(`Logout Babysitter`);
    res.cookie('jwt', '', { maxAge: 0 })
    res.send({
        message: 'success'
    })
})


export default router;