const Brewery = require('../models/brewery');
const Beer = require('../models/beer');

function indexRoute(req, res, next) {
  Brewery
    .find()
    .exec()
    .then((breweries) => res.render('breweries/index', { breweries }))
    .catch(next);
}

function newRoute(req, res) {
  return res.render('breweries/new');
}

function createRoute(req, res, next) {
  req.body.brewery = req.brewery;

  Brewery
    .create(req.body)
    .then(() => res.redirect('/breweries'))
    .catch((err) => {
      console.log(err);
      if(err.name === 'ValidationError') return res.badRequest('/breweries/new', err.toString());
      next(err);
    });
}

function showRoute(req, res, next) {
  Brewery
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .exec()
    .then((brewery) => {
      if(!brewery) return res.notFound();
      Beer
        .find({ brewery: req.params.id })
        .exec()
        .then(beers => {
          return res.render('breweries/show', { brewery, beers });
        });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  Brewery
    .findById(req.params.id)
    .exec()
    .then((beer) => {
      if(!beer) return res.redirect();
      if(!beer.belongsTo(req.user)) return res.unauthorized(`/breweries/${beer.id}`, 'You do not have permission to edit that resource');
      return res.render('breweries/edit', { beer });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  Brewery
    .findById(req.params.id)
    .exec()
    .then((beer) => {
      if(!beer) return res.notFound();

      for(const field in req.body) {
        beer[field] = req.body[field];
      }

      return beer.save();
    })
    .then(() => res.redirect(`/breweries/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/breweries/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function deleteRoute(req, res, next) {
  Brewery
    .findById(req.params.id)
    .exec()
    .then((beer) => {
      if(!beer) return res.notFound();
      return beer.remove();
    })
    .then(() => res.redirect('/breweries'))
    .catch(next);
}


module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
};
