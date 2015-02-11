/**
 * Created by USER on 14-8-15.
 */

Ext.define('YzMobile.controller.LandControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            main: 'main',
            info: 'main info',
            infofunction: '[itemId=infofunction]',

            landmain: 'info landmain',

            cloud: 'info cloud',
            cloudstart: '[itemId=cloudstart]',

            radar: 'info radar',
            radarstart: '[itemId=radarstart]'
        },

        control: {
            landmain: {
                itemtap: 'onLandMainTap'
            },
            cloudstart: {
                tap: 'onCloudStartTap'
            },
            radarstart: {
                tap: 'onRadarStartTap'
            }
        }
    },

    //气象国土列表页面初始化
    onLandInitialize: function(){
        var me = this;

        me.landmain = me.getLandmain();
        if(!me.landmain){
            me.landmain= Ext.create('YzMobile.view.land.LandMain');
        }
        me.getInfo().push(me.landmain);
        me.getMain().setActiveItem(me.getInfo());
    },

    onLandMainTap: function(list, index, target, record, e, eOpts ){

        var me = this;

        switch(record.data.title){
            case '卫星云图':
                me.onCloudInitialize();
                break;
            case '气象雷达':
                me.onRadarInitialize();
                break;
        }
    },

    onCloudInitialize: function(){
        var me = this;
        me.cloud = me.getCloud();
        if(!me.cloud){
            me.cloud= Ext.create('YzMobile.view.land.Cloud');
        }
        me.getInfofunction().hide();
        me.cloud.loadstore();
        me.getInfo().push(me.cloud);
    },

    onCloudStartTap: function() {
        var me = this;
        me.getCloud().clickStartToChangePic();
    },

    onRadarInitialize: function(){
        var me = this;
        me.radar = me.getRadar();
        if(!me.radar){
            me.radar= Ext.create('YzMobile.view.land.Radar');
        }
        me.getInfofunction().hide();
        me.radar.loadstore();
        me.getInfo().push(me.radar);
    },

    onRadarStartTap: function() {
        var me = this;
        me.getRadar().clickStartToChangePic();
    }
})