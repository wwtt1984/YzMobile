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
            gistitle: '[itemId=gistitle]',
            showplace: '[itemId=showplace]' // 选择显示站点的按钮
        },

        control: {
            gismain: {
                show: function () {
                    this.getShowplace().show();
                },
                hide: function () {
                    this.getShowplace().hide();
                }
            },

            showplace: {
                tap: function () {
                    // 筛选地图上需要显示的站点
                    Ext.create('Ext.Panel', {
                        layout: {
                            type: 'vbox',
                            aligh: 'end'
                        },
                        left: 0,
                        padding: 10,
                        width: '50%',
                        height: '40%',
                        modal: true,
                        hideOnMaskTap: true,
                        scrollable: true,
                        items: [
                            {
                                xtype: 'panel',
                                layout: {type: 'hbox', aligh: 'center'},
                                items: [{html: '雨量站'}, {xtype: 'checkboxfield'}]
                            },
                            {
                                xtype: 'panel',
                                layout: {type: 'hbox', aligh: 'center'},
                                items: [{html: '水位站'}, {xtype: 'checkboxfield'}]
                            },
                            {
                                xtype: 'panel',
                                layout: {type: 'hbox', aligh: 'center'},
                                items: [{html: '水位雨量站'}, {xtype: 'checkboxfield'}]
                            }
                        ]
                    }).showBy(this.getShowplace());
                }
            }
        }
    },

    //Gis页面初始化
    onGisMapInitialize: function () {

        var me = this;

        me.gismain = me.getGismain();
        if (!me.gismain) {
            me.gismain = Ext.create('YzMobile.view.gis.GisMain');
        }
        me.getGistitle().setData([]);
        me.getGmap().onWaterRainStoreLoad();
        me.getInfo().push(me.gismain);
        me.getMain().setActiveItem(me.getInfo());
    }
})