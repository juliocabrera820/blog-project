const router = require('express').Router();
const authenticationController = require('./app/controllers/AuthenticationController');
const suscriptionController = require('./app/controllers/SuscriptionController');
const signInValidator = require('./app/validators/signInValidator');
const signUpValidator = require('./app/validators/signUpValidator');

router.post('/signUp', signUpValidator.check, authenticationController.signUp);
router.post('/signIn', signInValidator.check, authenticationController.signIn);
router.post('/suscription', suscriptionController.sendEmail);

module.exports = router;
