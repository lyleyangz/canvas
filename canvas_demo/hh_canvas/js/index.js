var ratio = window.devicePixelRatio;
var startY = 0, endY = 0, currentScorll = 0;
var totalHeight = 0;
// 物理参数
var cw = null;
var ch = null;
var widthratio =null;
var heightratio =null;
var scorllratio =null;
// 定时器
var Timer,TimerSet={};
// 图片路径
var imgLoadSrc = {
    "BackgroundMapping":"img/bg.jpg",
    "m_off":"img/music_off.png",
    "m_on":"img/music_on.png",
    "next":"img/slider.png",
    "MaterialOne":"img/resource/1.png",
    "sucai2":"img/resource/1.png"
}
var imgLoadingObj = {};


window.onload = function () {
    var canvas = document.getElementById('canvas');
    var cxt = canvas.getContext('2d');
    cw = canvas.offsetWidth;
    ch = canvas.offsetHeight;
    widthratio = cw / 375;
    heightratio = ch / 667;
    scorllratio = widthratio * ratio / 2;
    // 背景图
    // var BackgroundMapping = new Image();
    // BackgroundMapping.src = './img/bg.jpg';
    // // 素材1
    // var MaterialOne = new Image();
    // MaterialOne.src = './img/resource/1.png';
    // // 素材2
    // var MaterialTwo = new Image();
    // MaterialTwo.src = './img/resource/2.png';

    // BackgroundMapping.onload = function () {
    //     // setTimeout(()=>{
    //     //     drawCanvas()
    //     // },500)
    // }
    let progress = new Progress(cxt,cw/2-150,ch/3,0,30)
    var countImgDownload=0;
    for(let i in imgLoadSrc){
        let img = new Image();
        img.src = imgLoadSrc[i];
        img.onload = function(){
            countImgDownload++;
            imgLoadingObj[i] = img;
            progress.update(countImgDownload/Object.keys(imgLoadSrc).length*300);
            progress.render()
            if(countImgDownload==Object.keys(imgLoadSrc).length){
                console.log(countImgDownload,"图像加载完毕!");
                var newCommonRotate = new CommonRotate(10);
                Timer = setInterval(()=>{
                    clearCanvas()
                    drawCanvas(newCommonRotate.move())
                },1000/60)
                // clearCanvas()
                // drawCanvas()
            }
        }
    }
    function drawCanvas(ParachuteRotate) {
        resizeCanvas(cw * ratio, ch * ratio);
        /************************************************************背景图**********************************************************************************************/
        cxt.translate(0,currentScorll);
        cxt.save()
        var picHeight =  cw*imgLoadingObj["BackgroundMapping"].height*ratio/imgLoadingObj["BackgroundMapping"].width;
        totalHeight = picHeight-ch*ratio;
        cxt.drawImage(imgLoadingObj["BackgroundMapping"],0,0,cw*ratio,picHeight);
        cxt.restore()
        
        /************************************************************飞机遮盖云朵1**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne"], 1114, 963 , 367, 280, 0, 458); 
        cxt.restore()
        /************************************************************飞机遮盖云朵2**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne"], 57, 1304 , 917, 1019, -35, 88); 
        cxt.restore()
        /************************************************************顶部云层**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne"], 1917, 37, 1042, 926,0, 0); 
        cxt.restore()
        /************************************************************顶部字**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne"], 27, 37, 750, 514, 0, 0); 
        cxt.restore()
        /************************************************************顶部音乐开关**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["m_on"], 0, 0, 102, 102, 310, 8); 
        cxt.restore()
        /************************************************************欢迎来到外汇圈**********************************************************************************************/
        cxt.save()
        var Global_Scale= distanceScoll(10,110,220,"REDUCE");
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 826, 37, 236, 537, 20/Global_Scale, 130/Global_Scale); 
        cxt.restore()
        /************************************************************红色飞机（大）**********************************************************************************************/
        cxt.save()
        var Hozis = cloudsDistance(60,2);
        if(-currentScorll>310*scorllratio){
            // 飞机尾气
            drawImage(imgLoadingObj["MaterialOne"], 563, 858, 339, 364, 152, 258); 
            // 飞机
            drawImage(imgLoadingObj["MaterialOne"], 630, 609, 204, 207, 60, 158); 
        }else{
            cxt.translate(Hozis,Hozis);
            // 飞机尾气
            drawImage(imgLoadingObj["MaterialOne"], 563, 858, 339, 364, 400, 503); 
            // 飞机
            drawImage(imgLoadingObj["MaterialOne"], 630, 609, 204, 207, 310, 408); 
        }
        cxt.restore()
        /************************************************************红色飞机（小）**********************************************************************************************/
        cxt.save()
        Hozis = cloudsDistance(150,1.4);
        cxt.translate(Hozis,Hozis)
        // 飞机尾气
        drawImage(imgLoadingObj["MaterialOne"], 70, 814, 332, 371, 320, 523); 
        // 飞机
        drawImage(imgLoadingObj["MaterialOne"], 935, 677, 78, 79, 290, 488); 
        cxt.restore()
        /************************************************************一群降落伞小人**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne"], 72, 628, 21, 29,204,272);  //不动
        cxt.restore()
        // 动
        cxt.save()
        cxt.translate(230*ratio*widthratio,300*ratio*widthratio);
        Global_Scale= distanceScoll(150,240,250,"REDUCE");
        cxt.scale(Global_Scale,Global_Scale);
        cxt.rotate(ParachuteRotate);
        drawImage(imgLoadingObj["MaterialOne"], 160, 609, 47, 68,0,0);
        cxt.restore()
        cxt.save()
        cxt.translate(254*ratio*widthratio,342*ratio*widthratio);
        Global_Scale= distanceScoll(160,250,260,"REDUCE");
        cxt.scale(Global_Scale,Global_Scale);
        cxt.rotate(ParachuteRotate);
        drawImage(imgLoadingObj["MaterialOne"], 287, 596, 63, 94,0,0);
        cxt.restore()
        cxt.save()
        cxt.translate(164*ratio*widthratio,442*ratio*widthratio);
        Global_Scale= distanceScoll(170,260,270,"REDUCE");
        cxt.scale(Global_Scale,Global_Scale);
        cxt.rotate(ParachuteRotate);
        drawImage(imgLoadingObj["MaterialOne"], 417, 596, 123, 147,0,0);
        cxt.restore()
        
        /************************************************************第二层楼房**********************************************************************************************/
        
        /************************************************************火箭3号最左边楼后面（由上至下数）**********************************************************************************************/
        cxt.save()
        Hozis = cloudsDistance(500,0.5);
        cxt.translate(Hozis,-Hozis)
        drawImage(imgLoadingObj["MaterialOne"], 1917, 1927, 233, 233, 280, 527); 
        cxt.restore()
        /************************************************************冒烟大楼**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne"], 2757, 1025, 249, 727, 35, 659); 
        cxt.restore()

        /************************************************************冒烟大楼上面de 字**********************************************************************************************/
        cxt.save()
        cxt.translate(80*ratio*widthratio,752*ratio*widthratio);
        Global_Scale= distanceScoll(750,900,910,"REDUCE");
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 3096, 1179, 63, 63,-10, -10); //亏
        cxt.restore()
        cxt.save()
        cxt.translate(80*ratio*widthratio,784*ratio*widthratio);
        Global_Scale= distanceScoll(770,920,930,"REDUCE");
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 3096, 1242, 63, 65,-10, -10); //空
        cxt.restore()
        cxt.save()
        cxt.translate(80*ratio*widthratio,818*ratio*widthratio);
        Global_Scale= distanceScoll(790,940,950,"REDUCE");
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 3096, 1309, 63, 69,-10, -10); //爆
        cxt.restore()
        cxt.save()
        cxt.translate(80*ratio*widthratio,855*ratio*widthratio);
        Global_Scale= distanceScoll(810,960,970,"REDUCE");
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 3096, 1379, 63, 65,-10, -10); //仓
        cxt.restore()

        cxt.save()
        cxt.translate(80*ratio*widthratio,889*ratio*widthratio);
        Global_Scale= distanceScoll(830,980,990,"REDUCE");
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 3096, 1448, 63, 67,-10, -10); //无
        cxt.restore()
        cxt.save()
        cxt.translate(80*ratio*widthratio,923*ratio*widthratio);
        Global_Scale= distanceScoll(850,900,910,"REDUCE");
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 3096, 1515, 63, 65,-10, -10); //处
        cxt.restore()
        cxt.save()
        cxt.translate(80*ratio*widthratio,956*ratio*widthratio);
        Global_Scale= distanceScoll(870,920,930,"REDUCE");
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 3096, 1585, 63, 65,-10, -10); //躲
        cxt.restore()
        cxt.save()
        cxt.translate(80*ratio*widthratio,991*ratio*widthratio);
        Global_Scale= distanceScoll(890,940,950,"REDUCE");
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 3096, 1655, 63, 65,-10, -10); //避
        cxt.restore()

        /************************************************************冒烟大楼下面窗户很多的楼房**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne"], 2670, 1762, 343, 186, -5, 1022); 
        cxt.restore()
        
        /************************************************************大草丛**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne"], 1920, 1540, 527, 219, 117, 1005); 
        cxt.restore()
        /************************************************************无人巴士**********************************************************************************************/
        cxt.save()
        Hozis = cloudsDistance(700,0.2);
        cxt.translate(Hozis,0);
        drawImage(imgLoadingObj["MaterialOne"], 2228, 1284, 353, 172, 373, 1029); 
        cxt.restore()
        /************************************************************小草丛**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne"], 1971, 1319, 156, 81, 300, 1074); 
        cxt.restore()

        /************************************************************火箭1号（由上至下数）**********************************************************************************************/
        cxt.save()
        Hozis = cloudsDistance(800,0.5);
        cxt.translate(Hozis,-Hozis)
        drawImage(imgLoadingObj["MaterialOne"], 1422, 1560, 233, 234, 360, 557); 
        cxt.restore()
        /************************************************************火箭2号（大=由上至下数）**********************************************************************************************/
        cxt.save()
        Hozis = cloudsDistance(1050,1.1);
        cxt.translate(Hozis,-Hozis)
        drawImage(imgLoadingObj["MaterialOne"], 1422, 1833, 375, 376, 359, 581); 
        cxt.restore()

        /************************************************************爆炸烟雾**********************************************************************************************/
        cxt.save()
        cxt.translate(-3*ratio*widthratio,1114*ratio*widthratio);
        Global_Scale= distanceScoll(1600,1650,1700,"REDUCE");
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 1075, 1617, 246, 246, 0, -123); 
        cxt.restore()
        /************************************************************落地成盒**********************************************************************************************/
        cxt.save()
        cxt.translate(20*ratio*widthratio,1107*ratio*widthratio);
        Global_Scale= distanceScoll(1670,1680,1690,"REDUCE");
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 1765, 1354, 100, 36, 0, -10); 
        cxt.restore()
        /************************************************************对话框（由上至下数）**********************************************************************************************/
        cxt.save()
        cxt.translate(345*ratio*widthratio,1019*ratio*widthratio);
        Global_Scale= distanceScoll(1500,1550,1560,"REDUCE");
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 1376, 1319, 312, 78, -160, -40); 
        cxt.restore()
        /************************************************************对话框（盒子上面的对话由上至下数）**********************************************************************************************/
        cxt.save()
        cxt.translate(40*ratio*widthratio,1061*ratio*widthratio);
        Global_Scale= distanceScoll(1700,1750,1760,"REDUCE");
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 1012, 1390, 311, 115, 0, -30); 
        cxt.restore()

        /************************************************************飞机遮盖云朵3**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne"], 1114, 288, 751, 526, 0, 392); 
        cxt.restore()
        /************************************************************桥**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne"], 1637, 1025, 747, 197, 1, 1112); 
        cxt.restore()

        /************************************************************第三层马路**********************************************************************************************/

        /************************************************************野心疯狂超载**********************************************************************************************/
        cxt.save()
        cxt.translate(194*ratio*widthratio,1274*ratio*widthratio);
        Global_Scale= distanceScoll(1600,1650,1660,"REDUCE");
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 83, 2426, 609, 126, -152, -64); 
        cxt.restore()
        /************************************************************左边云朵**********************************************************************************************/
        cxt.save()
        cxt.translate(ParachuteRotate*50,0);
        drawImage(imgLoadingObj["MaterialOne"], 2016, 2301, 192, 67, -22, 1328); 
        cxt.restore()
        /************************************************************右边云朵**********************************************************************************************/
        cxt.save()
        cxt.translate(-ParachuteRotate*40,0);
        drawImage(imgLoadingObj["MaterialOne"], 2007, 2453, 210, 86, 285, 1315); 
        cxt.restore()
        /************************************************************蓝色车子**********************************************************************************************/
        cxt.save()
        Hozis = cloudsDistance(1750,1);
        cxt.translate(-Hozis,0)
        drawImage(imgLoadingObj["MaterialOne"], 1317, 2654, 355, 188, -175, 1359);
        cxt.restore()
        /************************************************************蓝色车子上  蓝衣服男挥动的手**********************************************************************************************/
        cxt.save()
        // 先平移画布中心
        cxt.translate(-145*ratio*widthratio-Hozis,1381*ratio*widthratio);
        cxt.rotate(ParachuteRotate);
        drawImage(imgLoadingObj["MaterialOne"], 1228, 2600, 88, 41, -40, 0); 
        cxt.restore()
        /************************************************************蓝色车子上  红衣服女挥动的手**********************************************************************************************/
        cxt.save()
        cxt.translate(-115*ratio*widthratio-Hozis,1381*ratio*widthratio);
        cxt.rotate(-ParachuteRotate);
        drawImage(imgLoadingObj["MaterialOne"], 1386, 2600, 57, 29, -30, 0); 
        cxt.restore()
        /************************************************************左边红头发女孩**********************************************************************************************/
        cxt.save()
        // Hozis = cloudsDistance(1750,1);
        // cxt.translate(-Hozis,0)
        drawImage(imgLoadingObj["MaterialOne"], 902, 2646, 102, 143, 20, 1379); 
        cxt.restore()
        /************************************************************左边红头发女孩会动的手**********************************************************************************************/
        cxt.save()
        cxt.translate(55*ratio*widthratio,1391*ratio*widthratio);
        // Hozis = cloudsDistance(1750,1);
        // cxt.translate(-Hozis,0)
        cxt.rotate(ParachuteRotate);
        drawImage(imgLoadingObj["MaterialOne"], 1027, 2665, 71, 34, 0, 0); 
        cxt.restore()
        /************************************************************铁轨**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne"], 849, 2454, 806, 98, 0, 1446); 
        cxt.restore()
        /************************************************************铁轨上的两层云**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne"], 483, 2620, 325, 259 , -32, 1402); 
        drawImage(imgLoadingObj["MaterialOne"], 72, 2608, 331, 264 , 250, 1394); 
        cxt.restore()
        /************************************************************犹豫纠结错失良机**********************************************************************************************/
        cxt.save()
        cxt.translate(190*ratio*widthratio,1556*ratio*widthratio);
        Global_Scale= distanceScoll(2050,2100,2110,"REDUCE");
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 2305, 2059, 389, 203, -90, -10); 
        cxt.restore()
    }
    // 缩放比例区间x-y 放大 y-z 缩小 
    function distanceScoll(x, y, z,type) {
        var scale;
        if(type == "ZOOM"){
            scale = -currentScorll <= x * scorllratio ? 1 : (-currentScorll > x * scorllratio && -currentScorll <= y * scorllratio ? ((1 - (currentScorll + x * scorllratio) / 100)) : (1 + ((currentScorll + z * scorllratio) / 100)));
            // console.log(scale)
            return scale > 0 ? scale : 0;
        }
        if(type == "REDUCE"){
            // console.log(-currentScorll <= x * scorllratio ? 0 : (-currentScorll > x * scorllratio && -currentScorll <= y * scorllratio ? "是在X-Y："+(-currentScorll-(x*scorllratio)) / 100 : "超过y-Z："+(currentScorll + z * scorllratio) / 100))
            scale = -currentScorll <= x * scorllratio ? 0 : (-currentScorll > x * scorllratio && -currentScorll <= y * scorllratio ? (-currentScorll-(x*scorllratio)) / 100 : 1);
            return scale>=1?1:scale;
        }
    }
    // 位移
    function cloudsDistance(dis, speed) {
        return -currentScorll > dis * scorllratio ? (currentScorll + dis * scorllratio) * speed : 0;
    }
    // 缩放中心
    function scalePosition(attr, pos, scale, ratioFlag) {
        if (ratioFlag) {
            return (pos * ratio - (attr * ratioFlag * scale - attr * ratioFlag)) / scale / ratio
        } else {
            return (pos * ratio - (attr * scale - attr)) / scale / ratio
        }
    }
    
    // 获取点击坐标
    function windowToCanvas(x, y) {
        var cvsbox = canvas.getBoundingClientRect();
        return { x: Math.round(x - cvsbox.left), y: Math.round(y - cvsbox.top) };
    }
    canvas.onclick = function (e) {
        var clickXY = windowToCanvas(e.clientX, e.clientY);
        // console.log(clickXY)
    }
    // 绘制画布封装
    function drawImage(img, imgx, imgy, imgw, imgh, canvasx, canvasy) {
        cxt.drawImage(img, imgx, imgy, imgw, imgh, canvasx * ratio * widthratio, canvasy * ratio * widthratio, (imgw * ratio * widthratio) / 2, (imgh * ratio * widthratio) / 2);
    }
    // 清空画布
    function clearCanvas() {
        cxt.clearRect(0, 0, 375 * ratio, totalHeight)
    }
    
    function setIntervalFun(id,stepTime,fun){
        TimerSet[id] = setInterval(fun,stepTime)
    }
    
    function resetInterval(){
        for(let i in Object.keys(TimerSet)){
            clearInterval(TimerSet[Object.keys(TimerSet)[i]])
        }
    }

    // rotate封装
    function CommonRotate(deg){
        this.rotate = 1;
        this.flag=true;
        this.deg = deg;
    }
    CommonRotate.prototype.move = function(){
        if(this.rotate>=1){
            this.flag = true
        }
        if(this.rotate<=-1){
            this.flag = false
        }
        if(this.flag){
            this.rotate -=  0.01;
        }else{
            this.rotate +=0.01;
        }
        return Math.PI/180*(this.rotate)*this.deg
    }
    
    // Timer = setInterval(()=>{
    //     console.log(newCommonRotate.move(10))
    // },1000/60)



    resizeCanvas(cw * ratio, ch * ratio);
    function resizeCanvas(width, height) {
        $('#canvas').attr('width', width);
        $('#canvas').attr('height', height);
        cxt.clearRect(0, 0, canvas.width, canvas.height);
    }
    $(window).resize(function () {
        ratio = window.devicePixelRatio;
        cw = canvas.offsetWidth;
        ch = canvas.offsetHeight;
        widthratio = cw / 375;
        heightratio = ch / 667;
        scorllratio = widthratio * ratio / 2;
        resizeCanvas(cw * ratio, ch * ratio);
        drawCanvas()
        // console.log(cw * ratio, ch * ratio)
    })

    window.addEventListener('touchstart', e => {
        var touch = event.changedTouches[0];
        startY = touch.pageY;
    }, { passive: false });
    window.addEventListener('touchmove', e => {
        var touch = event.changedTouches[0];
        endY = touch.pageY;
        currentScorll += (endY - startY)*2;
        startY = endY;
        if (-currentScorll >= totalHeight) {
            currentScorll = -totalHeight;
        }
        if (currentScorll >= 0) {
            currentScorll = 0;
        }
        // drawCanvas()
        console.log(currentScorll,"坐标")
    }, { passive: false });
    // window.addEventListener('touchend', e => {
    //     var touch = e.changedTouches[0];
    // }, { passive: false });
}

