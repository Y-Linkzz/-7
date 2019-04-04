var express = require("express");
var router = express.Router();
let db = require("../public/javascripts/mongo");

router.post("/", function(req, res, next) {
  res.append("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  (async () => {
    let data = await db.deleted("uploads", req.body);
    console.log(data);
    
  })();
});

module.exports = router;
