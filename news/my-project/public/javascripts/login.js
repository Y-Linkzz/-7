$(function(){
    //点击跳转注册页面
    $("#reg").click(function(){
        location.href = 'reg.html';
    })
    //查看是否有cookie
    if (getCookie('user')){
        $("#inputEmail").val(getCookie("user"));
        $(".remember").prop("checked",true);
    }else{
        $("#inputEmail").val('');
        $(".remember").prop("checked", false);
    }
    //登录
    $("#login").on('click',function(){
        let inputEmail = $.trim($("#inputEmail").val());
        let inputPassword = $.trim($("#inputPassword").val());
        if (inputEmail && inputPassword){
            $.ajax({
                type: "post",
                url: "http://47.112.119.130:3000/sign/login",
                data: {
                    inputEmail,
                    inputPassword
                },
                success: function (str) {
                    // console.log(str);
                    if (str.code == 1) {
                        setCookie("user", inputEmail, 7);
                        if ($(".remember").prop("checked")) {
                            setCookie("user", inputEmail, 7);
                        } else {
                            removeCookie("user");
                        }
                        localStorage.token = str.token;
                        localStorage.user = inputEmail;
                        location.href = "index.html";
                    } else {
                        alert("账号或密码错误");
                    }
                }
            });
        }else{
            alert('请输入账号或密码');
        }
          
    })
})