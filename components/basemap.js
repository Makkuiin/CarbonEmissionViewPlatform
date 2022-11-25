// 加载OSM底图 item(0)
var map = new ol.Map({
    target: 'mapW', // 与div盒子绑定
    layers: [ // 图层容器，可包含多个图层，数组形式放置
        new ol.layer.Tile({ // 新建一个图层
            source: new ol.source.OSM(), // 新建OSM数据，放置在图层
        })
    ],
    view: new ol.View({ // 视图，渲染图层
        projection: 'EPSG:3857',
        center: ol.proj.fromLonLat([108.5, 34]), // 地图中心点（西安）
        zoom: 4.2, // 缩放级数
    })
})


// 要素样式
var lAdminStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.1)'
    }), // 矢量图层填充颜色
    stroke: new ol.style.Stroke({
        color: '#6495ed',
        width: 1
    })
})




// 加载行政区边界矢量图 item(1)
map.addLayer(
    new ol.layer.Vector({
        source: new ol.source.Vector({
            projection: 'EPSG:4326',
            url: "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json",
            format: new ol.format.GeoJSON()
        }),
        style: lAdminStyle
    })
)


// 显示坐标和要素
map.on('pointermove', function(evt) {
    //获取点击要素的位置coordinate[0]为精度coordinate[1]为纬度
    var coordinate = evt.coordinate;
    
    // 显示坐标到对应div中
    var mcoor = ol.proj.toLonLat([coordinate[0], coordinate[1]]);
    document.getElementById('mouseCoordinate').innerHTML = mcoor[0].toFixed(3) + ' ' + mcoor[1].toFixed(3);

    // 判断当前单击处是否有要素，捕获到要素时弹出popup
    // var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layerVetor) { return feature; });
    
    // if (feature) { //捕捉到要素
    //     // featuerInfo = feature.getProperties().features[0].N.attribute;
    //     //feature.style.Fill.color = 'rgba(255, 255, 255, 0.5)';
    //     //feature.setStyle(lAdminStyleChecked);
    // }
})


// 选择要素-省份
map.on('click', function(evt) {    
    var coordinate = evt.coordinate;   
    var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layerVetor) { return feature; });    
    if (feature) { //捕捉到要素
        console.log(ol.proj.toLonLat([coordinate[0], coordinate[1]]) + ' ' + feature.get('name'));
        var selectedAdcode = feature.get('adcode');
        baseTable(feature, selectedAdcode, YEAR); // 显示基本信息
        ceLineGraph(selectedAdcode, YEAR); // 绘制折线图
    }
})





