var allOrderBox=document.getElementById('allOrder-list');
var userBox=document.getElementById("userMsg");
var headList=document.getElementById('list-head')
//打开个人信息
var myMsgBtn=document.getElementById('myMsg');
var showPage=document.getElementById('showPage')
myMsgBtn.onclick=function(){
    userBox.style.display='block';
    allOrderBox.style.display='none';
    headList.style.display='none';
    showPage.style.display='none'
    footColorFn(myMsgBtn)
}

//打开全部订单
var allOrderBtn=document.getElementById('allOrder')
var hdAllOrderBtn=document.getElementById('hd-allOrder')
allOrderBtn.onclick=function(){
    orderShow()
    footColorFn(this)
    add(userOrderAry,4)
}

hdAllOrderBtn.onclick=function(){
    orderShow()
    footColorFn(this)
    add(userOrderAry,4)
}

//打开待付款订单
var ToBePayBtn=document.getElementById('ToBePay')
var hdToBePay=document.getElementById('hd-ToBePay')
ToBePayBtn.onclick=function(){
    orderShow()
    footColorFn(this)
    var nowMsg=this.innerHTML.slice(0,2)
    orderListPrint(nowMsg)
}
hdToBePay.onclick=function(){
    orderShow()
    footColorFn(this)
    var nowMsg=this.innerHTML.slice(0,2)
    orderListPrint(nowMsg)
}

//打开待使用订单
var ToBeUesdBtn=document.getElementById('ToBeUesd')
var hdToBeUesdBtn=document.getElementById('hd-ToBeUesd')
ToBeUesdBtn.onclick=function(){
    orderShow()
    footColorFn(this)
    var nowMsg=this.innerHTML.slice(0,2)
    orderListPrint(nowMsg)
}
hdToBeUesdBtn.onclick=function(){
    orderShow()
    footColorFn(this)
    var nowMsg=this.innerHTML.slice(0,2)
    orderListPrint(nowMsg)
}

//打开待评价订单
var ToBeEvaluatedBtn=document.getElementById('ToBeEvaluated')
var hdToBeEvaluated=document.getElementById('hd-ToBeEvaluated')
var myToBeEvaluated=document.getElementById('myToBeEvaluated')
var myEvaluated=document.getElementById('myEvaluated')
ToBeEvaluatedBtn.onclick=function(){
    orderShow()
    footColorFn(this)
    var nowMsg=this.innerHTML.slice(0,2)
    orderListPrint(nowMsg)
}
hdToBeEvaluated.onclick=function(){
    orderShow()
    footColorFn(this)
    var nowMsg=this.innerHTML.slice(0,2)
    orderListPrint(nowMsg)
}
myToBeEvaluated.onclick=function(){
    orderShow()
    footColorFn(this)
    var nowMsg=this.innerHTML.slice(0,2)
    orderListPrint(nowMsg)
}
myEvaluated.onclick=function(){
    orderShow()
    footColorFn(this)
    var nowMsg=this.innerHTML.slice(0,2)
    orderListPrint(nowMsg)
}

//打开退款/售后订单
var refundBtn=document.getElementById('refund')
refundBtn.onclick=function(){
    orderShow()
    footColorFn(this)
    var nowMsg=this.innerHTML.slice(0,2)
    orderListPrint(nowMsg)
}
var hdRefundBtn=document.getElementById('hd-refund')
hdRefundBtn.onclick=function(){
    orderShow()
    footColorFn(this)
    var nowMsg=this.innerHTML.slice(0,2)
    orderListPrint(nowMsg)
}
//打印列表状态订单
function orderListPrint(msg){
    var nowAry=[]
    for(var i=0;i<userOrderAry.length;i++){
        if(userOrderAry[i].state.indexOf(msg)!=-1){
            nowAry.push(userOrderAry[i])
        }
    }
    add(nowAry,4)
}

//订单界面显示
function orderShow(){
    userBox.style.display='none';
    allOrderBox.style.display='block';
    headList.style.display='block';
    showPage.style.display='block'
}
//改变字体颜色
var fontColor=document.getElementsByClassName('fontColor')
function footColorFn(btn){
    for(var i=0;i<fontColor.length;i++){
        fontColor[i].style.color='#000000'
    }
    btn.style.color='#ff6700';
}


//充值界面显示/隐藏
var recharge=document.getElementById('recharge');
var rechargeBox=document.getElementById('rechargeBox');
var check=0;
recharge.onclick=function(){
    check++;
    if(check%2!=0){
        rechargeBox.style.display='block';
    }else{
        rechargeBox.style.display='none';
    }
    
}

//个人信息打印
var userMsgAry=JSON.parse(localStorage.getItem('HX210404-TZQ-userMsg'))
var nowUSer=JSON.parse(localStorage.getItem('HX210404TZQuserState'))
// console.log(nowUSer)
for(var i=0;i<userMsgAry.length;i++){
    if(nowUSer==userMsgAry[i].user){
        var UserName=document.getElementById('userNameMsg')
        UserName.innerHTML=userMsgAry[i].user
        var userMoney=document.getElementById('userMoneyMsg')
        userMoney.innerHTML=userMsgAry[i].money
    }
}


//用户充值
var amount=document.getElementById('RechargeAmount')
var rechargeBtn=document.getElementById('rechargeBtn')


rechargeBtn.onclick=function(){
    if(amount.value==''){
        alert('请输入充值金额');
    }else{
        if(isNaN(amount.value)){
            alert('请输入正确的金额')
        }else{
            
            for(var i=0;i<userMsgAry.length;i++){
                if(nowUSer==userMsgAry[i].user){
                    var recMoney=parseInt(amount.value) 
                    var myMoney=parseInt(userMsgAry[i].money)   
                    newMoney=myMoney+recMoney
                    userMsgAry[i].money=newMoney;
                    localStorage.setItem('HX210404-TZQ-userMsg',JSON.stringify(userMsgAry))
                    userMoney.innerHTML=userMsgAry[i].money
                    alert('充值成功')
                }
            }
        }
        
    }   
}


//获取本地用户订单信息
var orderMsgAry=JSON.parse(localStorage.getItem('HX210404-TZQ-orderMsg'))
var userState=JSON.parse(localStorage.getItem('HX210404TZQuserState'))
var userOrderAry=[]
for(var i=0;i<orderMsgAry.length;i++){      //查询属于当前用户的订单
    if(userState==orderMsgAry[i].userName){
        userOrderAry.push(orderMsgAry[i])
    }
}

//打印全部订单
var PageBox = document.getElementById("showPage");
function add(ary,num){
    var pageSize=num;
    function showPageAdd(){
        allOrderBox.innerHTML='';
        PageBox.innerHTML='';
        var pageNum=Math.ceil(ary.length/pageSize);
        //打印页码
        for(var i=1;i<=pageNum;i++){
            var pagaBtn=document.createElement('input');
            pagaBtn.type='button';
            pagaBtn.value=i;
            //页码切换
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
        allOrderBox.innerHTML="";
        append(ary,startPage,endPage)  
    }
}
add(userOrderAry,4)
//打印方法
function append(showAry,star,end){
    for(var i=star;i<end;i++){
        var box=document.createElement('div');
        box.className='list-msg';

        var goodsImg=document.createElement('img');
        goodsImg.src='../'+showAry[i].pictuer;
        box.append(goodsImg);

        var orderGoods=document.createElement('div');
        orderGoods.className='order-goods';

        var p=document.createElement('p');
        p.innerHTML=showAry[i].goosName;
        orderGoods.append(p);

        var span=document.createElement('span');
        span.innerHTML='数量：'+showAry[i].goosNum;
        orderGoods.append(span);

        box.append(orderGoods);

        var time=document.createElement('div');
        time.className='order-time';
        time.innerHTML=showAry[i].time;
        box.append(time);
        
        var price=document.createElement('div');
        price.className='order-Price';
        price.innerHTML='￥'+showAry[i].price;
        box.append(price);

        var state=document.createElement('div');
        state.className='order-state';
        if(showAry[i].state=='已完成'){
            state.innerHTML='订单完成';
        }else{
            state.innerHTML=showAry[i].state;
        }
        
        box.append(state);

        var button=document.createElement('div');
        button.className='order-button';

        var oInput=document.createElement('input');
        oInput.type='button'
        oInput.name=showAry[i].orderId

        if(showAry[i].state=='待评价'){
            oInput.value='评价'
        }else{
            oInput.value=showAry[i].operate;
        }
        oInput.setAttribute('flag',showAry[i].goodsId)
        oInput.onclick=function(){
            //按钮操作事件
            var operate=this.value
            var goodsId=this.getAttribute('flag')
            console.log(goodsId)
            var orderid=this.name
            if(operate=='付款'){
                var ans=confirm('是否确认付款');
                if(ans){
                    var orderType=this.name.slice(0,2)
                    if(orderType==10){                              //属于美食类
                        //查找相应的商品
                        var foodMsgAry=JSON.parse(localStorage.getItem('HX210404-TZQ-foodMsg'));
                        for(var i=0;i<foodMsgAry.length;i++){           
                            if(goodsId==foodMsgAry[i].id)
                                var newFoodMsg=foodMsgAry[i];
                                var foodI=i
         
                        }

                        //查询本地相应订单
                        var orderMsgAry=JSON.parse(localStorage.getItem('HX210404-TZQ-orderMsg'))
                        
                        for(var i=0;i<orderMsgAry.length;i++){
                            if(this.name==orderMsgAry[i].orderId){
                                newOrder=orderMsgAry[i];
                            }
                        }
                        console.log(newOrder)


                        //查询个人账户余额
                        var nowUSer=JSON.parse(localStorage.getItem('HX210404TZQuserState'))
                        var userMsg=JSON.parse(localStorage.getItem('HX210404-TZQ-userMsg'))
                        for(var i=0;i<userMsg.length;i++){
                            if(nowUSer==userMsg[i].user){
                                var user=userMsg[i]           
                            }
                        }
                    
                        if(user.money>=newOrder.price){         //余额小于商品价格
                            var userPrice=(user.money*100-((newOrder.price)*100*newOrder.goosNum))/100;   //买后余额=当前余额-商品价格*数量
                            if(userPrice>=0){
                                user.money=userPrice
                                localStorage.setItem('HX210404-TZQ-userMsg',JSON.stringify(userMsg));
                                

                                var foodMsgAry = JSON.parse(localStorage.getItem('HX210404-TZQ-foodMsg'));

                                for(var i=0;i<foodMsgAry.length;i++){   
                                    if(foodMsgAry[i].id == goodsId){
                                        var newFoodAry = foodMsgAry[i];
                                        var a = i
                                    }
                                }
                                
                                
                                var newStock=parseFloat(newFoodAry.stock)-parseFloat(newOrder.goosNum);
                                newFoodAry.stock=newStock;
                                var newSold=parseFloat(newFoodAry.Sold)+parseFloat(newOrder.goosNum);
                                newFoodAry.Sold=parseFloat(newSold)
                                foodMsgAry.splice(a,1,newFoodAry)
                              
                                localStorage.setItem('HX210404-TZQ-foodMsg',JSON.stringify(foodMsgAry))

                                //修改订单状态
                                console.log(newOrder)
                                var newOrderAry=JSON.parse(localStorage.getItem('HX210404-TZQ-orderMsg'))
                                console.log(newOrderAry)
                                console.log(newOrder.orderId)
                                for(var j=0;j<newOrderAry.length;j++){
                                    if(newOrder.orderId == newOrderAry[j].orderId){
                                        var newOrderMsg=newOrderAry[j];
                                        var b=j;

                                    }
                                    
                                }
                                

                                var newState='待使用'
                                newOrderMsg.state=newState
                                var newOperate='退款'
                                newOrderMsg.operate=newOperate

                                newOrderAry.splice(b,1,newOrderMsg)
                              
                                localStorage.setItem('HX210404-TZQ-orderMsg',JSON.stringify(newOrderAry))

                                alert("购买成功")
                                window.location.reload();

                            }else{
                                alert('账号余额不足，请充值')
                                // var orderState=0;    //0待支付  1已支付
                                // return;
                            }  
                        }else{
                            alert('账号余额不足，请充值');
                            return;
                        }
                   
                    }else if(orderType==20){         //电影类   
                        //查询本地相应订单
                        var orderMsgAry=JSON.parse(localStorage.getItem('HX210404-TZQ-orderMsg'))
                        for(var i=0;i<orderMsgAry.length;i++){
                            if(this.name==orderMsgAry[i].orderId){
                                var newOrder=orderMsgAry[i];
                            }
                        }
                        console.log(newOrder)
                        

                        //电影开始时间
                        var filmTime=''
                        filmTime=localStorage.getItem('HX210404-TZQ-TIME')
                        var filmHour=filmTime.slice(0,2)
                        var filmMinut=filmTime.slice(3,5)
                        var starTime=filmHour*60*60+filmMinut*60
                        // console.log(starTime)

                        //求当现在时间
                        var date=new Date()         
                        var nowHour=date.getHours();
                        var nowMounit=date.getMinutes();
                        var nowSecond=date.getSeconds();
                        var nowTime=nowHour*60*60+nowMounit*60+nowSecond
                        // console.log(nowTime)

                        
                        //购票
                        var nowFilmMsg=JSON.parse(localStorage.getItem('HX210404-TZQ-nowFilmMsg'));
                        if(nowTime<starTime){
                            //查询个人账户余额
                            var nowUSer=JSON.parse(localStorage.getItem('HX210404TZQuserState'));
                            var userMsg=JSON.parse(localStorage.getItem('HX210404-TZQ-userMsg'));
                            for(var i=0;i<userMsg.length;i++){
                                if(nowUSer==userMsg[i].user){
                                    var user=userMsg[i]           
                                }
                            }
                            if(user.money>=nowFilmMsg.Price){         //余额大于商品价格   
                                var userPrice=((user.money)*100-(nowFilmMsg.Price)*100*newOrder.goosNum)/100;   //买后余额=当前余额-商品价格*数量
                                if(userPrice>=0){
                                    user.money=userPrice
                                    localStorage.setItem('HX210404-TZQ-userMsg',JSON.stringify(userMsg));
                                    alert("购买成功")
                                    


                                    // //修改本地销量和库存
                                    var filmMsg=JSON.parse(localStorage.getItem('HX210404-TZQ-filmMsg'));
                                    for(var i=0;i<filmMsg.length;i++){   
                                        if(filmMsg[i].id==nowFilmMsg.id){
                                            var newFilmAry=filmMsg[i];
                                            var a=i
                                        }
                                    }
                                    var newtickets=parseFloat(newFilmAry.tickets)-parseFloat(newOrder.goosNum);
                                    newFilmAry.tickets=newtickets;
                                    filmMsg.splice(a,1,newFilmAry)
                                    localStorage.setItem('HX210404-TZQ-filmMsg',JSON.stringify(filmMsg))

                                    //修改按钮
                                    //修改订单状态
                                    var newOrderAry=JSON.parse(localStorage.getItem('HX210404-TZQ-orderMsg'))

                                    for(var j=0;j<newOrderAry.length;j++){
                                        if(newOrder.orderId == newOrderAry[j].orderId){
                                            var newOrderMsg=newOrderAry[j];
                                            var b=j;
                                            console.log(newOrderAry[j])
                                            console.log(newOrderAry[j].orderId)
                                        }
                                        
                                    }

                                    var newState='待使用'
                                    newOrderMsg.state=newState
                                    var newOperate='退款'
                                    newOrderMsg.operate=newOperate
    
                                    newOrderAry.splice(b,1,newOrderMsg)
                                  
                                    localStorage.setItem('HX210404-TZQ-orderMsg',JSON.stringify(newOrderAry))

                                    window.location.reload();
                                    
                                }else{
                                    alert('账号余额不足，请充值')
                                }
                            }else{
                                alert('账号余额不足，请充值')  
                            }
                        }else{
                            alert('该场次电影已开场,停止售票')
                            return;
                        }
                        
                    }
                    
                }
            }else if(operate=='退款'){
                var ans=confirm('是否申请退款');
                if(ans){

                    // searchOrder(newOrder)
                    var orderMsgAry=JSON.parse(localStorage.getItem('HX210404-TZQ-orderMsg'))
                        
                        for(var i=0;i<orderMsgAry.length;i++){
                            if(this.name==orderMsgAry[i].orderId){
                                newOrder=orderMsgAry[i];
                            }
                        }
                        console.log(newOrder)
                    //修改订单状态
                    var newOrderAry=JSON.parse(localStorage.getItem('HX210404-TZQ-orderMsg'))

                    for(var j=0;j<newOrderAry.length;j++){
                        if(newOrder.orderId == newOrderAry[j].orderId){
                            var newOrderMsg=newOrderAry[j];
                            var b=j;
                            console.log(newOrderAry[j])
                            console.log(newOrderAry[j].orderId)
                        }
                        
                    }
                    console.log(b)
                    console.log(newOrderMsg.state)
                    console.log(newOrderMsg.operate)

                    var newState='待退款'
                    newOrderMsg.state=newState
                    var newOperate='退款中'
                    newOrderMsg.operate=newOperate
                    console.log(newOrderMsg.state)
                    console.log(newOrderMsg.operate)
                    newOrderAry.splice(b,1,newOrderMsg)
                  
                    localStorage.setItem('HX210404-TZQ-orderMsg',JSON.stringify(newOrderAry))
                    window.location.reload();
                }
            }else if(operate=='评价'){
                //弹出评价窗口
                var Box=document.getElementById('evaluatedBox');
                Box.style.display='block';
                var oClose=document.getElementById('evaluatedClose');
                //关闭评价窗口
                oClose.onclick=function(){
                    Box.style.display='none';
                }
                var EvaluatedContent=document.getElementById('userEvaluated');
                var userScore=document.getElementById('userScore');
                var scoreReg = /^[0-5]{1}$/;     //评分
                userScore.onblur=function(){          //当评分框失去焦点时，正则验证
                    if(userScore.value.match(scoreReg)==null){
                        // this.nextElementSibling.innerHTML = "×";
                        this.style.color = "red";
                        alert('请输入正确的评分');
                        return; 
                    }else{
                        this.style.color = "black";
                    }  
                }
                var evaluateBtn=document.getElementById('evaluatedButton');
                //点击评价
                evaluateBtn.onclick=function(){         
                    var myEvaluate=EvaluatedContent.value;  //评价内容
                    var myScore=userScore.value;            //评分
                    console.log(myEvaluate)
                    console.log(myScore)
                    //获取评价人
                    var myName=JSON.parse(localStorage.getItem('HX210404TZQuserState'))
                    //评价日期
                    var date=new Date()         
                    var year=date.getFullYear();
                    var mouth=date.getMonth()+1;
                    var day=date.getDate();
                    var time=year+'-'+mouth+'-'+day
                    //获取当前订单商品名称
                    var orderMsgAry=JSON.parse(localStorage.getItem('HX210404-TZQ-orderMsg'))
                        
                        for(var i=0;i<orderMsgAry.length;i++){
                            if(orderid==orderMsgAry[i].orderId){
                                var newOrder=orderMsgAry[i];
                                var index=i;
                            }
                        }
                        console.log(b)
                        console.log(newOrder)
                    // 创建评价信息
                    var appraise={
                        name:myName,
                        time:time,
                        goods:newOrder.goosName,
                        content:myEvaluate,
                        score:myScore,
                    }
                    console.log(appraise)
                    // 写入本地存储
                    if(localStorage.getItem('HX210404-TZQ-appraiseMsg')==null){
                        var appraisesAry=[];             //若为空，空声明一个空数组
                    }else{
                        var appraisesAry=JSON.parse(localStorage.getItem('HX210404-TZQ-appraiseMsg'));       //不为空，从本地存储添加信息 
                    }
                
                    appraisesAry.unshift(appraise)
                    localStorage.setItem('HX210404-TZQ-appraiseMsg',JSON.stringify(appraisesAry))
                    alert('评价成功')

                    // 修改订单
                    var newState='已评价'       //修改订单状态
                    newOrder.state=newState
                    var newOperate='完成'       //修改订单按钮
                    newOrder.operate=newOperate

                    orderMsgAry.splice(index,1,newOrder)
                  
                    localStorage.setItem('HX210404-TZQ-orderMsg',JSON.stringify(orderMsgAry))

                    Box.style.display='none';
                    window.location.reload();
                }
                
            }
        }
        button.append(oInput);
        box.append(button);

        allOrderBox.append(box);
    }
}

//各类订单数显示

//全部订单
var allUserOrder=document.getElementById('allUserOrderNum');
var hdallOrderNum=document.getElementById('hd-allOrderNum')
allUserOrder.innerHTML=userOrderAry.length;
hdallOrderNum.innerHTML=userOrderAry.length;

//相应状态订单数打印方法
function OrderNumFn(box,orderState){
    var Ary=[]
    for(var i=0;i<userOrderAry.length;i++){
        if(userOrderAry[i].state==orderState){
            Ary.push(userOrderAry[i])
        }
    }
    box.innerHTML=Ary.length;
}

//待付款
var ToBePayNum=document.getElementById('ToBePayOrderNum');
var hdToBePayNum=document.getElementById('hd-ToBePayNum')
var ToBePayState="待付款"
OrderNumFn(ToBePayNum,ToBePayState)
OrderNumFn(hdToBePayNum,ToBePayState)

//待使用
var ToBeUesdOrder=document.getElementById('ToBeUesdOrderNum')
var hdToBeUesdNum=document.getElementById('hd-ToBeUesdNum')
var ToBeUesState="待使用"
OrderNumFn(ToBeUesdOrder,ToBeUesState)
OrderNumFn(hdToBeUesdNum,ToBeUesState)

//待评价
var ToBeEvaluatedNum=document.getElementById('ToBeEvaluatedNum')
var myToBeEvaluatedNum=document.getElementById('myToBeEvaluatedNum')
var hdToBeEvaluatedNum=document.getElementById('hd-ToBeEvaluatedNum')
var ToBeEvaluated='待评价'
OrderNumFn(ToBeEvaluatedNum,ToBeEvaluated)
OrderNumFn(myToBeEvaluatedNum,ToBeEvaluated)
OrderNumFn(hdToBeEvaluatedNum,ToBeEvaluated)

//退款/售后
var refundNum=document.getElementById('refundNum')
var hdrefundNum=document.getElementById('hd-refundNum')
var refundOrderAry=[];
    for(var i=0;i<userOrderAry.length;i++){
        if(userOrderAry[i].state=='已退款' ||  userOrderAry[i].state=='待退款'){
            refundOrderAry.push(userOrderAry[i])
        }
    }
refundNum.innerHTML=refundOrderAry.length;
hdrefundNum.innerHTML=refundOrderAry.length;


//已评价
var mySuccessEvaluatedNum=document.getElementById('mySuccessEvaluatedNum')
var mySuccessEvaluatedState='已评价'
OrderNumFn(mySuccessEvaluatedNum,mySuccessEvaluatedState)

//登录状态保持
var login=document.getElementById('login');
var register=document.getElementById('register')
if(localStorage.getItem('HX210404TZQuserState')){
    var userName= localStorage.getItem('HX210404TZQuserState');
    login.innerHTML='您好，'+userName;
    register.innerHTML='退出';
    register.onclick=function(){
        var ans=confirm('是否退出登录');
            if(ans){
                localStorage.removeItem("HX210404TZQuserState");
                window.location.href='../index.html'
            }
    }         
}else{
    alert('请先登录')
    window.location.href='../index.html'
}