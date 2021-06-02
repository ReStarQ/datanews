// 电影轮播图跑马灯
var box=document.getElementById('horseRaceLamp-box');
var scroll=document.getElementById('horseRaceLamp-scroll');
window.onload=function(){           //页面加载完执行
    var blank=document.getElementById('blank');     //存放二次轮播图片盒子
    blank.innerHTML= scroll.innerHTML;              //将轮播图片放入blank盒子中 遮住空白区域。
    function scrollImg(){                //设置定时器
        // if(box.scrollLeft<=0){        //往右走
        //     box.scrollLeft=3375;    
        // }else{
        //     box.scrollLeft--;
        // }
        if(box.scrollLeft>3375){         //往左走
            box.scrollLeft=0;    
        }else{
            box.scrollLeft++;
        }
}

var scrollImg2=setInterval(scrollImg,30);   
//鼠标经过清除定时器,停止滚动
box.onmouseover = function() {
    clearInterval(scrollImg2)
};
//鼠标离开开启定时器,图片滚动
box.onmouseout = function() {
    scrollImg2 = setInterval(scrollImg, 30)
    };
}

// 按钮切换   间距1125  2250  3375
var upBtn=document.getElementById('upBtn')
var nextBtn=document.getElementById('nextBtn')
upBtn.onclick=function(){   //上一页
    if(box.scrollLeft>=0 && box.scrollLeft<1125){   //位置第一页
        box.scrollLeft=2250;                        //跳转第三页
    }else if(box.scrollLeft>=1125 && box.scrollLeft<2250){      //位置第二页
        box.scrollLeft =0;                                      //跳转第一页
    }else if(box.scrollLeft>=2250 && box.scrollLeft<3375){      //位置第三页
        box.scrollLeft =1125;                                   //跳转第二页
    }
   
    console.log(box.scrollLeft) 
}
nextBtn.onclick=function(){      //下一页
    if(box.scrollLeft>=0 && box.scrollLeft<1125){       //位置第一页
        box.scrollLeft=1125;                             //跳转第二页
    }else if(box.scrollLeft>=1125 && box.scrollLeft<2250){      //位置第二页
        box.scrollLeft=2250;                                    //跳转第三页
    }else if(box.scrollLeft>=2250 && box.scrollLeft<3375){      //位置第三页    
        box.scrollLeft =0;                                      //跳转第一页
    }      
}



//打印影院
cinemaMsg=JSON.parse(localStorage.getItem('HX210404-TZQ-cinemaMsg'))
var cinemaList=document.getElementById('cinema-list');
// var cinemaBox=document.getElementById('cinema-box');
//分页打印
var PageBox=document.getElementById("showPage");

function add(ary,num){
    var pageSize=num;       //设置每页打印的内容数量
    function showPageAdd(){
        cinemaList.innerHTML='';          
        PageBox.innerHTML='';
        var pageNum=Math.ceil(ary.length/pageSize);     //求页码
        //打印页码
        for(var i=1;i<=pageNum;i++){
            var pagaBtn=document.createElement('input');
            pagaBtn.type='button';
            pagaBtn.value=i;
            
            pagaBtn.onclick=function(){
                page=this.value;
                foodShow(page);
            }
            PageBox.appendChild(pagaBtn);
        }
        foodShow(1);
    }
    showPageAdd();   
    //按页码打印
    function foodShow(page){
        //计算每页打印内容
        var startPage=(page-1)*pageSize;   
        var endPage=page*pageSize;
        if (endPage>ary.length) {
            endPage=ary.length;
        }
        cinemaList.innerHTML="";
        append(ary,startPage,endPage)  
    }
}
add(cinemaMsg,3)

//打印方法
function append(showAry,star,end){
    for(var i=star;i<end;i++){
        var newBox=document.createElement('div');
        newBox.className='cinema-content'   
        newBox.setAttribute('flag',showAry[i].id)   
        newBox.onclick=function(){
            var cinemaId=this.getAttribute('flag');
            localStorage.setItem('HX210404-TZQ-cinemaName',cinemaId);
            window.location.href="filmDetails.html";
        }
           
        var newImg=document.createElement('img');
        newImg.src='../'+showAry[i].picture;
        newBox.append(newImg);

        var newDiv=document.createElement('div');
        newDiv.className='cinema-content-right'
        
            
        var newH3=document.createElement('h3');
        newH3.innerHTML=showAry[i].name;
        newDiv.append(newH3);
        
        var newH4=document.createElement('h4');
        newH4.innerHTML='★★★★☆';
        newDiv.append(newH4);

        var newP1=document.createElement('p');
        newP1.innerHTML='地址：'+showAry[i].address;
        newDiv.append(newP1);

        var newP2=document.createElement('p');
        newP2.innerHTML='交通：'+showAry[i].traffic;
        newDiv.append(newP2);

        var newP3=document.createElement('p');
        newP3.innerHTML='电话：'+showAry[i].phone;

        newDiv.append(newP3);
        newBox.append(newDiv);

        var newBtn=document.createElement('button');
        newBtn.className='buyTicker' ;
        newBtn.innerHTML='去购票';
        
        newBox.append(newBtn);
        cinemaList.append(newBox);
        
    }
}





//分区查找电影院
//全部地区
var allAreaBtn=document.getElementById('allArea')
allAreaBtn.onclick=function(){
    cinemaList.innerHTML='';    //清空页面
    add(cinemaMsg,3)            //打印默认
    footColorFn(allAreaBtn)
}
//思明区
var siMingBtn=document.getElementById('siMing');
siMingBtn.onclick=function(){
    cinemaList.innerHTML='';  
    var siMingAry=[]      //新建空数组存放voucher
    for(var i=0;i<cinemaMsg.length;i++){      //遍历本地取出voucher，依次添加进voucher数组 
        if(cinemaMsg[i].area=='思明区'){
            siMingAry.push(cinemaMsg[i]);
        }   
    }
    footColorFn(siMingBtn)
    add(siMingAry,3)
}

//湖里区
var huLiBtn=document.getElementById('huLi');
huLiBtn.onclick=function(){
    cinemaList.innerHTML='';  
    var huLiAry=[]      //新建空数组存放voucher
    for(var i=0;i<cinemaMsg.length;i++){      //遍历本地取出voucher，依次添加进voucher数组 
        if(cinemaMsg[i].area=='湖里区'){
            huLiAry.push(cinemaMsg[i]);
        }   
    }
    footColorFn(huLiBtn)
    add(huLiAry,3)
}
//集美区
var jiMeiBtn=document.getElementById('jiMei');
jiMeiBtn.onclick=function(){
    cinemaList.innerHTML='';  
    var jiMeiAry=[]      //新建空数组存放voucher
    for(var i=0;i<cinemaMsg.length;i++){      //遍历本地取出voucher，依次添加进voucher数组 
        if(cinemaMsg[i].area=='集美区'){
            jiMeiAry.push(cinemaMsg[i]);
        }   
    }
    footColorFn(jiMeiBtn)
    add(jiMeiAry,3)
}

//海沧区
var haiCanBtn=document.getElementById('haiCan');
haiCanBtn.onclick=function(){
    cinemaList.innerHTML='';  
    var haiCanAry=[]      //新建空数组存放voucher
    for(var i=0;i<cinemaMsg.length;i++){      //遍历本地取出voucher，依次添加进voucher数组 
        if(cinemaMsg[i].area=='海沧区'){
            haiCanAry.push(cinemaMsg[i]);
        }   
    }
    footColorFn(haiCanBtn)
    add(haiCanAry,3)
}

//翔安区
var xiangAnBtn=document.getElementById('xiangAn');
xiangAnBtn.onclick=function(){
    cinemaList.innerHTML='';  
    var xiangAnBAry=[]      //新建空数组存放voucher
    for(var i=0;i<cinemaMsg.length;i++){      //遍历本地取出voucher，依次添加进voucher数组 
        if(cinemaMsg[i].area=='翔安区'){
            xiangAnBAry.push(cinemaMsg[i]);
        }   
    }
    footColorFn(xiangAnBtn)
    add(xiangAnBAry,3)
}

//同安区
var tongAnBtn=document.getElementById('tongAn');
tongAnBtn.onclick=function(){
    cinemaList.innerHTML='';  
    var tongAnAry=[]      //新建空数组存放voucher
    for(var i=0;i<cinemaMsg.length;i++){      //遍历本地取出voucher，依次添加进voucher数组 
        if(cinemaMsg[i].area=='同安区'){
            tongAnAry.push(cinemaMsg[i]);
        }   
    }
    footColorFn(tongAnBtn)
    add(tongAnAry,3)
}

//选择地区是改变字体颜色
var fontColor=document.getElementsByClassName('fontColor')
function footColorFn(btn){
    for(var i=0;i<fontColor.length;i++){
        fontColor[i].style.color='#000000'
    }
    btn.style.color='#ff6700';
}


//推荐电影院
var recommendBox=document.getElementById('cinemaRecommendBox')
var hBox=document.createElement('h5');
hBox.innerHTML='推荐的电影院';
recommendBox.innerHTML=''
recommendBox.append(hBox);

for(var i=0;i<4;i++){
    var divBOX=document.createElement('div');
    divBOX.className='cinema-list-recommend';
    divBOX.setAttribute('flag',cinemaMsg[i].id)   
    divBOX.onclick=function(){
        var cinemaId=this.getAttribute('flag');
        localStorage.setItem('HX210404-TZQ-cinemaName',cinemaId);
        window.location.href="filmDetails.html";
    }
    var imgBox=document.createElement('img');
    imgBox.src='../'+cinemaMsg[i].picture;
    divBOX.append(imgBox);
    
    var div=document.createElement('div');
    div.className='recommend-msg';

    var h5=document.createElement('h5');
    h5.innerHTML=cinemaMsg[i].name;
    div.append(h5);
    var p1=document.createElement('p');
    p1.innerHTML='1526条评论';
    div.append(p1);
    var p2=document.createElement('p');
    p2.innerHTML='★★★★★';
    div.append(p2);
    divBOX.append(div);

    recommendBox.append(divBOX);
}