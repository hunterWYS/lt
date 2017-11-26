$(function(){
/* ============一级分类============ */
firstClass();
    function firstClass() {
        $.maskShow();
        /*请求ajax */
        $.ajax({
            /* 拿到数据 */
            url: "/category/queryTopCategory",
            /* 成功时的回调函数 */
            success:function(result){
                // console.log(result);
                /* 拿到对应的数组对象 */
                var rows=result.rows;
                /* 定义字符串数组 */
                var strArr=[];
                // console.log(rows);
                /* 遍历rows数据的条数 */
                for (var i = 0; i < rows.length; i++) {
                    // console.log(rows[i]);
                    // <li><a href="#">1</a></li>
                    /* 动态生成li */
                    strArr.push('<li data-id='+rows[i].id+'><a href="#">'+rows[i].categoryName+'</a></li>')
               }
               /* 渲染到页面，是字符串格式 */
                $(".lt_menu>ul").html(strArr.join(''));
                secondLevel(rows[0].id);
                $.maskclose();
            }
        }) 
    }
/* ===============二级分类============ */
    function secondLevel(id) {
        /* ajax请求 */
        $.ajax({
            // 拿到地址数据
            url:"/category/querySecondCategory?id="+id,
             success:function(result){
                // console.log(result);
                var rows=result.rows;
                var strArr=[];
                if (rows.length > 0) {
                for(var i = 0;i < rows.length; i++){
                // <li><a href="#"><img src="./images/brand1.png" alt=""><p>111</p></a></li>
                        strArr.push('<li><a href="#"><img src="'+rows[i].brandLogo+'" alt=""><p>'+rows[i].brandName+'</p></a></li>');
                    }
                    $(".lt_centent>ul").html(strArr.join(''));
                }else{
                    $(".lt_centent>ul").html("没有跟多内容了");
                }
                $.maskclose();
            }
        })
    }
    $(".lt_menu").on("tap","li",function(){
        var id=$(this).data("id");
        secondLevel(id);
    })
})
