/**
 * Created by Administrator on 2018/5/11 0011.
 */
//jQuery入口函数
jQuery(function($){

    //京东subnav
    //展示小li的默认背景
    var num = 0;
    var $subnav = $("#subnav");
    var $sideBarMenu = $("#subnav li");

    //$sideBarMenu.each(function(index,element){
    //    num = index * 55;
    //    $(element).css("background-position","0 -"+ num +"px");
    //});

    //滑动到相应区域对应li变化
    var TOP  = 0;
    $(window).scroll(function(){
        TOP = $(document).scrollTop();
        if(TOP >= $("#elevt5").offset().top){
            $sideBarMenu.eq(5).addClass("md6").siblings().removeClass();
        }else if(TOP >= $("#elevt4").offset().top){
            $sideBarMenu.eq(4).addClass("md5").siblings().removeClass();
        }else if(TOP >= $("#elevt3").offset().top){
            $sideBarMenu.eq(3).addClass("md4").siblings().removeClass();
        }else if(TOP >= $("#elevt2").offset().top){
            $sideBarMenu.eq(2).addClass("md3").siblings().removeClass();
        }else if(TOP >= $("#elevt1").offset().top){
            $sideBarMenu.eq(1).addClass("md2").siblings().removeClass();
        }else if(TOP >= $("#tabcolumn").offset().top){
            $sideBarMenu.eq(0).addClass("md1").siblings().removeClass();
        }else if(TOP >= $("#content").offset().top || 0){
            $subnav.fadeIn();
        }else{
            $subnav.fadeOut();
            $sideBarMenu.removeClass();  //subnav淡出的同时清除所有类的样式
        }
    });

    //点击li，页面滑动到相应位置

    //给要获取offset().top值的6个大盒子添加统一的类名，方便遍历取值
    $("#elevt1,#elevt2,#elevt3,#elevt4,#elevt5,#tabcolumn").addClass("subnavclass");
    var $subnavclass = $(".subnavclass");
    $sideBarMenu.click(function(){
        if($(this).index() != "6"){
            $("html,body").stop().animate({
                "scrollTop" : $subnavclass.eq($(this).index()).offset().top
            },500);
        }else{
            $("html,body").animate({"scrollTop" : 0},300);
        }
    });
    //点击back返回页面顶部
    //$("#slast").click(function(){
    //    $("html,body").animate({"scrollTop" : 0},300);
    //});

    //ajax jsonp 搜索框异步显示搜索结果

    $("#searchtxt").keyup(function(){
        var kd = $("#searchtxt").val();
        var url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+kd;

        if(kd == ""){
            $("#list").css("display","none");
        }else{
            searchajax(url);
        }
    });

    function searchajax(url){
        $("#list").html(""); //先清空内容
        $.ajax({
            type : "get",
            async : "true",
            url : url,
            dataType : "jsonp",
            jsonp : "cb",
            jsonpCallback : "callback",
            success : function(qqq){
                var tag = "<ul>";
                for(var i=0; i<qqq.s.length; i++){
                    tag += "<li>"+qqq.s[i]+"</li>";
                }
                tag += "</ul>";
                $("#list").html(tag).show();
                $("#list").find("li").hover(function(){
                    $(this).css("background","#eee");
                },function(){
                    $(this).css("background","#fff");
                });
            },
            error:function(){
                console.log('fail');
            }
        });
    }
});



