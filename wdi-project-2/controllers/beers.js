const Beer = require('../models/beer');


function indexRoute(req, res, next) {
  Beer
    .find()
    .populate('createdBy')
    .exec()
    .then((beers) => {

      breweries = beers.reduce((r, a) => {
        r[a.brewery] = r[a.brewery] || [];
        r[a.brewery].push(a);
        return r;
      }, Object.create(null));

      res.render('beers/index', { breweries });
    })
    .catch(next);
}

function newRoute(req, res) {
  return res.render('beers/new');
}

function createRoute(req, res, next) {

  req.body.createdBy = req.user;
  console.log(req.user);

  Beer
    .create(req.body)
    .then(() => res.redirect('/beers'))
    .catch((err) => {
      console.log(err);
      if(err.name === 'ValidationError') return res.badRequest('/beers/new', err.toString());
      next(err);
    });

}

function showRoute(req, res, next) {
  Beer
    .findById(req.params.id)
    .populate('createdBy')
    .exec()
    .then((beer) => {
      if(!beer) return res.notFound();
      return res.render('beers/show', { beer });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  Beer
    .findById(req.params.id)
    .exec()
    .then((beer) => {
      if(!beer) return res.redirect();
      // if(!beer.belongsTo(req.user)) return res.unauthorized(`/beers/${beer.id}`, 'You do not have permission to edit that resource');
      return res.render('beers/edit', { beer });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  Beer
    .findById(req.params.id)
    .exec()
    .then((beer) => {
      if(!beer) return res.notFound();

      for(const field in req.body) {
        beer[field] = req.body[field];
      }

      return beer.save();
    })
    .then(() => res.redirect(`/beers/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/beers/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function deleteRoute(req, res, next) {
  Beer
    .findById(req.params.id)
    .exec()
    .then((beer) => {
      if(!beer) return res.notFound();
      return beer.remove();
    })
    .then(() => res.redirect('/beers'))
    .catch(next);
}

function createCommentRoute(req, res, next) {
  req.body.createdBy = req.user;

  Beer
    .findById(req.params.id)
    .exec()
    .then((beer) => {
      if(!beer) return res.notFound();

      beer.comments.push(req.body);
      return beer.save();
    })
    .then((beer) => res.redirect(`/beers/${beer.id}`))
    .catch(next);
}

function deleteCommentRoute(req, res, next){
  Beer
    .findById(req.params.id)
    .exec()
    .then((beer) => {
      if(!beer) return res.notFound();
      const comment = beer.comments.id(req.params.commentId);
      comment.remove();
      return beer.save();
    })
    .then((beer) => res.redirect(`/beers/${beer.id}`))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
