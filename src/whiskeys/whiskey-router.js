const express = require('express')
const WhiskeysService = require('./whiskey-service')
const { requireAuth } = require('../middleware/jwt-auth')

const whiskeysRouter = express.Router()
const jsonBodyParser = express.json()

whiskeysRouter
  .route('/')
  .get((req, res, next) => {
    WhiskeysService.getAllWhiskeys(req.app.get('db'))
      .then(whiskeys => {
        console.log(whiskeys)
        res.json(WhiskeysService.serializeWhiskeys(whiskeys))
      })
      .catch(next)
  })
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const {  title } = req.body;
    const newWhiskey = { title };

    for (const [key, value] of Object.entries(newWhiskey))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
    const obj = Object.assign(newWhiskey, req.body)
    console.log(obj);
  
    newWhiskey.user_id = req.user.id;
    
    WhiskeysService.insertWhiskey(
      req.app.get('db'),
      newWhiskey
    )
      .then(whiskey => {
        console.log(whiskey);
        res
          .status(201)
          // .location(path.posix.join(req.originalUrl, `/${whiskey.id}`))
          // .json(ReviewsService.serializeReview(review));
      })
      .catch(next);
  })

  whiskeysRouter
  .route('/:whiskey_id')
  // .all(requireAuth)
  .all(checkWhiskeyExists)
  .get((req, res) => {
    res.json(WhiskeysService.serializeWhiskey(res.whiskey))
  })

  whiskeysRouter.route('/:whiskey_id/reviews/')
  .all(checkWhiskeyExists)
  // .all(requireAuth)
  .get((req, res, next) => {
    WhiskeysService.getReviewsForWhiskey(
      req.app.get('db'),
      req.params.whiskey_id
    )
      .then(reviews => {
        res.json(WhiskeysService.serializeWhiskeyReviews(reviews))
      })
      .catch(next)
  })

/* async/await syntax for promises */
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
  }
}

module.exports = whiskeysRouter
