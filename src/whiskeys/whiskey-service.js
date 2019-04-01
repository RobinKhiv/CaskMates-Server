const xss = require('xss');
const Treeize = require('treeize');
const userFields = require('../Utils/user-fields');

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
          'count(DISTINCT rev) AS number_of_reviews'
        ),
        db.raw(
          'AVG(rev.rating) AS average_review_rating'
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
      .groupBy('whs.id', 'usr.id');
  },

  getById(db, id) {
    return WhiskeysService.getAllWhiskeys(db)
      .where('whs.id', id)
      .first();
  },

  insertWhiskey(db, newWhiskey) {
    return db
      .insert(newWhiskey)
      .into('whiskey')
      .returning('*')
      .then(([whiskey]) => whiskey)
      .then(whiskey =>
        WhiskeysService.getById(db, whiskey.id)
      );
  },

  serializeWhiskeys(whiskey) {
    return whiskey.map(this.serializeWhiskey);
  },

  serializeWhiskey(whiskey) {
    const whiskeyTree = new Treeize();
    const whiskeyData = whiskeyTree.grow([ whiskey ]).getData()[0];
    return {
      id: whiskeyData.id,
      whiskey_id: whiskeyData.id,
      whiskey_name: xss(whiskeyData.whiskey_name),
      origin: xss(whiskeyData.origin),
      abv: xss(whiskeyData.abv),
      price: xss(whiskeyData.price),
      content: xss(whiskeyData.content),
      date_created: whiskeyData.date_created,
      palate: xss(whiskey.palate),
      finish: xss(whiskey.finish),
      nose: xss(whiskey.nose),
      additional_comments: xss(whiskey.additional_comments),
      image: xss(whiskeyData.image),
      user: whiskeyData.user || {},
      number_of_reviews: Number(whiskeyData.number_of_reviews) || 0,
      average_review_rating: Math.round(whiskeyData.average_review_rating) || 0
    };
  },
};

module.exports = WhiskeysService;
