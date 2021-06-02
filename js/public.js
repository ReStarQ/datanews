var drop=document.getElementById('drop')
var dropList=document.getElementById('dropList');
drop.onmouseover=function(){
    dropList.style.display='block'
}
dropList.onmouseleave=function(){
    dropList.style.display='none'
}


//个人中心跳转
var oCenter=document.getElementById('center');
var login=document.getElementById('login');
var register=document.getElementById('register')
oCenter.onclick=function(){
    if(localStorage.getItem('HX210404TZQuserState')){
        window.location.href='personal.html'
        var userName= localStorage.getItem('HX210404TZQuserState');
        login.innerHTML='您好，'+userName;
        register.innerHTML='退出';
        register.onclick=function(){
            var ans=confirm('是否退出登录');
                if(ans){
                    localStorage.removeItem("HX210404TZQuserState");
                    window.location.reload();
                }
        }         
    }else{
        alert('请先登录')
        login.style.display='block'
    }
}
var myCenter=document.getElementById('myCenter');
myCenter.onclick=function(){
    if(localStorage.getItem('HX210404TZQuserState')){
        window.location.href='personal.html'
        var userName= localStorage.getItem('HX210404TZQuserState');
        login.innerHTML='您好，'+userName;
        register.innerHTML='退出';
        register.onclick=function(){
            var ans=confirm('是否退出登录');
                if(ans){
                    localStorage.removeItem("HX210404TZQuserState");
                    window.location.reload();
                }
        }         
    }else{
        alert('请先登录')
        login.style.display='block'
    }
}
//跳转美食页
var FoodLink=document.getElementById('foodLink')
FoodLink.onclick=function(){
    if(localStorage.getItem('HX210404TZQuserState')){
        window.location.href='food.html'
        var userName= localStorage.getItem('HX210404TZQuserState');
        login.innerHTML='您好，'+userName;
        register.innerHTML='退出';
        register.onclick=function(){
            var ans=confirm('是否退出登录');
                if(ans){
                    localStorage.removeItem("HX210404TZQuserState");
                    window.location.reload();
                }
        }         
    }else{
        alert('请先登录')
        login.style.display='block'
    }
    
}
//跳转电影页
var filmLink=document.getElementById('filmLink')
filmLink.onclick=function(){
    window.location.href='movie.html'
}

//搜索框搜索
var searchMsg=document.getElementById('searchMsg')
var searchBtn=document.getElementById('searchBtn')

searchBtn.onclick=function(){
    console.log(searchMsg.value);
    localStorage.setItem('HX210404-TZQ-searchMsg',searchMsg.value);
    window.location.href="../html/food.html";
}


//商家登录
var busCenterBtn=document.getElementById('businessCenter');
var busLoginBox=document.getElementById('businessLogin');
busCenterBtn.onclick=function(){
    busLoginBox.style.display='block';
}
var businessCloseBtn=document.getElementById('businessClose')
businessCloseBtn.onclick=function(){
    busLoginBox.style.display='none';
}
var busBtn=document.getElementById('businessBtn');
var busName=document.getElementById('loginbusiness')
var busPwd=document.getElementById('businessPwd')
busBtn.onclick=function(){

    var getAry=localStorage.getItem("HX210404-TZQ-businessMsg");
    var userMsg=JSON.parse(getAry);
    for(var i=0;i<userMsg.length;i++){
        if(busName.value==userMsg[i].name && busPwd.value==userMsg[i].pwd ){
            var name=userMsg[i].business
            window.localStorage.setItem('HX210404-TZQ-businessState',name)
            alert('欢迎访问');
            window.location.href='../html/business.html';
            
            return;
        }      
    }
    alert('账号或密码错误') ;   
}