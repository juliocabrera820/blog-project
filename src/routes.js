const router = require('express').Router();

const authenticationController = require('./app/controllers/AuthenticationController');
const suscriptionController = require('./app/controllers/SuscriptionController');
const CommentsController = require('./app/controllers/CommentsController');

const signInValidator = require('./app/validators/signInValidator');
const signUpValidator = require('./app/validators/signUpValidator');
const commentValidator = require('./app/validators/comment');

const authentication = require('./app/middlewares/authentication');

router.post('/signUp', signUpValidator.check, authenticationController.signUp);
router.post('/signIn', signInValidator.check, authenticationController.signIn);
router.get('/suscription', suscriptionController.sendNewsletter);
router.get('/users/:userId/comments', authentication, CommentsController.index);
router.get(
  '/users/:userId/comments/:commentId',
  authentication,
  CommentsController.show
);
router.post(
  '/users/:userId/comments',
  authentication,
  commentValidator.check,
  CommentsController.create
);
router.get('/movies/:movieId/comments', authentication, CommentsController.movieComments)

module.exports = router;
