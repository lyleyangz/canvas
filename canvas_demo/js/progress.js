 // progress
 var imgLoad = {
    // "imgs":"img/bg_1.jpg",
    "img2":"img/page3_atlas_P_2.png",
    "img3":"img/page3_atlas_P_3.png",
    "img4":"img/page3_atlas_P_.png",
    "topMusic":"img/loading_atlas_P_.png",
}
var countImgDownload=0;
for(let i in imgLoad){
    let img = new Image();
    img.src = imgLoad[i];
    img.onload = function(){
        countImgDownload++;
        if(countImgDownload==Object.keys(imgLoad).length){
            // console.log(countImgDownload,"图像加载完毕!");
            // drawImg(currentDis)
        }
    }
}