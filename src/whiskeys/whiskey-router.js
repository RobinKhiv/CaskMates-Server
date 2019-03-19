const express = require('express')
const WhiskeysService = require('./whiskey-service')
const { requireAuth } = require('../middleware/jwt-auth')

const whiskeysRouter = express.Router()

whiskeysRouter
  .route('/')
  .get((req, res, next) => {
    WhiskeysService.getAllWhiskeys(req.app.get('db'))
      .then(whiskeys => {
        res.json(WhiskeysService.serializeWhiskeys(whiskeys))
      })
      .catch(next)
  })

  whiskeysRouter
  .route('/:whiskey_id')
  .all(requireAuth)
  .all(checkWhiskeyExists)
  .get((req, res) => {
    res.json(WhiskeysService.serializeThing(res.whiskey))
  })

  whiskeysRouter.route('/:whiskey_id/reviews/')
  .all(checkWhiskeyExists)
  .all(requireAuth)
  .get((req, res, next) => {
    whiskeysService.getReviewsForWhiskey(
      req.app.get('db'),
      req.params.whiskey_id
    )
      .then(reviews => {
        res.json(whiskeysService.serializeWhiskeyReviews(reviews))
      })
      .catch(next)
  })

/* async/await syntax for promises */
async function checkWhiskeyExists(req, res, next) {
  try {
    const thing = await whiskeysService.getById(
      req.app.get('db'),
      req.params.thing_id
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
