'use strict';

const express = require('express');
const ReviewsService = require('./reviews-service');
const { requireAuth } = require('../middleware/jwt-auth');
const WhiskeysService = require('../whiskeys/whiskey-service')

const reviewsRouter = express.Router();
const jsonBodyParser = express.json();

reviewsRouter
  .route('/:whiskey_id')
  .all(checkWhiskeyExists)
  .get((req, res, next) => {
    ReviewsService.getReviewsForWhiskey(
      req.app.get('db'),
      req.params.whiskey_id
    )
      .then(reviews => {
        res.json(ReviewsService.serializeWhiskeyReviews(reviews));
      })
      .catch(next);
  })
  .post(requireAuth, jsonBodyParser, (req,res,next)=>{
    let newReview = { rating: parseInt(req.body.rating) };
    const whiskeyAndUserId = {
      user_id: req.user.id,
      whiskey_id: req.params.whiskey_id
    };
    for (const [key, value] of Object.entries(newReview))
      // eslint-disable-next-line eqeqeq
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    newReview = Object.assign(
      newReview, 
      req.body.tasting, 
      whiskeyAndUserId
    );  

    ReviewsService.insertReview(
      req.app.get('db'), 
      newReview
    )
      .then(review => {
        res.status(201)
          .json(review);
      })
      .catch(next);
  });
  async function checkWhiskeyExists(req, res, next) {
    try {
      const whiskey = await WhiskeysService.getById(
        req.app.get('db'),
        req.params.whiskey_id
      )
     
  
      if (!whiskey)
        return res.status(404).json({
          error: `Whiskey doesn't exist`
        })
  
      res.whiskey = whiskey
      next()
    } catch (error) {
      next(error)
    }; };

  
module.exports = reviewsRouter
