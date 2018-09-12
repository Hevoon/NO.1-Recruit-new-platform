$(function () {
    $(".exit").click(function () {
        $.ajax({
            url: '/logout',
            type: 'GET',
            success: function () {
                window.location.href = "/login";
            },
            error: function () {
                window.location.href = "/login";
            }

        });
    })
});//退出


$(function () {
    $("div#page_1 form input#password_submit").click(function () {
        var old_word = $("div.form_div input#old_password").val();
        var new_word = $("div.form_div input#new_password").val();
        var re_new_word = $("div.form_div input#re_new_password").val();
        $.ajax({
            url: '/gly/cp',
            type: 'POST',
            data: {
                newpassword: new_word,
                renewpassword: re_new_word,
                oldpassword: old_word
            },
            error: function () {
                alert("修改失败");
            },
            success: function () {
                alert("修改成功,重新登陆");
                window.location.href = "/logout";
            }
        })
    })
});//修改密码


$(function () {
    $.ajax({
        url: '/gly/list',
        type: 'GET',
        success: function (r) {
            var whole_table = '';
            $.each(r.data, function (index, comment) {
                var t1 = index + 1;
                var table = '<tr>' +
                    '<td>' + t1 + '</td><td>' + comment.username + '</td><td>' + comment.studentid + '</td>' +
                    '<td>' + comment.name + '</td><td>' + comment.phone + '</td>' +
                    '<td class="search_details">查看详情</td>' +
                    '</tr>';//生成每个同学的基础列表
                var whole_detail = '';
                $.each(comment.detail, function (dex, com) {
                    var detail_c;
                    var timestamp = com.updatetime;
                    if (timestamp === null) {
                        detail_c = '<tr>' +
                            '<td class="correct_id">' + com.id + '</td><td>未批改</td><td>' + com.qid + '</td>' +
                            '<td>' + com.times + '</td><td>未批改</td><td class="new_comment">未批改</td>' +
                            '<td class="search_new">查询</td></tr>';
                    }
                    else {
                        var time = new Date(timestamp);
                        var y = time.getFullYear();
                        var m = time.getMonth() + 1;
                        var d = time.getDate();
                        var h = time.getHours();
                        var mm = time.getMinutes();
                        var s = time.getSeconds();
                        detail_c = '<tr>' +
                            '<td class="correct_id">' + com.id + '</td><td>' + y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s + '</td><td>' + com.qid + '</td>' +
                            '<td>' + com.times + '</td><td>' + com.score + '</td><td class="new_comment">' + com.comment + '</td>' +
                            '<td class="search_new">查询</td></tr>';
                    }
                    whole_detail += detail_c;
                });
                var new_detail_page = '<div class="detail_page"><h5 class="detail_head">' +
                    '<span class="detail_back_main">主页</span>><span class="detail_back_new">新人列表</span>>' +
                    '<span>新人详情</span><span class="detail_back_new back">返回</span></h5>' +
                    '<table class="table table-hover">' +
                    '<thead>' +
                    '<tr><th>批改号ID<img alt="dir" src="../images/png/glyphicons-67-tags.png" class="head">' +
                    '</th><th>批改时间</th><th>题号</th><th>提交次数</th><th>评分</th><th>评价</th><th>操作</th></tr>' +
                    '</thead>' +
                    '<tbody class="detail_tb"></tbody>' +
                    '</table>' +
                    '<div>';
                $("div#page_2 div.catch").append(new_detail_page);//给每一个同学生成一个新的详细页面
                $("div#page_2 div.detail_page tbody.detail_tb").eq(index).html(whole_detail);
                //给这个同学新生成中的列表的页面添加数据
                whole_table += table;//汇总所有同学的基础列表
                $("div#page_2 table.main tbody").html(whole_table);//将所有同学的表汇总到页面上
            });
        }
    });//获取新人列表

    $(document).on("click", ".search_new", function () {
        var id = $(this).parent().children(".correct_id").html();
        $("div.main>div").hide().siblings("div#page_5").show({duration: 500});
        $("div#page_2 div.detail_page").hide({duration: 500});
        $("div.middle_page ul li").removeClass("highlight");
        $(".search_details").removeClass("focus");
        $("#input_id").val(id);
    });
});


$(function () {
    $.ajax({
        url: '/gly/getperm',
        type: 'GET',
        success: function (r) {
            window.uid_s = [];//存储所有人的数组
            var whole_old = '';
            $.each(r.data, function (index, comment) {
                var front = "未激活";
                var background = "未激活";
                var ios = "未激活";
                var android = "未激活";
                var operation = "未激活";
                var design = "未激活";
                var obj = {};//储存这一个人具体信息的对象
                obj.uid = comment.uid;//uid
                obj.roles = comment.roles;//组别
                uid_s.push(obj);
                $.each(comment.roles, function (ind, cd) {
                    if (cd === "front") {
                        front = "激活";
                    }
                    else if (cd === "background") {
                        background = "激活";
                    }
                    else if (cd === "ios") {
                        ios = "激活";
                    }
                    else if (cd === "android") {
                        android = "激活";
                    }
                    else if (cd === "operation") {
                        operation = "激活";
                    }
                    else if (cd === "design") {
                        design = "激活";
                    }
                });//判断是否激活
                whole_old += '<tr class="teams">' +
                    '<td class="old_username">' + comment.username + '</td><td>' + comment.name + '</td><td class="old_one">' + front + '</td>' +
                    '<td  class="old_one">' + background + '</td><td class="old_one">' + ios + '</td>' +
                    '<td class="old_one">' + android + '</td><td class="old_one">' + design + '</td>' +
                    '<td class="old_one">' + operation + '</td><td class="old_deleteds">删除</td>' +
                    '</tr>';//生成每个管理人员的列表

            });
            $("div.main div#page_3 table tbody").html(whole_old);//生成管理员总表
        }
    });
    var index;
    var dir = ["front", "background", "ios", "android", "design", "operation"];
    $(document).on("click", ".old_one", function () {
        var home = $(this).parent();
        index = $("div#page_3 table tbody tr").index(home);
        if ($(this).html() === "激活") {
            $(this).html("未激活");
        }
        else {
            $(this).html("激活");
        }
        uid_s[index].roles.splice(0, uid_s[index].roles.length);
        var i;
        for (i = 0; i < 6; i++) {
            if (home.children(".old_one").eq(i).html() === "激活") {
                uid_s[index].roles.push(dir[i]);
            }
        }
    });//判断是否修改

    $("#old_sub").click(function () {
        $.each(uid_s, function (index, cd) {
            $.ajax({
                url: '/gly/setPerms',
                type: 'POST',
                dataType: 'json',
                data: {
                    uid: cd.uid,
                    roles: cd.roles
                },
                success: function (r) {
                    console.log(r.msg);
                }
            })
        });
        alert("提交成功！");
    });//提交修改的批改人权限信息


    $(document).on("click", ".old_deleteds", function () {
        var deleted_ids = $(this).parent().children(".old_username").html();
        $.ajax({
            url: '/gly/cordel',
            type: 'POST',
            data: {
                username: deleted_ids
            }
        });
        $(this).parent().remove();
    });//批改人列表


    $(document).on("click", "button#correct_add", function () {
        var usernames = $("input.correct_username").val();
        var passwords = $("input.correct_password").val();
        var phones = $("input.correct_phone").val();
        var names = $("input.correct_name").val();
        $.ajax({
            url: '/gly/addco',
            type: 'POST',
            dataType: 'json',
            data: {
                username: usernames,
                password: passwords,
                phone: phones,
                name: names
            },
            success: function () {
                alert("添加成功");
                $("div#create_correct_form input").val("");
                $("div.main div#page_3 table tbody").html("");
                $("div#page_3 table.correct_table,div#page_3 h3,div#page_3 button.correct_add_button,div#page_3 span#old_sub").show();
                $("div.main>div").hide().siblings("div#page_3").show({duration: 500});
                $("div#page_3 div.create_correct").hide({duration: 500});
                $.ajax({
                    url: '/gly/getperm',
                    type: 'GET',
                    success: function (r) {
                        window.uid_s = [];//存储所有人的数组
                        var whole_old = '';
                        $.each(r.data, function (index, comment) {
                            var front = "未激活";
                            var background = "未激活";
                            var ios = "未激活";
                            var android = "未激活";
                            var operation = "未激活";
                            var design = "未激活";
                            var obj = {};//储存这一个人具体信息的对象
                            obj.uid = comment.uid;//uid
                            obj.roles = comment.roles;//组别
                            uid_s.push(obj);
                            $.each(comment.roles, function (ind, cd) {
                                if (cd === "front") {
                                    front = "激活";
                                }
                                else if (cd === "background") {
                                    background = "激活";
                                }
                                else if (cd === "ios") {
                                    ios = "激活";
                                }
                                else if (cd === "android") {
                                    android = "激活";
                                }
                                else if (cd === "operation") {
                                    operation = "激活";
                                }
                                else if (cd === "design") {
                                    design = "激活";
                                }
                            });//判断是否激活
                            whole_old += '<tr class="teams">' +
                                '<td>' + comment.username + '</td><td>' + comment.name + '</td><td class="old_one">' + front + '</td>' +
                                '<td  class="old_one">' + background + '</td><td class="old_one">' + ios + '</td>' +
                                '<td class="old_one">' + android + '</td><td class="old_one">' + design + '</td>' +
                                '<td class="old_one">' + operation + '</td><td class="old_deleteds">删除</td>' +
                                '</tr>';//生成每个管理人员的列表
                        });
                        $("div.main div#page_3 table tbody").html(whole_old);//生成管理员总表
                    }
                });
            }
        })
    });//添加批改人
});

$(function () {
    $.ajax({
        url: '/gly/quelist',
        type: 'GET',
        dataType: 'json',
        success: function (r) {
            $.each(r.data, function (index, comment) {
                var new_des;
                new_des = '<div class="detail_page"><h5 class="detail_head">' +
                    '<span class="detail_back_mains">主页</span>><span class="detail_back_news">题目列表</span>>' +
                    '<span>题目详情</span><span class="detail_back_news back">返回</span></h5>' + '<div class="detail_des">' + comment.description + '</div></div>';
                var question = '<tr class="new">' +
                    '<td class="id">' + comment.qid + '</td><td class="q_name">' + comment.qname + '</td><td class="see_des">查看详情</td>' +
                    '<td>' + comment.level + '</td><td class="q_change">修改</td>' +
                    '<td class="q_deleted">删除</td>' +
                    '</tr>';//生成每个题目的列表
                if (comment.qgroup === "front") {
                    $("div#page_4 tr#q_1").after(question).next().addClass("question_q_1");
                    $("div#page_4 div.catch_s").after(new_des).next().addClass("q_1");
                }
                else if (comment.qgroup === "background") {
                    $("div#page_4 tr#q_2").after(question).next().addClass("question_q_2");
                    $("div#page_4 div.catch_s").after(new_des).next().addClass("q_2");
                }
                else if (comment.qgroup === "ios") {
                    $("div#page_4 tr#q_3").after(question).next().addClass("question_q_3");
                    $("div#page_4 div.catch_s").after(new_des).next().addClass("q_3");
                }
                else if (comment.qgroup === "android") {
                    $("div#page_4 tr#q_4").after(question).next().addClass("question_q_4");
                    $("div#page_4 div.catch_s").after(new_des).next().addClass("q_4");
                }
                else if (comment.qgroup === "operation") {
                    $("div#page_4 tr#q_5").after(question).next().addClass("question_q_5");
                    $("div#page_4 div.catch_s").after(new_des).next().addClass("q_5");
                }
                else if (comment.qgroup === "design") {
                    $("div#page_4 tr#q_6").after(question).next().addClass("question_q_6");
                    $("div#page_4 div.catch_s").after(new_des).next().addClass("q_6");
                }
            });
        }
    });//获取题目列表

    $(document).on("click", ".q_deleted", function () {
        var deleted_id = $(this).parent().children(".id").html();
        console.log(deleted_id);
        $.ajax({
            url: '/gly/delques',
            type: 'POST',
            data: {
                qid: deleted_id
            }
        });
        $(this).parent().remove();
    });//删除题目


    $(document).on("click", "div.main div#page_4 div#create button.aqcreat", function () {
        var name = $("input.aqname").val();
        var des = $("input.aqdes").val();
        var level_s = $("select.alevel option:selected").val();
        var groups = $("select.aqgroup option:selected").val();
        var formFile = new FormData();
        if ($("#infile")[0].files[0] === null) {
            formFile.append("file", null);
        }
        else {
            formFile.append("file", $("input#infile")[0].files[0]);
        }
        formFile.append("qname", name);
        formFile.append("description", des);
        formFile.append("qgroup", groups);
        formFile.append("maxscore", "100");
        formFile.append("level", level_s);
        console.log(formFile);
        console.log(formFile.get("file"));
        $.ajax({
            url: '/gly/setques',
            type: 'POST',
            dataType: 'json',
            cache: false,//上传文件无需缓存
            processData: false,//用于对data参数进行序列化处理 这里必须false
            contentType: false, //必须
            data: formFile,
            success: function () {
                alert("成功创建！");
                $("div#create input").val("");
                $("select.alevel option:first").prop("selected", 'selected');
                $("select.aqgroup option:first").prop("selected", 'selected');
                $("#page_4 table.gquestion,div#page_4 h3,button.cc_question,button.cs_question").show();
                $("div.main>div").hide().siblings("div#page_4").show({duration: 500});
                $("#page_4 div.create_question").hide({duration: 500});
                $("div.main div#page_4 table tr.question img").removeClass("team_up");//题目列表收缩，标志倒转
                $.ajax({
                    url: '/gly/quelist',
                    type: 'GET',
                    success: function (r) {
                        $("div#page_4 tr.new").remove();
                        $("div#page_4 div.detail_page").remove();
                        $.each(r.data, function (index, comment) {
                            var new_des = '<div class="detail_page"><h5 class="detail_head">' +
                                '<span class="detail_back_mains">主页</span>><span class="detail_back_news">题目列表</span>>' +
                                '<span>题目详情</span><span class="detail_back_news back">返回</span></h5>' + '<div class="detail_des">' + comment.description + '</div></div>';
                            $("#page_4 div.catch_s").after(new_des);
                            var question = '<tr class="new">' +
                                '<td class="id">' + comment.qid + '</td><td>' + comment.qname + '</td><td class="see_des">查看详情</td>' +
                                '<td>' + comment.level + '</td><td class="q_change">修改</td>' +
                                '<td class="q_deleted">删除</td>' +
                                '</tr>';//生成每个题目的列表
                            if (comment.qgroup === "front") {
                                $("div#page_4 tr#q_1").after(question).next().addClass("question_q_1");
                                $("div#page_4 div.catch_s").next().addClass("q_1");
                            }
                            else if (comment.qgroup === "background") {
                                $("div#page_4 tr#q_2").after(question).next().addClass("question_q_2");
                                $("div#page_4 div.catch_s").next().addClass("q_2");
                            }
                            else if (comment.qgroup === "ios") {
                                $("div#page_4 tr#q_3").after(question).next().addClass("question_q_3");
                                $("div#page_4 div.catch_s").next().addClass("q_3");
                            }
                            else if (comment.qgroup === "android") {
                                $("div#page_4 tr#q_4").after(question).next().addClass("question_q_4");
                                $("div#page_4 div.catch_s").next().addClass("q_4");
                            }
                            else if (comment.qgroup === "operation") {
                                $("div#page_4 tr#q_5").after(question).next().addClass("question_q_5");
                                $("div#page_4 div.catch_s").next().addClass("q_5");
                            }
                            else if (comment.qgroup === "design") {
                                $("div#page_4 tr#q_6").after(question).next().addClass("question_q_6");
                                $("div#page_4 div.catch_s").next().addClass("q_6");
                            }
                        });
                    }
                });
            }
        });
    });//创建题目与刷新题目列表

    $(document).on("click", "div.main div#page_4 div#create_change button.aqcreats", function () {
        var id = $("input.aqids").val();
        var name = $("input.aqnames").val();
        var des = $("input.aqdess").val();
        var level_s = $("select.alevels option:selected").val();
        var groups = $("select.aqgroups option:selected").val();
        var formFile = new FormData();
        if ($("#infiles")[0].files[0] === null) {
            formFile.append("file", null);
        }
        else {
            formFile.append("file", $("input#infiles")[0].files[0]);
        }
        formFile.append("qname", name);
        formFile.append("description", des);
        formFile.append("qgroup", groups);
        formFile.append("maxscore", "100");
        formFile.append("level", level_s);
        formFile.append("qid", id);
        $.ajax({
            url: '/gly/setques',
            type: 'POST',
            dataType: 'json',
            cache: false,//上传文件无需缓存
            processData: false,//用于对data参数进行序列化处理 这里必须false
            contentType: false, //必须
            data: formFile,
            success: function () {
                alert("成功创建！");
                $("div.main div#page_4 div#create_change input").val("");
                $("select.alevels option:first").prop("selected", 'selected');
                $("select.aqgroups option:first").prop("selected", 'selected');
                $("div#page_4 table.gquestion,div#page_4 h3,button.cc_question,button.cs_question").show();
                $("div.main>div").hide().siblings("div#page_4").show({duration: 500});
                $("div#page_4 div.create_question_change").hide({duration: 500});
                $("div.main div#page_4 table tr.question img").removeClass("team_up");//题目列表收缩，标志倒转
                $.ajax({
                    url: '/gly/quelist',
                    type: 'GET',
                    success: function (r) {
                        $("div#page_4 tr.new").remove();
                        $("div#page_4 div.detail_page").remove();
                        $.each(r.data, function (index, comment) {
                            var new_des = '<div class="detail_page"><h5 class="detail_head">' +
                                '<span class="detail_back_mains">主页</span>><span class="detail_back_news">题目列表</span>>' +
                                '<span>题目详情</span><span class="detail_back_news back">返回</span></h5>' + '<div class="detail_des">' + comment.description + '</div></div>';
                            $("#page_4 div.catch_s").after(new_des);
                            var question = '<tr class="new">' + '<td class="id">' + comment.qid + '</td><td>' + comment.qname + '</td><td class="see_des">查看详情</td>' +
                                '<td>' + comment.level + '</td><td><img src="../images/png/glyphicons-200-ban-circle.png"></td>' +
                                '<td class="q_deleted">删除</td>' +
                                '</tr>';//生成每个题目的列表
                            if (comment.qgroup === "front") {
                                $("div#page_4 tr#q_1").after(question).next().addClass("question_q_1");
                                $("div#page_4 div.catch_s").next().addClass("q_1");
                            }
                            else if (comment.qgroup === "background") {
                                $("div#page_4 tr#q_2").after(question).next().addClass("question_q_2");
                                $("div#page_4 div.catch_s").next().addClass("q_2");
                            }
                            else if (comment.qgroup === "ios") {
                                $("div#page_4 tr#q_3").after(question).next().addClass("question_q_3");
                                $("div#page_4 div.catch_s").next().addClass("q_3");
                            }
                            else if (comment.qgroup === "android") {
                                $("div#page_4 tr#q_4").after(question).next().addClass("question_q_4");
                                $("div#page_4 div.catch_s").next().addClass("q_4");
                            }
                            else if (comment.qgroup === "operation") {
                                $("div#page_4 tr#q_5").after(question).next().addClass("question_q_5");
                                $("div#page_4 div.catch_s").next().addClass("q_5");
                            }
                            else if (comment.qgroup === "design") {
                                $("div#page_4 tr#q_6").after(question).next().addClass("question_q_6");
                                $("div#page_4 div.catch_s").next().addClass("q_6");
                            }
                        });
                    }
                });
            }
        });
    });//修改题目与刷新题目列表

    $(document).on("click", "div.main div#page_4 table.gquestion td.q_change", function () {
        var id = $(this).parent().children(".id").html();
        var name = $(this).parent().children(".q_name").html();
        $("input.aqids").val(id);
        $("input.aqnames").val(name);
        $("div#page_4 table.gquestion,div#page_4 h3,button.cc_question,button.cs_question").hide();
        $("div#page_4 div.create_question_change").show({duration: 700});
        var des = $("input.aqdess").val();
        var level_s = $("select.alevels option:selected").val();
        var groups = $("select.aqgroups option:selected").val();
        var formFile = new FormData();
        if ($("#infiles")[0].files[0] === null) {
            formFile.append("file", null);
        }
        else {
            formFile.append("file", $("input#infiles")[0].files[0]);
        }
        formFile.append("qname", name);
        formFile.append("description", des);
        formFile.append("qgroup", groups);
        formFile.append("maxscore", "100");
        formFile.append("level", level_s);
        formFile.append("qid", id);
        $.ajax({
            url: '/gly/setques',
            type: 'POST',
            dataType: 'json',
            cache: false,//上传文件无需缓存
            processData: false,//用于对data参数进行序列化处理 这里必须false
            contentType: false, //必须
            data: formFile,
            success: function () {
                alert("成功创建！");
                $("div.main div#page_4 div#create_change input").val("");
                $("select.alevels option:first").prop("selected", 'selected');
                $("select.aqgroups option:first").prop("selected", 'selected');
                $("div#page_4 table.gquestion,div#page_4 h3,button.cc_question,button.cs_question").show();
                $("div.main>div").hide().siblings("div#page_4").show({duration: 500});
                $("div#page_4 div.create_question_change").hide({duration: 500});
                $("div.main div#page_4 table tr.question img").removeClass("team_up");//题目列表收缩，标志倒转
                $.ajax({
                    url: '/gly/quelist',
                    type: 'GET',
                    success: function (r) {
                        $("div#page_4 tr.new").remove();
                        $("div#page_4 div.detail_page").remove();
                        $.each(r.data, function (index, comment) {
                            var new_des = '<div class="detail_page"><h5 class="detail_head">' +
                                '<span class="detail_back_mains">主页</span>><span class="detail_back_news">题目列表</span>>' +
                                '<span>题目详情</span><span class="detail_back_news back">返回</span></h5>' + '<div class="detail_des">' + comment.description + '</div></div>';
                            $("#page_4 div.catch_s").after(new_des);
                            var question = '<tr class="new">' + '<td class="id">' + comment.qid + '</td><td>' + comment.qname + '</td><td class="see_des">查看详情</td>' +
                                '<td>' + comment.level + '</td><td><img src="../images/png/glyphicons-200-ban-circle.png"></td>' +
                                '<td class="q_deleted">删除</td>' +
                                '</tr>';//生成每个题目的列表
                            if (comment.qgroup === "front") {
                                $("div#page_4 tr#q_1").after(question).next().addClass("question_q_1");
                                $("div#page_4 div.catch_s").next().addClass("q_1");
                            }
                            else if (comment.qgroup === "background") {
                                $("div#page_4 tr#q_2").after(question).next().addClass("question_q_2");
                                $("div#page_4 div.catch_s").next().addClass("q_2");
                            }
                            else if (comment.qgroup === "ios") {
                                $("div#page_4 tr#q_3").after(question).next().addClass("question_q_3");
                                $("div#page_4 div.catch_s").next().addClass("q_3");
                            }
                            else if (comment.qgroup === "android") {
                                $("div#page_4 tr#q_4").after(question).next().addClass("question_q_4");
                                $("div#page_4 div.catch_s").next().addClass("q_4");
                            }
                            else if (comment.qgroup === "operation") {
                                $("div#page_4 tr#q_5").after(question).next().addClass("question_q_5");
                                $("div#page_4 div.catch_s").next().addClass("q_5");
                            }
                            else if (comment.qgroup === "design") {
                                $("div#page_4 tr#q_6").after(question).next().addClass("question_q_6");
                                $("div#page_4 div.catch_s").next().addClass("q_6");
                            }
                        });
                    }
                });
            }
        });
    });//由题目进入修改界面
});


$(function () {
    $("button#search_id").click(function () {
        $(".search_show").html("");
        var ID = $("#input_id").val();
        $("input#input_id").val("");
        $.ajax({
            url: '/gly/quepg',
            type: 'POST',
            data: {
                id: ID
            },
            success: function (rs) {
                var r = rs.data;
                $("input#input_id").val("");
                var html = '<tr><td class="search_name">题目方向:</td><td  class="search_show" id="qs_1">' + r.qgroup + '</td></tr>' +
                    '<tr><td class="search_name">题目名称:</td><td  class="search_show" id="qs_2">' + r.qname + '</td></tr>' +
                    '<tr><td class="search_name">题目目的:</td><td  class="search_show" id="qs_3">' + r.description + '</td></tr>' +
                    '<tr><td class="search_name">题目完成者:</td><td class="search_show" id="qs_4">' + r.name + '</td></tr>' +
                    '<tr><td class="search_name">题目批改者:</td><td class="search_show" id="qs_5">' + r.pusername + '</td></tr>' +
                    '<tr><td class="search_name">分数:</td><td class="search_show" id="qs_6">' + r.score + '</td></tr>' +
                    '<tr><td class="search_name">评语:</td><td class="search_show" id="qs_7">' + r.comment + '</td></tr>' +
                    ' <tr><td class="search_name">下载</td><td class="search_shows" id="qs_8">点击下载</td></tr>';
                $("div#page_5 table tbody").html(html);
            }
        });
        $(document).on("click", "#qs_8", function () {
            var form = $("<form></form>");//定义一个form表单
            form.attr("method", "POST");
            form.attr("style", "display:none");
            form.attr("action", "/download");//URL
            var input = $("<input type='text' name='id' />");
            input.attr("value", ID);//问题的id号
            form.append(input);
            $("body").append(form);//将表单放置在web中
            form.submit();//表单提交
        });
    });
});//改题查询