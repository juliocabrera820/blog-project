const router = require('express').Router();

/**
 * @constant
 * @author
 */
const authenticationController = require('./app/controllers/AuthenticationController');
const suscriptionController = require('./app/controllers/SuscriptionController');
const CommentsController = require('./app/controllers/CommentsController');
const AdminController = require('./app/controllers/AdminController');

const signInValidator = require('./app/validators/signInValidator');
const signUpValidator = require('./app/validators/signUpValidator');
const commentValidator = require('./app/validators/comment');

const authentication = require('./app/middlewares/authentication');
const {
  authorizeUser,
  authorizeAdmin,
} = require('./app/middlewares/authorization');

/**
 * Represents endpoints
 * @author
 */
router.post('/signUp', signUpValidator.check, authenticationController.signUp);
router.post('/signIn', signInValidator.check, authenticationController.signIn);
router.get('/suscription', suscriptionController.sendNewsletter);
router.get(
  '/users/comments',
  authentication,
  authorizeUser,
  CommentsController.index
);
router.get(
  '/users/comments/:commentId',
  authentication,
  authorizeUser,
  CommentsController.show
);
router.post(
  '/users/comments',
  authentication,
  authorizeUser,
  commentValidator.check,
  CommentsController.create
);
router.put(
  '/users/comments/:id',
  authentication,
  authorizeUser,
  CommentsController.update
);
router.delete(
  '/users/comments/:id',
  authentication,
  authorizeUser,
  CommentsController.destroy
);
router.get('/movies/:movieId/comments', CommentsController.movieComments);
router.post('/admin', signUpValidator.check, AdminController.create);
router.delete(
  '/admin/users/:username',
  authentication,
  authorizeAdmin,
  AdminController.removeUser
);
router.get('/users', authentication, authorizeAdmin, AdminController.getUsers)

module.exports = router;

