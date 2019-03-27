<?php
    //配置参数
    $servername = 'localhost';
    $username = 'root';
    $password = '';
    $dbname = 'h51812';
    //建立链接：$conn对象  js中调用对象的属性  arr.lenght 
	//php调用属性和方法  ->   $conn -> lenght
    $conn = new mysqli($servername,$username,$password,$dbname);
    //判断是否连接成功
    if($conn ->connect_error){
        die('出错原因是:'.$conn->connect_error);
    }
	//数据库是中文 但是接受的中文是乱码mysqli_set_charset($con,'utf8');
    // echo '连接成功';
?>