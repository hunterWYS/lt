$(function(){
    $(".loginBtn").on("tap",function(){
        var user = $(".userTxt").val();
        var paw = $(".pawTxt").val();
        /* 判断用户名和密码 */
        if(!$.trim(user)){
            mui.toast("请输入合法的用户名");
            return false;
        }
        if(!$.trim("paw")){
            mui.toast("请输入合法的密码");
            return false;
        }

        $.ajax({
            url:"/user/login",
            type:"post",
            data:$("form").serialize(),
            success:function(result){
                // console.log(result);
                if(result.success){
                    location.href=$.getURLParams("returnUrl");
                }else{
                    mui.toast(result.message);
                }
            }
        })
    })


})