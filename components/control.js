// 全局变量
var YEAR = 2019;


// 设置年份
function setYear(obj){
    YEAR = obj.value;
    console.log(YEAR + '年');
}


// 图层可见性
function layerVision(obj, i){ // obj为控件对象，i为图层索引
    var layers = map.getLayers();
    var layer = layers.item(i);
    layer.setVisible(obj.checked);
}


// 单击菜单
function menuClick(Menu, subMenu){
    var fath = document.getElementById(Menu);
    var son = document.getElementById(subMenu);
    fath.onclick = function(){
        son.style.display = 'block';
    }
    son.onmouseleave = function(){
        son.style.display = 'none';
    }
}

menuClick('yearMenu', 'yearSubMenu');
menuClick('viewMenu', 'viewSubMenu');

