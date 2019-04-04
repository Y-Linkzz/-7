var express = require('express');
var router = express.Router();
var fs = require("fs");
var multer = require("multer");
let db = require("../public/javascripts/mongo");

/*var upload = multer({
	//如果用这种方法上传，要手动添加文明名后缀
	dest: 'uploads/'
})*/

var storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    //给图片加上时间戳格式防止重名名
    //比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
    cb(null, '&'+file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
});
var upload = multer({
  storage: storage
});

//单图上传
router.post("/upload-single", upload.single("logo"), function(req, res, next) {
  res.append("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  console.log(req.file);
  console.log("文件类型：%s", req.file.mimetype);
  console.log("原始文件名：%s", req.file.originalname);
  console.log(req.file.originalname.split("."));
  console.log("文件大小：%s", req.file.size);
  console.log("文件保存路径：%s", req.file.path);
  let filesname = req.body.filename;
  let name = req.file.originalname.slice(0, req.file.originalname.lastIndexOf('.'));
  let path = req.file.path.split("&")[1];
  (async () => {
    let data = await db.insert("uploads", [
      {
        name: filesname,
        path: path
      }
    ]);
    console.log(data);
    console.log(data.insertedIds['0']);
    res.send({
      wscats_code: "0",
      path: path,
      name: filesname,
      id: data.insertedIds["0"]
    });
  })();
  
});

module.exports = router;
