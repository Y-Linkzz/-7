$(function() {
  //导航菜单动画
  $('.navli').hover(function () {
    $(this).find('.subnav').filter(':not(:animated)').slideDown(300);
  }, function () {
    $(this).find('.subnav').slideUp(300);
  })
  // 吸顶菜单--------------------
  var top = $(".chosegood").offset().top;
  $(window).scroll(function(){
    var scrolltop = $(window).scrollTop();
    if (scrolltop >= top) {
      $(".chosegood").addClass("fixed");
    } else {
      $(".chosegood").removeClass("fixed");
    }
  })
  //--------------------
  $(".allcolor").addClass("active");
  $(".allcolor").click(function() {
    $(".allcolor")
      .addClass("active")
      .siblings()
      .removeClass("active");
  });
  $(".c_ul li").on("click", function() {
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");
  });
  //价格输入
  $(".priceinput input").click(function(ev){
    ev.stopPropagation();
    $(".seachfocus").show();
  })
  $(window).click(function(){
      $(".seachfocus").hide();
  });
  //阻止冒泡行为
  $(".seachfocus").click(function(ev){
    ev.stopPropagation();
  })

  //渲染商品
  function creat(arr){
    var html ='';
    $(arr.datalist).each(function(i,item){
      html += `
      <li data-id="${item.id}">
          <div class="goodimg">
              <a href="javascript:;" class="gimg">
                  <img src="../img/${item.img}" alt="">
              </a>
              <div class="tehui">${item.thprice}</div>
              <div class="new"></div>
          </div>
          <p class="gdtip"><a href="javascript:;">${item.type} ${item.author} ${item.name} ${item.color}</a></p>
          <p class="gdprice">
              <span>
                  售价￥
                  <del>${item.price}</del>
              </span>
          </p>
      </li>
      `;
    })
    $(".goods ul").html(html);
  }
  //--------获取主页传来的关键字
  var wangzhi = decodeURI(location.search).slice(1);
  var word = wangzhi; //关键字
  console.log(word);
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

  //商品列表分列功能
  var pages = 1;
  var qty = 10;
  var num = 0;
  var crt = 0;
  var min = 0;
  var total = 0;
  var port = "load";
  var goodcolor = '';
  var pricelow = 0; //最低价格
  var pricehigh = 0; //最高价格
  updata();  //初始渲染
  function updata(){
    $.ajax({
      type: "post",
      url: "../api/port.php",
      data: {
        port: port,
        page: pages,
        qty: qty,
        word: word
      },
      success: function (str) {
        var arr = JSON.parse(str);
        creat(arr);
        same(str);
        $(".gdall").html(`(${total})`);
        $(".gdall2").html(`${total}`);
        $(".gdword").html(word);
        nogoods();
      }
    });
  }
  function same(str){
    var arr = JSON.parse(str);
    creat(arr);
    total = arr.total;
    num = Math.ceil(total / qty);
    crt = num - 1;
    min = num - 2;
    pag(); //渲染有多少页
    $(".pagul li")
      .eq(0)
      .addClass("seactive");
    $(".total").html(`共${num}页`);
  }
  //没有商品时显示
  function nogoods(){
    if($('.goods ul li').size() <=0){
      $(".goods").hide();
      $(".searchpage").hide();
      $('.nogoods').show();
      $(".nogoods .word").html(word);
    }else{
      $(".nogoods").hide();
      $(".goods").show();
      $(".searchpage").show();
    }
  }
  //显示全部商品
  $(".allcolor").on('click', function () {
      port = 'load';
      goodcolor = '';
      pages = 1;
      vajax();
  })
  //分页显示
  function pag() {
    var html = '';
    var html2 = '';
    if(num <= 3){
      for (var i = 1;i <= num;i++){
        html2 += `<li>${i}</li>`;
      }
    }
    if (pages > 1 && pages <= crt) {
      var a = pages - 1;
      for (var i = 0; i < 3; i++) {
        html += `<li>${a}</li>`;
        a++;
      }
    } else if (pages <= 1){
      for (var i = 0; i < 3; i++) {
        html += `<li>${i + 1}</li>`;
      }
    } else if (pages > crt) {
      for (var i = min; i <= num; i++) {
        html += `<li>${i}</li>`;
      }
    }
    if (html2){
      $(".pagul").html(html2);
    }else{
      $(".pagul").html(html);
    }
    $(".cht_right span").html(`${pages}/${num}`);
  }
  //点击页数显示商品
  $(".pagul").on("click", "li", function() {
    pages = $(this).html() * 1;
    pag();
    highlight();
  });
  //高亮封装
  function highlight() {
    if (pages <= 1) {
      $(".pagul li")
        .eq(pages - 1)
        .addClass("seactive")
        .siblings()
        .removeClass("seactive");
    } else if (pages > 1 && pages <= crt) {
      $(".pagul li")
        .eq(1)
        .addClass("seactive")
        .siblings()
        .removeClass("seactive");
    } else if (pages > crt) {
      var index = pages - min;
      $(".pagul li")
        .eq(index)
        .addClass("seactive")
        .siblings()
        .removeClass("seactive");
    }
    $.ajax({
      type: "post",
      url: "../api/port.php",
      data: {
        port: port,
        page: pages,
        qty: qty,
        goodcolor: goodcolor,
        pricelow: pricelow,
        pricehigh: pricehigh,
        word: word
      },
      success: function(str) {
        var arr = JSON.parse(str);
        creat(arr);
      }
    });
  }
  //下一页
  $(".next").on("click", function() {
    next();
  });
  //下一页封装
  function next(){
    pages = ++pages > num ? num : pages;
    pag();
    highlight();
  }
  //顶部的分页
  $(".ch_next").on('click',function(){
    next();
  })
  $(".ch_prev").on('click',function(){
    prev();
  })
  //上一页封装
  function prev(){
    pages = --pages < 1 ? 1 : pages;
    pag();
    highlight();
  }
  //上一页
  $(".prev").on('click',function(){
    prev();
  })
  //跳转页数
  $(".pa_btn").on("click", function() {
    pages = $(".pa_num").val() * 1;
    if (pages < 1) {
      pages = 1;
      $(".pa_num").val(1);
    } else if (pages > num) {
      pages = num;
      $(".pa_num").val(num);
    }
    pag();
    highlight();
  });
  
  //颜色分类--------------------------------------
  $(".black").on('click',function(){
    pages = 1;
    port = "gdcolor"; //接口
    goodcolor = '黑色';
    vajax();
  })
  function vajax(){
    $.ajax({
      type: "post",
      url: "../api/port.php",
      data: {
        port: port,
        page: pages,
        qty: qty,
        goodcolor: goodcolor,
        pricelow: pricelow,
        pricehigh: pricehigh,
        word: word
      },
      success: function(str) {
        same(str);
        nogoods();
      }
    });
  }
  $(".white").on('click',function(){
    pages = 1;
    port = "gdcolor"; //接口
    goodcolor = "白色";
    vajax();
  })
  //--------------------------------------------

  //价格分类-------------------------------------
  $(".pricetype p").on('click',function(){
    var htm = $(this).find('i').html();
    var clas = $(this).find('span').attr('class');
    $(this)
      .find("span") //找父级元素
      .css("background-position-x", "-21px");//红色
    $(this)
      .siblings()
      .find("span")
      .css("background-position-x", "0px");
    $(".xianshi")
      .find("span")
      .attr("class", clas)
      .css("background-position-x", "-21px");
    $('.xianshi').find('i').html(htm);
  })
  $(".sortul li").on('click',function(){
    $(this)
      .find("#sp")
      .css("background-position-x", "-21px");
    $(this)
      .siblings()
      .find("#sp")
      .css("background-position-x", "0px");
    $(".pricetype")
      .find("#sp2")
      .css("background-position-x", "0px");
  })
  //价格由低到高
  $(".pricetype p").eq(0).on('click',function(){
    pages = 1;
    port = "sortUp";
    vajax();
  })
  //价格由高到低
  $(".pricetype p").eq(1).on('click', function () {
    pages = 1;
    port = "sortDown";
    vajax();
  })

  //选取价格范围
  $(".sure").on('click',function(){
    var a = $.trim($(".lowprice").val());
    var b = $.trim($(".heightprice").val());
    if(a && b){
      if(a>b){
        var c = a;
        a = b;
        b = c;
      }
      port = "filter";
      pricelow = a;
      pricehigh = b;
      pages = 1;
      vajax();
    }else{
      alert('请输入价格')
    }
  })
  //清除价格
  $(".clear").on('click',function(){
    $(".lowprice").val('');
    $(".heightprice").val('');
  })
  
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
      username = "";
      $(".username").html("欢迎光临凡客诚品！");
      $(".weclome a").css("color", "#808080");
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

  //点击商品进入详情页
  $('.goods ul').on('click','.goodimg',function(){
    var id = $(this).parent().attr('data-id');
    location.href = "gooddetail.html?id=" + id;
  })
  $(".goods ul").on('click','.gdtip a',function(){
    var id = $(this)
      .parent()
      .parent()
      .attr("data-id");
    location.href = "gooddetail.html?id=" + id;
  })

  //头部购物车
  headbuycart();
  function headbuycart(){
    $.ajax({
    type: "post",
    url: "../api/port.php",
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
  //头部购物车没有商品
  function nullgood() {
    if ($('.cargood li').size() <= 0) {
      $(".shoplist").html('您的购物车中没有任何商品');
      $(".goodnumber").html(0);
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

  //鼠标滑过商品提前浏览   第一列 ico left: 306px;top: 398px;  pr top: 331px;left: 317px;
  $('.goods').on('mouseenter','ul li',function(){
    var a = $(this).offset().left;
    var b = $(this).outerWidth();
    var icoleft = Math.ceil(a + b);
    var gdleft = icoleft + 11;
    if (icoleft > 786){  //商品最右边两个改变
      icoleft = Math.floor(a) - 12;
      var prbox = $(".prview").outerWidth();
      gdleft = icoleft - prbox + 2;
      $(".ico").css("background-position",'0 -956px');
    }else{
      icoleft = Math.ceil(a + b);
      gdleft = icoleft + 11;
      $(".ico").css("background-position", '0 -931px');
    }
    //305.5  向上去整   相距11px  0 -956
    var d = $(this).offset().top;
    var icotop = Math.ceil(d);
    var gdtop = icotop - 67;
    
    var id = $(this).attr('data-id');
    $.ajax({
      type: "post",
      url: "../api/port.php",
      data: {
        port: 'findid',
        goodid:id
      },
      success: function (str) {
        var arr = JSON.parse(str);
        var html10 = `
        <div class="primg">
                <img src="../img/${arr[0].img}" alt="">
            </div>
            <div class="prtext">
                <span>${arr[0].type} ${arr[0].author} ${arr[0].name} ${arr[0].color}</span>
                <em>产品编号：${arr[0].id}</em>
            </div>
            <div class="prprice">
                 售价：￥${arr[0].thprice}
            </div>
            <p class="prcon">
                <span>暂无评论</span>
            </p>
        `;
        $(".prview").html(html10);
      }
    })
    $('.ico').css({ 'left': icoleft, 'top': icotop});
    $('.prview').css({ 'left': gdleft, 'top': gdtop });
    $('.ico').show();
    $(".prview").show();
  })
  $('.goods').on('mouseleave','ul li',function(){
    $(".ico").hide();
    $(".prview").hide();
  })
});