const xss = require('xss')
const Treeize = require('treeize')

const ThingsService = {
  getAllThings(db) {
    return db
      .from('whiskey AS whs')
      .select(
        'whs.id',
        'whs.title',
        'whs.date_created',
        'whs.content',
        'whs.price',
        'whs.abv',
        'whs.nose',
        'whs.palate',
        'whs.finish',
        'whs.image',
        ...userFields,
        db.raw(
          `count(DISTINCT rev) AS number_of_reviews`
        ),
        db.raw(
          `AVG(rev.rating) AS average_review_rating`
        ),
      )
      .leftJoin(
        'whiskey_reviews AS rev',
        'thg.id',
        'rev.whiskey_id',
      )
      .leftJoin(
        'whiskey_users AS usr',
        'thg.user_id',
        'usr.id',
      )
      .groupBy('whs.id', 'usr.id')
  },

  getById(db, id) {
    return ThingsService.getAllThings(db)
      .where('whs.id', id)
      .first()
  },

  getReviewsForThing(db, whiskey_id) {
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

  serializewhiskeys(whiskey) {
    return whiskey.map(this.serializewhiskey)
  },

  serializewhiskey(whiskey) {
    const whiskeyTree = new Treeize()

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const whiskeyData = whiskeyTree.grow([ whiskey ]).getData()[0]

    return {
      id: whiskeyData.id,
      title: xss(whiskeyData.title),
      content: xss(whiskeyData.content),
      date_created: whiskeyData.date_created,
      palate: xss(whiskey.palate),
      nose: xss(whiskey.nose),
      additional_comments: xss(whiskey.additional_comments),
      image: whiskeyData.image,
      user: whiskeyData.user || {},
      number_of_reviews: Number(whiskeyData.number_of_reviews) || 0,
      average_review_rating: Math.round(whiskeyData.average_review_rating) || 0,
    }
  },

  serializewhiskeyReviews(whiskeys) {
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
      nose: reviewData.nose,
      palate: reviewData.palate,
      additional_comments: reviewData.additional_comments,
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

module.exports = whiskeysService
