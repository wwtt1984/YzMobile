/**
 * Created by USER on 14-7-14.
 */

Ext.define('YzMobile.view.gis.GisMain', {
    extend: 'Ext.Container',
    xtype: 'gismain',

    requires: [
        'YzMobile.view.gis.GMap'
    ],

    config: {
        itemId: 'gismain',
        title: 'GIS地图应用',
        layout: 'fit',

        items: [
            {
                xclass: 'YzMobile.view.gis.GisTitle',
                style: 'position:absolute;width:100%;top:0px;height:30px;left:0px;right:0px;padding:0px 0px 0px 0px;background:#fff;'

            },
            {
                xclass: 'YzMobile.view.gis.GMap',
                style: 'position:absolute;margin-top:30px;'
            }
        ]
    }

});