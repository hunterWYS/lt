$(function(){

    var VCODE=null;

    $(".loginBtn").on("tap",function(){

        var data={
            username:$.trim($(".mobile").val()),
            password:$.trim($(".password").val()),
            mobile:$.trim($(".mobile").val()),
            vCode:$.trim($(".vCode").val()),
        };
        // console.log(data);
        if (!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(data.mobile)){
            mui.toast("请输入合法的手机号");
            return false;
        }
        if(data.password.length<6){
            mui.toast("请输入合法的密码");
            return false;
        }
        if(data.password!==$.trim($(".password1").val())){
            mui.toast("两次密码不一致");
            return false;
        }
        if (data.vCode.length!=6){
            mui.toast("请输入合法的验证码");
            return false;
        }
        if (data.vCode !== VCODE){
            mui.toast("验证码错误");
            return false;
        }


        $.ajax({
            url:"/user/register",
            type:"post",
            data:data,
            success:function(result){
                console.log(result);
                if(result.success){
                    mui.toast("登录成功");
                    setTimeout(function(){
                        location.href="login.html";
                    }, 1000);
                }
                if(result.error&&result.error==403){
                    mui.toast(result.message);
                }
            }
        })
    })


    $(".verifyBtn").on("tap",function(){
        if($(this).attr("disabled")==true){
            //当前不能点击
            return false;    
        }
        $(this).attr("disabled",true);
        var shat=this;
        // 修改文字
        $(shat).html("正在发送...");
        $.ajax({
            url:"/user/vCode",
            type:"get",
            success:function(result){
                // console.log(result);
                VCODE=result.vCode;
                console.log(VCODE);
                var time=10;
             var timeId=setInterval(function(){
                //  alert(111);
                 time--;
                 $(shat).html(time+"秒后在获取");
                 if(time==0){
                     clearInterval(timeId);
                     $(shat).removeAttr("disabled");
                     $(shat).html("获取验证码");
                 }
             },1000)
            }
        })
    })
})