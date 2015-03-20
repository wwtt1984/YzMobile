/**
 * Created by kukiss on 2015/3/9 0009.
 */
Ext.define('YzMobile.store.ProjectMenuStore', {
    extend: 'Ext.data.Store',
    requires: [
        'YzMobile.model.ProjectMenuModel'
    ],

    config: {
        model: 'YzMobile.model.ProjectMenuModel',

        data: [
            {id: '01', name: 'rain', title: '水库', url: 'resources/icons/水库.png'},
            {id: '02', name: 'rain', title: '水闸', url: 'resources/icons/闸门.png'},
            {id: '03', name: 'rain', title: '提防', url: 'resources/icons/闸门.png'},
            {id: '04', name: 'rain', title: '堰坝', url: 'resources/images/function/rain.png'},
            {id: '05', name: 'rain', title: '水电站', url: 'resources/images/function/rain.png'},
            {id: '06', name: 'norain', title: '山塘', url: 'resources/images/function/rain.png'}
        ],

        autoLoad: true

    }
});