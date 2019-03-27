$(function(){
    var show_num = [];
    draw();//加载验证码
    //看不清楚重新获取验证码
    $("#canvas").on('click', function () {
        draw();
    })
    //画板
    function draw() {
        show_num = [];
        var canvas_width = $('#canvas').width();
        var canvas_height = $('#canvas').height();
        var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
        var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
        var aCode = sCode.split(",");
        var aLength = aCode.length;//获取到数组的长度

        for (var i = 0; i <= 4; i++) {
            var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
            var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
            var txt = aCode[j];//得到随机的一个内容
            show_num[i] = txt.toLowerCase();
            var x = 10 + i * 20;//文字在canvas上的x坐标
            var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
            context.font = "bold 23px 微软雅黑";
            context.translate(x, y);
            context.rotate(deg);
            context.fillStyle = randomColor();
            context.fillText(txt, 0, 0);
            context.rotate(-deg);
            context.translate(-x, -y);
        }
        for (var i = 0; i <= 5; i++) { //验证码上显示线条
            context.strokeStyle = randomColor();
            context.beginPath();
            context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.stroke();
        }
        for (var i = 0; i <= 30; i++) { //验证码上显示小点
            context.strokeStyle = randomColor();
            context.beginPath();
            var x = Math.random() * canvas_width;
            var y = Math.random() * canvas_height;
            context.moveTo(x, y);
            context.lineTo(x + 1, y + 1);
            context.stroke();
        }
    }
    function randomColor() {//得到随机的颜色值
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
    }


    //聚焦提示信息
    function focu(name,html){
        $(name).focus(function(){
            $(this)
              .parent()
              .find(".tips")
              .html(html)
              .css("color", "#999");
        });
    }
    focu(".phone", "请填写真实的手机号，并进行验证");
    focu("#phonecode", "请输入手机接收到的验证码");
    focu("#psw", "6-18位字母,可使用数字、字母或符号的组合");
    focu("#pswagain", "请再次输入登录密码，两次输入必须一致");


    //条约勾选
    var isok = false;
    $("#check").on("click", function() {
        if ($("#check").prop("checked")) {
            isok = true;
            $(".reg_btn").css("background", "#b52024");
        }else{
            isok = false;
            $(".reg_btn").css("background", "#9A9A9A");
        }
        console.log(isok);
    });
    

    //验证码输入
    var isokcode = false;
    $(".code").blur(function(){
        var val = $.trim($(".code").val().toLowerCase());
        var val2 = show_num.join("");
        if(val){
            if (val == val2){
                $(this)
                    .parent()
                    .find(".tips")
                    .html("验证码正确")
                    .css("color", "green");
                isokcode = true;
            }else{
                $(this)
                  .parent()
                  .find(".tips")
                  .html("验证码错误")
                  .css("color", "#a10000");
                isokcode = false;
            }
        }else{
            $(this)
            .parent()
            .find(".tips")
            .html("请输入验证码")
            .css("color", "#a10000");
        }
    })
    //手机填入
    var isokph = false;
    $(".phone").blur(function(){
        var val = $.trim($(".phone").val());
        if(val){
            if (checkReg.tel(val)){
                $.ajax({
                  type: "post",
                  url: "../api/port.php",
                  data: {
                    port: "verifyUserName",
                    phone: val
                  },
                  success: function(str) {
                    var arr = JSON.parse(str);
                      if(arr.code == 0){
                          $(".phone")
                            .parent()
                            .find(".tips")
                            .html("可以注册")
                            .css("color", "green");
                        isokph = true;
                      }else{
                          $(".phone")
                            .parent()
                            .find(".tips")
                            .html("该手机号已被注册")
                            .css("color", "#a10000");
                        isokph = false;
                      }
                  }
                });
            }else{
                $(this)
                    .parent()
                    .find(".tips")
                    .html('请输入有效的手机号').css('color', '#a10000');
            }      
        }else{
            $(this)
            .parent()
            .find(".tips")
            .html('请输入有效的手机号').css('color','#a10000');
        }
    })

    //密码强度隐藏
    $("#psw").focus(function(){
        $(".pswsafety").hide();
    })
    //密码输入     -1097红色  -1117黄色   -1139绿色
    var isokpsw = false;
    $("#psw").blur(function(){
        var val = $.trim($("#psw").val().toUpperCase());
        var hasNumber = false;
        var hasLetter = false;
        var hasSign = false;
        if(val){
            isokpsw = true;
            $(this)
              .parent()
              .find(".tips")
              .html("");
            for (var i = 0; i < val.length; i++)
              if (!isNaN(val[i])) {
                hasNumber = true;
              } else if (
                val.charCodeAt(i) >= 65 &&
                val.charCodeAt(i) <= 90
              ) {
                hasLetter = true;
              } else {
                hasSign = true;
              }
            if (hasLetter && hasNumber && hasSign) {
                $(".pswimg").css("background-position", "0 -1139px");
                $(".safe").html("强");
            } else if (hasLetter && (hasNumber || hasSign)){
                $(".pswimg").css("background-position", "0 -1117px");
                $(".safe").html("中");
            } else if (hasNumber && hasSign){
              $(".pswimg").css("background-position", "0 -1117px");
              $(".safe").html("中");
            }else{
                $(".pswimg").css("background-position", "0 -1097px");
                $(".safe").html("弱");
            }
            $(".pswsafety").show();
        }else{
            isokpsw = false;
            $(this)
                .parent()
                .find(".tips")
                .html('请输入密码').css('color', '#a10000');
        }
    })
    //再次输入密码
    var isokpsw2 = false;
    $("#pswagain").blur(function(){
        var val = $.trim($("#psw").val());
        var val2 = $.trim($("#pswagain").val());
        if (val2){
            if (checkReg.pwwagain(val, val2)) {
                $("#pswagain")
                    .parent()
                    .find(".tips")
                    .html("密码一致")
                    .css("color", "green");
                isokpsw2 = true;
            } else {
                $("#pswagain")
                    .parent()
                    .find(".tips")
                    .html("密码不一致")
                    .css("color", "#a10000");
                isokpsw2 = false;
            }
        }else{
            $("#pswagain")
                .parent()
                .find(".tips")
                .html("请输入密码")
                .css("color", "#a10000");
        }
        
    })

    

    //登录跳转首页
    $(".denglv").on('click',function(){
        location.href = "login.html";
    })

    //获取验证码
   
    $('.getcode').on('click',function(){
        var usertel = $.trim($('.phone').val()) * 1;
        $.ajax({
          type: "post",
          url: "../api/duanxin.php",
          data: {
            userphone: usertel
          },
          success: function(str) {
            var arr = JSON.parse(str);
            var telcode = arr.phonecode;
            checkCode(telcode);
          }
        });
    })

    //手机验证码填写
    var isokphcode = false;
    checkCode();
    function checkCode(telcode){
        $("#phonecode").blur(function () {
            var text = $.trim($("#phonecode").val());
            if (text && telcode) {
                if (text == telcode) {
                    $(this)
                        .next()
                        .html("验证码正确");
                    $(this)
                        .next()
                        .css("color", "green");
                    isokphcode = true;
                } else {
                    $(this)
                        .next()
                        .html("验证码错误");
                    $(this)
                        .next()
                        .css("color", "#a10000");
                    isokphcode = false;
                }
            } else {
                $(this)
                    .next()
                    .html("请填写验证码");
                $(this)
                    .next()
                    .css("color", "#a10000");
            }
        });
    }
    

    
    $(".reg_btn").on('click', function () {
        console.log(isokcode,isokph,isokpsw,isokpsw2,isokphcode);
        if (isok) {
            if (isokcode&& isokph && isokpsw && isokpsw2 && isokphcode) {
                var val1 = $.trim($(".phone").val());
                var val2 = $.trim($("#psw").val());
                $(".reg_main input").val('');
                $("#check").prop("checked",false);
                $.ajax({
                    type: "post",
                    url: "../api/port.php",
                    data: {
                        port: "reg",
                        phone: val1,
                        password: val2
                    },
                    success: function (str) {
                        var second = 5;
                        $(".poptext").html(`注册成功，<span class="second"></span>秒后自动跳到首页`);
                        $(".second").css('color','#a10000');
                        $(".second").html(second);
                        $(".popup").show();
                        var timer = setInterval(function(){
                            second--;
                            $(".second").html(second);
                            if(second <= 0){
                                clearInterval(timer);
                                window.localStorage.username = val1;
                                location.href = "../index.html";
                            }
                        },1000)
                    }
                });
            } else {
                $(".popbtn").html(`<a href="javascript:;" class="popsure"></a>
                <a href="javascript:;" class="popcancel">取消</a>`);
                $(".poptext").html('注册失败');
                $(".popup").show();
            }
        }

    })
});