const jwt = require('jsonwebtoken');
let privateKey = 'lin1122';
//生成token
let create = (username, expiresIn = '1h') => {
    //username:用于加密的用户名
    //expiresIn：token有效期  '1小时'
    //privateKey ：用于加密的私钥
    let token = jwt.sign({username}, privateKey, {
      expiresIn
    });
    return token;
}
//验证token
let verify = (token) => {
    let res = false;
    try {
        res = jwt.verify(token, privateKey);
    } catch (err) {
        res = false;
    }
    return res;
}
module.exports = {
  create,
  verify
};