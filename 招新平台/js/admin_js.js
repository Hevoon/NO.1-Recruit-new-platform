$(function () {
    var changes=$("div.middle_page ul li.change");
    changes.click(function () {
        $(this).addClass("highlight").siblings().removeClass("highlight");
        $("div#page_2 table.main,div#page_2 h3").show();
        $("div#page_2 div.detail_page").hide();//把详情操作同时隐藏
        var index=changes.index(this);
        $("div.main>div").eq(index).show({duration:500}).siblings().hide({duration:500});
        $("div.main>div table tr td").removeClass("focus");//去掉新人列表的focus类
    });
});//隐藏操作列表
// $(function(){
//         $(".team").click(function () {
//             var index=$(".team").index(this);
//             $(this).siblings('.team_'+this.id).toggle();
//             if( $(this).siblings('.team_'+this.id).is(":visible")){
//                 $("div.main div#page_2 table img").eq(index+1).addClass("team_up");
//             }else {
//                 $("div.main div#page_2 table img").eq(index+1).removeClass("team_up");
//             }
//         });
// });//新人列表的收缩
$(document).ready(function () {
    $(".question").click(function () {
        var index=$(".question").index(this);
        $(this).siblings('.question_'+this.id).toggle();
        if( $(this).siblings('.question_'+this.id).is(":visible")){
            $("div.main div#page_4 table tr.question img").eq(index).addClass("team_up");
        }else {
            $("div.main div#page_4 table tr.question img").eq(index).removeClass("team_up");
        }
    });
});//题目列表收缩
// $(function(){
//     $(".teams").click(function () {
//         var index=$(".teams").index(this);
//         $(this).siblings('.team_'+this.id).toggle();
//         if( $(this).siblings('.team_'+this.id).is(":visible")){
//             $("div.main div#page_3 table img").eq(index+1).addClass("team_up");
//         }else {
//             $("div.main div#page_3 table img").eq(index+1).removeClass("team_up");
//         }
//     });
// });//批改人列表的收缩
$(function () {
    $("div.main >div h3.paging_head span.back_main").click(function () {
        $("div.main>div").hide({duration:500}).siblings("div.page_show").show({duration:500});
        $("div.middle_page ul li").removeClass("highlight");
        $(".search_details").removeClass("focus")
    })
});//返回主页
$(function () {
    var t=false;
    $("header.header ul li.btn_2 img,header.header ul li.btn_2 span").click(function () {
        $("header.header ul li.btn_2 div.drop-menu").slideToggle(500);
       if(t===false) {
           $("header.header ul li.btn_2").addClass("focus");
           t=true;
       }else {
           $("header.header ul li.btn_2").removeClass("focus");
           t=false;
       }
    });
});//下拉菜单
$(document).on("click",".search_details",function () {
    $("div#page_2 table.main,div#page_2 h3").hide({duration:500});
    var index=$("div#page_2  table.main td.search_details").index(this);
    $(".search_details").removeClass("focus").eq(index).addClass("focus");
    $("div#page_2 div.detail_page").eq(index).show({duration:500});
});//由新人列表切换到详情列表
$(document).on("click",".detail_back_main",function () {
    $("div#page_2 table.main,div#page_2 h3").show();
    $("div.main>div").hide().siblings("div.page_show").show({duration:500});
    $("div#page_2 div.detail_page").hide({duration:500});
    $("div.middle_page ul li").removeClass("highlight");
    $(".search_details").removeClass("focus");
});//由新人详情列表返回主页
$(document).on("click",".search_details",function () {
    $("div#page_2 table.main,div#page_2 h3").hide({duration:500});
    var index=$("div#page_2  table.main td.search_details").index(this);
    $(".search_details").removeClass("focus").eq(index).addClass("focus");
    $("div#page_2 div.detail_page").eq(index).show({duration:500});
});//由新人列表切换到详情列表
$(document).on("click",".detail_back_main",function () {
    $("div#page_2 table.main,div#page_2 h3").show();
    $("div.main>div").hide().siblings("div.page_show").show({duration:500});
    $("div#page_2 div.detail_page").hide({duration:500});
    $("div.middle_page ul li").removeClass("highlight");
    $(".search_details").removeClass("focus");
});//返回主页
$(document).on("click",".detail_back_new",function () {
    $("div#page_2 table.main,div#page_2 h3").show();
    $("div.main>div").hide().siblings("div#page_2").show({duration:500});
    $("div#page_2 div.detail_page").hide({duration:500});
});//返回新人列表
$(document).on("click",".delete_new",function () {
    alert("本次操作即将进行");
    $(this).parent().remove();
});//删除新人详情列表