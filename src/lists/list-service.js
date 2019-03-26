const xss = require('xss');
const Treeize = require('treeize');

const ListService = {
  getWhiskeyList(db, userId){
    return db
      .from('list')
      .select(
        'list.id',
        'list.list_id',
        'list.whiskey_id',
        'list.user_id',
        'list.list_id',    
        'whs.whiskey_name',
        'whiskey_list.list_name')
      .where('list.user_id',userId)
      .leftJoin('whiskey AS whs', 'whs.id','=', 'list.whiskey_id')
      .leftJoin('whiskey_list', 'whiskey_list.id', '=', 'list.list_id')
  },
  insertItemIntoList(db, item){
    return db
      .insert(item)
      .into('list')
      .returning('*');
  },
  serializeWhiskeyLists(lists){
    return lists.map(this.serializeWhiskeyList);
  },
  deleteListItem(db, listId, userId){
    return db
      .into('list')
      .where({id: listId, user_id: userId})
      .delete();
  },
  serializeWhiskeyList(list){
    const listTree = new Treeize();
    const listData = listTree.grow([list]).getData()[0]
    return {
      id: listData.id,
      whiskey_id: xss(listData.whiskey_id),
      listName: xss(listData.list_name),
      whiskeyName: xss(listData.whiskey_name),
      number_of_reviews: Number(listData.number_of_reviews) || 0,
      average_review_rating: Math.round(listData.average_review_rating) || 0
    };
  }

};
module.exports = ListService;