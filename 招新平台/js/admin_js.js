$(function () {
    var changes = $("div.middle_page ul li.change");
    changes.click(function () {
        $(this).addClass("highlight").siblings().removeClass("highlight");
        $("div#page_2 table.main,div#page_2 h3").show();
        $("div#page_4 table.gquestion,div#page_4 h3,button.cc_question,button.cs_question").show();
        $("div#page_3 table.correct_table,div#page_3 h3,div#page_3 button.correct_add_button,div#page_3 span#old_sub").show();
        $("div#page_2 div.detail_page").hide();
        $("div#page_4 div.detail_page").hide();//把题目详情同时隐藏
        $("div#page_4 div.create_question").hide();//把创建题目隐藏
        $("div#page_4 div.create_question_change").hide();
        $("div#page_3 div.create_correct").hide();
        var index = changes.index(this);
        $("div.main>div").eq(index).show({duration: 500}).siblings().hide({duration: 500});
        $("div.main>div table tr td").removeClass("focus");//去掉新人列表的focus类
        $(".question_q_1,.question_q_2,.question_q_3,.question_q_4,.question_q_5,.question_q_6,.question_q_7").hide();
        $("div.main div#page_4 table tr.question img").removeClass("team_up");//题目列表收缩，标志倒转
    });
});//切换操作列表
$(document).ready(function () {
    $(".question").click(function () {
        var index = $(".question").index(this);
        $(this).siblings('.question_' + this.id).toggle();
        if ($(this).siblings('.question_' + this.id).is(":visible")) {
            $("div.main div#page_4 table tr.question img").eq(index).addClass("team_up");
        } else {
            $("div.main div#page_4 table tr.question img").eq(index).removeClass("team_up");
        }
    });
});//题目列表收缩
$(function () {
    $("div.main >div h3.paging_head span.back_main").click(function () {
        $("div.main>div").hide({duration: 500}).siblings("div.page_show").show({duration: 500});
        $("div.middle_page ul li").removeClass("highlight");
        $(".search_details").removeClass("focus")
    })
});//返回主页
$(function () {
    var t = false;
    $("header.header ul li.btn_2 img,header.header ul li.btn_2 span").click(function () {
        $("header.header ul li.btn_2 div.drop-menu").slideToggle(500);
        if (t === false) {
            $("header.header ul li.btn_2").addClass("focus");
            t = true;
        } else {
            $("header.header ul li.btn_2").removeClass("focus");
            t = false;
        }
    });
});//下拉菜单
$(document).on("click", ".search_details", function () {
    $("div#page_2 table.main,div#page_2 h3").hide({duration: 500});
    var index = $("div#page_2  table.main td.search_details").index(this);
    $(".search_details").removeClass("focus").eq(index).addClass("focus");
    $("div#page_2 div.detail_page").eq(index).show({duration: 500});
});//由新人列表切换到详情列表
$(document).on("click", ".detail_back_main", function () {
    $("div#page_2 table.main,div#page_2 h3").show();
    $("div.main>div").hide().siblings("div.page_show").show({duration: 500});
    $("div#page_2 div.detail_page").hide({duration: 500});
    $("div.middle_page ul li").removeClass("highlight");
    $(".search_details").removeClass("focus");
});//由新人详情列表返回主页
$(document).on("click", ".detail_back_new", function () {
    $("div#page_2 table.main,div#page_2 h3").show();
    $("div.main>div").hide().siblings("div#page_2").show({duration: 500});
    $("div#page_2 div.detail_page").hide({duration: 500});
});//返回新人列表
$(document).on("click", "tr.question_q_1 td.see_des", function () {
    $("div#page_4 table.gquestion,div#page_4 h3,button.cc_question,button.cs_question").hide();
    var index = $("div#page_4  tr.question_q_1 td.see_des").index(this);
    $("div#page_4 table.gquestion td.see_des").removeClass("focus");
    $("tr.question_q_1 td.see_des").eq(index).addClass("focus");
    $("div#page_4 div.q_1").eq(index).show({duration: 700});
});
$(document).on("click", "tr.question_q_2 td.see_des", function () {
    $("div#page_4 table.gquestion,div#page_4 h3,button.cc_question,button.cs_question").hide();
    var index = $("div#page_4 tr.question_q_2  td.see_des").index(this);
    $("div#page_4 table.gquestion td.see_des").removeClass("focus");
    $("tr.question_q_2 td.see_des").eq(index).addClass("focus");
    $("div#page_4 div.q_2").eq(index).show({duration: 700});
});
$(document).on("click", "tr.question_q_3 td.see_des", function () {
    $("div#page_4 table.gquestion,div#page_4 h3,button.cc_question,button.cs_question").hide();
    var index = $("div#page_4  tr.question_q_3 td.see_des").index(this);
    $("div#page_4 table.gquestion td.see_des").removeClass("focus");
    $("tr.question_q_3 td.see_des").eq(index).addClass("focus");
    $("div#page_4 div.q_3").eq(index).show({duration: 700});
});
$(document).on("click", "tr.question_q_4 td.see_des", function () {
    $("div#page_4 table.gquestion,div#page_4 h3,button.cc_question,button.cs_question").hide();
    var index = $("div#page_4  tr.question_q_4 td.see_des").index(this);
    $("div#page_4 table.gquestion td.see_des").removeClass("focus");
    $("tr.question_q_4 td.see_des").eq(index).addClass("focus");
    $("div#page_4 div.q_4").eq(index).show({duration: 700});
});
$(document).on("click", "tr.question_q_5 td.see_des", function () {
    $("div#page_4 table.gquestion,div#page_4 h3,button.cc_question,button.cs_question").hide();
    var index = $("div#page_4  tr.question_q_5 td.see_des").index(this);
    $("div#page_4 table.gquestion td.see_des").removeClass("focus");
    $("tr.question_q_5 td.see_des").eq(index).addClass("focus");
    $("div#page_4 div.q_5").eq(index).show({duration: 700});
});
$(document).on("click", "tr.question_q_6 td.see_des", function () {
    $("div#page_4 table.gquestion,div#page_4 h3,button.cc_question,button.cs_question").hide();
    var index = $("div#page_4  tr.question_q_6 td.see_des").index(this);
    $("div#page_4 table.gquestion td.see_des").removeClass("focus");
    $("tr.question_q_6 td.see_des").eq(index).addClass("focus");
    $("div#page_4 div.q_6").eq(index).show({duration: 700});
});
//由题目列表切换到详情列表
$("div#page_4 button.cc_question").click(function () {
    $("div#page_4 table.gquestion,div#page_4 h3,button.cc_question,button.cs_question").hide();
    $("div#page_4 div.create_question").show({duration:700});
});//由题目列表切换创建题目列表
$("div#page_4 button.cs_question").click(function () {
    $("div#page_4 table.gquestion,div#page_4 h3,button.cc_question,button.cs_question").hide();
    $("div#page_4 div.create_question_change").show({duration:700});
});//由题目列表切换修改题目列表
$(document).on("click", ".detail_back_mains", function () {
    $("div#page_4 table.gquestion,div#page_4 h3,button.cc_question,button.cs_question").show();
    $("div.main>div").hide().siblings("div.page_show").show({duration: 500});
    $("div#page_4 div.detail_page").hide({duration: 500});//题目详情
    $("div#page_4 div.create_question").hide({duration:500});//创建题目
    $("div#page_4 div.create_question_change").hide({duration:500});
    $("div.middle_page ul li").removeClass("highlight");
    $(".see_des").removeClass("focus");
});//由题目详情,创建题目列表返回主页
$(document).on("click", ".detail_back_news", function () {
    $("div#page_4 table.gquestion,div#page_4 h3,button.cc_question,button.cs_question").show();
    $("div.main>div").hide().siblings("div#page_4").show({duration: 500});
    $("div#page_4 div.create_question_change").hide({duration:500});
    $("div#page_4 div.create_question").hide({duration:500});
    $("div#page_4 div.detail_page").hide({duration: 500});
});//题目详情返回题目列表，创建题目返回题目列表
$("div#page_3 button.correct_add_button").click(function () {
    $("div#page_3 table.correct_table,div#page_3 h3,div#page_3 button.correct_add_button,div#page_3 span#old_sub").hide();
    $("div#page_3 div.create_correct").show({duration:700});
});//由批改人列表切换到添加批改人页面
$(document).on("click", ".detail_back_main_correct", function () {
    $("div#page_3 table.correct_table,div#page_3 h3,div#page_3 button.correct_add_button,div#page_3 span#old_sub").show();
    $("div.main>div").hide().siblings("div.page_show").show({duration: 500});
    $("div#page_3 div.create_correct").hide({duration: 500});
    $("div.middle_page ul li").removeClass("highlight");
});//由添加批改人页面返回主页
$(document).on("click", ".detail_back_new_correct", function () {
    $("div#page_3 table.correct_table,div#page_3 h3,div#page_3 button.correct_add_button,div#page_3 span#old_sub").show();
    $("div.main>div").hide().siblings("div#page_3").show({duration: 500});
    $("div#page_3 div.create_correct").hide({duration:500});
});//由添加批改人页面返回批改人页面