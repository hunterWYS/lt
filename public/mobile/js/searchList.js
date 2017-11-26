$(function () {
    var queryObj = {
        proName: "",
        brandId: "",
        price: "",
        num: "",
        page: 1,
        pageSize: 6,
    };
    queryObj.proName = $.getURLParams("key");
    var count = 1;
    /* =================下拉刷新============== */
    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                height: 50, //可选,默认50.触发下拉刷新拖动距离,
                auto: true, //可选,默认false.首次加载自动下拉刷新一次
                contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function () { //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    setTimeout(function () {
                        queryObj.page = 1;
                        queryProduct(function (result) {
                            // console.log(result);
                            count = result.count;
                            var html = template("queryTop", result);
                            $(".seekTrace").html(html);
                            /* 結束下拉刷新 */
                            mui('#refreshContainer').pullRefresh().endPulldownToRefresh(false);
                            mui('#refreshContainer').pullRefresh().refresh(true);
                        });
                    }, 1000)
                }
            },
            up: {
                height: 50, //可选.默认50.触发上拉加载拖动距离
                auto: true, //可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: function () { //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    var totalpage = Math.ceil(count / queryObj.pageSize);
                    setTimeout(function () {
                        //判断
                        if (queryObj.page > totalpage) {
                            //继续请求数据
                            queryObj.page++;
                            queryProduct(function (result) {
                                var html = template("queryTop", result);
                                $(".seekTrace").append(html);
                                //有数据传入false 则无其他显示
                                mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
                            })
                        } else {
                            //  alert(111);
                            //没有数据就传入  true给出用户提示 没有更多数据了
                            mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                        }
                    }, 1000);
                }
            }
        }
    });
    /* ================發送ajax請求================ */
    function queryProduct(callback) {
        $.ajax({
            url: "http://127.0.0.1:3002/product/queryProduct",
            data: queryObj,
            success: function (result) {
                callback && callback(result);
            }
        });
    }
   
    /*============点击搜索=======  */
    $(".seekBtn").on("tap", function () {

        var val = $(".seekTxt").val();
        if (!$.trim(val)) {
            //用户提示 请输入关键字
            mui.toast("请输入关键字");

        } else {
            queryObj.proName = val;
            //手动出发下拉
            mui("#refreshContainer").pullRefresh().pulldownLoading();
        }
    })
    //=============点击排序=============
    $(".seek_empty>a").on("tap", function () {
        $(this).addClass("active").siblings().removeClass("active");

        $(this).find(".mui-icon").toggleClass("mui-icon-arrowdown mui-icon-arrowup");
        var sort = -1;
        if ($(this).find(".mui-icon").hasClass("mui-icon-arrowup")) {
            sort = 1;
        } else {
            sort = 2;
        }
        //获取要排序的关键字
        if ($(this).data("sortname") == "price") {
            queryObj.price = sort;
            queryObj.num = "";
        }
        if ($(this).data("sortname") == "num") {
            queryObj.num = sort;
            queryObj.price = "";
        }
        //手动出发下拉
        mui("#refreshContainer").pullRefresh().pulldownLoading();
    })
})