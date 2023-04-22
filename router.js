const Router = require('express');
const router = new Router();
const jwt = require("express-jwt");
const checkJwt = jwt({secret: 'key', algorithms:['HS256']});
const {getAllUsers, userProfile, updateUser, uploadImage, log, reg,} = require('./controller');

router
    .get('/getAllUsers',getAllUsers)
    .get('/user-profile/:userId/', userProfile)
    // .post('/upload-image', checkJwt, uploadImage)
    // .get('/update/:userId/', updateUser)



module.exports = router
