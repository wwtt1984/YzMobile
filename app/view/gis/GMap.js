/**
 * Created by USER on 14-7-15.
 */

Ext.define('YzMobile.view.gis.GMap', {
//    id: 'TfMap',
    extend: 'Ext.Map',
    xtype: 'gmap',


    config: {
        itemId: 'gmap',
//        margin: '25px 0 0 0'
        height: '100%'

    },

    ssss: function () {
        var me = this;
        me.map = me.getMap();
        me.map.setCenter(new google.maps.LatLng(YzMobile.app.mapCenter[0], YzMobile.app.mapCenter[1]));
        me.map.setZoom(10);

        setTimeout(function () {
            me.map.setCenter(new google.maps.LatLng(YzMobile.app.mapCenter[0], YzMobile.app.mapCenter[1]));
        }, 1000);
    },

    onWaterRainStoreLoad: function () {
        var me = this;

        var store = Ext.getStore('WaterRainStore');
        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetGisInfo'
        });

        store.load(function (records, operation, success) {
            if (!success) {
                plugins.Toast.ShowToast("网络不给力，无法读取数据!", 3000);
                Ext.Viewport.setMasked(false);
            }
            else {
                me.addpolyline(store);
            }
        }, this);
    },

    //生成台风路径以及台风数据点上的提示信息
    addpolyline: function (store) {
        Ext.Viewport.setMasked({xtype: 'loadmask', message: '正在加载中...'});
        var me = this;

        var record, marker;

        var flightPlanCoordinates = [];
        var time = [];
        me.makerarr0 = []; //markers集合
        me.makerarr1 = []; //markers集合
        me.makerarr2 = []; //markers集合
        var image;


        for (var i = 0; i < store.getAllCount(); i++) {

            record = store.getAt(i);
            flightPlanCoordinates.push(new google.maps.LatLng(record.get('wd'), record.get('jd')));

            switch (record.data.type) {

                case '水位站':
                    me.onWaterStationShow(record, me);
                    break;
                case '雨量站':
                    me.onRainStationShow(record, me);
                    break;
                case  '水位雨量站':
                    me.onWaterRainStationShow(record, me);
                    break;
            }
        }
        me.map.setCenter(new google.maps.LatLng(YzMobile.app.mapCenter[0], YzMobile.app.mapCenter[1]));
        Ext.Viewport.setMasked(false);
    },

    onWaterStationShow: function (record, me) {
        var flightPlanCoordinates = new google.maps.LatLng(record.get('wd'), record.get('jd'));
        var time = "测站：" + record.get('stnm') + "<br>水位：" + record.get('water') + "米" + "<br>雨量：" + record.get('rain') + "毫米" + "<br>测站类型：" + record.get('type');
        var image = 'resources/images/gis/y.png';

        var marker = new google.maps.Marker({
            position: flightPlanCoordinates,
            map: me.getMap(),
            visible: true,
            optimized: false,
            icon: image,
            title: record.get('stcd')
        });

        me.makerarr0.push(marker);

//        debugger;
        me.infowindow(marker, time);

    },

    onRainStationShow: function (record, me) {
        var flightPlanCoordinates = new google.maps.LatLng(record.get('wd'), record.get('jd'));
        var time = "测站：" + record.get('stnm') + "<br>水位：" + record.get('water') + "米" + "<br>雨量：" + record.get('rain') + "毫米" + "<br>测站类型：" + record.get('type');
        var image = 'resources/images/gis/s.png';

        var marker = new google.maps.Marker({
            position: flightPlanCoordinates,
            map: me.getMap(),
            visible: true,
            optimized: false,
            icon: image,
            title: record.get('stcd')
        });

        me.makerarr1.push(marker);

//        debugger;
        me.infowindow(marker, time);

    },

    onWaterRainStationShow: function (record, me) {
        var flightPlanCoordinates = new google.maps.LatLng(record.get('wd'), record.get('jd'));
        var time = "测站：" + record.get('stnm') + "<br>水位：" + record.get('water') + "米" + "<br>雨量：" + record.get('rain') + "毫米" + "<br>测站类型：" + record.get('type');
        var image = 'resources/images/gis/sk.png';

        var marker = new google.maps.Marker({
            position: flightPlanCoordinates,
            map: me.getMap(),
            visible: true,
            optimized: false,
            icon: image,
            title: record.get('stcd')
        });

        me.makerarr2.push(marker);

//        debugger;
        me.infowindow(marker, time);

    },


//弹出提示信息
    infowindow: function (marker, content) {

        var me = this;
        var infowindow = new google.maps.InfoWindow(
            {
                content: content,
                size: new google.maps.Size(50, 50)
            });
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(me.getMap(), marker);
        });
    },

    onStationHide: function (makerarr) {
        var me = this;
        for (var i in makerarr) {
            makerarr[i].setMap(null);
        }
    },

    onStationShow: function (makerarr) {
        var me = this;
        for (var i in makerarr) {
            makerarr[i].setMap(me.map);
        }
    }
});