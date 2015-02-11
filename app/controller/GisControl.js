/**
 * Created by USER on 14-8-15.
 */

Ext.define('YzMobile.controller.GisControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            main: 'main',
            info: 'main info',
            infofunction: '[itemId=infofunction]',

//            gismap: 'info gismap'
            gismain: 'info gismain',
            gmap: '[itemId=gmap]',
            gistitle: '[itemId=gistitle]'
        },

        control: {
        }
    },

    //Gis页面初始化
    onGisMapInitialize: function(){

        var me = this;

        me.gismain = me.getGismain();
        if(!me.gismain){
            me.gismain = Ext.create('YzMobile.view.gis.GisMain');
        }
        me.getGistitle().setData([]);
        me.getGmap().onWaterRainStoreLoad();
        me.getInfo().push(me.gismain);
        me.getMain().setActiveItem(me.getInfo());
    }
})