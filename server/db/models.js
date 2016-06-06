var mongoose = require('mongoose');

var restSchema = new mongoose.Schema({
  restaurantName: String,
  restaurantAddress: String,
  priceRating: String,
  serviceRating: Number,
  foodRating: Number,
  ambienceRating: Number,
  restaurantReview: String,
  userEmail: String,
  image: String
 });

//Export a Restaurant model to be used in the controllers file.
module.exports = mongoose.model("Restaurant", restSchema);
