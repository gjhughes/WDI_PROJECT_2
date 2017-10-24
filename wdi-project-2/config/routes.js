const express = require('express');
const registrationsController = require('../controllers/registrations');
const sessionsController = require('../controllers/sessions');
const beersController = require('../controllers/beers');
const usersController = require('../controllers/users');

const router  = express.Router();

// A home route
router.get('/', (req, res) => res.render('homepage'));

// RESTful routes
// All URLS should contain the PLURAL... don't chose octopus or people or something silly.
function secureRoute(req, res, next) {
  if (!req.session.userId) {
    return req.session.regenerate(() => {
      req.flash('danger', 'You must be logged in.');
      res.redirect('/login');
    });
  }

  return next();
}

// Beer Routes

router.route('/beers')
  .get(beersController.index)
  .post(secureRoute, beersController.create);

router.route('/beers/new')
  .get(secureRoute, beersController.new);

router.route('/beers/:id')
  .get(beersController.show)
  .put(beersController.update)
  .delete(beersController.delete);

router.route('/beers/:id/edit')
  .get(beersController.edit);

// User Routes
router.route('/register')
  .get(registrationsController.new)
  .post(registrationsController.create);

router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);

router.route('/logout')
  .get(sessionsController.delete);

router.route('/users/:id')
  .get(secureRoute, usersController.show);

// Comment Routes
router.route('/beers/:id/comments')
  .post(beersController.createComment);

router.route('/beers/:id/comments/:commentId')
  .delete(beersController.deleteComment);


module.exports = router;
