$(function () {
    var Querypage = {
        page: 1,
        pageSize: 5,
        totalpage: 1,
    }
    queryTopCategoryPaging(setpagintion);
    // /category/queryTopCategoryPaging
    function queryTopCategoryPaging(callback) {
        $.ajax({
            url: "/category/queryTopCategoryPaging",
            data: Querypage,
            success: function (result) {
                // console.log(result);
                Querypage.totalpage = Math.ceil(result.total / Querypage.pageSize);
                // console.log(Querypage.totalpage);
                var html = template("mainTbl", result);
                $(".apply").html(html);
                callback && callback(result);
            }
        })
    }

    /* 设置分页 */
    // /category/addSecondCategory
    function setpagintion() {
        var options = {
            bootstrapMajorVersion: 3,
            currentPage: Querypage.page,
            totalPages: Querypage.totalpage,
            onPageClicked: function (e, on, type, page) {
                Querypage.page = page;
                queryTopCategoryPaging();
            }
        }
        $(".pagination").bootstrapPaginator(options);
    }

    $(".add_ok").click(function () {
        var categoryName = $.trim($(".categoryName").val());
        if (!categoryName) {
            $(".categoryName").parent().addClass("has-error");
            return false;
        }
        /* 发送请求 */
        $("#myModaladd").modal("hide");
        queryTopCategoryPaging(setpagintion);

    })


    // function addTopCategory(categoryName, callback) {
    //     $.ajax({
    //         url: "/category/addTopCategory",
    //         type: "post",
    //         data: {categoryName: categoryName},
    //         success: function (result) {
    //             // console.log(result);
    //             callback && callback(result);
    //         }
    //     })
    // }
    // /* 添加分类 显示对话框 */
    // $(".show_add_modal").click(function () {
    //     /* 表单重置 */
    //     $(".categoryName").val("");
    //     $(".categoryName").parent().removeClass("has-error");
    // })
})