/**
 * Created by USER on 14-8-15.
 */

Ext.define('YzMobile.store.LandStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'YzMobile.model.LandModel',
        data:[
            {id: '01', name: 'wxyt', title: '卫星云图'},
            {id: '02', name: 'qxld', title: '气象雷达'}
        ],

        autoLoad: true
    }
});