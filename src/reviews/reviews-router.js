'use strict';

const express = require('express');
const path = require('path');
const ReviewsService = require('./reviews-service');
const { requireAuth } = require('../middleware/jwt-auth');

const reviewsRouter = express.Router();
const jsonBodyParser = express.json();

reviewsRouter
  .route('/')
  .all(requireAuth)
  .post(jsonBodyParser, (req, res, next) => {
    const { whiskey_id, rating, nose, palate, additional_comments} = req.body;
    const newReview = { whiskey_id, rating};

    for (const [key, value] of Object.entries(newReview))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
    
    const obj = Object.assign(...newReview, req.body);

    newReview.user_id = req.user.id;
    console.log(obj);
    ReviewsService.insertReview(
      req.app.get('db'),
      newReview
    )
      .then(review => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${review.id}`))
          .json(ReviewsService.serializeReview(review));
      })
      .catch(next);
  });

module.exports = reviewsRouter;
