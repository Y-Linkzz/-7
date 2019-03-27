$(function(){
    //导航菜单动画
    $('.navli').hover(function () {
        $(this).find('.subnav').filter(':not(:animated)').slideDown(300);
    }, function () {
        $(this).find('.subnav').slideUp(300);
    })

    //搜索跳转
    $('.btn').on('click', function () {
        var val11 = $.trim($(".sbar").val());
        if (val11) {
            word = val11;
            location.href = "goodlist.html?" + word;
            updata();

        } else {
            alert("请输入内容");
        }
    })
    $(".sbar").keydown(function (ev) {
        if (ev.keyCode == 13) {
            var val11 = $.trim($(".sbar").val());
            if (val11) {
                word = val11;
                location.href = "goodlist.html?" + word;
                updata();

            } else {
                alert("请输入内容");
            }
        }
    });


    //最左边列表图滑过高亮
    // $(".imglist li").eq(0).css("border-color", "#a10000").find('span').css("border-color", "#a10000");
    $(".imglist li").hover(function(){
        $(this).css("border-color", "#a10000").find('span').css("border-color", "#a10000");
        $(this)
          .siblings()
          .css("border-color", "#b4b4b4")
          .find("span")
          .css("border-color", "#fff");
    })


    //放大镜
    $(".bigimg").hover(function(){
        $(".shade").show();
        $(".bigview").show();
        $(document).mousemove(function(ev){
            var box_top = $(".bigimg").offset().top;
            var box_left = $(".bigimg").offset().left;
            var shade_left = ev.pageX - box_left - $(".shade").outerWidth() / 2 - 1;
            var shade_top = ev.pageY - box_top - $(".shade").outerHeight() / 2 - 1;
            if (shade_left < 0) {
                shade_left = 0;
            } else if (shade_left >= $(".bigimg").innerWidth() - $(".shade").outerWidth()) {
                shade_left = $(".bigimg").innerWidth() - $(".shade").outerWidth();
            }
            if (shade_top < 0) {
                shade_top = 0;
            } else if (shade_top >= $(".bigimg").innerHeight() - $(".shade").outerHeight()) {
                shade_top = $(".bigimg").innerHeight() - $(".shade").outerHeight();
            }
            $(".shade").css({'left': shade_left,'top':shade_top});
            var scale_left = shade_left / ($(".bigimg").innerWidth() - $(".shade").outerWidth());
            var scale_top = shade_top / ($(".bigimg").innerHeight() - $(".shade").outerHeight());
            var bview_left = ($(".bigview").outerWidth() - $(".bigview img").outerWidth()) * scale_left;
            var bview_top = ($(".bigview").outerHeight() - $(".bigview img").outerHeight()) * scale_top;
            $(".bigview img").css({ 'left': bview_left, 'top': bview_top });
        })
        
    },function(){
        $(".shade").hide();
        $(".bigview").hide();
    })



    //选择衣服类型
    var select = `<span class="selected"> </span>`;
    $(".colorul li").on('click',function(){
        $(this).css({ "background": "#A10000", 'border-color': '#A10000' })
            .append(select)
            .siblings()
            .css({ 'background': "#fff", "border-color": "#B4B4B4" })
            .find('.selected')
            .remove();
        var html = $(this).find('.colorname').html();
        $(".selcolor").html(html + "，");
    })
    // $(".colorul li").eq(1)
    // .css({ "background": "#A10000", 'border-color': '#A10000' })
    // .append(select);
    $(".selcolor").html(
      $(".colorul li")
        .eq(1)
        .find(".colorname")
        .html() + "，"
    );

    //选着衣服的SIZE
    var isok = false;
    $('.sizeul li').on('click',function(){
        isok = true;
        $(this).css({"background": "#A10000",'border-color':'#A10000' })
        .append(select)
        .siblings()
        .css({ 'background': "#fff", "border-color": "#B4B4B4" })
        .find('.selected')
        .remove();
        var html = $(this).find('.chsize').html();
        $('.selsize').html(html);
        $(".chosenull").hide();
    })

    //点击继续购物车
    $(".continueshop").on('click',function(){
        $(".shopcart").hide();
    })
    //点击去购物车
    $(".gocart").on('click',function(){
        location.href = 'buycart.html';
    })
    //关闭购物车
    $(".close").on('click',function(){
        $(".shopcart").hide();
    })


    //获取商品ID
    var href = location.href;
    var arr4 = href.split('?');
    var arr5 = arr4[1].split('=');
    var id = arr5[1];
    var arr = '';
    var arr2 = '';
    $.ajax({
      type: "post",
      url: "../api/port.php",
      data: {
        port: "findid",
        goodid: id
      },
      success: function(str) {
          xuanran(str);
        //选着颜色渲染
        $(".colorul li").eq(0).on('click',function(){
            var name = arr2.name;
                $.ajax({
                type: "post",
                url: "../api/port.php",
                data: {
                    port: "find",
                    goodname: name,
                    color: "黑色"
                },
                success: function(str) {
                    xuanran(str);
                }
                });      
        })
        //选着颜色渲染
        $(".colorul li").eq(1).on('click', function () {
              var name = arr2.name;
              $.ajax({
                  type: "post",
                  url: "../api/port.php",
                  data: {
                      port: "find",
                      goodname: name,
                      color: "白色"
                  },
                  success: function (str) {
                      xuanran(str);
                  }
              });
          })

        
      }
    });


    //渲染头部购物车数据
    headbuycart();
    //点击加入购物车  获取总数量和总价格
    $('.addbuycart').on('click', function () {
        if (isok) {
            var gdcolor = $('.selcolor').html().slice(0, 2);
            var name = arr2.name;
            var size = $('.selsize').html();
            var number = $('select').val();
            $.ajax({
                type: "post",
                url: "../api/port.php",
                data: {
                    port: "buycartInput",
                    goodname: name,
                    color: gdcolor,
                    size: size,
                    goodnumber: number
                },
                success: function (str) {
                    var arr15 = JSON.parse(str);
                    var arr14 = arr15.allnum;
                    var count2 = arr14['SUM(number)'];
                    var arr13 = arr15.allprice;
                    var allprice2 = arr13['SUM(price * number)'];
                    $(".goodcount").html(count2); //总数量
                    $(".allprice").html(allprice2); //总价格
                    $(".shopcart").show();
                    headbuycart();
                    
                }
            });
        } else {
            $(".chosenull").show();
        }

    })

    //渲染函数
    function xuanran(str) {
         arr = JSON.parse(str);
         arr2 = arr[0];
        $("#styleinfo").html(
            `${arr2.type}&nbsp${arr2.author}&nbsp${arr2.name}`
        );
        $(".gdh_text h2").html(
            `${arr2.type}&nbsp${arr2.author}&nbsp${arr2.name}&nbsp${arr2.color}`
        );
        var priceth = arr2.thprice * 1;
        $(".price strong").html(priceth.toFixed(2));//价格
        //选着颜色的图片
        $(".colorul li .colorimg").css("background-image", `url(../img/${arr2.choseimg})`);
        //最左边的列表图
        $(".imglist li span").css("background-image", `url(../img/${arr2.listimg})`);
        //最左边的列表图开始默认选第一个
        $(".imglist li").eq(0).css("border-color", "#a10000").find('span').css("border-color", "#a10000");
        //其他列表图的高亮消失
        $(".imglist li").eq(0)    
            .siblings()
            .css("border-color", "#b4b4b4")
            .find("span")
            .css("border-color", "#fff");
        $(".midimg").attr("src", `../img/${arr2.midimg1}`); //中图初始
        $(".bigview img").attr("src", `../img/${arr2.bigimg1}`);//大图初始
        $(".imglist li").eq(0).hover(function () { //滑过照片显示中图
            $(".midimg").attr("src", `../img/${arr2.midimg1}`);
            $(".bigview img").attr("src", `../img/${arr2.bigimg1}`);
        })
        $(".imglist li").eq(1).hover(function () {
            $(".midimg").attr("src", `../img/${arr2.midimg2}`);
            $(".bigview img").attr("src", `../img/${arr2.bigimg2}`);
        })
        if (arr2.color == '白色') {
            $(".colorul li").eq(1)
                .css({ "background": "#A10000", 'border-color': '#A10000' })
                .append(select);
        } else {
            $(".colorul li").eq(0)
                .css({ "background": "#A10000", 'border-color': '#A10000' })
                .append(select);
        }
    }

    //登录页面
    var username = window.localStorage.username;
    if (username) {
        $(".username").html(username);
        $(".weclome a").css("color", "#a10000");
        $(".login").html('退出登录');
        $(".reg").html('更换用户');
    }
    $(".login").on('click', function () {
        if ($(".login").html() == '退出登录') {
            window.localStorage.username = '';
            username = '';
            $(".username").html("欢迎光临凡客诚品！");
            $(".weclome a").css("color", "#808080");
            $(".login").html("登录");
            $(".reg").html("注册");
            $(".qubox").hide();
        } else {
            location.href = "login.html";
        }
    })
    $(".reg").on('click', function () {
        if ($(".reg").html() == '更换用户') {
            window.localStorage.username = "";
            username = "";
            location.href = 'login.html';
        } else {
            location.href = "reg.html";
        }
    })

    //我要提问
    $('.tiwen').on('click',function(){
        if (username){
            var text = $(".gdh_text h2").html();
            $(".quimg").after('提问：' + text);
            $(".qubox").show();
        }else{
            $(".popup").show();
            //弹窗点击确认跳转
            $(".popsure").on('click', function () {
                location.href = "login.html";
            })
        }
        
    })

    //渲染留言板
    $.ajax({
        type: "post",
        url: "../api/port.php",
        data: {
            port: "getmessage"
        },
        success: function (str) {
            var html = "";
            var arr10 = JSON.parse(str);
            $(arr10).each(function(i,item){
                var username2 = safename(item.username);
                html += `
                    <div class="question">
                        <div class="ask">
                            <div class="usertel">
                                <span class="tu">Q</span>
                                <span class="userphone">${username2}: </span>
                            </div>
                            <div class="con">
                                ${item.content}
                            </div>
                            <div class="time">
                                ${item.time}
                                <a href="javascript:;">
                                        我要回复(0)
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            })
            $(".review").html(html);
            $(".connew").html(arr10.length);
        }
    });
    //手机号码尾部打星号
    function safename(name){
        var a = name.slice(0, 4);
        var username2 = a + "***";
        return username2;
    }
    //点击提交问题
    $('.sub').on('click',function(){
        //获取时间
        var myDate = new Date();
        var year = setDb(myDate.getFullYear());
        var mon = setDb(myDate.getMonth() + 1);
        var data = setDb(myDate.getDate());
        var ymd = `${year}-${mon}-${data}`;  //年月日

        var username2 = safename(username);
        var con = $("#putext").val(); //取得留言内容
        $("#putext").val('');
         var html = `
            <div class="question">
                <div class="ask">
                    <div class="usertel">
                        <span class="tu">Q</span>
                        <span class="userphone">${username2}: </span>
                    </div>
                    <div class="con">
                        ${con}
                    </div>
                    <div class="time">
                        ${ymd}
                        <a href="javascript:;">
                                我要回复(0)
                        </a>
                    </div>
                </div>
            </div>
        `;
        //渲染
        $(".review").html($(".review").html() + html);
        $(".connew").html($(".connew").html() * 1 + 1); //最新留言条数
        //存放留言数据
        $.ajax({
          type: "post",
          url: "../api/port.php",
          data: {
            port: "message",
            content: con,
            username: username,
            date: ymd
          },
          success: function(str) {
              
          }
        });
    })

    
    //头部购物车
    //渲染头部购物车的数据
    function headbuycart() {
        $.ajax({
            type: "post",
            url: "../api/port.php",
            data: {
                port: "buycartgoods"
            },
            success: function (str) {
                var arr10 = JSON.parse(str);
                console.log(arr10)
                var html = "";
                $(arr10.data).each(function (i, item) {
                    html += `
                        <li data-id="${item.id}">
                            <div class="carimg">
                                <a href="javascript:;">
                                    <img src="../img/${item.img}" alt="">
                                </a>
                            </div>
                            <div class="cartext">
                                <h3>${item.type} ${item.author} ${item.name} ${item.color}</h3>
                                <p>
                                    <span class="carprice">￥${item.price}</span>
                                    <span class="carnum">X${item.number}</span>
                                </p>
                            </div>
                            <div class="cardel">
                                <a href="javascript:;" >删除</a>
                            </div>
                        </li>
                    `;
                })
                $(".cargood").html(html);
                var arr9 = arr10.allnum;
                var count = arr9['SUM(number)'];
                var arr8 = arr10.allprice;
                var allprice = arr8['SUM(price * number)'];
                $(".cartotalprice").html("￥" + allprice);
                $(".carcount").html(count);
                $(".goodnumber2").html(count);
                nullgood();
            }
        })
    }
    
    function nullgood() {
        if ($('.cargood li').size() <= 0) {
            $(".shoplist").html('您的购物车中没有任何商品');
            $(".goodnumber2").html(0);
        }
    }
    //删除
    $(".cargood").on('click', '.cardel a', function () {
        $(".poptext").html("您确定删除该商品吗？");
        $(".popup").show();
        var _this = this;
        $(".popsure").on('click', function () {
            $(_this).parent().parent().remove();
            var id = $(_this).parent().parent().attr('data-id');
            $.ajax({
                type: "post",
                url: "../api/port.php",
                data: {
                    port: "buycartDel",
                    goodid: id
                },
                success: function (str) {
                    headbuycart();
                }
            });
        })
    });

    //点击进入购物车
    $(".z_right").on('click', function () {
        location.href = "buycart.html";
    })

    
    
    //点击立即购买
    $('.buynow').on('click',function(){
        if(isok){
            var gdcolor = $('.selcolor').html().slice(0, 2);
            var name = arr2.name;
            var size = $('.selsize').html();
            var number = $('select').val();
            $.ajax({
                type: "post",
                url: "../api/port.php",
                data: {
                    port: "buycartInput",
                    goodname: name,
                    color: gdcolor,
                    size: size,
                    goodnumber: number
                },
                success: function (str){
                    location.href = "buycart.html";
                }   
            })
        }else{
            $(".chosenull").show();
        }
    })
    
})