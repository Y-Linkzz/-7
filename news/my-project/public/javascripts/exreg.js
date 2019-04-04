$(function(){
    $("#login").click(function(){
        location.href = 'login.html';
    })
    $("#reg").on("click", () => {
      let inputEmail = $.trim($("#inputEmail").val());
      let inputPassword = $.trim($("#inputPassword").val());
      if (inputEmail && inputPassword){
          if (checkReg.email(inputEmail)) {
              $.ajax({
                  type: "post",
                  url: "http://47.112.119.130:3000/reg",
                  data: {
                      inputEmail,
                      inputPassword
                  },
                  success: function (str) {
                      if (str.code == 1) {
                          alert(str.message); //已被注册
                      } else {
                          //注册成功
                          alert(str.message);
                          location.href = "login.html";
                      }
                  }
              });
          } else {
              alert('邮箱格式错误');
          }  
      }else{
         alert('请输入账号或密码');
      }
      
    });
    
})