var ratio = window.devicePixelRatio;
var startY = 0, endY = 0, currentScorll = 0;
var totalHeight = 0;
// 物理参数
var cw = null;
var ch = null;
var widthratio =null;
var heightratio =null;
var scorllratio =null;
// 记录滚动位置
var preScorllVal = null;
// 定时器
var Timer;
// 事件触发坐标位置
var EventsTriggerPosition={};
// 音乐开关
var musicTurn = true;
// 图片路径
var imgLoadSrc = {
    "BackgroundMapping":"img/bg.jpg",
    "m_off":"img/music_off.png",
    "m_on":"img/music_on.png",
    "next":"img/slider.png",
    "MaterialOne":"img/resource/1.png",
    "MaterialTwo":"img/resource/2.png"
}
// 存放加载完的图片
var imgLoadingObj = {};


window.onload = function () {
    // 获取画布
    var canvas = document.getElementById('canvas');
    var cxt = canvas.getContext('2d');
    // 获取musicDOM
    var musicPlay = document.getElementById('music');
    // 默认初始播放音乐
    musicPlay.play();
    // 画布宽高
    cw = canvas.offsetWidth;
    ch = canvas.offsetHeight;
    widthratio = cw / 375;
    heightratio = ch / 667;
    scorllratio = widthratio * ratio / 2;
    // 进度条
    var progress = new Progress(cxt,cw/2-150,ch/3,0,30);
    // 加载图片数量
    var countImgDownload=0;
    for(var i in imgLoadSrc){
        (function(i){
            var img = new Image();
            img.src = imgLoadSrc[i];
            img.onload = function(){
                imgLoadingObj[i] = img;
                countImgDownload++;
                progress.update(countImgDownload/Object.keys(imgLoadSrc).length*300);
                progress.render()
                if(countImgDownload==Object.keys(imgLoadSrc).length){
                    var newCommonRotate = new CommonRotate(10);
                    Timer = setInterval(()=>{
                        clearCanvas()
                        drawCanvas(newCommonRotate.move(),newCommonRotate.shock(1.08,0.01),newCommonRotate.shakeHands(-5,5,0.4))
                    },1000/60)
                    // clearCanvas()
                    // drawCanvas()
                }
            }
        })(i)
    }
    function drawCanvas(ParachuteRotate,ShockSounds,handsShock) {
        resizeCanvas(cw * ratio, ch * ratio);
        /************************************************************背景图**********************************************************************************************/
        cxt.translate(0,currentScorll);
        cxt.save()
        var picHeight =  cw*imgLoadingObj["BackgroundMapping"].height*ratio/imgLoadingObj["BackgroundMapping"].width;
        var hh_height = cw*ratio;
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
        EventsTriggerPosition["MUSIC_ON"] = {
            pisx:310*widthratio,
            pisY:((8*widthratio)*ratio+currentScorll)/ratio,
            Range:{
                minPisY:((8*widthratio)*ratio+currentScorll)/ratio,
                maxPisY:102*widthratio/2+(((8*widthratio)*ratio+currentScorll)/ratio),

                minPisX:310*widthratio,
                maxPisX:310*widthratio+102*widthratio/2
            }
        }
        if(musicTurn){
            drawImage(imgLoadingObj["m_on"], 0, 0, 102, 102, 310, 8); 
        }else{
            drawImage(imgLoadingObj["m_off"], 0, 0, 102, 102, 310, 8); 
        }
        cxt.restore()
        /************************************************************欢迎来到外汇圈**********************************************************************************************/
        cxt.save()
        var Global_Scale= distanceScoll(0,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 826, 37, 236, 537, 20/Global_Scale, 130/Global_Scale); 
        cxt.restore()
        /************************************************************红色飞机（大）**********************************************************************************************/
        cxt.save()
        Hozis = cloudsDistance(60,2);
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
        Global_Scale= distanceScoll(150,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        cxt.rotate(ParachuteRotate);
        drawImage(imgLoadingObj["MaterialOne"], 160, 609, 47, 68,0,0);
        cxt.restore()
        cxt.save()
        cxt.translate(254*ratio*widthratio,342*ratio*widthratio);
        Global_Scale= distanceScoll(160,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        cxt.rotate(ParachuteRotate);
        drawImage(imgLoadingObj["MaterialOne"], 287, 596, 63, 94,0,0);
        cxt.restore()
        cxt.save()
        cxt.translate(164*ratio*widthratio,442*ratio*widthratio);
        Global_Scale= distanceScoll(170,0,0,"REDUCE",120/scorllratio);
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
        // console.log(widthratio,scorllratio,heightratio,ratio)
        cxt.translate(80*ratio*widthratio,752*ratio*widthratio);
        Global_Scale= distanceScoll(750,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 3096, 1179, 63, 63,-10, -10); //亏
        cxt.restore()
        cxt.save()
        cxt.translate(80*ratio*widthratio,784*ratio*widthratio);
        Global_Scale= distanceScoll(770,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 3096, 1242, 63, 65,-10, -10); //空
        cxt.restore()
        cxt.save()
        cxt.translate(80*ratio*widthratio,818*ratio*widthratio);
        Global_Scale= distanceScoll(790,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 3096, 1309, 63, 69,-10, -10); //爆
        cxt.restore()
        cxt.save()
        cxt.translate(80*ratio*widthratio,855*ratio*widthratio);
        Global_Scale= distanceScoll(810,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 3096, 1379, 63, 65,-10, -10); //仓
        cxt.restore()

        cxt.save()
        cxt.translate(80*ratio*widthratio,889*ratio*widthratio);
        Global_Scale= distanceScoll(830,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 3096, 1448, 63, 67,-10, -10); //无
        cxt.restore()
        cxt.save()
        cxt.translate(80*ratio*widthratio,923*ratio*widthratio);
        Global_Scale= distanceScoll(850,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 3096, 1515, 63, 65,-10, -10); //处
        cxt.restore()
        cxt.save()
        cxt.translate(80*ratio*widthratio,956*ratio*widthratio);
        Global_Scale= distanceScoll(870,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 3096, 1585, 63, 65,-10, -10); //躲
        cxt.restore()
        cxt.save()
        cxt.translate(80*ratio*widthratio,991*ratio*widthratio);
        Global_Scale= distanceScoll(890,0,0,"REDUCE",120/scorllratio);
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
        Global_Scale= distanceScoll(1600,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 1075, 1617, 246, 246, 0, -123); 
        cxt.restore()
        /************************************************************落地成盒**********************************************************************************************/
        cxt.save()
        cxt.translate(20*ratio*widthratio,1107*ratio*widthratio);
        Global_Scale= distanceScoll(1670,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 1765, 1354, 100, 36, 0, -10); 
        cxt.restore()
        /************************************************************对话框（由上至下数）**********************************************************************************************/
        cxt.save()
        cxt.translate(345*ratio*widthratio,1019*ratio*widthratio);
        Global_Scale= distanceScoll(1500,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 1376, 1319, 312, 78, -160, -40); 
        cxt.restore()
        /************************************************************对话框（盒子上面的对话由上至下数）**********************************************************************************************/
        cxt.save()
        cxt.translate(40*ratio*widthratio,1061*ratio*widthratio);
        Global_Scale= distanceScoll(1700,0,0,"REDUCE",120/scorllratio);
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
        Global_Scale= distanceScoll(1600,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 83, 2426, 609, 126, -152, -64); 
        cxt.restore()
        /************************************************************左边飘动的云朵**********************************************************************************************/
        cxt.save()
        cxt.translate(ParachuteRotate*50,0);
        drawImage(imgLoadingObj["MaterialOne"], 2016, 2301, 192, 67, -22, 1328); 
        cxt.restore()
        /************************************************************右边飘动的云朵**********************************************************************************************/
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

        /************************************************************锋芒太露**********************************************************************************************/
        cxt.save()
        Hozis = cloudsDistance(1750,1);
        cxt.translate(-165*ratio*widthratio-Hozis,1365*ratio*widthratio);
        Global_Scale= distanceScoll(2300,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 1716, 2349, 198, 80, -90, -40); 
        cxt.restore()
        /************************************************************稳住我们能赢**********************************************************************************************/
        cxt.save()
        Hozis = cloudsDistance(1750,1);
        cxt.translate(-123*ratio*widthratio-Hozis,1355*ratio*widthratio);
        Global_Scale= distanceScoll(2200,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 1717, 2496, 200, 60, -0, -30); 
        cxt.restore()
        /************************************************************你是猪吗**********************************************************************************************/
        cxt.save()
        Hozis = cloudsDistance(1750,1);
        cxt.translate(-20*ratio*widthratio-Hozis,1375*ratio*widthratio);
        Global_Scale= distanceScoll(2000,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 1736, 2617, 139, 82, -0, -40); 
        cxt.restore()

        /************************************************************蓝色车子上  蓝衣服男挥动的手**********************************************************************************************/
        cxt.save()
        Hozis = cloudsDistance(1750,1);
        // 先平移画布中心
        cxt.translate(-145*ratio*widthratio-Hozis,1381*ratio*widthratio);
        cxt.rotate(ParachuteRotate);
        drawImage(imgLoadingObj["MaterialOne"], 1228, 2600, 88, 41, -40, 0); 
        cxt.restore()
        /************************************************************蓝色车子上  红衣服女挥动的手**********************************************************************************************/
        cxt.save()
        Hozis = cloudsDistance(1750,1);
        cxt.translate(-115*ratio*widthratio-Hozis,1381*ratio*widthratio);
        cxt.rotate(-ParachuteRotate);
        drawImage(imgLoadingObj["MaterialOne"], 1386, 2600, 57, 29, -30, 0); 
        cxt.restore()
        /************************************************************左边红头发女孩**********************************************************************************************/
        cxt.save()
        Hozis = cloudsDistance(2100,1.5);
        if(-currentScorll>2266*scorllratio){
            drawImage(imgLoadingObj["MaterialOne"], 902, 2646, 102, 143, 20, 1379); 
        }else{
            cxt.translate(-Hozis,0)
            drawImage(imgLoadingObj["MaterialOne"], 902, 2646, 102, 143, -100, 1379); 
        }
        cxt.restore()
        /************************************************************左边红头发女孩会动的手**********************************************************************************************/
        cxt.save()
        Hozis = cloudsDistance(2100,1.5);
        if(-currentScorll>2266*scorllratio){
            cxt.translate(55*ratio*widthratio,1391*ratio*widthratio);
            cxt.rotate(ParachuteRotate);
            drawImage(imgLoadingObj["MaterialOne"], 1027, 2665, 71, 34, 0, 0); 
        }else{
            cxt.translate(-66*ratio*widthratio-Hozis,1391*ratio*widthratio);
            cxt.rotate(ParachuteRotate);
            drawImage(imgLoadingObj["MaterialOne"], 1027, 2665, 71, 34, 0, 0); 
        }
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

        /************************************************************汇车**********************************************************************************************/
        cxt.save()
        Hozis = cloudsDistance(2150,1);
        if(-currentScorll>2410*scorllratio){
            cxt.translate(190*ratio*widthratio,(1575+136)*ratio*widthratio);
            cxt.rotate(ParachuteRotate);
            drawImage(imgLoadingObj["MaterialOne"], 1531, 2926, 123, 204 , -30, -50);
        }else{
            cxt.translate(190*ratio*widthratio,1575*ratio*widthratio-Hozis);
            cxt.rotate(ParachuteRotate);
            drawImage(imgLoadingObj["MaterialOne"], 1531, 2926, 123, 204 , -30, -50); 
        }
        cxt.restore()
        /************************************************************汇车左边字 现在没空听我的没错**********************************************************************************************/
        cxt.save()
        cxt.translate(160*ratio*widthratio,1674*ratio*widthratio);
        Global_Scale= distanceScoll(2330,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 2350, 2326, 274, 56 , -140, -20); 
        cxt.restore()
        /************************************************************汇车右边字 再等等，机会没来**********************************************************************************************/
        cxt.save()
        cxt.translate(226*ratio*widthratio,1674*ratio*widthratio);
        Global_Scale= distanceScoll(2300,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 2354, 2431, 248, 58 , 0, -30); 
        cxt.restore()
        /************************************************************汇车右边字 到底要怎做呀**********************************************************************************************/
        cxt.save()
        cxt.translate(226*ratio*widthratio,1720*ratio*widthratio);
        Global_Scale= distanceScoll(2380,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 2366, 2539, 199, 58 , 0, -30); 
        cxt.restore()

        /************************************************************拦车路障(左边)**********************************************************************************************/
        cxt.save()
        Hozis = cloudsDistance(2350,1);
        cxt.translate(110*ratio*widthratio,1762*ratio*widthratio);
        if(-currentScorll>2480*scorllratio){
            cxt.rotate(Math.PI/180*-132);
            drawImage(imgLoadingObj["MaterialOne"], 1244, 3049, 171, 82, -80, -9); 
        }else{
            cxt.rotate(Math.PI/180*Hozis/scorllratio);
            drawImage(imgLoadingObj["MaterialOne"], 1244, 3049, 171, 82, -80, -9); 
        }
        cxt.restore()
        /************************************************************拦车路障(右边)**********************************************************************************************/
        cxt.save()
        cxt.translate(272*ratio*widthratio,1763*ratio*widthratio);
        if(-currentScorll>2480*scorllratio){
            cxt.rotate(Math.PI/180*132);
            drawImage(imgLoadingObj["MaterialOne"], 1245, 2926, 171, 82, -5, -5); 
        }else{
            cxt.rotate(Math.PI/180*-Hozis/scorllratio);
            drawImage(imgLoadingObj["MaterialOne"], 1245, 2926, 171, 82, -5, -5); 
        }
        cxt.restore()

        /************************************************************犹豫纠结错失良机**********************************************************************************************/
        cxt.save()
        cxt.translate(190*ratio*widthratio,1556*ratio*widthratio);
        Global_Scale= distanceScoll(2050,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 2305, 2059, 389, 203, -90, -10); 
        cxt.restore()

        /************************************************************旋转叶子下的云**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne"], 1773, 2789, 384, 273, -29, 1809); 
        drawImage(imgLoadingObj["MaterialOne"], 2261, 2644, 414, 291, 219, 1801); 
        cxt.restore()

        /************************************************************旋转叶子左**********************************************************************************************/
        cxt.save()
        Hozis = cloudsDistance(2500,1);
        cxt.translate(-5*ratio*widthratio,1838*ratio*widthratio);
        cxt.rotate(Math.PI/180*-Hozis*0.1);
        drawImage(imgLoadingObj["MaterialOne"], 2750, 2043, 410, 413, -100, -100); 
        cxt.restore()

        /************************************************************旋转叶子右**********************************************************************************************/
        cxt.save()
        cxt.translate(383*ratio*widthratio,1838*ratio*widthratio);
        cxt.rotate(Math.PI/180*-Hozis*0.1);
        drawImage(imgLoadingObj["MaterialOne"], 2778, 2523, 413, 412, -105, -100); 
        cxt.restore()

        /************************************************************骷髅左闪电**********************************************************************************************/
        cxt.save()
        cxt.translate((-30+204)*ratio*widthratio,(1974+165)*ratio*widthratio);
        Global_Scale= distanceScoll(3170,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 989, 3180, 408, 663, -204, -165); 
        cxt.restore()
        /************************************************************骷髅右闪电**********************************************************************************************/
        cxt.save()
        cxt.translate(201*ratio*widthratio,(1974+663/4)*ratio*widthratio);
        Global_Scale= distanceScoll(3170,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 1460, 3180, 408, 663, 0, -663/4); 
        cxt.restore()
        /************************************************************骷髅背景镜子**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne"], 490, 3332, 285, 358, 122, 2044);
        cxt.restore()

        /************************************************************空投1(左到右)**********************************************************************************************/
        cxt.save()
        cxt.translate(100*ratio*widthratio,1958*ratio*widthratio);
        Global_Scale= distanceScoll(2700,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        cxt.rotate(ParachuteRotate*2);
        drawImage(imgLoadingObj["MaterialOne"], 3253, 3486, 78, 108, 0, 0); 
        cxt.restore()
        /************************************************************空投2(左到右)**********************************************************************************************/
        cxt.save()
        cxt.translate(206*ratio*widthratio,1874*ratio*widthratio);
        Global_Scale= distanceScoll(2800,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        cxt.rotate(-ParachuteRotate*3);
        drawImage(imgLoadingObj["MaterialOne"], 2882, 3478, 69, 92, -15, 0); 
        cxt.restore()
        /************************************************************空投3(左到右)**********************************************************************************************/
        cxt.save()
        cxt.translate(249*ratio*widthratio,1961*ratio*widthratio);
        Global_Scale= distanceScoll(2850,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        cxt.rotate(ParachuteRotate*4);
        drawImage(imgLoadingObj["MaterialOne"], 3025, 3454, 144, 171, -20, 0); 
        cxt.restore()

        /************************************************************骷髅上面左右飘动的云**********************************************************************************************/
        cxt.save()
        cxt.translate(ParachuteRotate*50,0);
        drawImage(imgLoadingObj["MaterialOne"], 236, 2967, 139, 70, 30, 2021); 
        drawImage(imgLoadingObj["MaterialOne"], 57, 2979, 115, 58, 291, 2051); 
        cxt.restore()

        /************************************************************骷髅盒子**********************************************************************************************/
        cxt.save()
        cxt.translate(191*ratio*widthratio,2138*ratio*widthratio);
        Global_Scale= distanceScoll(3170,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 42, 3208, 389, 218, -100, -50); 
        cxt.restore()
        /************************************************************骷髅头**********************************************************************************************/
        cxt.save()
        cxt.translate((106+165/2)*ratio*widthratio,(2014+187/2)*ratio*widthratio);
        Global_Scale= distanceScoll(3320,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 726, 3114, 165, 187, -165/2, -187/2); 
        cxt.restore()
        /************************************************************盒子上的字（路遇伏地魔）**********************************************************************************************/
        cxt.save()
        cxt.translate((76)*ratio*widthratio,(2108)*ratio*widthratio);
        Global_Scale= distanceScoll(3500,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 55, 3112, 167, 47, 0, 0); 
        cxt.restore()
        /************************************************************盒子上的字（落地成盒）**********************************************************************************************/
        cxt.save()
        cxt.translate((146)*ratio*widthratio,(2144)*ratio*widthratio);
        Global_Scale= distanceScoll(3540,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 281, 3112, 138, 47, 0, 0); 
        cxt.restore()
        /************************************************************盒子上的字（搭上猪队友）**********************************************************************************************/
        cxt.save()
        cxt.translate((226)*ratio*widthratio,(2108)*ratio*widthratio);
        Global_Scale= distanceScoll(3580,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 477, 3112, 161, 47, 0, 0); 
        cxt.restore()

        /************************************************************这简直是噩梦**********************************************************************************************/
        cxt.save()
        cxt.translate((76+194/2)*ratio*widthratio,(2255)*ratio*widthratio);
        Global_Scale= distanceScoll(3580,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialOne"], 2305, 3037, 389, 117, -194/2, 0); 
        cxt.restore()

        /************************************************************狙击手深色草丛**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne"], 2854, 3231, 218, 144, -10, 2318); 
        cxt.restore()
        /************************************************************右边深色草丛**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne"], 2423, 3519, 316, 138, 244, 2318); 
        cxt.restore()
        /************************************************************狙击手**********************************************************************************************/
        cxt.save()
        Hozis = cloudsDistance(3500,1);
        if(-currentScorll>3696*scorllratio){
            cxt.translate((-56)*ratio*widthratio,(2318+154/2)*ratio*widthratio);
            cxt.rotate(ParachuteRotate*0.1);
            drawImage(imgLoadingObj["MaterialOne"], 2830, 3031, 330, 154, -0, -154/2); 
        }else{
            cxt.translate((-156)*ratio*widthratio-Hozis,(2318+154/2)*ratio*widthratio);
            cxt.rotate(ParachuteRotate*0.1);
            drawImage(imgLoadingObj["MaterialOne"], 2830, 3031, 330, 154, 0, -154/2); 
        }
        cxt.restore()

        /************************************************************奔跑的人男**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne"], 2489, 3303, 111, 127, 206, 2323); 
        cxt.restore()
        /************************************************************奔跑的人男的手**********************************************************************************************/
        cxt.save()
        cxt.translate((235+41/2)*ratio*widthratio,(2299+75/2)*ratio*widthratio);
        cxt.rotate(ParachuteRotate*1.5);
        drawImage(imgLoadingObj["MaterialOne"], 2448, 3242, 41, 75, -20, -35); 
        cxt.restore()
        /************************************************************奔跑的人女**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne"], 2646, 3302, 80, 129, 286, 2323); 
        cxt.restore()
        /************************************************************奔跑的人女的手**********************************************************************************************/
        cxt.save()
        cxt.translate((269+63/2)*ratio*widthratio,(2338)*ratio*widthratio);
        cxt.rotate(ParachuteRotate*-0.6);
        drawImage(imgLoadingObj["MaterialOne"], 2725, 3258, 63, 43, -63/2, 0); 
        cxt.restore()
        /************************************************************岩石左右**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialOne"], 1989, 3511, 350, 228, -40, 2385); 
        drawImage(imgLoadingObj["MaterialOne"], 1971, 3226, 372, 212, 224, 2385); 
        cxt.restore()
        /************************************************************岩石下方 飘动的云**********************************************************************************************/
        cxt.save()
        cxt.translate(ParachuteRotate*30,0);
        drawImage(imgLoadingObj["MaterialOne"], 57, 2979, 115, 58, 22, 2435); 
        drawImage(imgLoadingObj["MaterialOne"], 490, 2964, 162, 64, 252, 2425); 
        drawImage(imgLoadingObj["MaterialOne"], 740, 2967, 162, 64, -20, 2585); 
        drawImage(imgLoadingObj["MaterialOne"], 236, 2967, 139, 70, 328, 2535); 
        cxt.restore()


        /************************************************************使用素材2**********************************************************************************************/
        
        /************************************************************外汇犹如一个吃鸡战场**********************************************************************************************/
        cxt.save()
        cxt.translate((186)*ratio*widthratio,(2465)*ratio*widthratio);
        Global_Scale= distanceScoll(4000,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialTwo"], 2308, 44, 473, 155, -118, 0);
        cxt.restore()
        /************************************************************汇乎部分之蓝色背景**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo"], 268, 537, 204, 227, 43, 2798);//6
        drawImage(imgLoadingObj["MaterialTwo"], 1074, 656, 382, 482, 106, 2585);
        cxt.restore()
        /************************************************************汇乎部分之一堆烂尾楼**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo"], 51, 533, 69, 314,-10, 2729);  //1
        drawImage(imgLoadingObj["MaterialTwo"], 710, 619, 157, 322, 256, 2776);//10
        cxt.restore()

        /************************************************************汇乎部分之中间的人**********************************************************************************************/
        cxt.save()
        Hozis = cloudsDistance(4400,1);
        if(-currentScorll>4590*scorllratio){
            drawImage(imgLoadingObj["MaterialTwo"], 2617, 234, 642, 591, 46, 2550);
        }else{
            cxt.translate((46+642/5)*ratio*widthratio,(2550+591/2)*ratio*widthratio);
            Global_Scale= distanceScoll(4500,0,0,"REDUCE",120/scorllratio);
            cxt.scale(Global_Scale,Global_Scale);
            cxt.rotate(Math.PI/180*(180+Hozis/scorllratio));
            drawImage(imgLoadingObj["MaterialTwo"], 2617, 234, 642, 591, -642/5, -591/2);
        }
        cxt.restore()

        /************************************************************汇乎部分之一堆烂尾楼**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo"], 513, 542, 158, 316, 3, 2819);//5
        drawImage(imgLoadingObj["MaterialTwo"], 887, 980, 159, 316, 318, 2816);//11
        drawImage(imgLoadingObj["MaterialTwo"], 197, 909, 485, 295, 60, 2843);//7
        cxt.restore()

        cxt.save()
        Hozis = cloudsDistance(4570,1);
        if(-currentScorll>4730*scorllratio){
            drawImage(imgLoadingObj["MaterialTwo"], 695, 1004, 180, 119, 256, 2820);//草5
        }else{
            cxt.translate(0,Hozis);
            drawImage(imgLoadingObj["MaterialTwo"], 695, 1004, 180, 119, 256, 2900);//草5
        }
        cxt.restore()

        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo"], 145, 533, 89, 172,-10, 2790);//2
        drawImage(imgLoadingObj["MaterialTwo"], 42, 884, 127, 254,-4, 2843);//3
        cxt.restore()

        cxt.save()
        Hozis = cloudsDistance(4770,1);
        if(-currentScorll>4880*scorllratio){
            drawImage(imgLoadingObj["MaterialTwo"], 51, 1626, 104, 70,-5, 2918);//草1
        }else{
            cxt.translate(-Hozis,0);
            drawImage(imgLoadingObj["MaterialTwo"], 51, 1626, 104, 70,-65, 2918);//草1
        }
        cxt.restore()
        drawImage(imgLoadingObj["MaterialTwo"], 10, 1381, 242, 202,0, 2953);//4
        drawImage(imgLoadingObj["MaterialTwo"], 29, 1207, 223, 155,20, 2865);//草2
        drawImage(imgLoadingObj["MaterialTwo"], 279, 1420, 313, 261,79, 2928);//9
        cxt.restore()

        cxt.save()
        Hozis = cloudsDistance(4730,1);
        if(-currentScorll>4930*scorllratio){
            drawImage(imgLoadingObj["MaterialTwo"], 315, 1266, 227, 111,139, 2898);//草3
        }else{
            cxt.translate(Hozis,0);
            drawImage(imgLoadingObj["MaterialTwo"], 315, 1266, 227, 111,239, 2898);//草3
        }
        cxt.restore()

        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo"], 637, 1322, 304, 295,226, 2858);//12
        drawImage(imgLoadingObj["MaterialTwo"], 1892, 48, 127, 175,315, 3000);//蓝色红1
        cxt.restore()
        // 左右飘动的云
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo"], 88, 2681, 191, 67,(-30+ParachuteRotate*20), 2868);//12
        drawImage(imgLoadingObj["MaterialTwo"], 93, 2820, 209, 86,(315-ParachuteRotate*20), 2900);//蓝色红1
        cxt.restore()

        cxt.save()
        Hozis = cloudsDistance(4860,1);
        if(-currentScorll>5028*scorllratio){
            drawImage(imgLoadingObj["MaterialTwo"], 2262, 224, 290, 139,-10, 2993);//草4
        }else{
            cxt.translate(0,Hozis);
            drawImage(imgLoadingObj["MaterialTwo"], 2262, 224, 290, 139,-10, 3073);//草4
        }
        cxt.restore()

        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo"], 2271, 388, 282, 214,-3, 3033);//8
        drawImage(imgLoadingObj["MaterialTwo"], 1617, 44, 259, 358,223, 2999);//13
        cxt.restore()

        /************************************************************汇乎部分之一堆文件**********************************************************************************************/
        cxt.save()
        Hozis = cloudsDistance(5200,1);
        if(-currentScorll>6144*scorllratio){
            drawImage(imgLoadingObj["MaterialTwo"], 562, 0, 93, 185, 56, 3258);//碎文件1
        }else{
            cxt.translate(Hozis*0.16,-Hozis*0.5)
            drawImage(imgLoadingObj["MaterialTwo"], 562, 0, 93, 185, 132, 3023);//碎文件1
        }
        cxt.restore()
        
        cxt.save()
        if(-currentScorll>6018*scorllratio){
            drawImage(imgLoadingObj["MaterialTwo"], 909, 7, 121, 198, 220, 3270);//碎文件2
        }else{
            cxt.translate(-Hozis*0.21,-Hozis*0.6)
            drawImage(imgLoadingObj["MaterialTwo"], 909, 7, 121, 198, 132, 3023);//碎文件2
        }
        cxt.restore()
        
        cxt.save()
        if(-currentScorll>6232*scorllratio){
            drawImage(imgLoadingObj["MaterialTwo"], 684, 253, 93, 89, 120, 3380);//碎文件3
        }else{
            cxt.translate(Hozis*0.02,-Hozis*0.7)
            drawImage(imgLoadingObj["MaterialTwo"], 684, 253, 93, 89, 132, 3023);//碎文件3
        }
        cxt.restore()
        
        cxt.save()
        if(-currentScorll>6332*scorllratio){
            drawImage(imgLoadingObj["MaterialTwo"], 849, 330, 72, 90, 202, 3420);//碎文件4
        }else{
            cxt.translate(0,-Hozis*0.7)
            drawImage(imgLoadingObj["MaterialTwo"], 849, 330, 72, 90, 202, 3023);//碎文件4
        }
        cxt.restore()
        
        cxt.save()
        if(-currentScorll>6432*scorllratio){
            drawImage(imgLoadingObj["MaterialTwo"], 814, 508, 22, 25, 182, 3490);//碎文件5
        }else{
            cxt.translate(0,-Hozis*0.7)
            drawImage(imgLoadingObj["MaterialTwo"], 814, 508, 22, 25, 182, 3023);//碎文件5
        }
        cxt.restore()
        
        cxt.save()
        Hozis = cloudsDistance(5000,1);
        if(-currentScorll>5510*scorllratio){
            drawImage(imgLoadingObj["MaterialTwo"], 2000, 428, 197, 124, 132, 3278);//避雷避坑
        }else{
            cxt.translate(0,-Hozis)
            drawImage(imgLoadingObj["MaterialTwo"], 2000, 428, 197, 124, 132, 3023);//避雷避坑
        }
        cxt.restore()
        
        cxt.save()
        Hozis = cloudsDistance(5100,1);
        if(-currentScorll>5520*scorllratio){
            drawImage(imgLoadingObj["MaterialTwo"], 1903, 271, 105, 125, 199, 3234);//橘色块
        }else{
            cxt.translate(0,-Hozis)
            drawImage(imgLoadingObj["MaterialTwo"], 1903, 271, 105, 125, 199, 3023);//橘色块
        }
        cxt.restore()
        
        cxt.save()
        Hozis = cloudsDistance(5200,1);
        if(-currentScorll>5620*scorllratio){
            drawImage(imgLoadingObj["MaterialTwo"], 1775, 434, 199, 235, 112, 3188);//强化知识装备
        }else{
            cxt.translate(Hozis*0.1,-Hozis*0.8)
            drawImage(imgLoadingObj["MaterialTwo"], 1775, 434, 199, 235, 132, 3023);//强化知识装备
        }
        cxt.restore()
        
        cxt.save()
        Hozis = cloudsDistance(5300,1);
        if(-currentScorll>5508*scorllratio){
            drawImage(imgLoadingObj["MaterialTwo"], 1545, 434, 204, 297, 166, 3123);//故事贴
        }else{
            cxt.translate(0,-Hozis)
            drawImage(imgLoadingObj["MaterialTwo"], 1545, 434, 204, 297, 166, 3023);//故事贴
        }
        cxt.restore()
        
        cxt.save()
        Hozis = cloudsDistance(5400,1);
        if(-currentScorll>5600*scorllratio){
            drawImage(imgLoadingObj["MaterialTwo"], 1074, 327, 201, 269, 85, 3103);//技术贴
        }else{
            cxt.translate(Hozis*0.46,-Hozis*0.8)
            drawImage(imgLoadingObj["MaterialTwo"], 1074, 327, 201, 269, 132, 3023);//技术贴
        }
        cxt.restore()
        
        cxt.save()
        Hozis = cloudsDistance(5500,1);
        if(-currentScorll>5690*scorllratio){
            drawImage(imgLoadingObj["MaterialTwo"], 1309, 361, 210, 207, 212, 3114);//经验贴
        }else{
            cxt.translate(-Hozis*0.88,-Hozis)
            drawImage(imgLoadingObj["MaterialTwo"], 1309, 361, 210, 207, 132, 3023);//经验贴
        }
        cxt.restore()
        
        cxt.save()
        Hozis = cloudsDistance(5600,1);
        if(-currentScorll>5780*scorllratio){
            drawImage(imgLoadingObj["MaterialTwo"], 1121, 47, 161, 235, 38, 3086);//外汇领域专家
        }else{
            cxt.translate(Hozis,-Hozis*0.67)
            drawImage(imgLoadingObj["MaterialTwo"], 1121, 47, 161, 235, 132, 3023);//外汇领域专家
        }
        cxt.restore()

        cxt.save()
        Hozis = cloudsDistance(5750,1);
        drawImage(imgLoadingObj["MaterialTwo"], 1309, 46, 274, 283, 132, 3023);//交易高手
        cxt.restore()

        /************************************************************喝饮料的金童玉女**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo"], 2655, 2006, 392, 394, -106, 3408);//男头
        drawImage(imgLoadingObj["MaterialTwo"], 2781, 2691, 377, 388, 276, 3408);//女头
        cxt.restore()
        
        cxt.save()
        cxt.translate((16+0/2)*ratio*widthratio,(3596+90/2)*ratio*widthratio);
        cxt.rotate(ParachuteRotate*0.3);
        drawImage(imgLoadingObj["MaterialTwo"], 2946, 2444, 194, 90, 0, -90/2);//男童左手
        cxt.restore()

        cxt.save()
        cxt.translate((-8+194/5)*ratio*widthratio,(3596+90/2)*ratio*widthratio);
        cxt.rotate(-ParachuteRotate*0.5);
        drawImage(imgLoadingObj["MaterialTwo"], 2676, 2444, 195, 90, -194/5, -90/2);//男童右手(外侧)
        cxt.restore()
        
        cxt.save()
        cxt.translate((262+194/2)*ratio*widthratio,(3596+90/2)*ratio*widthratio);
        cxt.rotate(ParachuteRotate*0.3);
        drawImage(imgLoadingObj["MaterialTwo"], 2702, 3112, 194, 90, -194/2, -90/2);//女童右手(有表)
        cxt.restore()

        cxt.save()
        cxt.translate((284+194/4)*ratio*widthratio,(3594+94/2)*ratio*widthratio);
        cxt.rotate(-ParachuteRotate*0.5);
        drawImage(imgLoadingObj["MaterialTwo"], 3011, 3094, 194, 94, -194/4, -94/2);//女童左手(没表,外侧)
        cxt.restore()

        /************************************************************电脑桌+笔记本**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo"], 3117, 2066, 82, 153, 80, 3566);//男桌阔落

        drawImage(imgLoadingObj["MaterialTwo"], 3117, 2308, 139, 84, 99, 3598);//男桌笔记本
        drawImage(imgLoadingObj["MaterialTwo"], 2487, 2906, 260, 101, 196, 3588);//女桌笔记本
        drawImage(imgLoadingObj["MaterialTwo"], 2720, 2602, 375, 56, -5, 3638);//男桌
        drawImage(imgLoadingObj["MaterialTwo"], 2799, 3241, 369, 55, 196, 3638);//女桌
        cxt.restore()

        /************************************************************金童玉女对话**********************************************************************************************/
        cxt.save()
        cxt.translate((88)*ratio*widthratio,(3432+56/2)*ratio*widthratio);
        Global_Scale= distanceScoll(5700,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialTwo"], 64, 50, 263, 56, 0, -56/2);//大神们外汇怎么玩？
        cxt.restore()

        cxt.save()
        cxt.translate((82+429/2)*ratio*widthratio,(3462+80/2)*ratio*widthratio);
        Global_Scale= distanceScoll(5750,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialTwo"], 103, 143, 429, 80, -429/2, -80/2);//先把基础知识。。。。。。
        cxt.restore()

        cxt.save()
        cxt.translate((60+467/2)*ratio*widthratio,(3508+79/2)*ratio*widthratio);
        Global_Scale= distanceScoll(5800,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialTwo"], 63, 260, 467, 79, -467/2, -79/2);//不要急功近利。。。。。。。。
        cxt.restore()

        cxt.save()
        cxt.translate((154+260/2)*ratio*widthratio,(3552+79/2)*ratio*widthratio);
        Global_Scale= distanceScoll(5850,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialTwo"], 237, 385, 260, 79, -260/2, -79/2);//看我技术分享...........
        cxt.restore()

        /************************************************************球 + 音响**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo"], 2215, 2584, 397, 227, -12, 3664);//音响机体(左)
        drawImage(imgLoadingObj["MaterialTwo"], 1786, 2158, 397, 227, 192, 3664);//音响机体(右)
        cxt.restore()

        cxt.save()
        if(musicTurn){
            cxt.translate((44+106/4)*ratio*widthratio,(3722+102/4)*ratio*widthratio);
            cxt.scale(ShockSounds,ShockSounds);
            drawImage(imgLoadingObj["MaterialTwo"], 2252, 2430, 106, 102, -106/4, -102/4);//左2.1  喇叭
        }else{
            drawImage(imgLoadingObj["MaterialTwo"], 2252, 2430, 106, 102, 44, 3722);//左2.1  喇叭
        }
        cxt.restore()

        cxt.save()
        if(musicTurn){
            cxt.translate((112+106/4)*ratio*widthratio,(3722+102/4)*ratio*widthratio);
            cxt.scale(ShockSounds,ShockSounds);
            drawImage(imgLoadingObj["MaterialTwo"], 2412, 2431, 106, 102, -106/4, -102/4);//左2.2
        }else{
            drawImage(imgLoadingObj["MaterialTwo"], 2412, 2431, 106, 102, 112, 3722);//左2.2
        }
        cxt.restore()

        cxt.save()
        if(musicTurn){
            cxt.translate((216+104/4)*ratio*widthratio,(3722+101/4)*ratio*widthratio);
            cxt.scale(ShockSounds,ShockSounds);
            drawImage(imgLoadingObj["MaterialTwo"], 1793, 2042, 104, 101, -104/4, -101/4);//右2.1
        }else{
            drawImage(imgLoadingObj["MaterialTwo"], 1793, 2042, 104, 101, 216, 3722);//右2.1
        }
        cxt.restore()

        cxt.save()
        if(musicTurn){
            cxt.translate((284+104/4)*ratio*widthratio,(3722+101/4)*ratio*widthratio);
            cxt.scale(ShockSounds,ShockSounds);
            drawImage(imgLoadingObj["MaterialTwo"], 1951, 2042, 104, 101, -104/4, -101/4);//右2.2
        }else{
            drawImage(imgLoadingObj["MaterialTwo"], 1951, 2042, 104, 101, 284, 3722);//右2.2
        }
        cxt.restore()

        cxt.save()
        Hozis = cloudsDistance(6100,1);
        cxt.translate((-80+282/4)*ratio*widthratio,(3652+276/4)*ratio*widthratio);
        cxt.rotate(Math.PI/180*-Hozis*0.1);
        drawImage(imgLoadingObj["MaterialTwo"], 2237, 2100, 282, 276, -282/4, -276/4);//左球
        cxt.restore()

        cxt.save()
        Hozis = cloudsDistance(6100,1);
        cxt.translate((320+281/4)*ratio*widthratio,(3652+276/4)*ratio*widthratio);
        cxt.rotate(Math.PI/180*-Hozis*0.1);
        drawImage(imgLoadingObj["MaterialTwo"], 1879, 2523, 281, 276, -281/4, -276/4);//右球
        cxt.restore()

        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo"], 2537, 2125, 81, 236, 20, 3664);//左星星
        drawImage(imgLoadingObj["MaterialTwo"], 1776, 2548, 80, 236, 320, 3664);//右星星
        cxt.restore()

        /************************************************************人腿旁边的星星**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo"], 1539, 797, 88, 88, 10, 3858);//星星1
        drawImage(imgLoadingObj["MaterialTwo"], 1691, 812, 59, 58, 94, 3790);//星星2
        drawImage(imgLoadingObj["MaterialTwo"], 1812, 825, 36, 36, 340, 3854);//星星3
        drawImage(imgLoadingObj["MaterialTwo"], 1891, 807, 69, 69, 220, 3984);//星星4
        drawImage(imgLoadingObj["MaterialTwo"], 1998, 780, 111, 110, 282, 4024);//星星5
        cxt.restore()
        /************************************************************捧起来的人**********************************************************************************************/
        cxt.save()
        cxt.translate((142)*ratio*widthratio,(3868+368/2)*ratio*widthratio);
        cxt.rotate(-ParachuteRotate*0.2);
        drawImage(imgLoadingObj["MaterialTwo"], 1066, 2177, 499, 368, 0, -368/2);//后腿
        cxt.restore()

        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo"], 587, 2444, 404, 442, -22, 3862);//身体
        cxt.restore()

        cxt.save()
        cxt.translate((60)*ratio*widthratio,(3728+400/2)*ratio*widthratio);
        cxt.rotate(ParachuteRotate*0.2);
        drawImage(imgLoadingObj["MaterialTwo"], 85, 2100, 496, 400, 0, -400/2);//前腿
        cxt.restore()
        /************************************************************手下的云朵**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo"], 85, 1748, 813, 259, -18, 4088);//一堆手
        drawImage(imgLoadingObj["MaterialTwo"], 1446, 1649, 119, 304, 10, 4050);//托身体的手1(蓝色字标注)
        drawImage(imgLoadingObj["MaterialTwo"], 1664, 1617, 184, 401, 78, 4030);//托身体的手2(蓝色字标注)
        cxt.restore()
        // 欢呼的手
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo"], 1217, 1649, 96, 148, 32, 4098+(handsShock));//欢呼的手 金色字标注1
        cxt.restore()
        drawImage(imgLoadingObj["MaterialTwo"], 1771, 1301, 127, 265, 112, 4088+(-handsShock));//欢呼的手 金色字标注2
        cxt.restore()
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo"], 1211, 1305, 108, 278, 178, 4088+(handsShock));//欢呼的手 金色字标注3
        cxt.restore()
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo"], 1409, 1344, 110, 171, 238, 4108+(-handsShock));//欢呼的手 金色字标注4
        cxt.restore()
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo"], 1591, 1344, 90, 150, 302, 4088+(handsShock));//欢呼的手 金色字标注5
        cxt.restore()

        // 欢呼的手上面的字
        cxt.save()
        cxt.translate((32+400/2)*ratio*widthratio,(4052+60/2)*ratio*widthratio);
        Global_Scale= distanceScoll(7000,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialTwo"], 1575, 938, 400, 60, -400/2, -60/2);//行情分析小能手，关键时刻拯救你
        cxt.restore()

        cxt.save()
        cxt.translate((132)*ratio*widthratio,(4088+61/2)*ratio*widthratio);
        Global_Scale= distanceScoll(7100, 0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialTwo"], 1521, 1033, 400, 61, 0, -61/2);//牛人奋斗史，偶尔八卦一下也可以
        cxt.restore()

        cxt.save()
        cxt.translate((42+443/2)*ratio*widthratio,(4126+59/2)*ratio*widthratio);
        Global_Scale= distanceScoll(7200,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialTwo"], 1528, 1129, 443, 59, -443/2, -59/2);//潜伏黄金市场
        cxt.restore()
        // yun轻微上下飘动
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo"], 2087, 959, 910, 413, -22, 4130+(ParachuteRotate*10));//深色
        drawImage(imgLoadingObj["MaterialTwo"], 2109, 1399, 898, 499, -40, 4092+(ParachuteRotate*10));
        cxt.restore()

        // 汇乎求知计划
        cxt.save()
        cxt.translate((21+670/4)*ratio*widthratio,(4330)*ratio*widthratio);
        Global_Scale= distanceScoll(7500,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialTwo"], 1075, 2618, 670, 214, -670/4, 0);
        cxt.restore()

        // 两个牛头
        cxt.save()
        cxt.translate((24+284/4)*ratio*widthratio,(4480+246/4)*ratio*widthratio);
        Global_Scale= distanceScoll(8000,0,0,"REDUCE",100/scorllratio);
        if(-currentScorll>8120*scorllratio){
            cxt.scale(Global_Scale,Global_Scale);
            drawImage(imgLoadingObj["MaterialTwo"], 1423, 2910, 284, 246, -284/4, -246/4);//红牛
        }else{
            cxt.rotate(Global_Scale*6.28)
            cxt.scale(Global_Scale,Global_Scale);
            drawImage(imgLoadingObj["MaterialTwo"], 1423, 2910, 284, 246, -284/4, -246/4);//红牛
        }
        cxt.restore()

        cxt.save()
        cxt.translate((214+284/4)*ratio*widthratio,(4483+240/4)*ratio*widthratio);
        Global_Scale= distanceScoll(8000,0,0,"REDUCE",100/scorllratio);
        if(-currentScorll>8120*scorllratio){
            cxt.scale(Global_Scale,Global_Scale);
            drawImage(imgLoadingObj["MaterialTwo"], 1060, 2922, 284, 240, -284/4, -240/4);//蓝牛
        }else{
            cxt.rotate(-Global_Scale*6.28)
            cxt.scale(Global_Scale,Global_Scale);
            drawImage(imgLoadingObj["MaterialTwo"], 1060, 2922, 284, 240, -284/4, -240/4);//蓝牛
        }
        cxt.restore()

        // 牛头下的云
        cxt.save()
        Hozis = cloudsDistance(8120,1);
        if(-currentScorll>8322*scorllratio){
            drawImage(imgLoadingObj["MaterialTwo"], 1395, 3212, 257, 137, 294, 4640);//右
        }else{
            cxt.translate(Hozis,0)
            drawImage(imgLoadingObj["MaterialTwo"], 1395, 3212, 257, 137, 394, 4640);//右
        }
        cxt.restore()
        cxt.save()
        Hozis = cloudsDistance(8120,1);
        if(-currentScorll>8388*scorllratio){
            drawImage(imgLoadingObj["MaterialTwo"], 1107, 3235, 220, 119, -20, 4640);//左
        }else{
            cxt.translate(-Hozis,0)
            drawImage(imgLoadingObj["MaterialTwo"], 1107, 3235, 220, 119, -150, 4640);//左
        }
        cxt.restore()

        cxt.save()
        cxt.translate((120+274/4)*ratio*widthratio,(4640+129/4)*ratio*widthratio);
        Global_Scale= distanceScoll(8200,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialTwo"], 614, 3124, 274, 129, -274/4, -129/4);//还有更多福利等你领取
        cxt.restore()

        /************************************************************大礼盒**********************************************************************************************/
        cxt.save()
        cxt.translate((80+429/4)*ratio*widthratio,(4722+410/4)*ratio*widthratio);
        Global_Scale= distanceScoll(8444,0,0,"REDUCE",120/scorllratio);
        cxt.rotate(Global_Scale*6)
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialTwo"], 63, 2957, 429, 410, -429/4, -410/4);
        cxt.restore()

        /************************************************************大礼盒上漂浮的云**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo"], 88, 2681, 191, 67, (70+ParachuteRotate*20), 4852);//左
        cxt.restore()
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo"], 93, 2820, 209, 86, (200-ParachuteRotate*20), 4840);//右
        cxt.restore()
        /************************************************************大礼盒下的云朵+草云**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo"], 2183, 3386, 869, 371, -20, 4880);
        cxt.restore()

        cxt.save()
        Hozis = cloudsDistance(8820,1);
        if(-currentScorll>9024*scorllratio){
            drawImage(imgLoadingObj["MaterialTwo"], 1824, 2894, 326, 275, -40, 4932);//左草云
        }else{
            cxt.translate(-Hozis,0);
            drawImage(imgLoadingObj["MaterialTwo"], 1824, 2894, 326, 275, -140, 4932);//左草云
        }
        cxt.restore()
        cxt.save()
        Hozis = cloudsDistance(8820,1);
        if(-currentScorll>9024*scorllratio){
            drawImage(imgLoadingObj["MaterialTwo"], 1794, 3202, 331, 282, 250, 4932);//右草云
        }else{
            cxt.translate(Hozis,0);
            drawImage(imgLoadingObj["MaterialTwo"], 1794, 3202, 331, 282, 350, 4932);//右草云
        }
        cxt.restore()
        /************************************************************汇乎，我们构建的是专业的外汇知识问答平台**********************************************************************************************/
        cxt.save()
        cxt.translate((80+407/4)*ratio*widthratio,(5070+0/4)*ratio*widthratio);
        Global_Scale= distanceScoll(9150,0,0,"REDUCE",120/scorllratio);
        cxt.scale(Global_Scale,Global_Scale);
        drawImage(imgLoadingObj["MaterialTwo"], 552, 3331, 407, 240, -407/4, 0);
        cxt.restore()

        /************************************************************汇乎下载(周边漂浮的云朵)**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo"], 1435, 3419, 145, 51, (40+ParachuteRotate*25), 5190);//紫色标注1
        drawImage(imgLoadingObj["MaterialTwo"], 1458, 3757, 122, 50, (268+ParachuteRotate*20), 5140);//紫色标注2
        drawImage(imgLoadingObj["MaterialTwo"], 1420, 3533, 176, 72, (72-ParachuteRotate*28), 5320);//紫色标注3
        drawImage(imgLoadingObj["MaterialTwo"], 1445, 3644, 191, 67, (216-ParachuteRotate*23), 5270);//紫色标注4
        cxt.restore()

        /************************************************************汇乎下载**********************************************************************************************/
        cxt.save()
        EventsTriggerPosition["HH_DOWNLOAD"] = {
            pisx:118*widthratio,
            pisY:((5220*widthratio)*ratio+currentScorll)/ratio,
            Range:{
                minPisY:((5220*widthratio)*ratio+currentScorll)/ratio,
                maxPisY:276*widthratio/2+(((5220*widthratio)*ratio+currentScorll)/ratio),

                minPisX:118*widthratio,
                maxPisX:118*widthratio+276*widthratio/2
            }
        }
        drawImage(imgLoadingObj["MaterialTwo"], 1087, 3451, 276, 276, 118, 5220);//汇乎图片
        drawImage(imgLoadingObj["MaterialTwo"], 614, 3018, 244, 16, 130, 5370);//下载汇乎APP字
        cxt.restore()

        /************************************************************底部**********************************************************************************************/
        cxt.save()
        drawImage(imgLoadingObj["MaterialTwo"], 1830, 3863, 750, 706, 0, 5140);//底部框
        cxt.restore()
        /************************************************************底部**********************************************************************************************/
        cxt.save()
        EventsTriggerPosition["GO_OFFICIAL_WEB"] = {
            pisx:12*widthratio,
            pisY:((5454*widthratio)*ratio+currentScorll)/ratio,
            Range:{
                minPisY:((5454*widthratio)*ratio+currentScorll)/ratio,
                maxPisY:49*widthratio/2+(((5454*widthratio)*ratio+currentScorll)/ratio),

                minPisX:12*widthratio,
                maxPisX:12*widthratio+201*widthratio/2
            }
        }
        drawImage(imgLoadingObj["MaterialTwo"], 1873, 4642, 201, 49, 12, 5454);//进入官网
        cxt.restore()

        cxt.save()
        EventsTriggerPosition["SEE_AGAIN"] = {
            pisx:258*widthratio,
            pisY:((5454*widthratio)*ratio+currentScorll)/ratio,
            Range:{
                minPisY:((5454*widthratio)*ratio+currentScorll)/ratio,
                maxPisY:49*widthratio/2+(((5454*widthratio)*ratio+currentScorll)/ratio),

                minPisX:258*widthratio,
                maxPisX:258*widthratio+204*widthratio/2
            }
        }
        drawImage(imgLoadingObj["MaterialTwo"], 2374, 4641, 204, 49, 258, 5454);//再看一次
        cxt.restore()
    }
    // ZOOM type 缩放比例区间x-y 放大 y-z 缩小  reduce  缩放比例区间x-y 放大 y-z 缩小至1
    function distanceScoll(x, y, z,type,distance) {
        // ZOOM x为滚动初始位置，x-y 放大  y-z缩小至无 type = ZOOM distance（不需要）
        // REDUCE x为滚动初始位置，y，z（不需要） type=REDUCE diatance=100以上 例如 110 放大区间为 0-1.1
        var scale;
        if(type == "ZOOM"){
            scale = -currentScorll <= x * scorllratio ? 1 : (-currentScorll > x * scorllratio && -currentScorll <= y * scorllratio ? ((1 - (currentScorll + x * scorllratio) / 100)) : (1 + ((currentScorll + z * scorllratio) / 100)));
            // console.log(scale)
            return scale > 0 ? scale : 0;
        }
        if(type == "REDUCE"){
            // console.log(-currentScorll <= x * scorllratio ? 0 : (-currentScorll > x * scorllratio && -currentScorll <= y * scorllratio ? "是在X-Y："+(-currentScorll-(x*scorllratio)) / 100 : "超过y-Z："+((currentScorll + z * scorllratio)) / 100))
            scale = -currentScorll <= x * scorllratio ? 0 : (-currentScorll > x * scorllratio && -currentScorll <= (x+distance) * scorllratio ? (-currentScorll-(x*scorllratio)) / 100 : (((currentScorll + (x+distance*2) * scorllratio)) / 100)<=1 ? 1 :((currentScorll + (x+distance*2) * scorllratio)) / 100);
            return scale;
        }
    }
    // 位移
    function cloudsDistance(dis, speed) {
        return -currentScorll > dis * scorllratio ? (currentScorll + dis * scorllratio) * speed : 0;
    }
    // 缩放中心
    // function scalePosition(attr, pos, scale, ratioFlag) {
    //     if (ratioFlag) {
    //         return (pos * ratio - (attr * ratioFlag * scale - attr * ratioFlag)) / scale / ratio
    //     } else {
    //         return (pos * ratio - (attr * scale - attr)) / scale / ratio
    //     }
    // }
    
    // 获取点击坐标
    function windowToCanvas(x, y) {
        var cvsbox = canvas.getBoundingClientRect();
        return { x: Math.round(x - cvsbox.left), y: Math.round(y - cvsbox.top) };
    }
    canvas.onclick = function (e) {
        var clickXY = windowToCanvas(e.clientX, e.clientY);
        if(EventsTriggerPosition.hasOwnProperty("MUSIC_ON")&&clickXY.x<EventsTriggerPosition["MUSIC_ON"].Range.maxPisX&&clickXY.x>EventsTriggerPosition["MUSIC_ON"].Range.minPisX&&clickXY.y<EventsTriggerPosition["MUSIC_ON"].Range.maxPisY&&clickXY.y>EventsTriggerPosition["MUSIC_ON"].Range.minPisY){
            if(musicTurn){
                console.log("音乐关了！");
                musicTurn=false;
                musicPlay.pause()
            }else{
                console.log("音乐开了！");
                musicTurn=true;
                musicPlay.play()
            }
        }
        if(EventsTriggerPosition.hasOwnProperty("HH_DOWNLOAD")&&clickXY.x<EventsTriggerPosition["HH_DOWNLOAD"].Range.maxPisX&&clickXY.x>EventsTriggerPosition["HH_DOWNLOAD"].Range.minPisX&&clickXY.y<EventsTriggerPosition["HH_DOWNLOAD"].Range.maxPisY&&clickXY.y>EventsTriggerPosition["HH_DOWNLOAD"].Range.minPisY){
            console.log("汇乎下载啦！")
        }
        if(EventsTriggerPosition.hasOwnProperty("GO_OFFICIAL_WEB")&&clickXY.x<EventsTriggerPosition["GO_OFFICIAL_WEB"].Range.maxPisX&&clickXY.x>EventsTriggerPosition["GO_OFFICIAL_WEB"].Range.minPisX&&clickXY.y<EventsTriggerPosition["GO_OFFICIAL_WEB"].Range.maxPisY&&clickXY.y>EventsTriggerPosition["GO_OFFICIAL_WEB"].Range.minPisY){
            console.log("进入官网啦！")
        }
        if(EventsTriggerPosition.hasOwnProperty("SEE_AGAIN")&&clickXY.x<EventsTriggerPosition["SEE_AGAIN"].Range.maxPisX&&clickXY.x>EventsTriggerPosition["SEE_AGAIN"].Range.minPisX&&clickXY.y<EventsTriggerPosition["SEE_AGAIN"].Range.maxPisY&&clickXY.y>EventsTriggerPosition["SEE_AGAIN"].Range.minPisY){
            console.log("再看一遍啦！")
            currentScorll = 0;
        }
    }
    // 绘制画布封装
    function drawImage(img, imgx, imgy, imgw, imgh, canvasx, canvasy) {
        cxt.drawImage(img, imgx, imgy, imgw, imgh, canvasx * ratio * widthratio, canvasy * ratio * widthratio, (imgw * ratio * widthratio) / 2, (imgh * ratio * widthratio) / 2);
    }
    // 清空画布
    function clearCanvas() {
        cxt.clearRect(0, 0, 375 * ratio, totalHeight)
    }
    // function setIntervalFun(id,stepTime,fun){
    //     TimerSet[id] = setInterval(fun,stepTime)
    // }
    
    // function resetInterval(){
    //     for(var i in Object.keys(TimerSet)){
    //         clearInterval(TimerSet[Object.keys(TimerSet)[i]])
    //     }
    // }

    // rotate封装
    function CommonRotate(deg){
        // 旋转参数
        this.rotate = 1;
        this.flag=true;
        this.deg = deg;
        // 音响放大参数
        this.soundsShocks = null;
        this.shockFlag = 1;
        this.soundFlag = true;
        // 欢呼手
        this.maxPeak = null;
        this.minPeak = null;
        this.computedPeak = null;
        this.shakeFlag = true;
    }
    // 旋转参数
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
        
    }
    // 音响放大参数
    CommonRotate.prototype.shock = function(soundsValue,Company){
        this.soundsShocks = soundsValue;
        if(this.shockFlag<=1){
            //做++
            this.soundFlag = true;
        }
        if(this.shockFlag>this.soundsShocks){
            //做--
            this.soundFlag = false;
        }
        if(this.soundFlag){
            this.shockFlag +=  Company;
        }else if(!this.soundFlag){
            this.shockFlag -= Company;
        }
        
    }
    // 欢呼手
    CommonRotate.prototype.shakeHands = function(minPeak,maxPeak,speed){
        this.minPeak = minPeak;
        this.maxPeak = maxPeak;
        if(this.computedPeak<=this.minPeak){
            //做++
            this.shakeFlag = true;
        }
        if(this.computedPeak>this.maxPeak){
            //做--
            this.shakeFlag = false;
        }
        if(this.shakeFlag){
            this.computedPeak +=  speed;
        }else if(!this.shakeFlag){
            this.computedPeak -= speed;
        }
        
    }
    

    // resizeCanvas(cw * ratio, ch * ratio);
    function resizeCanvas(width, height) {
        // console.log(currentScorll,widthratio,heightratio,ratio,scorllratio);
        $('#canvas').attr('width', width);
        $('#canvas').attr('height', height);
        cxt.clearRect(0, 0, canvas.width, canvas.height);
    }
    $(window).resize(function () {
        preScorllVal = scorllratio;
        ratio = window.devicePixelRatio;
        cw = canvas.offsetWidth;
        ch = canvas.offsetHeight;
        widthratio = cw / 375;
        heightratio = ch / 667;
        scorllratio = widthratio * ratio / 2;
        // if(preScorllVal>scorllratio){
        //     currentScorll = currentScorll/preScorllVal;
        // }else if(preScorllVal<scorllratio){
        //     currentScorll = currentScorll*scorllratio;
        // }
        // console.log(currentScorll,preScorllVal,scorllratio)
        // resizeCanvas(cw * ratio, ch * ratio);
        drawCanvas()
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
        // clearCanvas()
        // drawCanvas()
        // console.log(currentScorll,"坐标")
    }, { passive: false });
    // window.addEventListener('touchend', e => {
    //     var touch = e.changedTouches[0];
    // }, { passive: false });
}

