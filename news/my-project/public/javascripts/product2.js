$(function () {
    //上传文件按钮
    $("#btn").click(function(){
        $("#file").click();
    })
    //删除产品
    $("#imglist").on('click','.prclose',function(){
        var res = confirm('您确定删除该产品吗？');
        if(res){
            var id = $(this).parent().attr('data-id');
            $(this).parent().remove();
            $.ajax({
                type: 'post',
                url: 'http://47.112.119.130:3000/delete',
                data: {
                    _id: id
                },
                success: function (str) {

                }
            })
        }
        

    })

    function updata() {
        $.ajax({
            type: 'post',
            url: 'http://47.112.119.130:3000/updata',
            success: function (str) {
                console.log(str);
                var html = '';
                $(str).each(function (i, item) {                               //http://47.112.119.130:3000/
                    html += `<li data-id="${item._id}">
                            <span class="prclose">X</span>
                            <a href="#">                                                
                                <img class="am-img-thumbnail am-img-bdrs" src="http://47.112.119.130:3000/uploads/&${
                                  item.path
                                }" alt="" width="150px" style="height:150px">
                                <div class="gallery-title" style="text-align: center;">${
                                  item.name
                                }</div>
                            </a>
                        </li>`;
                })
                $("#imglist").html(html);
            }
        })
    }
    updata();
    var fileNode = document.getElementById("file");
    fileNode.onchange = function () {
        var filename = $.trim(prompt('请输入文件的名称:'));
        if (filename){
            var xmlhttp = new XMLHttpRequest();
            //设置回调，当请求的状态发生变化时，就会被调用  
            xmlhttp.onreadystatechange = function () {
                //上传成功，返回的文件名，设置到父节点的背景中  
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    console.log(JSON.parse(xmlhttp.responseText));
                    var arr = JSON.parse(xmlhttp.responseText);
                    var html = `<li data-id="${arr.id}">
                                <span class="prclose">X</span>
                                    <a href="#">
                                        <img class="am-img-thumbnail am-img-bdrs" src="http://47.112.119.130:3000/uploads/&${arr.path}" alt="" width="150px" style="height:150px">
                                        <div class="gallery-title" style="text-align: center;">${arr.name}</div>
                                    </a>
                                </li>`;
                    $("#imglist").append(html);
                }
            }
            //构造form数据 
            var data = new FormData();
            // console.log(fileNode.files)
            data.append("logo", fileNode.files[0]);
            data.append("filename", filename); //加数据
            // console.log(data)
            //设置请求，true：表示异步  
            xmlhttp.open("post", "http://47.112.119.130:3000/file/upload-single", true);
            //不要缓存  
            //xmlhttp.setRequestHeader("If-Modified-Since", "0");  
            //提交请求
            xmlhttp.send(data);
            //清除掉，否则下一次选择同样的文件就进入不到onchange函数中了  
            fileNode.value = null;
        }else{
            alert('不能为空');
            fileNode.value = null;
        }
        
    }
})