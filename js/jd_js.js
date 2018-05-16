/**
 * Created by Administrator on 2018/5/9 0009.
 */

$.noConflict();   //释放jQuery占用的$符号
window.onload = function(){
    /*点击请登录弹出大灰和小白*/
    var login = $("login");
    var mask = $("mask");
    var box = $("box");
    var hd = $("hd");
    login.onclick = function(event){
        mask.style.display = "block";
        box.style.display = "block";
        document.body.style.overflow = "hidden";  //隐藏滚动条

        //取消冒泡
        var event = event || window.event;
        if(event && event.stopPropagation)
        {
            event.stopPropagation();
        }
        else
        {
            event.cancelBubble = true;
        }
    }
    hd.onmousedown = function(event){
        var event = event || window.event;
        var xx = event.clientX - box.offsetLeft- 200;
        var yy = event.clientY - box.offsetTop- 125;
        document.onmousemove = function(event){
            var event = event || window.event;
            box.style.left = event.clientX - xx + "px";
            box.style.top = event.clientY - yy + "px";
            window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty();
        }
    }
    document.onmouseup = function(){   //document.onmouseup事件在文档内每点击鼠标抬起都会触发
        document.onmousemove = null;
    }
    /*点击 span x 关闭大灰和小白*/
    var close_box = $("close_box");
    close_box.onclick = function(){
        mask.style.display = "none";
        box.style.display = "none";
        document.body.style.overflow = "visible";  //显示滚动条
    }

    document.onclick = function(event) {      //document.onclick事件在文档内每点击鼠标都会触发

        var event = event || window.event;
        // alert(event.target.id);  // 返回的是点击的某个对象的id 名字
        // alert(event.srcElement.id);
        var targetId = event.target ? event.target.id : event.srcElement.id;
        // 看明白这个写法
        if(targetId != "box" && targetId != "hd")  // 不等于当前点击的名字
        {
            mask.style.display = "none";
            box.style.display = "none";
            document.body.style.overflow = "visible";  //显示滚动条
        }
    }


    //点击关闭topbanner
    var aimgi = $("aimgi");
    var tpbcloser = $("tpbcloser");
    aimgi.onclick = function(){
            tpbcloser.style.display = "none";
        }

    //表单input 请输入...用户体验
    var searchtxt = $("searchtxt");
    searchtxt.onfocus = function(){ //得到焦点
        //alert("得到了焦点");
        //什么时候该清空呢
        //用户没有输入的时候，用户第一次使用的时候
        // 如果 这里input 里面的文字 是 请输入...  说明用户没有用过，就应该清空
        if(searchtxt.value == "请输入..."  )
        {
            searchtxt.value = "";
            searchtxt.style.color = "#333";
        }
    }
    searchtxt.onblur = function(){ //失去焦点
        //alert("失去了焦点");
        //什么时候再还原呢？
        //input的值是 空的时候，我们再复原
        if(searchtxt.value == "")
        {
            searchtxt.value = "请输入...";
            searchtxt.style.color = "#ccc";
        }
    }

    //京东快报小图标遍历
    var iis =$("smalliconjd").getElementsByTagName("i")
    for( var i=0,len=iis.length; i<len; i++){
        iis[i].style.backgroundPosition = "0 "+(-44*i)+"px";
    }

    //仿网易轮播图的京东轮播图页面动画特效

    // 获取元素
    //function $(id) {return document.getElementById(id);}
    var js_slider = $("js_slider");  // 获取最大盒子
    var slider_main_block = $("slider_main_block");  // 滚动图片的父亲
    var imgs = slider_main_block.children;  // 获得所有的图片组 需要滚动的部分
    var slider_ctrl = $("slider_ctrl");  // 获得 控制span 的 父盒子
    // 操作元素
    // 生成小span
    for(var i=0;i<imgs.length; i++) {

        var span = document.createElement("span");// 创建 span
        span.className = "slider-ctrl-con"; // 添加类名
        span.innerHTML = imgs.length-i;  //  6 - 0     6 - 1   // 实现 倒序 的方式插入
        slider_ctrl.insertBefore(span,slider_ctrl.children[1]);  // 在父亲倒数第二个盒子的前面插入
    }
    // 下面的第一个小span  是默认的蓝色
    var spans = slider_ctrl.children;   // 得到所有的 span
    spans[1].setAttribute("class","slider-ctrl-con current");  // 两个类名

    var scrollWidth = js_slider.clientWidth; // 得到大盒子的宽度 也就是  后面动画走的距离  790 clientWidth = width+padding
    //  刚开始，按道理   第一张图片 留下   其余的人走到 790 的位置上
    for(var i = 1; i<imgs.length; i++) { // 从1 开始 因为第一张不需要计算

        imgs[i].style.left =  scrollWidth + "px";  // 其他人 先右移动到 790 的位置
    }
    // 遍历三个按钮
    // spans 是 8个按钮 他们都是 span
    var iNow = 0; //  用来 控制播放张数
    for(var k in spans){   //   k  是索引号  spans[k]    spans[0]  第一个span
        spans[k].onclick = function() {
            // alert(this.innerHTML);
            if(this.className == "slider-ctrl-prev"){ // 判断当前点击的这个按钮是不是 prev
                // alert("您点击了左侧按钮");
                //  当我们左侧点击时候， 当前的这张图片 先慢慢的走到右边  上一张 一定先快速走到左侧 （-790）的位置，然后慢慢的走到舞台中
                animate(imgs[iNow],{left: scrollWidth});
                --iNow < 0 ?  iNow = imgs.length - 1 : iNow;
                imgs[iNow].style.left = -scrollWidth + "px";
                animate(imgs[iNow],{left: 0});
                setSquare();
            }
            else if(this.className == "slider-ctrl-next") {  // 右侧按钮开始
                autoplay();
            }
            else {
                // alert("您点击了下面的span");
                // 我们首先要知道我们点击是第几张图片  --- 获得当前的索引号
                // alert(this.innerHTML);
                var that = this.innerHTML - 1;
                // console.log(typeof that);
                if(that > iNow) {
                    // 做法等同于 右侧按钮
                    animate(imgs[iNow],{left: -scrollWidth});  // 当前的这张慢慢的走出去 左侧
                    imgs[that].style.left = scrollWidth + "px"; // 点击的那个索引号 快速走到右侧  790
                }
                else if(that < iNow) {
                    // 做法等同于 左侧按钮
                    animate(imgs[iNow],{left: scrollWidth});
                    imgs[that].style.left = -scrollWidth + "px";
                }
                iNow = that;  // 给当前的索引号
                animate(imgs[iNow],{left: 0});
                /*比如 已经播放到 第4张    我点击了 第2张   把 2 给  inow
                 下一次播放，应该播放第3张*/
                // animate(imgs[iNow],{left: 0});
                setSquare();
            }
        }
    }
    //  一个可以控制 播放span 的 函数   当前
    function setSquare() {
        //  清除所有的span current   留下 满足需要的那一个
        for(var i=1;i<spans.length-1;i++){   //  8个span   我们要 1-6  不要 7  索引号
            spans[i].className = "slider-ctrl-con";
        }
        spans[iNow+1].className = "slider-ctrl-con current";  // 记住 + 1 因为span的索引号是从1开始的
    }
    // 定时器开始  其实， 定时器就是  右侧按钮
    var timer = null;
    timer = setInterval(autoplay,2000);  // 开启定时器
    function autoplay() {
        //  当我们点击时候， 当前的这张图片 先慢慢的走到左边  下一张 一定先快速走到右侧 （310）的位置，然后慢慢的走到舞台中
        // alert("您点击了右侧按钮");
        //iNow == 0
        animate(imgs[iNow],{left: -scrollWidth});
        // 当前的那个图片 慢慢的走到 -scrollWidth 位置
        // 变成1   先 ++   ++iNow  先自加  后 运算
        ++iNow > imgs.length -1 ?  iNow = 0 : iNow;
        imgs[iNow].style.left = scrollWidth + "px";  // 立马执行  快速走到右侧
        animate(imgs[iNow],{left: 0}); // 下一张走的 0 的位置  慢慢走过来
        setSquare();  // 调用square
    }
    //鼠标经过清除定时器
    js_slider.onmouseover = function() {
        clearInterval(timer);
        //鼠标进过显示箭头
        $("slider_ctrl").children[0].style.display = "block";
        $("slider_ctrl").children[7].style.display = "block";
    }
    js_slider.onmouseout = function() {
        clearInterval(timer);  // 要执行定时器 先清除定时器
        //鼠标离开隐藏箭头
        $("slider_ctrl").children[0].style.display = "none";
        $("slider_ctrl").children[7].style.display = "none";
        timer = setInterval(autoplay,2000);  // 开启定时器
    }

    //京东tab栏切换(节流闭包版)
    var tbmc = $("tbc-m");
    var lis1 = tbmc.children[0].children;
    var len1 = lis1.length;
    var imgs1 = tbmc.children[1].children;
    lis1[0].setAttribute("class","taglan");
    imgs1[0].setAttribute("class","damao");
    for(var i=0; i<len1; i++){
        //闭包版的tab栏  此处用闭包并不是简便的写法，只是说明可以用闭包来写这类问题，闭包优势在代码多后会出现
        var timer1 = null;
        lis1[i].onmouseover = function (num){
            clearTimeout(timer1);
            return function(){
                timer1 = setTimeout(function(){
                    for(var j=0; j<len1; j++){
                        lis1[j].className = "";
                        imgs1[j].className = "";
                    }
                    lis1[num].className = "taglan";
                    imgs1[num].className = "damao";
                },200)
            }
        }(i);

        lis1[i].onmouseout = function(){
            clearTimeout(timer1);
        }

    }


}