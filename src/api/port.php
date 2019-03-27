<?php
    header("content-type:text/html;charset=utf-8"); 
    include 'common.php';
    $port = isset($_POST['port']) ? $_POST['port']:'';
    $name = isset($_POST['goodname']) ? $_POST['goodname']:'';
    $price = isset($_POST['price']) ? $_POST['price']:'';
    $page = isset($_POST['page']) ? $_POST['page']:'';
    $qty = isset($_POST['qty']) ? $_POST['qty']:'';
    $index = ($page-1) * $qty;
    /*
    分页 （懒加载）
    */
    $word = isset($_POST['word']) ? $_POST['word']:'';
    if($port == 'load'){
        $sql = "SELECT * FROM goodlist WHERE word LIKE '%$word%' LIMIT $index,$qty";
        $res = $conn->query($sql);
        $data = $res->fetch_all(MYSQLI_ASSOC);
        $sql2 = "SELECT * FROM goodlist WHERE word LIKE '%$word%'";
        $res2 = $conn->query($sql2);
        $row = $res2->num_rows;
        $goodlist = array(
            'total' => $row,
            'datalist' => $data,
            'page' => $page,
            'qty' => $qty
        );
        echo json_encode($goodlist,JSON_UNESCAPED_UNICODE);
    }
    /*
    用户验证
    */
    $phone = isset($_POST['phone']) ? $_POST['phone']:'';
    $password = isset($_POST['password']) ? $_POST['password']:'';
    if($port == 'verifyUserName'){
        $sql = "SELECT * FROM checkname WHERE PHONE = '$phone'";
        $res = $conn->query($sql);
        if($res->num_rows){
            $code = 1;
            $message = '用户已被注册';
        }else{
            $code = 0;
            $message = '可以注册该用户';
        }
        $datalist = array(
            'code' => $code,
            'message' => $message
        ); 
        echo json_encode($datalist,JSON_UNESCAPED_UNICODE);
        $res->close();
    }    
    /*
    用户注册
    */
    if($port == 'reg'){
        $sql = "INSERT INTO checkname (phone,psw) VALUES('$phone','$password')";
        $res = $conn->query($sql);
        if($res){   //注册成功 输出1
          $code = 1;
          $message = '注册成功';
        }else{
          $code = 0; //注册失败 输出0
          $message = '注册失败';
        }
        $datalist = array(
            'code' => $code,
            'message' => $message
        );
        echo json_encode($datalist,JSON_UNESCAPED_UNICODE);
    }
    /*
    用户登陆
    */
    if($port == 'login'){
        $sql = "SELECT * FROM checkname WHERE PHONE = '$phone' AND psw = '$password'";
        $res = $conn->query($sql);
        if($res->num_rows){
            $code = 1;
            $message = '登录成功';
        }else{
            $code = 0;
            $message = '登录失败';
        }
        $datalist = array(
            'username' => $phone, //返回用户名  
            'code' => $code,
            'message' => $message
        );
        echo json_encode($datalist,JSON_UNESCAPED_UNICODE);
        $res->close();
    }
    /*
    由高到低 排序
    */
    $goodcolor = isset($_POST['goodcolor']) ? $_POST['goodcolor']:'';
    //$word = isset($_POST['word']) ? $_POST['word']:'';
    if($port == 'sortDown'){
        if($goodcolor){
            $sql = "SELECT * FROM goodlist WHERE word LIKE '%$word%' AND color = '$goodcolor' order by price DESC LIMIT $index,$qty";
            $res = $conn->query($sql);
            $data = $res->fetch_all(MYSQLI_ASSOC);//得到数组
            $sql2 = "SELECT * FROM goodlist WHERE word LIKE '%$word%' AND color = '$goodcolor' order by price DESC";
            $res2 = $conn->query($sql2);
            $row = $res2->num_rows;
        }else{
            $sql = "SELECT * FROM goodlist WHERE word LIKE '%$word%' order by price DESC LIMIT $index,$qty";
            $res = $conn->query($sql);
            $data = $res->fetch_all(MYSQLI_ASSOC);//得到数组
            $sql2 = "SELECT * FROM goodlist WHERE word LIKE '%$word%' order by price DESC";
            $res2 = $conn->query($sql2);
            $row = $res2->num_rows;
        }
        $goodlist = array(
            'total' => $row,
            'datalist' => $data,
            'page' => $page,
            'qty' => $qty
        );
        echo json_encode($goodlist,JSON_UNESCAPED_UNICODE);
    }
    /*
    由低到高 排序
     */
    // $goodcolor = isset($_POST['goodcolor']) ? $_POST['goodcolor']:'';
    //$word = isset($_POST['word']) ? $_POST['word']:'';
    if($port == 'sortUp'){
        if($goodcolor){
            $sql = "SELECT * FROM goodlist WHERE word LIKE '%$word%' AND color = '$goodcolor' order by price LIMIT $index,$qty";
            $res = $conn->query($sql);
            $data = $res->fetch_all(MYSQLI_ASSOC);//得到数组
            $sql2 = "SELECT * FROM goodlist WHERE word LIKE '%$word%' AND color = '$goodcolor' order by price";
            $res2 = $conn->query($sql2);
            $row = $res2->num_rows;
        }else{
            $sql = "SELECT * FROM goodlist WHERE word LIKE '%$word%' order by price LIMIT $index,$qty";
            $res = $conn->query($sql);
            $data = $res->fetch_all(MYSQLI_ASSOC);//得到数组
            $sql2 = "SELECT * FROM goodlist WHERE word LIKE '%$word%' order by price";
            $res2 = $conn->query($sql2);
            $row = $res2->num_rows;
        }
        $goodlist = array(
            'total' => $row,
            'datalist' => $data,
            'page' => $page,
            'qty' => $qty
        );
        echo json_encode($goodlist,JSON_UNESCAPED_UNICODE);

    }
     
    //颜色选取
    //$word = isset($_POST['word']) ? $_POST['word']:'';
    
    if($port == 'gdcolor'){
        $sql3 = "SELECT * FROM goodlist WHERE color = '$goodcolor' AND word LIKE '%$word%' LIMIT $index,$qty";
        $res3 = $conn->query($sql3);
        $data3 = $res3->fetch_all(MYSQLI_ASSOC);

        $sql2 = "SELECT * FROM goodlist WHERE color = '$goodcolor' AND word LIKE '%$word%'";
        $res2 = $conn->query($sql2);
        $row = $res2->num_rows;
        $goodlist = array(
            'total' => $row,
            'datalist' => $data3,
            'page' => $page,
            'qty' => $qty
        );
        echo json_encode($goodlist,JSON_UNESCAPED_UNICODE);
    }
    /*
    查询名字 和颜色
    */
    $color = isset($_POST['color']) ? $_POST['color']:'';
    $goodname = isset($_POST['goodname']) ? $_POST['goodname']:'';
    if($port == 'find'){
        $sql = "SELECT * FROM goodlist WHERE name = '$goodname' AND color = '$color'";
        $res = $conn->query($sql);
        $row = $res->fetch_all(MYSQLI_ASSOC);//得到数组
        echo json_encode($row,JSON_UNESCAPED_UNICODE);
        $res->close();
    }
    
    
    /*
    通过ID获取商品数据
    */
    $goodid = isset($_POST['goodid']) ? $_POST['goodid']:'';
    if($port == 'findid'){
        $sql = "SELECT * FROM goodlist WHERE id = '$goodid'";
        $res = $conn->query($sql);
        $row = $res->fetch_all(MYSQLI_ASSOC);//得到数组

        echo json_encode($row,JSON_UNESCAPED_UNICODE);
        $res->close();
    }

    /*
    按照价格过滤
    */
    //$word = isset($_POST['word']) ? $_POST['word']:'';
    $pricelow = isset($_POST['pricelow']) ? $_POST['pricelow']:'';
    $pricehigh = isset($_POST['pricehigh']) ? $_POST['pricehigh']:'';
    if($port == 'filter'){
        $sql = "SELECT * FROM goodlist WHERE word LIKE '%$word%' AND price BETWEEN $pricelow AND $pricehigh LIMIT $index,$qty";
        $res = $conn->query($sql);
        $data = $res->fetch_all(MYSQLI_ASSOC);//得到数组

        $sql2 = "SELECT * FROM goodlist WHERE word LIKE '%$word%' AND price BETWEEN $pricelow AND $pricehigh";
        $res2 = $conn->query($sql2);
        $row = $res2->num_rows;
        $goodlist = array(
            'total' => $row,
            'datalist' => $data,
            'page' => $page,
            'qty' => $qty
        );
        echo json_encode($goodlist,JSON_UNESCAPED_UNICODE);
    }
    
    //购物车添加商品  && 更改商品的数量

    //$goodname = isset($_POST['goodname']) ? $_POST['goodname']:'';
    // $color = isset($_POST['color']) ? $_POST['color']:'';

    $goodnumber = isset($_POST['goodnumber']) ? $_POST['goodnumber']:'';
    $size = isset($_POST['size']) ? $_POST['size']:'';
    if($port == 'buycartInput'){
        $sql3 = "SELECT * FROM goodlist WHERE name = '$goodname' AND color = '$color'";
        $res3 = $conn->query($sql3);
        $row3 = $res3->fetch_all(MYSQLI_ASSOC);//得到数组
        // var_dump($row3[0]['id']); 获得商品id
        
        $price = $row3[0]['thprice'];
        $type = $row3[0]['type'];
        $author = $row3[0]['author'];
        $img = $row3[0]['img'];

        $sql = "SELECT * FROM buycart WHERE name = '$goodname' AND size = '$size' AND color = '$color'";
        $res = $conn->query($sql);
        if($res->num_rows){ //已有该商品
            $row = $res->fetch_all(MYSQLI_ASSOC); //获得数组
            $number = $row[0]['number'];
            $num = $number * 1 + $goodnumber * 1;
            $sql4 = "UPDATE buycart SET number = '$num' WHERE name = '$goodname' AND color = '$color' AND size = '$size'";
            $res4 = $conn->query($sql4);

        }else{ //购物车无该商品
            $sql2 = "INSERT INTO buycart(name,price,number,size,type,author,color,img) VALUES ('$goodname','$price','$goodnumber','$size','$type','$author','$color','$img')";
            $res2 = $conn->query($sql2);
            // if($res2){   //注册成功 输出1
            // $code = 1;
            // $message = '商品添加成功';
            // }else{
            // $code = 0; 
            // $message = '商品添加失败';
            // }    
        }
        $sql5 = "SELECT SUM(number) FROM buycart"; //获取总的数量
        $res5 = $conn->query($sql5); //总的数量
        $row5 = $res5->fetch_all(MYSQLI_ASSOC);
        $allnum = $row5[0];
        //总价格
        $sql6 = "SELECT SUM(price * number) FROM buycart";//总价格
        $res6 = $conn->query($sql6); 
        $row6 = $res6->fetch_all(MYSQLI_ASSOC);
        $allprice = $row6[0];

        //商品的数据
        $datalist = array(
                'allnum' => $allnum,
                'allprice' => $allprice
            );
        echo json_encode($datalist,JSON_UNESCAPED_UNICODE);
    }

    //购物车的商品数据
    if($port == 'buycartgoods'){
        $sql = "SELECT * FROM buycart";
        $res = $conn->query($sql); 
        $row = $res->fetch_all(MYSQLI_ASSOC);
        //获取总的数量
        $sql5 = "SELECT SUM(number) FROM buycart"; 
        $res5 = $conn->query($sql5); //总的数量
        $row5 = $res5->fetch_all(MYSQLI_ASSOC);
        $allnum = $row5[0];
        //总价格
        $sql6 = "SELECT SUM(price * number) FROM buycart";//总价格
        $res6 = $conn->query($sql6); 
        $row6 = $res6->fetch_all(MYSQLI_ASSOC);
        $allprice = $row6[0];
        //集合数据
        $datalist = array(
                'data' => $row,
                'allnum' => $allnum,
                'allprice' => $allprice
            );
        echo json_encode($datalist,JSON_UNESCAPED_UNICODE);
    }
    //购物车商品删除
    if($port == 'buycartDel'){
        $sql = "DELETE FROM buycart WHERE id = '$goodid'";
        $res = $conn->query($sql);
    }
    // $goodnumber = isset($_POST['goodnumber']) ? $_POST['goodnumber']:'';
    // $goodid = isset($_POST['goodid']) ? $_POST['goodid']:'';
    if($port == 'numchange'){
        $sql = "UPDATE buycart SET number = '$goodnumber' WHERE id = '$goodid'";
        $res = $conn->query($sql);
    }
    //留言
    $content = isset($_POST['content']) ? $_POST['content']:'';
    $username = isset($_POST['username']) ? $_POST['username']:'';
    $date = isset($_POST['date']) ? $_POST['date']:'';
    if($port == 'message'){
        $sql = "INSERT INTO message(content,username,time) VALUES ('$content','$username','$date')";
        $res = $conn->query($sql);
    }
    //获取留言数据
    if($port == 'getmessage'){
        $sql = "SELECT * FROM message";
        $res = $conn->query($sql);
        $row = $res->fetch_all(MYSQLI_ASSOC);
        echo json_encode($row,JSON_UNESCAPED_UNICODE);
    }

    
    $conn -> close();
?>