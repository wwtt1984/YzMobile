/**
 * Created by USER on 14-8-15.
 */


Ext.define('YzMobile.view.land.LandMain', {
    extend: 'Ext.List',
    xtype: 'landmain',


    config: {
        title: '气象国土',
        cls: 'setting',
        itemId: 'landmain',

        scrollable: false,
        grouped: false,
        ui: 'round',

        height: '80%',

        itemTpl: '<div>{title}<img src="resources/images/code3.png" style="height:18px;width:18px;margin:2px 0 0 0;float:right;"></div>',

        store: 'LandStore'
    }
});