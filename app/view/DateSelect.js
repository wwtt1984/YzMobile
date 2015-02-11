/**
 * Created by USER on 14-8-14.
 */

Ext.define('YzMobile.view.DateSelect',{

    extend: 'Ext.form.Panel',
    xtype: 'dateselect',

    requires: [
        'Ext.XTemplate'
    ],

    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },

        modal: true,
        centered: false,
        hideOnMaskTap: true,

        ui: 'detail',
        width: '100%',

        bottom: 0,
        right: 0,

        style: 'background:#f7f7f7;',

        items:[
            {
                xtype: 'toolbar',
                ui: 'light',
                style: 'height:1.6em;font-size:14px;',
                title: '请选择时间段'
            },
            {
                xtype: 'fieldset',
                items: [
                    {
                        xtype: 'datepickerfield',
                        label: '开始时间',
                        name: 'startdate',
                        itemId: 'startdate',
                        value: Ext.Date.add(new Date(),Ext.Date.DAY,-1)
                    },
                    {
                        xtype: 'datepickerfield',
                        itemId: 'enddate',
                        label: '结束时间',
                        name: 'enddate',
                        value: new Date()
                    }
                ]
            },
            {
                xtype : 'button',
                style: 'min-height: 2.2em;',
                cls   : 'demobtn',
                margin: 10,
                text: '确定',
                itemId:  'dateconfirm'
            }
        ]

    }

//    onDataSet: function(record){
//        this.setData({stitle: record.location, detail: record.detail});
//    }
});