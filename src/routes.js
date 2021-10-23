const router = require('express').Router();
const homeController = require('./app/controllers/HomeController');
const authenticationController = require('./app/controllers/AuthenticationController');

router.get('/', homeController.index);
router.post('/signUp', authenticationController.signUp);
router.post('/signIn', authenticationController.signIn);

module.exports = router;
