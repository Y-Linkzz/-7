$(function(){
    //设置弹窗的位置 

    var popleft = (window.innerWidth - $(".popup").outerWidth()) / 2;
    $(".popup").css({ 'top': "190.5px", "left": popleft });

    //弹窗点击确认
    $(".popbtn").on("click",".popsure", function() {
      $(".popup").hide();
    });
    //关闭弹窗
    $(".popclose").on('click', function () {
        $(".popup").hide();
    })
    $(".popbtn").on("click", ".popcancel", function() {
      $(".popup").hide();
    });

    //滑动弹窗

    $(".popup").mousedown(function (ev) {
        var disX = ev.offsetX;
        var disY = ev.offsetY;
        $(document).mousemove(function (ev) {
            var Left = ev.clientX - disX; //鼠标移动获取left
            var Top = ev.clientY - disY;//鼠标移动获取top
            if (Left <= 0) {
                Left = 0;
            } else if (Left >= window.innerWidth - $(".popup").outerWidth()) {
                Left = window.innerWidth - $(".popup").outerWidth()
            }
            if (Top <= 0) {
                Top = 0;
            } else if (Top >= window.innerHeight - $(".popup").outerHeight()) {
                Top = window.innerHeight - $(".popup").outerHeight();
            }
            $(".popup").css({ 'top': Top, "left": Left });
        })
        $(document).mouseup(function () {
            $(document).off("mousemove");//取消鼠标滑动
        });
    })

})
    
