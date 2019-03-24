const xss = require('xss')
const Treeize = require('treeize')

const WhiskeysService = {
  getAllWhiskeys(db) {
    return db
      .from('whiskey AS whs')
      .select(
        'whs.id',
        'whs.whiskey_name',
        'whs.image',
        'whs.origin',
        'whs.abv',
        'whs.price',
        'whs.content',
        'whs.nose',
        'whs.palate',
        'whs.finish',
        'whs.date_created',
        ...userFields,
        db.raw(
          `count(DISTINCT rev) AS number_of_reviews`
        ),
        db.raw(
          `AVG(rev.rating) AS average_review_rating`
        )
      )
      .leftJoin(
        'whiskey_reviews AS rev',
        'whs.id',
        'rev.whiskey_id'
      )
      .leftJoin(
        'whiskey_users AS usr',
        'whs.user_id',
        'usr.id'
      )
      .groupBy('whs.id', 'usr.id')
  },

  getById(db, id) {
    return WhiskeysService.getAllWhiskeys(db)
      .where('whs.id', id)
      .first()
  },

  getReviewsForWhiskey(db, whiskey_id) {
    return db
      .from('whiskey_reviews AS rev')
      .select(
        'rev.id',
        'rev.rating',
        'rev.palate',
        'rev.nose',
        'rev.additional_comments',
        'rev.date_created',
        ...userFields,
      )
      .where('rev.whiskey_id', whiskey_id)
      .leftJoin(
        'whiskey_users AS usr',
        'rev.user_id',
        'usr.id',
      )
      .groupBy('rev.id', 'usr.id')
  },
  insertWhiskey(db, newWhiskey) {
    return db
      .insert(newWhiskey)
      .into('whiskey')
      .returning('*')
      .then(([whiskey]) => whiskey)
      .then(whiskey =>
        WhiskeysService.getById(db, whiskey.id)
      )
  },

  serializeWhiskeys(whiskey) {
    return whiskey.map(this.serializeWhiskey)
  },

  serializeWhiskey(whiskey) {
    const whiskeyTree = new Treeize()

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const whiskeyData = whiskeyTree.grow([ whiskey ]).getData()[0]

    return {
      id: whiskeyData.id,
      whiskeyName: xss(whiskeyData.whiskey_name),
      origin: xss(whiskeyData.origin),
      content: xss(whiskeyData.content),
      date_created: whiskeyData.date_created,
      palate: xss(whiskey.palate),
      nose: xss(whiskey.nose),
      additional_comments: xss(whiskey.additional_comments),
      image: xss(whiskeyData.image),
      user: whiskeyData.user || {},
      number_of_reviews: Number(whiskeyData.number_of_reviews) || 0,
      average_review_rating: Math.round(whiskeyData.average_review_rating) || 0,
    }
  },

  serializeWhiskeyReviews(whiskeys) {
    return whiskeys.map(this.serializewhiskeyReview)
  },

  serializewhiskeyReview(review) {
    const reviewTree = new Treeize()

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const reviewData = reviewTree.grow([ review ]).getData()[0]

    return {
      id: reviewData.id,
      rating: reviewData.rating,
      whiskey_id: reviewData.whiskey_id,
      nose: xss(reviewData.nose),
      palate: xss(reviewData.palate),
      additional_comments: xss(reviewData.additional_comments),
      user: reviewData.user || {},
      date_created: reviewData.date_created,
    }
  },
}

const userFields = [
  'usr.id AS user:id',
  'usr.user_name AS user:user_name',
  'usr.full_name AS user:full_name',
  'usr.nickname AS user:nickname',
  'usr.date_created AS user:date_created',
  'usr.date_modified AS user:date_modified',
]

module.exports = WhiskeysService
