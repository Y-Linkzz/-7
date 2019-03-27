$(function(){
    //点击数量减少
    $(".good_main").on("click", ".track", function () {
        var num = $(this).next().val() * 1;
        num--;
        if (num < 1) {
            num = 1;
        }
        $(this).next().val(num);
        if ($(this).next().val() == 1 && !$(this).hasClass('decrease')){
            $(this).addClass("decrease");
        }
        //   track($(this));
        xiaoji($(this));
        var id = $(this).parent().parent().attr('data-id');
        changenum(num, id);
    });
    function changenum(num,id){
        $.ajax({
            type: "post",
            url: "../api/port.php",
            data: {
                port: "numchange",
                goodnumber: num,
                goodid: id
            },
            success: function (str) {
            }
        });
    }
    $(".good_main").on("click", '.add', function () {
        var num =
            $(this)
                .prev()
                .val() * 1;
        num++;
        if (num > 100) {
            num = 100;
        }
        $(this).prev().val(num);
        if ($(this).prev().val() > 1 && $(this).parent().find('.track').hasClass('decrease')){
            $(this).parent().find('.track').removeClass('decrease');
        }

        xiaoji($(this));
        var id = $(this).parent().parent().attr('data-id');
        changenum(num, id);
    });
    
    function xiaoji(now){
        var res = now.parent().find('.number').val();
        var price = now.parent().prev().find('span').html();
        var xiaoji = (res * price).toFixed(2);
        now.parent().next().next().find('span').html(xiaoji);
        allNum();
    }

    //手动输入数量
    $(".good_main").on("keyup", ".number",function(){
        var valnum = $.trim($(this).val());
        console.log(valnum);
        if (valnum < 1){
            $(this).val(1);
        }else if(valnum > 100){
            $(this).val(100);
        }
        //判断数量为1时 高亮取消
        if ($(this).val() > 1 && $(this).prev().hasClass('decrease')){
            $(this).prev().removeClass('decrease');
        } else if ($(this).val() == 1 && !$(this).prev().hasClass('decrease')){
            $(this).prev().addClass('decrease');
        }
        xiaoji($(this));
        var num = $(this).val();
        var id = $(this).parent().parent().attr('data-id');
        changenum(num, id);
    });

    //删除当行
    
    $(".good_main").on("click", ".del a", function() {
        $(".poptext").html('您确定删除该商品吗？')
        $(".popup").show();
        var _this = this;
        //点击确定
        $(".popsure").on('click', function () {
            $(_this)
                .parent()
                .parent()
                .remove();
            empty();
            allNum();
            var id = $(_this).parent().parent().attr('data-id');
            delgood(id);
            $(".popup").hide();
        })
        
    });
    
    function delgood(id){
        $.ajax({
            type: "post",
            url: "../api/port.php",
            data: {
                port: "buycartDel",
                goodid: id
            },
            success: function (str) {}
        });
    }
    //全选不选
    $(".allsel input").on("click", function() {
    if ($(".allsel input").prop("checked")){
        $(".select input").prop("checked", true);
        $("#allchose2").prop("checked", true);
      } else {
        $(".select input").prop("checked", false);
        $("#allchose2").prop("checked", false);
      }
        allNum();
    });
    //全选不选2
    $('#allchose2').on('click',function(){
        if ($("#allchose2").prop("checked")){
            $(".select input").prop("checked", true);
            $(".allsel input").prop("checked", true);
        }else{
            $(".select input").prop("checked", false);
            $(".allsel input").prop("checked", false);
        }
        allNum();
    })
    
    //商品为空时显示
    function empty(){
        if ($('.goods').size() <= 0){
            $(".content").hide();
            $(".cart_empty").show();
        }else{
            $(".content").show();
            $(".cart_empty").hide();
        }
    }
    //总数量与总价的更新
    var arr = [];
    function allNum(){
        arr = [];
        $(".select input").each(function(i,item){
            if ($(".select input").eq(i).prop('checked')){
                arr.push(i);
            }
        })
        var num2 = 0;
        var priceall = 0;
        arr.forEach(function(item){
            num2 += $('.number').eq(item).val() * 1;
            priceall += $('.xiaoji').eq(item).find('span').html()*1;
        });
        $(".allnum").html(num2);
        $(".allprice").html('￥' + priceall.toFixed(2));
    }
    //全删
    $(".delchosed").on('click', function () {
        if ($(".select input:checked").size() == 0) {
            $(".poptext").html("请选取商品删除");
            $(".popup").show();
        } else {
            $(".poptext").html("你确定删除全部商品吗？");
            $(".popup").show();
            //点击确定
            $(".popsure").on('click', function () {
                for (var i = arr.length - 1; i >= 0; i--) {
                    var id = $(".goods").eq(arr[i]).attr('data-id');
                    delgood(id);
                    $(".goods").eq(arr[i]).remove();
                }
                empty();
                allNum();
            })
        }
        
    })
    
    //初始页面
    $.ajax({
      type: "post",
      url: "../api/port.php",
      data: {
        port: "buycartgoods"
      },
      success: function(str) {
          var arr = JSON.parse(str);
          var html ='';
          //渲染数据
          $(arr.data).each(function(i,item){
            html += `
            <div class="goods" data-id="${item.id}">
                <div class="select">
                    <input type="checkbox" class="chex" >
                </div>
                <div class="gdimg">
                    <img src="../img/${item.img}" alt="">
                </div>
                <div class="gdname">
                        ${item.type} ${item.author} ${item.name} ${item.color}
                </div>
                <div class="gdsize">
                    ${item.size}
                </div>
                <div class="gdprice">
                        ￥<span>${item.price}</span>
                </div>
                <div class="qty">
                    <a href="javascript:;" class="track decrease"></a>
                    <input type="text" class="number" value="${item.number}">
                    <a href="javascript:;" class="add"></a>
                </div>
                <div class="yh">
                    -
                </div>
                <div class="xiaoji">￥<span>${item.price * item.number}</span></div>
                <div class="del">
                    <a href="javascript:;">删除</a>
                </div>
            </div>
            `;
          })

          $(".good_main").html(html);
          empty();
          //一开始为全选
          $(".allsel input").prop("checked",true);
          $(".select input").prop("checked", true);
          $("#allchose2").prop("checked", true);
          allNum(); //把全部的商品放入数组
          //------------------------------
          //渲染总的数量与价格
          var arr2 = arr.allnum;
          var count = arr2['SUM(number)'];
          var arr3 = arr.allprice;
          var allprice = arr3['SUM(price * number)'];
          $(".allnum").html(count);
          $(".allprice").html('￥' + allprice);
          //判断商品数量是大于一  高亮改变  
          $('.number').each(function(i,item){
              if ($('.number').eq(i).val() > 1 && $('.number').eq(i).prev().hasClass('decrease')){
                  $('.number').eq(i).prev().removeClass('decrease');
              }
          })

          //---------------------------------
          

          //选着对应的商品
          $(".select input").on('click', function () {
              var checkle = $(".select input:checked").size();
              if (checkle == $(".select input").size()) {
                  $(".allsel input").prop("checked", true);
                  $("#allchose2").prop("checked", true);
              } else {
                  $(".allsel input").prop("checked", false);
                  $("#allchose2").prop("checked", false);
              }
              allNum();
          })

          
      }
    });
    
    //选购商品
    $(".goshop").on('click',function(){
        location.href = "../index.html";
    })
    //继续购物
    $('.goback').on('click',function(){
        location.href = "../index.html";
    })

    //登录页面
    var username = window.localStorage.username;
    if (username) {
        $(".username").html( '您好，' + username);
        $(".login").html('退出登录');
        $(".reg").html('更换用户');
    }
    $(".login").on('click', function () {
        if ($(".login").html() == '退出登录') {
            window.localStorage.username = '';
            username = "";
            $(".username").html("您好，欢迎光临凡客诚品！");
            $(".login").html("登录");
            $(".reg").html("注册");
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
})