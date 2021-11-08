const router = require('express').Router();

const authenticationController = require('./app/controllers/AuthenticationController');
const suscriptionController = require('./app/controllers/SuscriptionController');
const CommentsController = require('./app/controllers/CommentsController');

const signInValidator = require('./app/validators/signInValidator');
const signUpValidator = require('./app/validators/signUpValidator');
const commentValidator = require('./app/validators/comment');

router.post('/signUp', signUpValidator.check, authenticationController.signUp);
router.post('/signIn', signInValidator.check, authenticationController.signIn);
router.post('/suscription', suscriptionController.sendEmail);
router.get('/users/:userId/comments', CommentsController.index);
router.get('/users/:userId/comments/:commentId', CommentsController.show);
router.post(
  '/users/:userId/comments',
  commentValidator.check,
  CommentsController.create
);

module.exports = router;
