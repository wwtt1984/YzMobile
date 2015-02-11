/**
 * Created by USER on 14-8-14.
 */

Ext.define('YzMobile.controller.RainControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            main: 'main',
            info: 'main info',
            infofunction: '[itemId=infofunction]',

            rain: 'info rain',

            rainbar: 'info rainbar'
        },

        control: {
            rain: {
                itemtap: 'onRainItemTap'
            }
        }
    },

    onRainInitialize: function(){
        var me = this;
        me.onRainStoreLoad();

        me.rain = me.getRain();
        if(!me.rain){
            me.rain= Ext.create('YzMobile.view.rain.Rain');
        }
        me.getInfo().push(me.rain);
        me.getMain().setActiveItem(me.getInfo());
    },

    onRainStoreLoad: function(){

        var store = Ext.getStore('RainStore');

        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetYqInfo'
        });

        store.load(function(records, operation, success) {
            if(!success)
            {
                plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
            }
            Ext.Viewport.setMasked(false);
        }, this);
    },

    onRainItemTap: function(list, index, target, record, e, eOpts){

        Ext.Viewport.setMasked({xtype:'loadmask',message:'正在加载中...'});
        var me = this;
        me.rainbar = me.getRainbar();
        if(!me.rainbar){
            me.rainbar= Ext.create('YzMobile.view.rain.RainBar');
        }

        var date = Ext.Date.format(new Date(), 'Y-m-d').toString();

        me.stcd = record.data.stcd;
        me.stnm = record.data.stnm;
        me.onRainDetailLoad(record, date);

    },

    onRainBarAdd: function(){
        var me = this;
        me.getInfofunction().hide();
        me.getApplication().getController('MainControl').getInfosearch().show();
        me.getInfo().push(me.rainbar);
    },

    onRainDetailLoad: function(record, date, index){
        var me = this;
        var store = Ext.getStore('RainDetailStore');

        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetStDayYL',
            results: record.data.stcd + '$' + date
        });

        store.loadPage(1,{
            callback: function(records, operation, success) {
                if(!success)
                {
                    plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
                }
                else{
                    me.rainbar.SelectBarValue(record, date);
                    me.onRainBarAdd();
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
//                me.rainbar.SelectBarValue(record, date);
//                me.onRainBarAdd();
//            }
//            Ext.Viewport.setMasked(false);
//
//        }, this);
    },

    onRainDayDetailLoad: function(start, end){
        Ext.Viewport.setMasked({xtype:'loadmask',message:'正在加载中...'});
        var me = this;
        var store = Ext.getStore('RainDetailStore');

        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetStDayLjYl',
            results: me.stcd + '$' + start + '$' + end
        });

        store.load(function(records, operation, success) {
            if(!success)
            {
                plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
            }
            else{
                me.getRainbar().onRainDayDetailValue(start + '至' + end, store);
            }
            Ext.Viewport.setMasked(false);

        }, this);
    }

})