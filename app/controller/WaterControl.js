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

            water: 'info water',

            waterline: 'info waterline'
        },

        control: {
            water: {
                itemtap: 'onWaterItemTap'
            }
        }
    },

    onWaterInitialize: function(){
        var me = this;
        me.onWaterStoreLoad();

        me.water = me.getWater();
        if(!me.water){
            me.water= Ext.create('YzMobile.view.water.Water');
        }
        me.getInfo().push(me.water);
        me.getMain().setActiveItem(me.getInfo());
    },

    onWaterStoreLoad: function(){
        var store = Ext.getStore('WaterStore');

        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetSqInfo'
        });

        store.load(function(records, operation, success) {
            if(!success)
            {
                plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
            }
            Ext.Viewport.setMasked(false);
        }, this);
    },

    onWaterItemTap: function(list, index, target, record, e, eOpts){
        Ext.Viewport.setMasked({xtype:'loadmask',message:'正在加载中...'});
        var me = this;
        me.waterline = me.getWaterline();
        if(!me.waterline){
            me.waterline= Ext.create('YzMobile.view.water.WaterLine');
        }

        var date = Ext.Date.format(new Date(), 'Y-m-d').toString();

        me.stcd = record.data.stcd;
        me.stnm = record.data.stnm;
        me.onWaterDetailLoad(record, date);

    },

    onWaterBarAdd: function(){
        var me = this;
        me.getInfofunction().hide();
        me.getApplication().getController('MainControl').getInfosearch().show();
        me.getInfo().push(me.waterline);
    },

    onWaterDetailLoad: function(record, date, index){
        var me = this;
        var store = Ext.getStore('RainDetailStore');

        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetStDaySW',
            results: record.data.stcd + '$' + date
        });

        store.loadPage(1,{
            callback: function(records, operation, success) {
                if(!success)
                {
                    plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
                }
                else{
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

    onWaterDayDetailLoad: function(start, end){
        Ext.Viewport.setMasked({xtype:'loadmask',message:'正在加载中...'});
        var me = this;
        var store = Ext.getStore('RainDetailStore');

        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetStSdSW',
            results: me.stcd + '$' + start + '$' + end
        });

        store.load(function(records, operation, success) {
            if(!success)
            {
                plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
            }
            else{
                me.getWaterline().onWaterDayDetailValue(start + '至' + end, store);
            }
            Ext.Viewport.setMasked(false);

        }, this);
    }

})