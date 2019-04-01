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
        res.json(WhiskeysService.serializeWhiskeys(whiskeys))
      })
      .catch(next)
  })
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    let newWhiskey = { whiskey_name: req.body };

    for (const [key, value] of Object.entries(newWhiskey))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    newWhiskey = Object.assign(
      newWhiskey, 
      req.body, 
      { user_id: req.user.id}
    );
    
    WhiskeysService.insertWhiskey(
      req.app.get('db'),
      newWhiskey
    )
      .then(whiskey => {
        res
          .status(201)
          .json(whiskey.id)
      })
      .catch(next);
  });

  whiskeysRouter
  .route('/:whiskey_id')
  .all(checkWhiskeyExists)
  .get((req, res) => {
    res.json(WhiskeysService.serializeWhiskey(res.whiskey))
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
  };
};

module.exports = whiskeysRouter;
