$(function () {
    /* 给分类注册事件 */
    $(".lt_li2").on("click",function () {
        // $(".classify").toggleClass("classify_avtion")
        $(this).find(".classify").slideToggle();
        // alert(111);
    })
    /*给左边导航栏注册事件*/
    $(".lt_left_toggle").on("click",function(){
        // alert(111);
        $(".lt_title").toggleClass("classify_avtion");
        $(".lt_view").toggleClass("list_action");
    })

    /*点击右边退出到登录页面 */
    $(".lt_right_skip").click(function(){
        $.ajax({
            url: "/employee/employeeLogout",
            type:"get",
            success: function (result) {
                // console.log(result);
                if(result.success){
                    location.href="/admin/login.html";
                }
            }
        })
    })

})