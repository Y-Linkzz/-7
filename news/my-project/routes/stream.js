var express = require('express');
var router = express.Router();

// const http = require('http');
const fs = require('fs');
let db = require('./mongo.js');
// console.log(db);
/* GET users listing. */
router.all('/', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // 必须要设置
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    const writeStream = fs.createWriteStream(`${req.url.split('=')[1]}`);
    // res.end('123');
    console.log(req.url);

    req.on("end", () => {
        // 将上传的图片路径存储在mongoDB数据库中
        (async() => {
            console.log(666);
            let data = await db.insert('news_infoimg', [{
                'url': `${req.url.split('=')[1]}`,
                'name': `${req.url.split('=')[1].split(".")[0]}`
            }]);
            // console.log(data);
        })();

        // (async() => {
        //     console.log(777);
        //     let data = await db.find('news_infoimg', "");
        //     console.log(data);
        //     res.end(data);
        // })();

    })
    res.send('respond with a resource');
    req.pipe(writeStream);
});

module.exports = router;
























// http req请求 它是一个流

// 跨域



// res.end('hello world');
// // 空容器装载接受这些流
// let body = '';
// // 监听req的流入
// req.on('data', (chunk) => {
//     body = body + chunk;
// })
// // 监听流结束
// req.on('end', () => {
//     console.log('stream', body);
// })
// 把流引入到本地的abc.png文件里面