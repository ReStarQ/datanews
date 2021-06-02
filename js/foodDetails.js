var foodID=localStorage.getItem('HX210404-TZQ-foodID');
var foodMsg=JSON.parse(localStorage.getItem('HX210404-TZQ-foodMsg'));
// console.log(foodID)
//查找本地相应的美食信息
var showFood=[];
for(var i=0;i<foodMsg.length;i++){   
    if(foodMsg[i].id==foodID){
        showFood=foodMsg[i];
    }
}
// console.log(i)
console.log(showFood)
// console.log(showFood.id)
//页面基本信息打印
var goodsImg=document.getElementById('showImg');
goodsImg.src="../"+showFood.pictuer;

var goodsImgMap=document.getElementById('showImgMap');
goodsImgMap.src="../"+showFood.pictuer;

var goodsName=document.getElementById('goods-foodName');
goodsName.innerHTML=showFood.name;

var goodsCutPrice=document.getElementById('goods-cutPrice');
goodsCutPrice.innerHTML='￥'+showFood.cutPrice;

var goodsCostPrice=document.getElementById('goods-costPrice');
goodsCostPrice.innerHTML='门市价￥'+showFood.costPrice;

var goodsSold=document.getElementById('goods-sold');
goodsSold.innerHTML='已售'+showFood.Sold;

var goodsStock=document.getElementById('goodsStock')
goodsStock.innerHTML='库存：'+showFood.stock

var storeName=document.getElementById('store-name');
storeName.innerHTML=showFood.business;

var storeAddress=document.getElementById('store-address')
storeAddress.innerHTML=showFood.address;

var storePhone=document.getElementById('store-phone');
storePhone.innerHTML=showFood.phone;

var storeTime=document.getElementById('store-time');
storeTime.innerHTML=showFood.time;

var businessImg=document.getElementById('business-msg-img');
businessImg.src="../"+showFood.pictuer;

var goodsInduce=document.getElementById('goodsInduce');
goodsInduce.innerHTML=showFood.goodsIntroduce;

var SnapUpCutPrice=document.getElementById('SnapUp-cutPrice');
SnapUpCutPrice.innerHTML='￥'+showFood.cutPrice;

var SnapUpCostPrice=document.getElementById('SnapUp-costPrice');
SnapUpCostPrice.innerHTML='￥'+showFood.costPrice;

var SnapUpSold=document.getElementById('SnapUp-sold');
SnapUpSold.innerHTML='已售'+showFood.Sold+'份';

//轮播图图片打印  showImg1
var showImg1=document.getElementById('showImg1')
showImg1.src='../'+showFood.showImg1
var showImg2=document.getElementById('showImg2')
showImg2.src='../'+showFood.showImg2
var showImg3=document.getElementById('showImg3')
showImg3.src='../'+showFood.showImg3
var showImg4=document.getElementById('showImg4')
showImg4.src='../'+showFood.showImg4

var showImgMap1=document.getElementById('showImgMap1')
showImgMap1.src='../'+showFood.showImg1
var showImgMap2=document.getElementById('showImgMap2')
showImgMap2.src='../'+showFood.showImg2
var showImgMap3=document.getElementById('showImgMap3')
showImgMap3.src='../'+showFood.showImg3
var showImgMap4=document.getElementById('showImgMap4')
showImgMap4.src='../'+showFood.showImg4

var otherGoodsBox=document.getElementById('other-goods');

//打印评论、评分
appraiseMsg=JSON.parse(localStorage.getItem('HX210404-TZQ-appraiseMsg'));
var appraisesList=document.getElementById('appraises-list');
var appraisesBox=document.getElementById('appraises');
//查找当前商品评价
var appraisesAry=[]
for(var i=0;i<appraiseMsg.length;i++){
    if(showFood.name==appraiseMsg[i].goods){
        appraisesAry.push(appraiseMsg[i])
    }
}
console.log(appraisesAry)

//打印总评价人数
var peopelNum=appraisesAry.length;
var peoNumBox=document.getElementById('peopleNum');
peoNumBox.innerHTML='共 '+peopelNum+' 评价';
var shopEvaluate=document.getElementById('shopEvaluate')
shopEvaluate.innerHTML=peopelNum+' 条团购评价'

//打印评分
var scroeSum=0;
for(var i=0;i<appraisesAry.length;i++){
    scroeSum+=parseInt(appraisesAry[i].score);
}
var avg=(scroeSum/appraisesAry.length).toFixed(1);
var scoreBox=document.getElementById('score');
scoreBox.innerHTML=avg;

//打印星级
var starBox=document.getElementById('starNum')
var starNum=parseInt(avg)
var starLvlup=document.getElementById('lvlup')
var starStr=''
switch(starNum){
    case 5:
        starStr="★★★★★"
    break;
    case 4:
        starStr="★★★★☆"
        break;
    case 3:
        starStr="★★★☆☆"
        break;
    case 2:
        starStr="★★☆☆☆"
        break;
    case 1:
        starStr="★☆☆☆☆"
        break;   
    default:
        starStr="☆☆☆☆☆"
        break; 
}
starBox.innerHTML=starStr;
starLvlup.innerHTML=starStr;
//打印各分数段人数
var peopleSum=document.getElementsByClassName('peopleSum')
console.log(peopleSum)
var num1=[];
var num2=[];
var num3=[];
var num4=[];
var num5=[];
var num6=[];
for(var i=0;i<appraisesAry.length;i++){
    if(appraisesAry[i].score==5){
        num1.push(appraisesAry[i])
    }else if(appraisesAry[i].score==4){
        num2.push(appraisesAry[i])
    }else if(appraisesAry[i].score==3){
        num3.push(appraisesAry[i])
    }else if(appraisesAry[i].score==2){
        num4.push(appraisesAry[i])    
    }else if(appraisesAry[i].score==1){
        num5.push(appraisesAry[i])           
    }else if(appraisesAry[i].score==0){
        num6.push(appraisesAry[i])   
    }
}
peopleSum[0].innerHTML=num1.length+' 人'
peopleSum[1].innerHTML=num2.length+' 人'
peopleSum[2].innerHTML=num3.length+' 人'
peopleSum[3].innerHTML=num4.length+' 人'
peopleSum[4].innerHTML=num5.length+' 人'
peopleSum[5].innerHTML=num6.length+' 人'


//分页打印评价
var PageBox=document.getElementById("showPage");
function add(ary,num){
    var pageSize=num;
    function showPageAdd(){
        appraisesBox.innerHTML='';
        PageBox.innerHTML='';
        var pageNum=Math.ceil(ary.length/pageSize);

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
        appraisesBox.innerHTML="";
        append(ary,startPage,endPage)  
    }
}
add(appraisesAry,3)

//打印方法
function append(showAry,star,end){
    for(var i=star;i<end;i++){
        var newBox=document.createElement('li');

        var newName=document.createElement('p');
        newName.innerHTML=showAry[i].name

        // var strName=''
        // showAry[i].name.length
        // console.log(showAry[i].name.length)
        // var star=showAry[i].name.substr(0,1)
        // var end=showAry[i].name.substr((showAry[i].name.length)-1,1)
        // var str=star+'****'+end

        // newName.innerHTML=str

        var newSpan=document.createElement('span');
        if(showAry[i].score==5){
            newSpan.innerHTML='★★★★★'
        }else if(showAry[i].score==4){
            newSpan.innerHTML='★★★★☆'
        }else if(showAry[i].score==3){
            newSpan.innerHTML='★★★☆☆'
        }else if(showAry[i].score==2){
            newSpan.innerHTML='★★☆☆☆'
        }else if(showAry[i].score==1){
            newSpan.innerHTML='★☆☆☆☆'
        }else if(showAry[i].score==0){
            newSpan.innerHTML='☆☆☆☆☆'
        }

        newName.append(newSpan)

        var newA=document.createElement('a');
        newA.innerHTML=showAry[i].time;
        newName.append(newA)

        var newDiv=document.createElement('div');
        newDiv.innerHTML=showAry[i].content
       
        newBox.append(newName);  
        newBox.append(newDiv);        
        appraisesBox.append(newBox)
    }
}

//菜单列表打印
foodMeauAry=JSON.parse(localStorage.getItem('HX210404-TZQ-foodMeau'))

var tbodyBox=document.getElementById('tbodyBox')
var MeauAry=[]
for(var i=0;i<foodMeauAry.length;i++){
    if(showFood.name==foodMeauAry[i].belong){
       MeauAry.push(foodMeauAry[i])
    }
}

for(var i=0;i<MeauAry.length;i++){

    var trName=document.createElement('tr');
    
    var tdName=document.createElement('td');
    tdName.innerHTML=MeauAry[i].food;
    trName.append(tdName)
    var tdNum=document.createElement('td');
    tdNum.innerHTML=MeauAry[i].foodNum;
    trName.append(tdNum)
    var tdMoney=document.createElement('td');
    tdMoney.innerHTML=MeauAry[i].foodMoney;
    trName.append(tdMoney)
    tbodyBox.append(trName)
}

    var trCost=document.createElement('tr')
    var tdBlank=document.createElement('td')
    trCost.append(tdBlank)
    var tdCost=document.createElement('td')
    tdCost.innerHTML='价值'
    trCost.append(tdCost)
    var tdGroup=document.createElement('td')
    tdGroup.innerHTML=showFood.costPrice
    trCost.append(tdGroup)
    tbodyBox.append(trCost)

    var trCost2=document.createElement('tr')
   
    var tdBlank2=document.createElement('td')
    trCost2.append(tdBlank2)
    var tdCost2=document.createElement('td')
    tdCost2.innerHTML='团购价'
    trCost2.append(tdCost2)
    var tdGroup2=document.createElement('td')
    tdGroup2.innerHTML=showFood.cutPrice
    trCost2.append(tdGroup2)
    tbodyBox.append(trCost2)


//关联产品打印
//查找同一家商家下的产品
var otherGoodsAry=[];
for(var i=0;i<foodMsg.length;i++){
    if(foodMsg[i].business == showFood.business && foodMsg[i].id != showFood.id){
        otherGoodsAry.push(foodMsg[i]);
        // console.log(foodMsg[i].business);
    }
}
console.log(otherGoodsAry)
//打印内容
var otherGoodBox=document.getElementById('other-goods-list');
otherGoodBox.innerHTML='';
for(var i=0;i<otherGoodsAry.length;i++){
    var li=document.createElement('li');
    li.setAttribute('flag',otherGoodsAry[i].id);
    li.onclick=function(){
        var foodID=this.getAttribute('flag');
        localStorage.setItem('HX210404-TZQ-foodID',foodID);
        window.location.href="../html/foodDetails.html";
    }
    var a=document.createElement('a');
    a.innerHTML='￥'+otherGoodsAry[i].cutPrice;
    li.append(a);
    var label=document.createElement('label');
    label.innerHTML='门店价'+otherGoodsAry[i].costPrice+'元';
    li.append(label);
    var span=document.createElement('span');
    span.innerHTML=otherGoodsAry[i].name;
    li.append(span);
    otherGoodBox.append(li);

}

//其他团购推荐
var recommendAry=[];
for(var i=0;i<foodMsg.length;i++){
    if(foodMsg[i].type == showFood.type){
        recommendAry.push(foodMsg[i]);
        // console.log(foodMsg[i].business);
    }
}
console.log(recommendAry)
//打印内容
var recommendBox=document.getElementById('recommendBox');
recommendBox.innerHTML='';
var pTips=document.createElement('p')
pTips.className="food-link-tips"
pTips.innerHTML='看过此团购的人也看了'
recommendBox.append(pTips)
for(var i=0;i<recommendAry.length;i++){
    var div=document.createElement('div')
    div.className='foodFriedLink'
    div.setAttribute('flag',recommendAry[i].id)
    div.onclick=function(){
        var foodID=this.getAttribute('flag');
            localStorage.setItem('HX210404-TZQ-foodID',foodID);
            window.location.href="../html/foodDetails.html";
    }
    var imgBox=document.createElement('img')
    imgBox.src='../'+recommendAry[i].pictuer;
    div.append(imgBox)

    var h5Box=document.createElement('h5')
    h5Box.innerHTML=recommendAry[i].name;
    div.append(h5Box)

    var pBox=document.createElement('p')
    pBox.innerHTML='￥'+recommendAry[i].cutPrice;
    var spanBox=document.createElement('span')
    spanBox.innerHTML='￥'+recommendAry[i].costPrice;
    pBox.append(spanBox)
    div.append(pBox)

    recommendBox.append(div)

}

//美食购买
//选择商品数量
var addUpbtn=document.getElementById('addUp')
var goodsNum=document.getElementById('goodsNum')
var num=goodsNum.value;
//增加
addUpbtn.onclick=function(){
    // alert(1)
    // console.log(goodsNum)
    if(num<showFood.stock){
        num++
        // console.log(num)
        goodsNum.value=num;
    }else{
        alert('库存不足')
    }
    
}
//减少
var cutUpbtn=document.getElementById('cutUp')
cutUpbtn.onclick=function(){
    if(num>1 ){
        num--
        goodsNum.value=num;
    }else{
        alert('最小购买量不能小于1')
    }
}
//判断输入框的数值
goodsNum.onblur=function(){
    if(goodsNum.value>showFood.stock){
        alert('库存不足')
    }else if(goodsNum.value<1){
        alert('最小购买量不能小于1')
    }

}

var buyBtn=document.getElementById('Buy')
var userMsg=JSON.parse(localStorage.getItem('HX210404-TZQ-userMsg'))
// 购买事件
buyBtn.onclick=function(){
    //求当日日期  年-月-日
    var date=new Date()         
    var year=date.getFullYear();
    var mouth=date.getMonth()+1;
    var day=date.getDate();
    var time=year+'-'+mouth+'-'+day
    //查询个人账户余额
    var nowUSer=JSON.parse(localStorage.getItem('HX210404TZQuserState'))
    for(var i=0;i<userMsg.length;i++){
        if(nowUSer==userMsg[i].user){
            var user=userMsg[i]           
        }
    }

    var ans=confirm('是否立即付款');
    if(ans){
        if(user.money<showFood.cutPrice){         //余额小于商品价格
            alert('账号余额不足，请充值')
            var orderState=0;    //0待支付  1已支付
        }else{
            var userPrice=(user.money*100-((showFood.cutPrice)*100*goodsNum.value))/100;   //买后余额=当前余额-商品价格*数量
            if(userPrice>=0){
                user.money=userPrice
                localStorage.setItem('HX210404-TZQ-userMsg',JSON.stringify(userMsg));
                

                //修改本地销量和库存
                for(var i=0;i<foodMsg.length;i++){   
                    if(foodMsg[i].id==foodID){
                        var newFoodAry=foodMsg[i];
                        var a=i
                    }
                }
                var newStock=parseInt(newFoodAry.stock)-parseInt(goodsNum.value);
                if(newStock<0){
                    alert('库存不足')
                    return;
                }
                newFoodAry.stock=newStock;
                var newSold=parseInt(newFoodAry.Sold)+parseInt(goodsNum.value);
                newFoodAry.Sold=parseInt(newSold)
                foodMsg.splice(a,1,newFoodAry)
            
             
                var orderState=1;    //0待支付  1已支付

                orderSetUp(orderState,showFood,time);
                localStorage.setItem('HX210404-TZQ-foodMsg',JSON.stringify(foodMsg));
                
                alert("购买成功");
                window.location.reload();
            }else{
                alert('账号余额不足，请充值')
                var orderState=0;    //0待支付  1已支付
            }  
        }     
    }else{
        orderSetUp(orderState,showFood,time)
        alert('请前往个人中心付款')
        window.location.reload();
    }
}

//创建订单    
function orderSetUp(State,showAry,oderTime){
    var newState='';
    var orderOperate=''
    //判断订单付款状态   0待支付  1已支付   
    if(State==1){
        newState='待使用'       //写入订单状态
        orderOperate='退款'
    }else{
        newState='待付款'
        orderOperate='付款'
    }
    //创建订单时间
    var ms = new Date();
    var orderTime = ms.getTime();          
    var orderId='10'+showAry.id+orderTime       //  10(美食类)+商品id+当前毫秒    10代表美食类  20代表电影类

    //创建订单对象
    var userName=localStorage.getItem('HX210404TZQuserState')
    var order={
        orderId:orderId,
        goodsId:showFood.id,
        userName:userName,
        business:showFood.business,
        goosName:showFood.name,
        goosNum:goodsNum.value,
        amount:showFood.cutPrice,
        price:parseFloat(showFood.cutPrice)*goodsNum.value,
        time:oderTime,
        state:newState,        
        pictuer:showFood.pictuer,
        operate:orderOperate,
    }
    // 订单写入本地
    if(localStorage.getItem('HX210404-TZQ-orderMsg')==null){        //查询本地是否有数据
        var orderAry=[];             //若没有，为其空声明一个空数组
    }else{
        var orderAry=JSON.parse(localStorage.getItem('HX210404-TZQ-orderMsg'));       //不为空，从本地存储添加信息 
    }
    orderAry.push(order)
    localStorage.setItem('HX210404-TZQ-orderMsg',JSON.stringify(orderAry))

    
}


//滚动栏

scrollBar.onclick=function(e){
    console.log(e)
    // console.log(scrollTop)
    console.log(pageYOffset)
}
window.onscroll=function(){
    var Scroll=scroll();   //距离页面顶部滚动的距离
    var scrollBar=document.getElementById('scrollBar'); //获取到滚动栏
    var shopButton=document.getElementById('shopButton');   //获取购买按钮
    if(Scroll>800){ //当滚动距离大于800px时执行下面的东西
        scrollBar.style.position='fixed';
        scrollBar.style.top=0;
        scrollBar.style.zIndex=9;
        shopButton.style.display='block';
        
    }else{//当滚动距离小于250的时候执行下面的内容，也就是让导航栏恢复原状
        scrollBar.style.position = 'static';
        shopButton.style.display='none'
    }
  }

/*解决浏览器兼容问题*/
function scroll(){
    var scrollTop=0;
    if(typeof window.pageYOffset != 'undefined'){   //pageYOffset 滚动栏顶部距离网页顶部的数值
        scrollTop = window.pageYOffset;             //若存在滚动，scrollTop等于距网页的高度值
    }else if(typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat')        {
        scrollTop = document.documentElement.scrollTop;
    }else if(typeof document.body != 'undefined'){
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;           //函数返回scrollTop值，提供给函数调用
}

// 轮播图
var flag=0;
var allImg=document.getElementsByClassName('show-img-img')
//创建定时器
var time=setInterval(function(){
    flag++ ;
    if(flag>4){             //判断flag是否出超过图片数组长度
        flag=0;
    }
    //图片显示/隐藏
    for(var i=0;i<allImg.length;i++){
        allImg[i].style.display='none';
    }
    //下排图片透明度变化
    for(var i=0;i<oMapBox.length;i++){
        oMapBox[i].style.opacity=0.5;
    }
    allImg[flag].style.display='block';
    oMapBox[flag].style.opacity=1;
},1500);
        
var oImgBox=document.getElementById('show-img-box')
//鼠标移入清除定时器
oImgBox.onmouseover=function(){
    clearInterval(time);            //轮播图定时器
    // clearInterval(oMapBoxTime);     //tab栏定时器
}
//鼠标移出开始定时器
oImgBox.onmouseout=function(){
    //轮播图定时器
    time=setInterval(function(){       
    flag++ ;
    if(flag>4){
        flag=0;
    }
    for(var i=0;i<allImg.length;i++){
        allImg[i].style.display='none';
    }
    for(var i=0;i<oMapBox.length;i++){
        oMapBox[i].style.opacity=0.5;
    }
    allImg[flag].style.display='block';
    oMapBox[flag].style.opacity=1;
    },1500);      
      
}

var oMapBox=document.getElementsByClassName('show-img-map-tab')
for(var i=0;i<oMapBox.length;i++){
    oMapBox[i].setAttribute('flag',i)
    oMapBox[i].onclick=function(){
        var a=this.getAttribute('flag')
        for(var i=0;i<allImg.length;i++){
            allImg[i].style.display='none'
        } 
        allImg[a].style.display="block";
        for(var i=0;i<oMapBox.length;i++){
            oMapBox[i].style.opacity=0.5;
        }
        this.style.opacity=1;
    }
}
