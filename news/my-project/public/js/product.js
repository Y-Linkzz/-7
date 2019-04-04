let submit = document.getElementById('submit');
console.log(file, submit);
// var $ = require("jquery");

// $.ajax({
//     type: "get",
//     url: "http://localhost:3000/find/",
//     data: "zhangan=1",
//     // dataType: "dataType",
//     success: function(response) {
//         console.log(response);
//     }
// });



let xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
        let res = JSON.parse(xhr.responseText);
        let ulList = document.getElementById("imglist")
            // ulList.innerHTML = res.map(function(item) {
            //     return `<li>

        //         <a href="#">

        //             <img class="am-img-thumbnail am-img-bdrs" src="js/${item.url}" alt="">

        //             <div class="gallery-title">${item.name}</div>

        //         </a>

        //     </li>`;
        // }).join("");
        console.log(res);

    }
}
xhr.open('GET', "http://localhost:3000/find/", true);
xhr.send();


submit.onclick = () => {
    let file = document.getElementById('file');
    // 选择单个文件  二进制对象
    console.log(file.files[0]);
    // ajax
    let xhr = new XMLHttpRequest();
    // addHeader('Access-Control-Allow-Origin:*');
    xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // console.log(xhr.responseText);
                console.log("123");
            }
        }
        // 获取文件后缀
    let name = file.files[0].name;
    xhr.open('POST', `http://localhost:3000/stream/?name=${name}`, true);
    // 设置请求头 设置文件类型
    // xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    // 设置请求体
    xhr.send(file.files[0]);
}