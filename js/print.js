//打印美食
//获取box
// var bigBox=document.getElementById('menu-content')
// var foodBox=document.getElementById('menu-list')
// var foodBoxMain=document.getElementById('menu-list-content')
//本地信息获取
function foodShow(){
    var bigBox=document.getElementById('menu-content-food')
    var foodMsg=JSON.parse(localStorage.getItem('HX210404-TZQ-foodMsg'));
    for(var i=0;i<foodMsg.length;i++){

        var newBox=document.createElement('div');
        newBox.className="menu-list";

        var newBoxMain=document.createElement('div');
        newBoxMain.className="menu-list-content";
        newBoxMain.id=foodMsg[i].id;

        var newImg=document.createElement('img');
        newImg.src='../'+foodMsg[i].pictuer;
        newBoxMain.append(newImg);

        var newH3=document.createElement('h3');
        newH3.innerHTML=foodMsg[i].business;
        newBoxMain.append(newH3);

        var newH4=document.createElement('h4');
        newH4.innerHTML=foodMsg[i].introduce;
        newBoxMain.append(newH4);
        
        var newDiv=document.createElement('div');
        
        var newA=document.createElement('a');
        newA.innerHTML='¥'+foodMsg[i].costPrice;
        newDiv.append(newA);

        var newSpan=document.createElement('span');
        newSpan.innerHTML=foodMsg[i].cutPrice;
        newDiv.append(newSpan);

        var newLabel=document.createElement('label');
        newLabel.innerHTML='已售'+foodMsg[i].Sold;
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
    // var newP=document.createElement('p');
    // newP.innerHTML='查看全部美食 >';
    // bigBox.append(newP);
    
}
//打印电影
function cinemaShow(){
    var bigBox=document.getElementById('menu-content-film');
    var cinemaMsg=JSON.parse(localStorage.getItem('HX210404-TZQ-cinemaMsg'));
    console.log(cinemaMsg)
    for(var i=0;i<cinemaMsg.length;i++){

        var newBox=document.createElement('div');
        newBox.className="menu-list";
        
        var newBoxMain=document.createElement('div');
        newBoxMain.className="menu-list-content";
        newBoxMain.id=cinemaMsg[i].id;

        var newImg=document.createElement('img');
        newImg.src='../'+cinemaMsg[i].picture;
        newBoxMain.append(newImg);
    
        var newH3=document.createElement('h3');
        newH3.innerHTML=cinemaMsg[i].name;
        newBoxMain.append(newH3);
    
        var newH4=document.createElement('h4');
        newH4.innerHTML=cinemaMsg[i].introduce;
        newBoxMain.append(newH4);
        
        var newDiv=document.createElement('div');
        
        var newA=document.createElement('a');
        newA.innerHTML='¥'+cinemaMsg[i].costPrice;
        newDiv.append(newA);
    
        var newSpan=document.createElement('span');
        newSpan.innerHTML=cinemaMsg[i].cutPrice;
        newDiv.append(newSpan);
    
        var newLabel=document.createElement('label');
        newLabel.innerHTML=cinemaMsg[i].Sold;
        newDiv.append(newLabel);
         
        newBoxMain.append(newDiv);
    
        var newH5=document.createElement('h5');
        newH5.innerHTML='免预约';
        var newImgTime=document.createElement('img');
        newImgTime.src="img/index/time.png";
        newH5.append(newImgTime);
        newBoxMain.append(newH5);
    
        newBox.append(newBoxMain);
        
        bigBox.append(newBox);
    }
    var newP=document.createElement('p');
    newP.innerHTML='查看全部电影 >';
    bigBox.append(newP);
}


