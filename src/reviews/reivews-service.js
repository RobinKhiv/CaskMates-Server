const xss = require('xss')

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
        'usr.id',
      )
      .where('rev.id', id)
      .first()
  },

  insertReview(db, newReview) {
    return db
      .insert(newReview)
      .into('whiskey_reviews')
      .returning('*')
      .then(([review]) => review)
      .then(review =>
        ReviewsService.getById(db, review.id)
      )
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
    }
  }
}

module.exports = ReviewsService
