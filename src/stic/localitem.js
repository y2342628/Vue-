export var setitem=function(value){
    var locaArr=localStorage.getItem('mydouban')||'[]';
    locaArr=JSON.parse(locaArr);
    console.log(locaArr)
    var flag=true;

    for(var i=0;i<locaArr.length;i++){
        if(locaArr[i]==value){
            flag=false;
        }
    }
   if(flag){
    locaArr.push(value)
   }
    localStorage.setItem('mydouban',JSON.stringify(locaArr))
}

export var getitem =function(){
    var locaArr=localStorage.getItem('mydouban')||'[]';
    locaArr=JSON.parse(locaArr);
    return locaArr;
}
export var removeitem=function(value){
    var locaArr=getitem()
    if(value){
        for(var i=locaArr.length;i>=0;i--){
            if(locaArr[i]==value){
                locaArr.splice(i,1)
                break;
            }
        }
    }else{
        locaArr=[]
    }

    localStorage.setItem('mydouban',JSON.stringify(locaArr))
}