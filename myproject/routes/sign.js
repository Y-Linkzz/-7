var express = require('express');
var router = express.Router();
let db = require("../public/javascripts/mongo");
let tok = require('../public/javascripts/token');
/* GET users listing. */
router.post('/login', function (req, res, next) {
    res.append("Access-Control-Allow-Origin", "*");
   let {
       inputEmail,
       inputPassword
   } = req.body;
   (async () => {
        let data = await db.find("checkname", {
          name: inputEmail,
          psw: inputPassword
        });
       if (data.length == 0){
            res.body = {code:0,message : '账号或密码错误'};
            res.send(res.body);
       }else{
           let _token = tok.create(inputEmail);
           res.body = { code: 1, message: '登录成功',token: _token };
           res.send(res.body);
       }
        
    })();
    

    
});

module.exports = router;