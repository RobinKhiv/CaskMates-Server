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
      .leftJoin('whiskey AS whs', 'whs.id','=', 'list.whiskey_id')
      .leftJoin('whiskey_list', 'whiskey_list.id', '=', 'list.list_id')
      .where('list.user_id',userId);
  },
  serializeWhiskeyLists(lists){
    return lists.map(this.serializeWhiskeyList);
  },
  serializeWhiskeyList(list){
    const listTree = new Treeize();
    const listData = listTree.grow([list]).getData()[0]
    return {
      id: listData.id,
      whiskey_id: (listData.whiskey_id),
      listName: xss(listData.list_name),
      whiskeyName: xss(listData.whiskey_name)
    };
  }
};
module.exports = ListService;