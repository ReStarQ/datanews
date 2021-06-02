var cinemaID=localStorage.getItem('HX210404-TZQ-cinemaName');
var cinemaMsg=JSON.parse(localStorage.getItem('HX210404-TZQ-cinemaMsg'));

//获取本地相应的影院信息
var showcinema=[];
for(var i=0;i<cinemaMsg.length;i++){   
    if(cinemaMsg[i].id==cinemaID){
        showcinema=cinemaMsg[i];
    }
}
console.log(showcinema)
console.log(showcinema.id)
var cinemaImg=document.getElementById('cinemaImg');
cinemaImg.src='../'+showcinema.picture; 

var cinemaName=document.getElementById('cinemaName');
cinemaName.innerHTML=showcinema.name; 

var cinemaAddresss=document.getElementById('cinemaAddresss');
cinemaAddresss.innerHTML='地址：'+showcinema.address;

var cinemaPhone=document.getElementById('cinemaPhone');
cinemaPhone.innerHTML='电话：'+showcinema.phone;

var cinemaTime=document.getElementById('cinemaTime');
cinemaTime.innerHTML='营业时间：'+showcinema.time;

var cinemaIntroduce=document.getElementById('cinemaIntroduce');
cinemaIntroduce.innerHTML=showcinema.introduce;

//打印电影场次
var filmMsg=JSON.parse(localStorage.getItem('HX210404-TZQ-filmMsg'))
var tbodyBox=document.getElementById('tbodyBox')
var filmAry=[]
for(var i=0;i<filmMsg.length;i++){
    if(showcinema.name==filmMsg[i].belong){
        filmAry.push(filmMsg[i])
    }
}
console.log(filmAry)
var TBox=document.getElementById('tbodyBox')
for(var i=0;i<filmAry.length;i++){
    var trList=document.createElement('tr');
    
    var starTime=document.createElement('td');
    starTime.innerHTML=filmAry[i].star
    trList.append(starTime)
    var endTime=document.createElement('td');
    endTime.innerHTML=filmAry[i].end
    trList.append(endTime)
    var filmName=document.createElement('td');
    filmName.innerHTML=filmAry[i].name
    trList.append(filmName)
    var hall=document.createElement('td');
    hall.innerHTML=filmAry[i].hall
    trList.append(hall)
    var Price=document.createElement('td');
    Price.innerHTML='￥'+filmAry[i].Price
    trList.append(Price)
    var buyBtn=document.createElement('td');
    var oInput=document.createElement('input');
    oInput.type='button'
    oInput.value='购票'
    oInput.onclick=function(){
        //弹出购买框
        var buyBox=document.getElementById('buyBox')
        buyBox.style.display='block'
        //打印购买框相应的电影信息
        var check=this.parentNode.parentNode.childNodes
        var time=check[0].innerHTML
        localStorage.setItem('HX210404-TZQ-TIME',time)
        // console.log(check)
        // console.log(time)
        var cinema=[];
        for(var i=0;i<cinemaMsg.length;i++){   
            if(cinemaMsg[i].id==cinemaID){
                cinema=cinemaMsg[i];
            }
        }
        console.log(cinema)
        var filmAry=[]
        for(var i=0;i<filmMsg.length;i++){
            if(cinema.name==filmMsg[i].belong){
                filmAry.push(filmMsg[i])
           }
        }
        console.log(filmAry)
        for(var i=0;i<filmAry.length;i++){
            if(time==filmAry[i].star){
            var filmImg=document.getElementById('filmImg')
            filmImg.src='../'+filmAry[i].pictuer
            var filmName=document.getElementById('filmName')
            filmName.innerHTML=filmAry[i].name
            var standByTicket=document.getElementById('standbyticket')
            standByTicket.innerHTML='(余票:'+filmAry[i].tickets+'张)'
            console.log(filmAry[i])
            console.log(filmAry[i].tickets)
            localStorage.setItem('HX210404-TZQ-nowFilmMsg',JSON.stringify(filmAry[i]))
            }
        }
    }
    buyBtn.append(oInput)
    trList.append(buyBtn)    
    TBox.append(trList)

}


//关闭购买框
var buyBox=document.getElementById('buyBox')
var oClose=document.getElementById('buyBoxClose')
oClose.onclick=function(){
    buyBox.style.display='none'
}

//选择商品数量
var upBtn=document.getElementById('upNum')
var ticketNum=document.getElementById('ticketNum')
var num=ticketNum.value;
//增加
var tickets=localStorage.getItem('HX210404-TZQ-filmtickets')
var nowFilmMsg=JSON.parse(localStorage.getItem('HX210404-TZQ-nowFilmMsg'))
upBtn.onclick=function(){
    if(num<nowFilmMsg.tickets){
        num++
        ticketNum.value=num;
    }else{
        alert('余票不足')
    }
    
}
//减少
var downBtn=document.getElementById('downNum')
downBtn.onclick=function(){
    if(num>1 ){
        num--
        // console.log(num)
        ticketNum.value=num;
    }else{
        alert('最小购买量不能小于1')
    }
}
//判断输入框的数值
ticketNum.onblur=function(){
    if(ticketNum.value>nowFilmMsg.tickets){
        alert('余票不足')
    }else if(ticketNum.value<1){
        alert('最小购买量不能小于1')
    }

}

//购买电影票
// 1h=60m   1m=60s  1s=1000ms 
var buyBtn=document.getElementById('buyBtn')
var userMsg=JSON.parse(localStorage.getItem('HX210404-TZQ-userMsg'))
buyBtn.onclick=function(){
    var nowFilmMsg=JSON.parse(localStorage.getItem('HX210404-TZQ-nowFilmMsg'))

    //求当日日期  年-月-日
    var date=new Date()         
    var year=date.getFullYear();
    var mouth=date.getMonth()+1;
    var day=date.getDate();
    var time=year+'-'+mouth+'-'+day
    //电影开始时间
    var filmTime=''
    filmTime=localStorage.getItem('HX210404-TZQ-TIME')
    var filmHour=filmTime.slice(0,2)
    var filmMinut=filmTime.slice(3,5)
    var starTime=filmHour*60*60+filmMinut*60
    console.log(starTime)

    //求当现在时间
    var date=new Date()         
    var nowHour=date.getHours();
    var nowMounit=date.getMinutes();
    var nowSecond=date.getSeconds();
    var nowTime=nowHour*60*60+nowMounit*60+nowSecond
    console.log(nowTime)

    var nowUSer=JSON.parse(localStorage.getItem('HX210404TZQuserState'))
    var ans=confirm('是否立即付款');
    if(ans){
        if(nowTime<starTime){

            //查询个人账户余额
            for(var i=0;i<userMsg.length;i++){
                if(nowUSer==userMsg[i].user){
                    var user=userMsg[i]           
                }
            }
            if(user.money>nowFilmMsg.Price){         //余额小于商品价格        
                var userPrice=((user.money)*100-(nowFilmMsg.Price)*100*ticketNum.value)/100;   //买后余额=当前余额-商品价格*数量
                if(userPrice>=0){
                    user.money=userPrice
                    // console.log(userMsg[0].money)
                    // console.log(showFood.cutPrice)
                    console.log(userPrice)
                    localStorage.setItem('HX210404-TZQ-userMsg',JSON.stringify(userMsg));
                    

                    // //修改本地销量和库存
                    var filmMsg=JSON.parse(localStorage.getItem('HX210404-TZQ-filmMsg'));
                    console.log(filmMsg)
                    for(var i=0;i<filmMsg.length;i++){   
                        if(filmMsg[i].id==nowFilmMsg.id){
                            var newFilmAry=filmMsg[i];
                            var a=i
                        }
                    }
                    
                    var newtickets=parseFloat(newFilmAry.tickets)-parseFloat(ticketNum.value);
                    
                    if(newtickets<0){
                        alert('余票不足')
                        return;
                    }

                    newFilmAry.tickets=newtickets;


                    filmMsg.splice(a,1,newFilmAry)
                    
                    
                    localStorage.setItem('HX210404-TZQ-filmMsg',JSON.stringify(filmMsg))
                    var orderState=1;    //0待支付  1已支付
                    orderSetUp(orderState,time);

                    alert("购买成功")
                    window.location.reload();
                }else{
                    alert('账号余额不足，请充值')
                    var orderState=0;    //0待支付  1已支付
                }
            }else{
                alert('账号余额不足，请充值')
                var orderState=0;    //0待支付  1已支付    
            }
        }else{
            alert('该场次电影已开场,停止售票')
            return;
        }
    }else{
        orderSetUp(orderState,time);
        alert('请前往个人中心付款')
        window.location.reload();
    }
    
//创建订单
function orderSetUp(State,oderTime){
    //判断订单付款状态   0待支付  1已支付   
    var newState='';
    var orderOperate=''
    if(State==1){
        newState='待使用'
        orderOperate='退款'
    }else{
        newState='待付款'
        orderOperate='付款'
    }
    var nowFilmMsg=JSON.parse(localStorage.getItem('HX210404-TZQ-nowFilmMsg'))
    var ms = new Date();
    var orderTime = ms.getTime();    
    var orderId='20'+nowFilmMsg.id+orderTime
    console.log(orderId)
    var order={
        orderId:orderId,                //订单号
        goodsId:nowFilmMsg.id,          //商品ID
        userName:nowUSer,               //所属用户
        business:2001,                  //所属商家
        goosName:nowFilmMsg.name,       //商品名
        goosNum:ticketNum.value,        //商品数量
        amount:nowFilmMsg.Price,        //商品单价
        price:parseFloat(nowFilmMsg.Price)*ticketNum.value,      //订单金额
        time:oderTime,                  //下单时间
        state:newState,                 //订单状态
        pictuer:nowFilmMsg.pictuer,     //商品图片
        operate:orderOperate,           //订单操作
    }

    // 订单写入本地
    if(localStorage.getItem('HX210404-TZQ-orderMsg')==null){
        var orderAry=[];             //为空声明一个空数组
    }else{
        var orderAry=JSON.parse(localStorage.getItem('HX210404-TZQ-orderMsg'));       //不为空，从本地存储添加信息 
    }
    orderAry.push(order)
    localStorage.setItem('HX210404-TZQ-orderMsg',JSON.stringify(orderAry))
    // localStorage.removeItem('HX210404-TZQ-nowFilmMsg')
    }
}

//推荐电影院
var recommendBox=document.getElementById('cinemaRecommendBox')
var hBox=document.createElement('h5');
hBox.innerHTML='推荐的电影院';
recommendBox.innerHTML=''
recommendBox.append(hBox);
var cinemaArea=[]
for(var i=0;i<cinemaMsg.length;i++){
    if(cinemaMsg[i].area==showcinema.area){     // && cinemaMsg[i].id!=showcinema.id
        cinemaArea.push(cinemaMsg[i])
    }
}
console.log(cinemaArea)
for(var i=0;i<cinemaArea.length;i++){
    if(i<8){
        var divBOX=document.createElement('div');
        divBOX.className='cinema-list-recommend';
        divBOX.setAttribute('flag',cinemaMsg[i].id)   
        divBOX.onclick=function(){
            var cinemaId=this.getAttribute('flag');
            localStorage.setItem('HX210404-TZQ-cinemaName',cinemaId);
            window.location.href="filmDetails.html";
        }
        var imgBox=document.createElement('img');
        imgBox.src='../'+cinemaArea[i].picture;
        divBOX.append(imgBox);
        
        var div=document.createElement('div');
        div.className='recommend-msg';

        var h5=document.createElement('h5');
        h5.innerHTML=cinemaArea[i].name;
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
    
}