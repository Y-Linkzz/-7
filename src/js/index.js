$(function () {
    //导航菜单动画
    $('.navli').hover(function () {
        $(this).find('.subnav').filter(':not(:animated)').slideDown(300);
    }, function () {
        $(this).find('.subnav').slideUp(300);
    })
    //轮播图
    var s1 = new Swiper('.swiper-container', {
        autoplay: {//自动轮播
            delay: 2000,//间隔时间
            disableOnInteraction: false
        },
        loop: true,//无缝
        navigation: {//上下按钮
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {//焦点跟随
            el: '.swiper-pagination',
            clickable: true,//点击焦点跳到指定图片
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';//生成焦点数字
            }
        },
        mousewheel: false,//滚动滑轮可以切图
        effect: 'fade'//选用:效果
    });
    $("#swiper-container").hover(function(){
         s1.autoplay.stop();
    },function(){
        s1.autoplay.start();
    })
    var t_shirt = [
      {
        img: "img/T1.jpg"
      },
      {
        img: "img/T2.jpg"
      },
        {
            img: "img/T3.jpg"
        },
        {
            img: "img/T4.jpg"
        },
        {
            img: "img/T1.jpg"
        },
        {
            img: "img/T2.jpg"
        },
        {
            img: "img/T3.jpg"
        },
        {
            img: "img/T4.jpg"
        },
        {
            img: "img/T1.jpg"
        },
        {
            img: "img/T2.jpg"
        },
        {
            img: "img/T3.jpg"
        },
        {
            img: "img/T4.jpg"
        }
    ];
    var html = '';
    $(t_shirt).each(function(i,item){
        html += `
        <li>
            <a href="">
                <img src="${item.img}" alt="">
            </a>
        </li>
        `;
    })
    $(".t_ul").html(html);

    //判断是否登录
    var username = window.localStorage.username;
    
    if (username){
        $(".username").html(username);
        $(".weclome a").css("color", "#a10000");
        $(".login").html('退出登录');
        $(".reg").html('更换用户');
    }
    $(".login").on('click',function(){
        if ($(".login").html() == '退出登录'){
            window.localStorage.username = '';
            username = "";
            $(".username").html("欢迎光临凡客诚品！");
            $(".weclome a").css("color", "#808080");
            $(".login").html("登录");
            $(".reg").html("注册");
        }else{
            location.href = "html/login.html";
        }
    })
    $(".reg").on('click',function(){
        if ($(".reg").html() == '更换用户'){
            window.localStorage.username = "";
            username = "";
            location.href = 'html/login.html';
        }else{
            location.href = "html/reg.html";
        }
    })
   
    //头部购物车渲染
    headbuycart();
    function headbuycart(){
        $.ajax({
            type: "post",
            url: "api/port.php",
            data: {
                port: "buycartgoods"
            },
            success: function (str) {
                var arr = JSON.parse(str);
                var html = "";
                $(arr.data).each(function (i, item) {
                    html += `
                        <li data-id="${item.id}">
                            <div class="carimg">
                                <a href="javascript:;">
                                    <img src="img/${item.img}" alt="">
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
                var arr2 = arr.allnum;
                var count = arr2['SUM(number)'];
                var arr3 = arr.allprice;
                var allprice = arr3['SUM(price * number)'];
                $(".cartotalprice").html("￥" + allprice);
                $(".carcount").html(count);
                $(".goodnumber").html(count);
                nullgood();

            }
        })
    }
    
    //头部购物车没商品
    function nullgood(){
        if ($('.cargood li').size() <= 0) {
            $(".shoplist").html('您的购物车中没有任何商品');
            $(".goodnumber").html(0);
        }
    }
    //删除
    $(".cargood").on('click','.cardel a',function () {
        $(".poptext").html("您确定删除该商品吗？");
        $(".popup").show();
        var _this = this;
        $(".popsure").on('click', function (){ 
            $(_this).parent().parent().remove();
            var id = $(_this).parent().parent().attr('data-id');
            $.ajax({
                type: "post",
                url: "api/port.php",
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
    $(".z_right").on('click',function(){
        location.href = "html/buycart.html";
    })

    //搜索跳转
    $('.btn').on('click',function(){
        var word = $.trim($(".sbar").val());
        if (word){
            location.href = "html/goodlist.html?" + word;
        }else{
            alert("请输入内容");
        }
    })
    $(".sbar").keydown(function(ev) {
          if(ev.keyCode == 13){
            var word = $.trim($(".sbar").val());
            if(word){
                location.href = "html/goodlist.html?" + word;
            }else{
                alert('请输入内容');
            }
          }
          
          // var word = $(".sbar").val();
          // if(word){

          // }else{
          //     alert('请输入内容');
          // }
    });


    //遮罩  广告倒计时
    var time = setTimeout(function(){
        $(".advert").hide();
        clearTimeout(time);
    }, 5000);
    //点击关闭广告
    $(".adclose").on('click',function(){
        $(".advert").hide();
        clearInterval(time);
    })
    //回到顶部
    $(".gotop").on('click',function(){
        $(window).scrollTop(0);
    })
    //轮播图滑过焦点
    $(".swiper-pagination-bullet").hover(function(){
        $(this).click();
    })
})