const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');

mongoose.connect(dbUri, { useMongoClient: true });

// Require the model
const User = require('../models/user');
const Beer = require('../models/beer');
const Brewery = require('../models/brewery');

// Drop the model
User.collection.drop();
Beer.collection.drop();
Brewery.collection.drop();

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
    return Brewery
      .create([{
        breweryName: 'Beavertown',
        address: {
          line1: 'Lockwood Industrial Park',
          line2: 'Tottenham Hale',
          city: 'London',
          postcode: 'N17 9QP',
          country: 'UK'
        },
        image: 'http://www.thebrewingnetwork.com/wp-content/uploads/2016/06/beavertown.png'
      },{
        breweryName: 'Fourpure',
        address: {
          line1: '22 Bermondsey Trading Estate',
          line2: 'Rotherhithe New Road',
          city: 'London',
          postcode: 'SE16 3LL',
          country: 'UK'
        },
        image: 'http://www.camrgb.org/wp-content/uploads/2013/12/Fourpure_Corporate_RGB.jpg'
      },{
        breweryName: 'Five Points Brewing Co',
        address: {
          line1: '3 Institute Place',
          line2: ' Hackney',
          city: 'London',
          postcode: 'E8 1JE',
          country: 'UK'
        },
        image: 'https://pbs.twimg.com/profile_images/478566163794755584/jZRAsY4I.jpeg'
      }])
      .then((breweries) => {
        console.log(`${breweries.length} breweries created`);
        return Beer
          .create([{
            brewery: breweries[0],
            name: 'Gamma Ray',
            category: 'American Pale Ale',
            abv: 5.4,
            createdBy: users[0],
            description: 'Big, hoppy and fresh. Juicy American hops added in ever increasing amounts at the end of the boil and in the fermenter to give huge flavor and aroma.',
            image: 'https://www.thelondoneconomic.com/wp-content/uploads/2015/07/beavertown-gamma-ray.png-e1436821111311.jpg'
          },{
            brewery: breweries[0],
            name: 'Neck Oil',
            category: 'Session IPA',
            abv: 4.3,
            createdBy: users[0],
            description: 'Our every day, all day, easy drinking, go to ipa. This started life as a home-brew. We wanted to create a light, crisp, punchy, go to beer! A beer that you know you can pick up and appreciate or simply get it down ya neck. Extra pale base malts are used to keep it crisp and give the hops a great platform to dance on. Masses of hop additions during the whirlpool and a huge dose of dry hops make this a brilliantly ‘easy’ ipa.',
            image: 'http://www.beavertownbrewery.co.uk/wp-content/uploads/Neck-Oil.jpg'
          },{
            brewery: breweries[0],
            name: 'Lupaloid',
            category: 'India Pale Ale',
            abv: 6.7,
            createdBy: users[0],
            description: 'Introducing the newest addition to our meticulous lineup of core range offerings, LUPULOID IPA, a 6.7% ABV India Pale Ale. The most notable thing is that it is our first straight up IPA, no funny business, just malt, yeast, water and hops. Lots of hops. I guess it only took us four years!',
            image: 'https://www.thelondoneconomic.com/wp-content/uploads/2017/01/Beavertown-Lupuloid-IPA.jpg'
          },{
            brewery: breweries[0],
            name: 'Smog Rocket',
            category: 'Porter',
            abv: 5.4,
            createdBy: users[0],
            description: 'Inspired by London’s Industrial Revolution when Smog filled the air and the Porter was the beer of the people. An original home brew recipe using 9 different malts including a good chunk of smoked ‘Rauchmaltz’ from Bamberg, Germany. Big flavour hits of molasses, raisins and caramel are cut with the resinous US hop Chinook. Smokey aromas fly, reminiscent of the smoke stacks of industrial London.',
            image: 'https://goodpeopledrinkgoodbeer.net/wp-content/uploads/2015/10/Label_Smog_Rocket.png'
          },{
            brewery: breweries[1],
            name: 'Session IPA',
            category: 'Session IPA',
            abv: 4.2,
            createdBy: users[0],
            description: 'The punchy aroma and vibrant flavours match well with a vast array of foods and the lower ABV means you can enjoy this beer well into the evening and still pack in a full itinerary the next day.',
            image: 'http://jollygoodbeer.co.uk/wp-content/uploads/2016/02/Fourpure-Session-IPA-Keg.jpg'
          },{
            brewery: breweries[1],
            name: 'American Pale',
            category: 'American Pale Ale',
            abv: 5,
            createdBy: users[0],
            description: 'Increasingly in recent years, the West Coast of the US has become known for tropical, flavoursome beers and our American Pale Ale takes its cue from some of the classics. We\'ve canned the sunshine and injected it into British pubs and bottle shops for your enjoyment.',
            image: 'http://jollygoodbeer.co.uk/wp-content/uploads/2016/02/unnamed.png'
          },{
            brewery: breweries[1],
            name: 'Pils Lager',
            category: 'Pilsner',
            abv: 4.7,
            createdBy: users[0],
            description: 'Whilst modern brewing has seen techniques, equipment and styles progress, there\'s something to be said for sourcing the finest ingredients and taking a simple recipe to make an incredibly drinkable beer. Fourpure Pils would be as at home on the streets of Munich as it is right here in South London. Prost.',
            image: 'http://jollygoodbeer.co.uk/wp-content/uploads/2016/02/fourpure-pils-keg.png'
          }]);
      });
  })
  .then((beers) => console.log(`${beers.length} beers created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
