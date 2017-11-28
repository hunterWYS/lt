$(function () {
    $('form').bootstrapValidator({
            // 图标
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            // 要验证的字段
            fields: {
                // 用户名 
                username: {
                    // 用户名的提示信息
                    // message: 'The username is not valid',
                    validators: {
                        // 不能为空
                        notEmpty: {
                            message: '用户名不能为空'
                        },
                        // 提供给ajax回调使用
                        callback: {
                            message: "用户名不存在"
                        }
                    }
                },
                password: {
                    // 用户名的提示信息
                    // message: 'The username is not valid',
                    validators: {
                        // 不能为空
                        notEmpty: {
                            message: '密码不能为空'
                        },
                        // 长度 
                        stringLength: {
                            min: 6,
                            max: 18,
                            message: '密码不能少于5位'
                        },
                        // 提供给ajax回调使用
                        callback: {
                            message: "密码错误"
                        }

                    }
                }
            }
        })
        .on('success.form.bv', function (e) {
            // 点击提交的时候  

            // 阻止默认提交事件
            e.preventDefault();
            // Get the form instance
            var $form = $(e.target);
            // 提交到后台

            $.ajax({
                url: "/employee/employeeLogin",
                type: "post",
                data: $form.serialize(),
                success: function (result) {
                    // console.log(result);
                    // 手动调用验证提示 updateStatus("要更新的字段","验证状态","提示信息")
                    // $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                    if (result.error && result.error == 1000) {
                        $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                    } else if (result.error && result.error == 1001) {
                        $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                    } else if (result.success) {
                        location.href = "index.html";
                    }
                }
            })
        });


    // 重置验证信息
    // $('form').data('bootstrapValidator').resetForm();

    $(window).ajaxStart(function () {
        // 开始进度
        NProgress.start(); // 进度条开始
    });
    $(window).ajaxStop(function () {
        // 结束进度条
        NProgress.done(); // 完成
    });

})