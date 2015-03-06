/**
 * Created by USER on 14-8-14.
 */

/**
 * Created by USER on 14-8-14.
 */

Ext.define('YzMobile.controller.WaterControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            main: 'main',
            info: 'main info',
            infofunction: '[itemId=infofunction]',
            waterwarning: '[itemId=waterwarning]',

            water: 'info water',

            waterline: 'info waterline',
            waterview: 'water'
        },

        control: {
            water: {
                itemtap: 'onWaterItemTap'
            },
            waterview: {
                show: function () {
                    this.getWaterwarning().show();
                },
                hide: function () {
                    this.getWaterwarning().hide();
                }
            },
            waterwarning: {
                tap: 'onWarningTap'
            }
        }
    },

    onWaterInitialize: function () {
        var me = this;
        me.onWaterStoreLoad();

        me.water = me.getWater();
        if (!me.water) {
            me.water = Ext.create('YzMobile.view.water.Water');
        }
        me.getInfo().push(me.water);
        me.getMain().setActiveItem(me.getInfo());
    },

    /* 显示预警信息的弹窗 */
    onWarningTap: function () {

        var store = Ext.getStore('WaterStore')

        // 统计数据, 1, 24小时内降水超过30的, 以及最大的降雨测站
        var warning1h = 0, warning24h = 0, maxRain = 0;
        for (var i = 0; i < store.getCount(); i++) {
            var record = store.getAt(i);
            var num1h = parseFloat(record.get('rain1h'));
            var num24h = parseFloat(record.get('raintoday'));

            if (num1h > 30) warning1h++;
            if (num24h > 30) warning24h++;
            if (num24h > maxRain) maxRain = num24h;
        }

        // 将多个最大的降雨测站信息连接成字符串
        var maxStation = "";
        for (var j = 0; j < store.getCount(); j++) {
            var record2 = store.getAt(j);
            if (parseFloat(record2.get('raintoday')) == maxRain) {
                if (maxStation != "") maxStation += ", ";
                maxStation += record2.get('stnm') + "(" + record2.get('raintoday') + "mm)";
            }
        }

        // 拼接成要显示的html内容
        var html = '<h1 style="text-align: center; color: #ff0000">预警信息</h1><h2 style="font-size: 22px">当日最大降雨测站</h2><p style="font-size: 18px; color: deeppink; margin-left: 16px">' + maxStation +
            '</p><h2 style="font-size: 22px">24h超过30mm测站个数</h2><p style="font-size: 18px; color: deeppink; margin-left: 16px">' + warning24h + '个</p>' +
            '<h2 style="font-size: 22px">1h超过30mm测站个数</h2><p style="font-size: 18px; color: deeppink; margin-left: 16px">' + warning1h + '个</p>';


        if (!this.warnOverlay) {
            this.warnOverlay = Ext.Viewport.add({
                xtype: 'panel',
                width: '80%',
                height: '55%',
                modal: true,
                centered: true,
                hideOnMaskTap: true,
                scrollable: true,
                items: [
                    {
                        styleHtmlContent: true,
                        html: '<h1 style="text-align: center; color: #ff0000">预警信息</h1>' +
                        '<h2 style="font-size: 22px">最高水位:</h2><p style="font-size: 18px; color: deeppink; margin-left: 16px">皎口坝下  27.15(17.35)<br>皎口坝下  27.15(17.35)</p>' +
                        '<h2 style="font-size: 22px">24h超过警戒值测站个数</h2><p style="font-size: 18px; color: deeppink; margin-left: 16px">10个</p>' +
                        '<h2 style="font-size: 22px">1h超过警戒值测站个数</h2><p style="font-size: 18px; color: deeppink; margin-left: 16px">5个</p>'
                    }
                ]
            });
        }
        this.warnOverlay.show();
    },

    onWaterStoreLoad: function () {
        var store = Ext.getStore('WaterStore');

        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetSqInfo'
        });

        store.load(function (records, operation, success) {
            if (!success) {
                plugins.Toast.ShowToast("网络不给力，无法读取数据!", 3000);
            }
            Ext.Viewport.setMasked(false);
        }, this);
    },

    onWaterItemTap: function (list, index, target, record, e, eOpts) {
        Ext.Viewport.setMasked({xtype: 'loadmask', message: '正在加载中...'});
        var me = this;
        me.waterline = me.getWaterline();
        if (!me.waterline) {
            me.waterline = Ext.create('YzMobile.view.water.WaterLine');
        }

        var date = Ext.Date.format(new Date(), 'Y-m-d').toString();

        me.stcd = record.data.stcd;
        me.stnm = record.data.stnm;
        me.onWaterDetailLoad(record, date);

    },

    onWaterBarAdd: function () {
        var me = this;
        me.getInfofunction().hide();
        me.getApplication().getController('MainControl').getInfosearch().show();
        me.getInfo().push(me.waterline);
    },

    onWaterDetailLoad: function (record, date, index) {
        var me = this;
        var store = Ext.getStore('RainDetailStore');

        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetStDaySW',
            results: record.data.stcd + '$' + date
        });

        store.loadPage(1, {
            callback: function (records, operation, success) {
                if (!success) {
                    plugins.Toast.ShowToast("网络不给力，无法读取数据!", 3000);
                }
                else {
                    me.waterline.SelectLineValue(record, date);
                    me.onWaterBarAdd();
                }
                Ext.Viewport.setMasked(false);
            },
            scope: this
        });
//        store.load(function(records, operation, success) {
//            if(!success)
//            {
//                plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
//            }
//            else{
//                me.waterline.SelectLineValue(record, date);
//                me.onWaterBarAdd();
//            }
//            Ext.Viewport.setMasked(false);
//
//        }, this);
    },

    onWaterDayDetailLoad: function (start, end) {
        Ext.Viewport.setMasked({xtype: 'loadmask', message: '正在加载中...'});
        var me = this;
        var store = Ext.getStore('RainDetailStore');

        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetStSdSW',
            results: me.stcd + '$' + start + '$' + end
        });

        store.load(function (records, operation, success) {
            if (!success) {
                plugins.Toast.ShowToast("网络不给力，无法读取数据!", 3000);
            }
            else {
                me.getWaterline().onWaterDayDetailValue(start + '至' + end, store);
            }
            Ext.Viewport.setMasked(false);

        }, this);
    }

})