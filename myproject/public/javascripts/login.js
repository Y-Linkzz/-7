$(function(){
   
    $("#login").on('click',function(){
        let inputEmail = $("#inputEmail").val();
        let inputPassword = $("#inputPassword").val();
        $.ajax({
            type:'post',
            url: "http://47.112.119.130:3000/sign/login",
          data:{
              inputEmail,
              inputPassword
          },
        success:function(str){
            console.log(str);
            localStorage.token = str.token;
        }
        })
    })
})