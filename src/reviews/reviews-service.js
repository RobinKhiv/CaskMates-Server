const xss = require('xss');
const Treeize = require('treeize');
const userFields = require('../Utils/user-fields');

const ReviewsService = {
  getById(db, id) {
    return db
      .from('whiskey_reviews AS rev')
      .select(
        'rev.id',
        'rev.rating',
        'rev.tasting',
        'rev.date_created',
        'rev.whiskey_id',
        db.raw(
          `row_to_json(
            (SELECT tmp FROM (
              SELECT
                usr.id,
                usr.user_name,
                usr.full_name,
                usr.nickname,
                usr.date_created,
                usr.date_modified
            ) tmp)
          ) AS "user"`
        )
      )
      .leftJoin(
        'whiskey_users AS usr',
        'rev.user_id',
        'usr.id'
      )
      .where('rev.id', id)
      .first();
  },
  insertReview(db, newReview) {
    return db
      .insert(newReview)
      .into('whiskey_reviews')
      .returning('*')
      .then(([review]) => review)
      .then(review =>
        ReviewsService.getById(db, review.id)
      );
  },
  getReviewsForWhiskey(db, whiskey_id) {
    return db
      .from('whiskey_reviews AS rev')
      .select(
        'rev.id',
        'rev.rating',
        'rev.tasting',
        'rev.date_created',
        ...userFields
      )
      .where('rev.whiskey_id', whiskey_id)
      .leftJoin(
        'whiskey_users AS usr',
        'rev.user_id',
        'usr.id'
      )
      .groupBy('rev.id', 'usr.id');
  },
  serializeWhiskeyReviews(whiskeys) {
    return whiskeys.map(this.serializewhiskeyReview);
  },
  serializewhiskeyReview(review) {
    const reviewTree = new Treeize();
    const reviewData = reviewTree.grow([ review ]).getData()[0];
    return {
      id: reviewData.id,
      rating: reviewData.rating,
      tasting: xss(review.tasting),
      whiskey_id: reviewData.whiskey_id,
      date_created: reviewData.date_created,
      user: reviewData.user || {},
    };
  }
};
module.exports = ReviewsService;
