$(function(){
    $(".userout").click(function(){
        location.href = "login.html";
        localStorage.clear();
    })

    if (localStorage.token) {
        $.ajax({
          type: "post", //http://47.112.119.130:3000/
          url: "http://47.112.119.130:3000/sign/verify",
          data: {
            token: localStorage.token
          },
          success: function(str) {
            if (str.code == 1) {
              //令牌正确
              $(".username").html(localStorage.user);
            } else if (str.code == 0) {
              localStorage.clear();
              location.href = "login.html";
            }
          }
        });
    } else {
        alert('请登录');
        location.href = 'login.html';
    }


})