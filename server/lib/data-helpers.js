"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      // db.collection("tweets").insertOne().toArray((err, tweets) => {
        
      //   if (err) {
      //     return callback(err);
      //   }
      //   callback(null, tweets);
      // })
      db.collection("tweets")
      .insertOne(newTweet)
      .then((result) =>  {
        // console.log('i am result', result)
        callback(null)
      })
      .catch((err) => {
        callback(err)
      })
      .catch(err => callback(err))

     },

    // Get all tweets in `db`, sorted by newest first
    
    
    getTweets: function(callback) {
      
      db.collection("tweets").find().toArray((err, tweets) => {
        
        if (err) {
          return callback(err);
        }
        callback(null, tweets);
      })
     }
  }
};
