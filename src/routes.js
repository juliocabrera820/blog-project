const router = require('express').Router();
const authenticationController = require('./app/controllers/AuthenticationController');
const suscriptionController = require('./app/controllers/SuscriptionController');

router.post('/signUp', authenticationController.signUp);
router.post('/signIn', authenticationController.signIn);
router.post('/suscription', suscriptionController.sendEmail);

module.exports = router;
