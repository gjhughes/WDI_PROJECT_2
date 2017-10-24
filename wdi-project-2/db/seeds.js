const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');

mongoose.connect(dbUri, { useMongoClient: true });

// Require the model
const User = require('../models/user');
const Beer = require('../models/beer');

// Drop the model
User.collection.drop();
Beer.collection.drop();

// Create the models
User
  .create([{
    firstName: 'Gavin',
    lastName: 'Hughes',
    username: 'gavinhughes',
    email: 'gavin@gavin.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Beer
      .create([{
        brewery: 'Beavertown',
        name: 'Gamma Ray',
        category: 'American Pale Ale',
        abv: 5.4,
        createdBy: users[0],
        description: 'Big, hoppy and fresh. Juicy American hops added in ever increasing amounts at the end of the boil and in the fermenter to give huge flavor and aroma.',
        image: 'https://untappd.akamaized.net/site/beer_logos/beer-237500_52d55_sm.jpeg'
      }, {
        brewery: 'Brewdog',
        name: 'Punk',
        category: 'IPA',
        abv: 5.4,
        description: 'Something.',
        image: 'https://untappd.akamaized.net/site/beer_logos/beer-5702_7d1d7_sm.jpeg'

      }, {
        brewery: 'Beavertown',
        name: 'Neck Oil',
        category: 'Session IPA',
        abv: 4,
        createdBy: users[0],
        description: 'good beer',
        image: 'https://untappd.akamaized.net/site/beer_logos/beer-136656_7e75b_sm.jpeg'
      }]);
  })
  .then((beers) => console.log(`${beers.length} beers created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
