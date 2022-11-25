// 图形绘制和数据可视化

// 绘制碳排放时间序列折线图
function ceLineGraph(adcode, year) {
    // 删除初始标签或上一次的画布
    var del = document.getElementById('lineGraph');
    del.remove();

    // 动态创建新画布
    var consoleWindow = document.getElementById('console');
    var graph = document.createElement('canvas');
    graph.id = 'lineGraph';
    graph.classList.add('lineGraph');
    consoleWindow.appendChild(graph);

    // 获取当前选择区域的id
    var index;
    for (let i = 0; i < ceData.length; i++) {
        if (ceData[i].adcode == adcode) {
            index = i;
            break;
        }
    }

    // 创建画布内容和样式
    var canvas = document.getElementById('lineGraph');
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = 'rgb(100, 100, 100)';
    ctx.lineWidth = 1;

    // canvas.width = 300
    canvas.height = 200;

    // 参数设置
    var paddingValue = 15; // 边距
    var xLength = canvas.width - 2 * paddingValue;
    var yLength = canvas.height - 2 * paddingValue;
    var xIncrement = xLength / 17; //x轴步长。2002~2019年，步长1年
    var yIncrement = yLength / 5; //y轴步长

    // 坐标轴变换
    ctx.scale(1, -1); // 镜像坐标轴，变换为右手系
    ctx.translate(paddingValue, paddingValue - canvas.height); // 平移坐标轴，使原点在画布左下角

    // 绘制x轴    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(xLength, 0);
    ctx.closePath();
    ctx.stroke();


    // 选中区域的碳排放时间序列-2002-2019
    var dataCe, maxCe, minCe;

    dataCe = [ceData[index]["2002 "], ceData[index]["2003 "], ceData[index]["2004 "], ceData[index]["2005 "]
        , ceData[index]["2006 "], ceData[index]["2007 "], ceData[index]["2008 "], ceData[index]["2009 "]
        , ceData[index]["2010 "], ceData[index]["2011 "], ceData[index]["2012 "], ceData[index]["2013 "]
        , ceData[index]["2014 "], ceData[index]["2015 "], ceData[index]["2016 "], ceData[index]["2017 "]
        , ceData[index]["2018 "], ceData[index]["2019 "]];

    // 获取y值范围
    maxCe = minCe = dataCe[0];
    for (let i = 0; i < 18; i++) {
        if (dataCe[i] < minCe) minCe = dataCe[i];
        if (dataCe[i] > maxCe) maxCe = dataCe[i];
    }

    // y值归一化系数
    var alpha = (canvas.height - 2 * paddingValue) / maxCe;

    // 绘制参考线(2018年)
    ctx.strokeStyle = 'rgb(200, 200, 200)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, alpha * dataCe[16]);
    ctx.lineTo(xLength, alpha * dataCe[16]);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(16 * xIncrement, 0);
    ctx.lineTo(16 * xIncrement, alpha * dataCe[16]);
    ctx.closePath();
    ctx.stroke();

    // 绘制曲线
    ctx.strokeStyle = 'rgb(255, 0, 0)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 17; i++) {
        ctx.beginPath();
        ctx.moveTo(i * xIncrement, alpha * dataCe[i]);
        let j = i + 1;
        ctx.lineTo(j * xIncrement, alpha * dataCe[j]);
        ctx.closePath();
        ctx.stroke();
    }

    // 绘制散点
    for (let i = 0; i < 18; i++) {
        // 所选年份
        if (i + 2002 == year) {
            ctx.beginPath();
            ctx.arc(i * xIncrement, alpha * dataCe[i], 5, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = 'rgb(0, 255, 0)';
            ctx.fill()
        }
        // 其他时间
        else {
            ctx.beginPath();
            ctx.arc(i * xIncrement, alpha * dataCe[i], 3, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = 'rgb(0, 235, 255)';
            ctx.fill()
        }
    }


    // 绘制标签和坐标轴
    ctx.save(); // 保存当前环境状态
    ctx.scale(1, -1); // 翻转坐标系，否则显示的文本是倒置的

    ctx.font = "10pt Calibri";
    for (let i = 0; i < 5; i++) {
        let j = 4 * i; // 从2002开始每4年画一个点
        // var dataCeJ = dataCe[j].toFixed(2);
        ctx.stroke();
        // let textWidth = ctx.measureText(alpha * dataCe[j]);

        // 画散点的ce数值
        ctx.fillStyle = "rgb(93, 111, 194)";
        ctx.fillText(dataCe[j].toFixed(2), j * xIncrement, -alpha * dataCe[j] + 10);

        // 画x轴坐标
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillText(2002 + j, j * xIncrement - 10, 0 + 10);
    }

    // 画x轴刻度
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
        let j = 4 * i;
        ctx.beginPath();
        ctx.moveTo(j * xIncrement, 0);
        ctx.lineTo(j * xIncrement, -2);
        ctx.closePath();
        ctx.stroke();
    }

    ctx.stroke();
    ctx.fillStyle = "rgb(93, 111, 194)";
    ctx.fillText('Mt', 0, -alpha * dataCe[16] + 10); // 单位
    ctx.font = '15pt';
    ctx.fillText('碳排放时间序列图', -5, -yLength); // 标题

    ctx.restore(); // 重新载入save()的状态

}


// 基本信息表格
function baseTable(obj, adcode, year) {
    var del = document.getElementById('table1');
    del.parentNode.removeChild(del);

    // 创建表格
    var consoleWindow = document.getElementById('console');
    var table1 = document.createElement('table');
    table1.id = 'table1';
    table1.classList.add('table1');
    consoleWindow.appendChild(table1);

    var index;
    for (let i = 0; i < ceData.length; i++) {
        if (ceData[i].adcode == adcode) {
            index = i;
            break;
        }
    }

    // 添加数据
    var row1 = document.createElement('tr');
    table1.appendChild(row1);
    row1.innerHTML = '<td>已选区域：</td><td>' + obj.get('name') + '</td>';

    var row2 = document.createElement('tr');
    table1.appendChild(row2);
    row2.innerHTML = '<td>' + year + '年碳排放量：</td><td>' + ceData[index][(year + ' ')].toFixed(3) + '  百万吨</td>';

    var row3 = document.createElement('tr');
    table1.appendChild(row3);
    var rate = (ceData[index][year + ' '] / ceData[index][year - 1 + ' '] - 1) * 100;
    row3.innerHTML = '<td>年碳排放增长率：</td><td>' + rate.toFixed(2) + '%</td>';
}



// 绘制空间分布图
function spatioDistri() {
    // 清除之前的操作
    if (document.getElementById('layer3Label')) {
        console.log('Layer exist!');
        delSpatioDistri();
    }
    // if(document.getElementById('layer3Label')){
    //     try {
    //         let rel = document.getElementById('layer3Label');
    //         rel.parentElement.removeChild(rel);
    //     }
    //     catch{
    //         console.log('Worning!');
    //     }
    // }

    var year = YEAR;

    // 拷贝矢量图层
    // var sourceVector = new ol.source.Vector({
    //     projection: 'EPSG:4326',
    //     url: "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json",
    //     format: new ol.format.GeoJSON()
    // })
    // map.addLayer(
    //     new ol.layer.Vector({
    //         source: sourceVector,
    //         style: lAdminStyle
    //     })
    // )

    // 新建图层标签
    var layerDivBox = document.getElementById('layerExplorer');
    var layerLabel = document.createElement('label');
    var layerDiv = document.createElement('div');

    layerLabel.id = 'layer3Label';
    layerDiv.classList.add('layers');

    layerDivBox.appendChild(layerLabel);
    layerLabel.appendChild(layerDiv);
    layerDiv.innerHTML = '<input type="checkbox" value="lSD" id="lSD" checked="checked" onclick="layerVision(this, 1)"> Carbon Emission Distribution';

    // 修改图层3样式
    let features = map.getLayers().item(1).getSource().getFeatures();   

    // 按排放量大小排序
    var index = new Array(ceData.length);
    for (let i = 0; i < index.length; i++) {
        index[i] = i;
    } // 初始化索引数组
    
    for (let i = 0; i < ceData.length - 1; i++) {
        for (let j = 0; j < ceData.length - 1 - i; j++) {
            if (ceData[index[j]][year + ' '] > ceData[index[j + 1]][year + ' ']) {
                // 如果第j个要素的特征值比第j+1个要素的大，则交换两个要素索引的位置
                let temp = index[j];
                index[j] = index[j + 1];
                index[j + 1] = temp;
            }            
        }        
    }
    // ceData[index[i]]即为由小到大排列的
    
    // 颜色映射
    for (let i = 0; i < index.length; i++) {
        let fStyle = new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 0, 0, ' + i/(index.length-1) + ')'
            }), // 矢量图层填充颜色
            stroke: new ol.style.Stroke({
                color: '#6495ed',
                width: 1
            })
        })
        
        for (let j = 0; j < features.length; j++) {
            if (features[j].get('adcode') == ceData[index[i]]['adcode']) {
                features[j].setStyle(fStyle);
                break;
            }
        }
    }
}




// 删除空间分布图
function delSpatioDistri() {
    let features = map.getLayers().item(1).getSource().getFeatures();
    for (let j = 0; j < features.length; j++) {        
        features[j].setStyle(lAdminStyle);
    }
    
    let rel = document.getElementById('layer3Label');
    rel.parentElement.removeChild(rel);
}