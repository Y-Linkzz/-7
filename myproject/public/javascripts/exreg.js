$(function(){
    $("#reg").on("click", () => {
      let inputEmail = $("#inputEmail").val();
      let inputPassword = $("#inputPassword").val();
      $.ajax({
        type: "post",
        url: "http://47.112.119.130:3000/reg",
        data: {
          inputEmail,
          inputPassword
        },
        success: function(str) {
            if(str.code == 1 ){
                alert(str.message);
            }else{
                alert(str.message);
            }
        }
      });
    });
    
})