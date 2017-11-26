$(function(){
    //调用函数
    loadHistory()
    /* 从本地读取localstorage  key:LT_his value:[] */
    function loadHistory(){
        var ls=localStorage;
        /* 有数据就拿到数据，没数据就拿到空数组 */
        var arr = (ls.getItem("LT_his") && JSON.parse(ls.getItem("LT_his")))||[];
        /* 判断数据 */
        if(arr.lenght<1){
            // console.log(arr.lenght);
            $(".seekTrace").html('');
            return;
        }
    //  < div class="itemList" >
    //         <span class="mui-pull-left">1</span>
    //         <a href="#" class="seekClose">
    //             <span class="mui-icon mui-icon-closeempty mui-pull-right"></span>
    //         </a>
    //         </div >
        //把数组加载出来
        var strArr=[];
        for (var index = 0; index < arr.length; index++) {
             // console.log(arr.lenght);
            strArr.push('<div class="itemList mui-clearfix" ><span class="mui-pull-left">' + arr[index] +'</span><span class="seekClose mui-icon mui-icon-closeempty mui-pull-right"></span></div >');
            // alert(strArr.push);
        }
        $(".seekTrace").html(strArr.join(''));
    }
    /* 点击搜索按钮 */
    $(".seekBtn").on("tap",function(){
        console.log("1111");
        var val = $(".seekTxt").val();
        // console.log(val);
        //去掉空格字符
        if(!$.trim(val)){
            return false;
        }
        var ls=localStorage;
        var arr = (ls.getItem("LT_his") && JSON.parse(ls.getItem("LT_his"))) ||[];      
        //要做去重
        for (var i = 0; i < arr.length; i++) {
            if(arr[i]==val){
                //删除旧的添加新的到开头
                //要删除的值的索引
                arr.splice(i,1);            
            }
        }
        //网数组的头部加新的数据
        /* 数据的尾部家数据 */
        arr.unshift(val);
        ls.setItem("LT_his",JSON.stringify(arr));
        /* 加载localstorage的数据 */
        //localstorage的数据
        //跳转的页面
        location.href="searchList.html?key="+val;

    })
    //清空
    $(".empty_history").on("tap",function(){
        localStorage.setItem("LT_his",JSON.stringify([]));
        loadHistory();

    })
    /*事件委托 */
    $("body").on("tap",".seekClose",function(){
        // console.log("111");
        /* 获取父元素的索引 */
        var index=$(this).parent().index();
        // console.log(index);
        var ls=localStorage;
        var arr=(ls.getItem("LT_his")&&JSON.parse(ls.getItem("LT_his")))||[];
        //删除数组中的元素
        arr.splice(index,1);
        /* 存值 */
        ls.setItem("LT_his",JSON.stringify(arr));
        //重新渲染
        loadHistory();
    })
})