//弹出登录框
var login=document.getElementById('login')
var loginAdd=document.getElementById('loginAdd')
login.onclick=function(){
    loginAdd.style.display='block'
}
//关闭出登录框
var loginClose=document.getElementById('loginClose')
loginClose.onclick=function(){
    loginAdd.style.display='none'
}
//弹出注册框
var register=document.getElementById('register')
var registerAdd=document.getElementById('registerAdd')
register.onclick=function(){
    registerAdd.style.display='block'
}
//关闭注册框
var registerClose=document.getElementById('registerClose')
registerClose.onclick=function(){
    registerAdd.style.display='none'
}
//注册
var registerUser=document.getElementById('registerUser')
var registerPwd=document.getElementById('registerPwd')
var PwdConfirm=document.getElementById('registerConfirm')
var registerBtn=document.getElementById('registerButton')
//正则验证
var accReg = /^[1]{1}[0-9]{10}$/;     //手机号
var pwdReg = /^[A-Za-z]{2}[0-9]{8}$/;  //2位字母+8位数字
function registerReg(){
    registerUser.onkeyup=function(){
        if(registerUser.value.match(accReg)==null){
            this.nextElementSibling.innerHTML = "×";
            this.nextElementSibling.style.color = "red";
        }else{
            this.nextElementSibling.innerHTML = "√";
            this.nextElementSibling.style.color = "green";
        }
    }
    registerPwd.onkeyup=function(){
        if(registerPwd.value.match(pwdReg)==null){
            this.nextElementSibling.innerHTML = "×";
            this.nextElementSibling.style.color = "red";
        }else{
            this.nextElementSibling.innerHTML = "√";
            this.nextElementSibling.style.color = "green";
        }
    }
    PwdConfirm.onkeyup=function(){
        if(PwdConfirm.value!=registerPwd.value){
            this.nextElementSibling.innerHTML = "×";
            this.nextElementSibling.style.color = "red";
        }else{
            this.nextElementSibling.innerHTML = "√";
            this.nextElementSibling.style.color = "green";
        }
    }
}
registerReg();
registerBtn.onclick=function(){
    var userMsg={
        user:registerUser.value,
        pwd:registerPwd.value,
        user:registerUser.value,
        money:0,
    }
    
    if(registerUser.value.match(accReg)==null){
        alert('用户名格式错误');
        return;
    }
    if(registerPwd.value.match(pwdReg)==null){
        alert('密码格式错误');
        return;
    }
    if(PwdConfirm.value!=registerPwd.value){
        alert('二次确认密码错误');
        return;
    }
    var userAllAry=localStorage.getItem('HX210404-TZQ-userMsg') ? JSON.parse(localStorage.getItem('HX210404-TZQ-userMsg')):[];
    for(var i=0;i<userAllAry.length;i++){
        if(registerUser.value==userAllAry[i].user){
            alert('用户已存在');
            return;
        }
    }
    userAllAry.push(userMsg)
    localStorage.setItem('HX210404-TZQ-userMsg',JSON.stringify(userAllAry))    
    alert('注册成功')
    window.location.reload();
}
//登录
var loginUser=document.getElementById('loginUser')
var loginPwd=document.getElementById('loginPwd')
var loginBtn=document.getElementById('loginButton')
//正则验证
// function loginReg(){
//     loginUser.onkeyup=function(){
//         if(loginUser.value.match(accReg)==null){
//             this.nextElementSibling.innerHTML = "×";
//             this.nextElementSibling.style.color = "red";
//         }else{
//             this.nextElementSibling.innerHTML = "√";
//             this.nextElementSibling.style.color = "green";
//         }
//     }
//     loginPwd.onkeyup=function(){
//         if(loginPwd.value.match(pwdReg)==null){
//             this.nextElementSibling.innerHTML = "×";
//             this.nextElementSibling.style.color = "red";
//         }else{
//             this.nextElementSibling.innerHTML = "√";
//             this.nextElementSibling.style.color = "green";
//         }
//     }
// }
// loginReg();
//登录按钮
loginBtn.onclick=function(){
    var code=document.getElementById("loginKeyCode").value
    var key=document.getElementById("keycode").innerHTML

    var codeSmall=code.toLowerCase();
    var keySmall=key.toLowerCase();

    if(codeSmall!=keySmall){
        alert('验证码错误')
        return;
    }

    if(loginUser.value.match(accReg)==null){
        alert('用户名格式错误');
        return;
    }
    if(loginPwd.value.match(pwdReg)==null){
        alert('密码格式错误');
        return;
    }

    if(localStorage.getItem('HX210404-TZQ-userMsg')==null){
        alert('账号不存在')
    }

    var getAry=localStorage.getItem("HX210404-TZQ-userMsg");
    var userMsg=JSON.parse(getAry);
    for(var i=0;i<userMsg.length;i++){
        if(loginUser.value==userMsg[i].user && loginPwd.value==userMsg[i].pwd ){
            window.localStorage.setItem('HX210404TZQuserState',loginUser.value)
            alert('欢迎访问');
            window.location.reload();
            return;
            
        }      
    }
    alert('账号或密码错误') ;

}
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
                window.location.reload();
            }
    }         
}
// else{
//     alert('请先登录')
//     login.style.display='block'
// }



//尾部链接跳转
var JumpBtn=document.getElementsByClassName('Jump')
console.log(JumpBtn)
for(var i=0;i<JumpBtn.length;i++){
    JumpBtn[i].onclick=function(){
        window.location.href='https://www.cykjxm.com/';
    }
}


//验证码
function addCode(){
    var str='QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456'
    var key=''
    for(var i=1;i<=4;i++){
        var a=parseInt(Math.random()*str.length)    
            key+=str[a]
        }
    document.getElementById('keycode').innerHTML=key;               
}
addCode(); 