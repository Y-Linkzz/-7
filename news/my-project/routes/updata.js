var express = require('express');
var router = express.Router();
let db = require("../public/javascripts/mongo");

router.post('/', function (req, res, next) {
    res.append("Access-Control-Allow-Origin", "*");
    (async () => {
        let data = await db.find("uploads", "");
        console.log(data);
        res.send(data);
    })();
});

module.exports = router;