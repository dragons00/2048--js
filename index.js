//作为游戏主要逻辑处理的载体，完成和16个元素块的一一映射
const arr=[];
//获取16个数字块存放区的元素
const itemArr=document.getElementsByClassName('cell-item');
//容器元素
const containerEl=document.getElementsByClassName('container')[0]
//手机端touch事件的各种位置点
//触摸起始点
var startX=0;
var startY=0;
//touch终点
var endX=0;
var endY=0;
//计算移动距离
var angleX=0;
var angleY=0;
//存储touch移动方向
var direction='';
//PC端的键盘上下左右触发事件
document.addEventListener('keydown',keyboardHander,false
 )
//根据电脑端键盘按键的不同采取相应的处理函数
function keyboardHander(e){
  switch(e.key){
   case 'ArrowLeft':
    leftHander();
    break;
   case 'ArrowUp':
    upHander();
    break;
   case 'ArrowRight':
    rightHander();
    break;
   case 'ArrowDown':
    downHander();
    break;
  }
 }
//移动端touch触发
containerEl.addEventListener('touchstart',touchStart);
containerEl.addEventListener('touchend',touchEnd);
function touchStart(e){
  e.preventDefault();
  startX=Math.round(e.changedTouches[0].pageX);
  startY=Math.round(e.changedTouches[0].pageY);
}
function touchEnd(e){
  e.preventDefault();
  endX=Math.round(e.changedTouches[0].pageX);
  endY=Math.round(e.changedTouches[0].pageY);;
  angleX=endX-startX;
  angleY=endY-startY;
  if(Math.abs(angleX)>Math.abs(angleY)){
    if(angleX>0){
      direction='right';
    }else{direction='left';}
  }else{if(angleY>0){
    direction='down';
  }else{direction='up';}}
  angleCal();
}
function angleCal(){
switch(this.direction){
  case 'up':
    upHander();
    break;
  case 'down':
    downHander();
    break;
  case 'left':
    leftHander();
    break;
  case 'right':
    rightHander();
    break;
  }}
//重置清空arr[]
function resetArr(){
 for(var i=0;i<4;i++){
  arr[i]=[];
  arr[i].push(0,0,0,0)
 }
}
//完成元素块的数字填充到arr[]中
function elApply2Arr(){
 for(var i=0;i<4;i++){
  for(var j=0;j<4;j++){
   var temp=i*4+j;
   if(!itemArr[temp].innerHTML){
    arr[i][j]=0;
   }else{
    arr[i][j]=itemArr[temp].innerHTML;
   }
  }
 }
}
//完成arr[]映射到页面16个元素快
function arrApply2El(){
 const arrTemp=[];
 for (let item of arr){
  arrTemp.push(...item)
 }
 arrTemp.forEach((value,index)=>{
  switch (Number(value)){
   case 0:
    itemArr[index].innerHTML='';
    itemArr[index].style.backgroundColor='#DDDDDD';
    break;
   case 2:
    itemArr[index].innerHTML='2';
    itemArr[index].style.backgroundColor='#AEB288';
    break;
   case 4:
    itemArr[index].innerHTML='4';
    itemArr[index].style.backgroundColor='#BAC263';
    break;
   case 8:
    itemArr[index].innerHTML='8';
    itemArr[index].style.backgroundColor='#D0E02D';
    break;
   case 16:
    itemArr[index].innerHTML='16';
    itemArr[index].style.backgroundColor='#E6FC04';
    break;
   case 32:
    itemArr[index].innerHTML='32';
    itemArr[index].style.backgroundColor='#DCBD22';
    break;
   case 64:
    itemArr[index].innerHTML='64';
    itemArr[index].style.backgroundColor='#F9D002';
    break;
   case 128:
    itemArr[index].innerHTML='128';
    itemArr[index].style.backgroundColor='#CF9439';
    break;
   case 256:
    itemArr[index].innerHTML='256';
    itemArr[index].style.backgroundColor='#F99905';
    break;
   case 512:
    itemArr[index].innerHTML='512';
    itemArr[index].style.backgroundColor='#C8622B';
    break;
   case 1024:
    itemArr[index].innerHTML='1024';
    itemArr[index].style.backgroundColor='#F95903';
    break;
   case 2048:
    itemArr[index].innerHTML='2048';
    itemArr[index].style.backgroundColor='#F92103';
    break;
  }
 })
}

//处理每一行或每一列四个数字块的移动与合并的逻辑，核心逻辑。
function mergeHander(item){
  item=item.filter(function(value){
    return (value>0)
  });
  if(item.length===0){
    return item=[0,0,0,0]
  }else{
    for(let i=0;i<item.length;i++){
      if(item[i]===item[i+1]){
        item[i]*=2;
        item.splice(i+1,1);
      }
    }
  }
 function exportRes(item){
  if(item.length===4){
   return item
 }else{
   item.push(0,0,0,0)
   item.splice(4,)
   return item;
  }
 }
 exportRes(item)
 return item;
  }
//left按键触发事件  
function leftHander(){
  elApply2Arr(); 
  console.log(arr)
  for(let i=0;i<4;i++){
    arr[i]=mergeHander(arr[i])
    
  }
  console.log(arr)
  arrApply2El();
  random();
}
//up按键触发事件 
function upHander(){
  elApply2Arr();
  for(let i=0;i<4;i++){
    const temp=[];
    temp[i]=arr.map((value)=>{
      return value[i]
    });
    console.log(temp)
    temp[i]=mergeHander(temp[i]);
    console.log('temp2:'+temp)
    for(let j=0;j<4;j++){
      arr[j][i]=temp[i][j]}
  arrApply2El();
  random();
}}
//right按键触发事件 
function rightHander(){
elApply2Arr();
for(let i=0;i<4;i++){
  arr[i].reverse();
  arr[i]=mergeHander(arr[i]);
  arr[i].reverse();
}
arrApply2El();
random();
}
//down按键触发事件 
function downHander(){
  elApply2Arr();
  for(let i=0;i<4;i++){
    const temp=[];
    temp[i]=arr.map((value)=>{
      return value[i]
    });
    temp[i].reverse();
    console.log(temp)
    temp[i]=mergeHander(temp[i]);
    temp[i].reverse();
    console.log('temp2:'+temp)
    for(let j=0;j<4;j++){
      arr[j][i]=temp[i][j]}
  arrApply2El();
  random();
}}
Array.prototype.remove=function (item){
   this.splice(item,1)  
}
//空白块随机生成2或4
function random(){
  const emptyArr=[];
  //判断数字块是否为空
function isEmpty(){
  for(let i=0;i<16;i++){
   if(!itemArr.item(i).innerHTML){
  
    emptyArr.push(i)
   }
  }
  
  }
  isEmpty();
 var num=Math.random()>0.6? 2:4;
 //空元素块的数量
 var emptyLength=emptyArr.length;
 var color= num===2?'#AEB288':'#BAC263';
 //产生2/4的元素块序号
if(emptyLength>=2){
 //取出emptyArr里面任意空块的序号
 var emptyNum=Math.round( Math.random()*emptyLength-1);
 var arrNum=emptyArr[emptyNum];
 itemArr[arrNum].innerHTML=num;
 itemArr[arrNum].style.backgroundColor=color;
 //emptyArr.remove(arrNum);
}else{if(emptyLength===1){var arrNum=emptyArr[0];
  itemArr[arrNum].innerHTML=num;
  itemArr[arrNum].style.backgroundColor=color;}
  else{
    window.alert('游戏结束')
  }
 //emptyArr.pop();
}
}

//按钮reset事件
function reset(){
  location.reload();
}
//页面初始化函数
function initialAll(){
  resetArr();
  random();
  random();
  elApply2Arr();
  arrApply2El();
 }
initialAll();
