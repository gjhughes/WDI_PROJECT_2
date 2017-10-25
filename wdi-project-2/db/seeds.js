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
        image: 'https://www.thelondoneconomic.com/wp-content/uploads/2015/07/beavertown-gamma-ray.png-e1436821111311.jpg'
      }, {
        brewery: 'Brewdog',
        name: 'Punk',
        category: 'IPA',
        abv: 5.4,
        createdBy: users[0],
        description: 'Something.',
        image: 'https://untappd.akamaized.net/site/beer_logos/beer-5702_7d1d7_sm.jpeg'

      }, {
        brewery: 'Beavertown',
        name: 'Neck Oil',
        category: 'Session IPA',
        abv: 4.3,
        createdBy: users[0],
        description: 'Our every day, all day, easy drinking, go to ipa. This started life as a home-brew. We wanted to create a light, crisp, punchy, go to beer! A beer that you know you can pick up and appreciate or simply get it down ya neck. Extra pale base malts are used to keep it crisp and give the hops a great platform to dance on. Masses of hop additions during the whirlpool and a huge dose of dry hops make this a brilliantly ‘easy’ ipa.',
        image: 'http://www.beavertownbrewery.co.uk/wp-content/uploads/Neck-Oil.jpg'
      },{
        brewery: 'Beavertown',
        name: 'Lupaloid',
        category: 'India Pale Ale',
        abv: 6.7,
        createdBy: users[0],
        description: 'Introducing the newest addition to our meticulous lineup of core range offerings, LUPULOID IPA, a 6.7% ABV India Pale Ale. The most notable thing is that it is our first straight up IPA, no funny business, just malt, yeast, water and hops. Lots of hops. I guess it only took us four years!',
        image: 'https://www.thelondoneconomic.com/wp-content/uploads/2017/01/Beavertown-Lupuloid-IPA.jpg'
      },{
        brewery: 'Beavertown',
        name: 'Smog Rocket',
        category: 'Porter',
        abv: 5.4,
        createdBy: users[0],
        description: 'Inspired by London’s Industrial Revolution when Smog filled the air and the Porter was the beer of the people. An original home brew recipe using 9 different malts including a good chunk of smoked ‘Rauchmaltz’ from Bamberg, Germany. Big flavour hits of molasses, raisins and caramel are cut with the resinous US hop Chinook. Smokey aromas fly, reminiscent of the smoke stacks of industrial London.',
        image: 'https://goodpeopledrinkgoodbeer.net/wp-content/uploads/2015/10/Label_Smog_Rocket.png'
      }]);
  })
  .then((beers) => console.log(`${beers.length} beers created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
