// 登录状态保持
var login=document.getElementById('login');
var register=document.getElementById('register');
var headBox=document.getElementById('head-right')
if(localStorage.getItem('HX210404-TZQ-businessState')){
    var userName= localStorage.getItem('HX210404-TZQ-businessState');   //本地是否存在商户信息
    login.innerHTML='您好，'+userName;
    register.innerHTML='退出';
    headBox.removeChild(headBox.childNodes[5])      //移除个人中心
    register.onclick=function(){
        var ans=confirm('是否退出登录');
            if(ans){
                localStorage.removeItem("HX210404-TZQ-businessState");      //删除本地商户信息
                window.location.href='../index.html'
            }
    }         
}

var allOrderBox=document.getElementById('allOrder-list');
var userBox=document.getElementById("userMsg");
var headList=document.getElementById('list-head')

//打开全部订单
var allOrderBtn=document.getElementById('allOrder')
var hdAllOrderBtn=document.getElementById('hd-allOrder')
allOrderBtn.onclick=function(){
    footColorFn(this)
    businOrder(orderMsgAry);
}
hdAllOrderBtn.onclick=function(){
    footColorFn(this)
    businOrder(orderMsgAry);
}
//打开待使用订单
var ToBeUesdBtn=document.getElementById('ToBeUesd')
var hdToBeUesdBtn=document.getElementById('hd-ToBeUesd')
ToBeUesdBtn.onclick=function(){
    footColorFn(this)
    var nowMsg=this.innerHTML.slice(0,2)
    orderListPrint(nowMsg)
}
hdToBeUesdBtn.onclick=function(){
    footColorFn(this)
    var nowMsg=this.innerHTML.slice(0,2)
    orderListPrint(nowMsg)
}
//打开退款/售后订单
var refundBtn=document.getElementById('refund')
refundBtn.onclick=function(){
    footColorFn(this)
    var nowMsg=this.innerHTML.slice(0,2)
    orderListPrint(nowMsg)
}
var hdRefundBtn=document.getElementById('hd-refund')
hdRefundBtn.onclick=function(){
    footColorFn(this)
    var nowMsg=this.innerHTML.slice(0,2)
    orderListPrint(nowMsg)
}
//打印列表状态订单
function orderListPrint(msg){
    var nowAry=[]
    for(var i=0;i<orderMsgAry.length;i++){
        if(orderMsgAry[i].state.indexOf(msg)!=-1){
            nowAry.push(orderMsgAry[i])
        }
    }
    businOrder(nowAry);
}
//改变字体颜色
var fontColor=document.getElementsByClassName('fontColor')
function footColorFn(btn){
    for(var i=0;i<fontColor.length;i++){
        fontColor[i].style.color='#000000'
    }
    btn.style.color='#ff6700';
}

//获取本地所用订单信息
var orderMsgAry=JSON.parse(localStorage.getItem('HX210404-TZQ-orderMsg'));
var businessMsg=JSON.parse(localStorage.getItem('HX210404-TZQ-businessMsg'));

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

//判断登录的商家
function businOrder(orderAry){
    if(userName=='admin'){                           //超级管理员    打印全部订单
        add(orderAry,4)
    }else{
        var businOrder=[]                            //查找订单所属商家，打印相应订单
        for(var i=0;i<orderAry.length;i++){
            if(userName==orderAry[i].business){
                businOrder.push(orderAry[i])
            }
        }
        add(businOrder,4)
    }
}
businOrder(orderMsgAry);
//     add(orderMsgAry,4)
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
        if(showAry[i].state=='待评价' || showAry[i].state=='已完成'){
            state.innerHTML='交易完成';
        }else if(showAry[i].state=='已退款' ){
            state.innerHTML='交易关闭';
        }else{
            state.innerHTML=showAry[i].state;
        }
       
        box.append(state);
   
        var button=document.createElement('div');
        button.className='order-button';

        var oInput=document.createElement('input');
        oInput.type='button'
        oInput.name=showAry[i].orderId
        oInput.setAttribute('flag',showAry[i].goodsId)
        if(showAry[i].state=='待使用'){
            oInput.value="使用"
        }else if(showAry[i].state=='待退款'){
            oInput.value="退款"
        }else if(showAry[i].state=='已评价'){
            oInput.value="完成"
        }else{
            oInput.value="完成"
        }
        oInput.onclick=function(){
            //按钮操作事件
            var goodsId=this.getAttribute('flag')
            var operate=this.value
            console.log(goodsId)   //全部订单
            if(operate=="退款"){
                var ans=confirm('是否确认付款');
                if(ans){
                    var orderId=this.name;
                    var orderType=this.name.slice(0,2)          //商品类型
                    if(orderType==10){                          //美食类
                        
                        //修改订单状态
                        var newOrderMsg=JSON.parse(localStorage.getItem('HX210404-TZQ-orderMsg'))       //获取本地所有订单
                        for(var i=0;i<newOrderMsg.length;i++){              //查询相应订单信息 
                            if(newOrderMsg[i].orderId==orderId){
                                var order=newOrderMsg[i];
                                var orderIndex=i;
                            }    
                        }
                    
                        var newState='已退款'           //修改状态   
                        order.state=newState;
                        var newOperate='完成'           
                        order.operate=newOperate;
                        newOrderMsg.splice(orderIndex,1,order)          //本地数据修改
                        localStorage.setItem('HX210404-TZQ-orderMsg',JSON.stringify(newOrderMsg))       //重新写入本地

                        //修改用户余额
                        var userMsg=JSON.parse(localStorage.getItem('HX210404-TZQ-userMsg'));
                        for(var i=0;i<userMsg.length;i++){
                            if(order.userName==userMsg[i].user){ 
                                var newUser=userMsg[i]
                                var userIndex=i 
                            }
                        }

                        var refund=newUser.money+order.price;
                        newUser.money=refund;
                        userMsg.splice(userIndex,1,newUser);
                        localStorage.setItem('HX210404-TZQ-userMsg',JSON.stringify(userMsg));

                        //修改商品信息
                        var FoodsMsgAry=JSON.parse(localStorage.getItem('HX210404-TZQ-foodMsg'));
                        for(var i=0;i<FoodsMsgAry.length;i++){
                            if(FoodsMsgAry[i].id==goodsId){
                                var newFoodMsg=FoodsMsgAry[i];
                                var foodIndex=i
                            }
                        }
                        var newSold=newFoodMsg.Sold-1;
                        newFoodMsg.Sold=newSold;
                        var newStock=newFoodMsg.stock+1; 
                        newFoodMsg.stock=newStock;

                        FoodsMsgAry.splice( foodIndex,1,newFoodMsg);
                        localStorage.setItem('HX210404-TZQ-foodMsg',JSON.stringify(FoodsMsgAry));
                        window.location.reload();
                    }
                    if(orderType==20){                      //电影类

                        //修改订单状态
                        var newOrderMsg=JSON.parse(localStorage.getItem('HX210404-TZQ-orderMsg'))
                        for(var i=0;i<newOrderMsg.length;i++){
                            if(newOrderMsg[i].orderId==orderId){
                                var order=newOrderMsg[i];
                                var orderIndex=i;
                            }    
                        }
                        var newState='已退款'
                        order.state=newState;
                        var newOperate='完成'
                        order.operate=newOperate;
                        newOrderMsg.splice(orderIndex,1,order)
                        
                        localStorage.setItem('HX210404-TZQ-orderMsg',JSON.stringify(newOrderMsg))

                        //修改用户余额
                        var userMsg=JSON.parse(localStorage.getItem('HX210404-TZQ-userMsg'));
                        for(var i=0;i<userMsg.length;i++){
                            if(order.userName==userMsg[i].user){ 
                                var newUser=userMsg[i]
                                var userIndex=i 
                            }
                        }

                        var refund=newUser.money+order.price;
                        newUser.money=refund;
                        userMsg.splice(userIndex,1,newUser);
                        localStorage.setItem('HX210404-TZQ-userMsg',JSON.stringify(userMsg));

                        //修改商品信息
                        var filmsMsgAry=JSON.parse(localStorage.getItem('HX210404-TZQ-filmMsg'));
                        for(var i=0;i<filmsMsgAry.length;i++){
                            if(filmsMsgAry[i].id==goodsId){
                                var newFilmMsg=filmsMsgAry[i];
                                var filmIndex=i
                            }
                        }
                        
                        var newTickets=newFilmMsg.tickets+1; 
                        newFilmMsg.tickets=newTickets;

                        filmsMsgAry.splice(filmIndex,1,newFilmMsg);
                        localStorage.setItem('HX210404-TZQ-filmMsg',JSON.stringify(filmsMsgAry));
                        window.location.reload();
                    }
                }    
            }else if(operate=="使用"){
                var ans=confirm('是否确认使用');
                if(ans){
                    var orderId=this.name;
                    var orderType=this.name.slice(0,2)          //商品类型
                    
                        //修改订单状态
                        var newOrderMsg=JSON.parse(localStorage.getItem('HX210404-TZQ-orderMsg'))       //获取本地所有订单
                        for(var i=0;i<newOrderMsg.length;i++){              //查询相应订单信息 
                            if(newOrderMsg[i].orderId==orderId){
                                var order=newOrderMsg[i];
                                var orderIndex=i;
                            }    
                        }
                        console.log(order.state)
                        console.log(order.operate)
                        if(orderType==20){
                            var newState='已完成'           //修改状态   
                            order.state=newState;
                            var newOperate='完成'           
                            order.operate=newOperate;
                        }else {
                            var newState='待评价'           //修改状态   
                            order.state=newState;
                            var newOperate='完成'           
                            order.operate=newOperate;
                        }
                       
                        console.log(order.state)
                        console.log(order.operate)
                        newOrderMsg.splice(orderIndex,1,order)          //本地数据修改
                        localStorage.setItem('HX210404-TZQ-orderMsg',JSON.stringify(newOrderMsg))       //重新写入本地
                        window.location.reload();
                    
                    
                }
            }
            
        }
        button.append(oInput);
        box.append(button);

        allOrderBox.append(box);
    }
}




