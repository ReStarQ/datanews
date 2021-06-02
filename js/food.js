//获取本地信息
var foodMsg=JSON.parse(localStorage.getItem('HX210404-TZQ-foodMsg'));
var bigBox=document.getElementById('menu-content-food')

// 首页搜索打印
window.onload=function(){
    if(localStorage.getItem('HX210404-TZQ-searchMsg')!=null){
        var searchMsg=localStorage.getItem('HX210404-TZQ-searchMsg');
        var searchAry=[]
        bigBox.innerHTML='';   //新建空数组存放voucher
        for(var i=0;i<foodMsg.length;i++){      //遍历本地取出voucher，依次添加进voucher数组 
            if(foodMsg[i].business.indexOf(searchMsg)!=-1 || foodMsg[i].name.indexOf(searchMsg)!=-1 || foodMsg[i].type.indexOf(searchMsg)!=-1){
                searchAry.push(foodMsg[i]);
            }  
        }
        add(searchAry,8);
        window.localStorage.removeItem('HX210404-TZQ-searchMsg');  
    }else if(localStorage.getItem('HX210404-TZQ-foodType')!=null){
        var typeMsg=localStorage.getItem('HX210404-TZQ-foodType');
        console.log(typeMsg)
        var typeAry=[]
        bigBox.innerHTML='';   //新建空数组存放voucher
        for(var i=0;i<foodMsg.length;i++){      //遍历本地取出voucher，依次添加进voucher数组 
            if(foodMsg[i].type==typeMsg){
                typeAry.push(foodMsg[i]);
            }  
        }
        console.log(typeAry)
        add(typeAry,8);
        window.localStorage.removeItem('HX210404-TZQ-foodType');  
    }else{
        add(foodMsg,8)
    }  
}

//销量排序
var SoldBtn=document.getElementById('Sold');
SoldBtn.onclick=function(){
    var foodMsg=JSON.parse(localStorage.getItem('HX210404-TZQ-foodMsg'));
    bigBox.innerHTML='';        //清空页面
    if(localStorage.getItem('HX210404-TZQ-newVoucherType')==null){
        //默认排序
        soldFn(foodMsg)
    }else{
        //根据种类进行销量排序
        var newSortAry=JSON.parse(localStorage.getItem('HX210404-TZQ-newVoucherType'));
        soldFn(newSortAry)
        localStorage.removeItem('HX210404-TZQ-newVoucherType') 
    }
    
}

//排序函数
function soldFn(ary){
    bigBox.innerHTML='';        //清空页面
    var sortAry=[]      //新建空数组存放销量
    for(var i=0;i<ary.length;i++){      //遍历本地取出sold销量，依次添加进销量数组
        sortAry.push(ary[i].Sold);
    }
    // ary.sort(function(a,b){return b-a})     //从大到下排列
    var newSort=sortAry.sort(function(a,b){return b-a});   //调用数组对象sort()，函数定义从大到下排列
    var newAry=[];
    for(var i=0;i<newSort.length;i++){              //indexof()去重  遍历newSort
        if(newSort.indexOf(newSort[i])===i){        //找当前的值,返回的索引等于当前的循环里面的i的话，证明这个值是第一次出现
            newAry.push(newSort[i])
        }
    }
    var soldAry=[];                          //新建产品打印数组
    for(var i=0;i<newAry.length;i++){          //循环取出newAry[]中的值
        for(var j=0;j<ary.length;j++){      
            if(newAry[i]==ary[j].Sold){     // newAry[]中的值和本地数组对象中的Sold比较是否相等
                soldAry.push(ary[j]);        //添加本地数组中的对象，进打印数组
            }
        }
    }

    add(soldAry,8);
}

//默认排序
var basesBtn=document.getElementById('bases');
basesBtn.onclick=function(){
    bigBox.innerHTML='';    //清空页面
    add(foodMsg,8);      //打印默认
    localStorage.removeItem('HX210404-TZQ-newVoucherType')
}

//代金券
var voucherBtn=document.getElementById('voucher');
var checkedBtn=document.getElementById('checked');

var check=0;
voucherBtn.onclick=function(){
    check++;
    checkedBtn.checked=true;
    bigBox.innerHTML='';
    
    var nowAry=JSON.parse(localStorage.getItem('HX210404-TZQ-newVoucherType'))  
  
    var voucherAry1=[]      //新建空数组存放voucher
    var voucherAry2=[]
    if(check%2!=0){
        if(nowAry==null){
            for(var i=0;i<foodMsg.length;i++){      //遍历本地取出voucher，依次添加进voucher数组 
                if(foodMsg[i].voucher=='1'){
                    voucherAry1.push(foodMsg[i]);
                }   
            }
            console.log(foodMsg[i])
            console.log(voucherAry2)
            add(voucherAry1,8);
        }else{
            for(var i=0;i<nowAry.length;i++){      //遍历本地取出voucher，依次添加进voucher数组 
                if(nowAry[i].voucher=='1'){
                    voucherAry2.push(nowAry[i]);
                }   
            }
            add(voucherAry2,8);
        }
        
    }else{
        checkedBtn.checked=false;
        if(nowAry==null){
            add(foodMsg,8);
        }else{
            add(nowAry,8); 
        }  
    }   
}

//火锅
var hotPotBtn=document.getElementById('hotPot');
hotPotBtn.onclick=function(){
    bigBox.innerHTML='';  
    var hotPotAry=[]      //新建空数组存放hotPotAry
    for(var i=0;i<foodMsg.length;i++){      //遍历本地foodMsg,取出type，依次添加进数组 
        if(foodMsg[i].type=='火锅'){
            hotPotAry.push(foodMsg[i]);
        }   
    }
    window.localStorage.setItem('HX210404-TZQ-newVoucherType',JSON.stringify(hotPotAry));
    add(hotPotAry,8)
    
}

//炸鸡
var chickenBtn=document.getElementById('chicken');
chickenBtn.onclick=function(){
    bigBox.innerHTML='';  
    var chickenAry=[]      //新建空数组存放
    for(var i=0;i<foodMsg.length;i++){      //遍历本地foodMsg,取出type，依次添加进数组 
        if(foodMsg[i].type=='炸鸡'){
            chickenAry.push(foodMsg[i]);
        }   
    }
    window.localStorage.setItem('HX210404-TZQ-newVoucherType',JSON.stringify(chickenAry));
    add(chickenAry,8)
}
//海鲜
var seaFoodBtn=document.getElementById('seaFood');
seaFoodBtn.onclick=function(){
    bigBox.innerHTML='';  
    var seaFoodAry=[]      //新建空数组存放
    for(var i=0;i<foodMsg.length;i++){      //遍历本地foodMsg,取出type，依次添加进数组 
        if(foodMsg[i].type=='海鲜'){
            seaFoodAry.push(foodMsg[i]);
        }   
    }
    window.localStorage.setItem('HX210404-TZQ-newVoucherType',JSON.stringify(seaFoodAry));
    add(seaFoodAry,8)
}
//不限
var unlimitedBtn=document.getElementById('unlimited')
unlimitedBtn.onclick=function(){
    bigBox.innerHTML='';    //清空页面
    add(foodMsg,8)            //打印默认
    localStorage.removeItem('HX210404-TZQ-newVoucherType')  
}

//根据搜索打印
var searchBtn=document.getElementById('searchBtn')
searchBtn.onclick=function(){
    searchFn();    
}
function searchFn(){
    var searchMsg=document.getElementById('searchMsg')
    localStorage.setItem('HX210404-TZQ-searchMsg',searchMsg.value);
    var searchMsg=localStorage.getItem('HX210404-TZQ-searchMsg');
    var searchAry=[]
    bigBox.innerHTML='';   //新建空数组存放voucher
    for(var i=0;i<foodMsg.length;i++){      //遍历本地取出voucher，依次添加进voucher数组 
        if(foodMsg[i].business.indexOf(searchMsg)!=-1 || foodMsg[i].name.indexOf(searchMsg)!=-1 || foodMsg[i].type.indexOf(searchMsg)!=-1){
            searchAry.push(foodMsg[i]);
        }  
    }
    add(searchAry,8);
    window.localStorage.removeItem('HX210404-TZQ-searchMsg');
}

    

//分页打印
var PageBox = document.getElementById("showPage");

function add(ary,num){
    var pageSize=num;
    function showPageAdd(){
        bigBox.innerHTML='';
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
        bigBox.innerHTML="";
        append(ary,startPage,endPage)  
    }
}
add(foodMsg,8)

//打印方法
function append(showAry,star,end){
    for(var i=star;i<end;i++){
        var newBox=document.createElement('div');
        newBox.className="menu-list";

        var newBoxMain=document.createElement('div');
        newBoxMain.className="menu-list-content";
        newBoxMain.setAttribute('flag',showAry[i].id)
        newBoxMain.onclick=function(){
            var foodID=this.getAttribute('flag');
            localStorage.setItem('HX210404-TZQ-foodID',foodID);
            window.location.href="../html/foodDetails.html";
        }

        var newImg=document.createElement('img');
        newImg.src='../'+showAry[i].pictuer;
        newBoxMain.append(newImg);

        var newH3=document.createElement('h3');
        newH3.innerHTML=showAry[i].business;
        newBoxMain.append(newH3);

        var newH4=document.createElement('h4');
        newH4.innerHTML=showAry[i].introduce;
        newBoxMain.append(newH4);
        
        var newDiv=document.createElement('div');
        
        var newA=document.createElement('a');
        newA.innerHTML='¥'+showAry[i].cutPrice;
        newDiv.append(newA);

        var newSpan=document.createElement('span');
        newSpan.innerHTML=showAry[i].costPrice;
        newDiv.append(newSpan);

        var newLabel=document.createElement('label');
        newLabel.innerHTML='已售'+showAry[i].Sold;
        newDiv.append(newLabel);
        
        newBoxMain.append(newDiv);
        
        var newH5=document.createElement('h5');
        newH5.innerHTML='免预约';
        var newImgTime=document.createElement('img');
        newImgTime.src='../img/index/time.png';
        newH5.append(newImgTime);
        newBoxMain.append(newH5);

        newBox.append(newBoxMain);
        
        bigBox.append(newBox)
    }

    
}

