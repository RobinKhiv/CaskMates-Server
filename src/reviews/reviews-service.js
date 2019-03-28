const xss = require('xss');
const Treeize = require('treeize');

const ReviewsService = {
  getById(db, id) {
    return db
      .from('whiskey_reviews AS rev')
      .select(
        'rev.id',
        'rev.rating',
        'rev.palate',
        'rev.nose',
        'rev.additional_comments',
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
        'rev.palate',
        'rev.nose',
        'rev.additional_comments',
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
    // this.serializeReview(reviewData);
    return {
      id: reviewData.id,
      rating: reviewData.rating,
      nose: xss(reviewData.nose),
      palate: xss(reviewData.palate),
      additional_comments: xss(review.additional_comments),
      whiskey_id: reviewData.whiskey_id,
      date_created: reviewData.date_created,
      user: reviewData.user || {},

    };
  },
  serializeReview(review) {
    return {
      id: review.id,
      rating: review.rating,
      nose: xss(review.nose),
      palate: xss(review.palate),
      additional_comments: xss(review.additional_comments),
      whiskey_id: review.whiskey_id,
      date_created: review.date_created,
      user: review.user || {},
    };
  }
};
const userFields = [
  'usr.id AS user:id',
  'usr.user_name AS user:user_name',
  'usr.full_name AS user:full_name',
  'usr.nickname AS user:nickname',
  'usr.date_created AS user:date_created',
  'usr.date_modified AS user:date_modified',
];
module.exports = ReviewsService;
