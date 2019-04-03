let db = require('./mongo.js');
(async () => {
  let data = await db.find("checkname", {
    name: "lin2"
  });
    console.log(data);
})();
//插入 数据要个中括号   查找不用中括号