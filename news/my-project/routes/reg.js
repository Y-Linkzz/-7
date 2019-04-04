var express = require('express');
var router = express.Router();
let db = require("../public/javascripts/mongo");
/* GET home page. */
router.post('/', function (req, res, next) {
    res.append("Access-Control-Allow-Origin", "*");
    let {
        inputEmail,
        inputPassword
    } = req.body;
    (async () => {
        let data = await db.find("checkname", {
            name: inputEmail
        });
        if (data.length == 0) {
            //可以注册
            (async () => {
                let data = await db.insert("checkname", [
                    {
                        name: inputEmail,
                        psw: inputPassword
                    }
                ]);
                res.body = { code: 0, message: '注册成功',};
                res.send(res.body);
            })();
        } else {
            //已被注册
            res.body = { code: 1, message: '已被注册' };
            res.send(res.body);
        }

    })();


});

module.exports = router;