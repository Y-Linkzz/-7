var express = require('express');
var router = express.Router();
const fs = require('fs');
let db = require('./mongo.js');

// console.log(db);
/* GET users listing. */
router.all('/', function(req, res, next) {
    console.log(111);
    // console.log(req);
    res.setHeader('Access-Control-Allow-Origin', '*');
    // 必须要设置
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    // req.on("end", () => {
    // res.end(123);
    console.log(666);
    (async() => {
        console.log(777);
        let data = await db.find('news_infoimg', "");
        console.log(data);
        // res.end(data);
        res.send(data);
    })();

    // })
    // res.send('respond with a resource');
    // req.pipe(writeStream);
});

module.exports = router;