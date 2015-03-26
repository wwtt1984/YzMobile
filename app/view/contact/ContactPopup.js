/**
 * Created by kukiss on 2015/3/25 0025.
 */
Ext.define('YzMobile.view.contact.ContactPopup', {
    extend: 'Ext.Panel',
    xtype: 'contactPopup',

    requires: [
    ],

    config: {
        modal: true,
        centered: false,
        hideOnMaskTap: true,
        height:'40%',
        scrollable: true,

        ui: 'detail',

        // we always want the sheet to be 400px wide and to be as tall as the device allows
        width: '100%',
//        top: '48%',
        bottom: 0,
        right: 0,

        defaults: {
            xtype : 'button',
            style: 'min-height:1.8em; max-height: 2em;width:94%;margin:10px 3% 10px 3%;',
            cls   : 'demobtn',
            flex  : 1
        },
        layout: {
            type: 'vbox',
            align: 'middle'
        },
        items: [
            {
                text: '长号',
                itemId:  'fullnum'
            },
            {
                text: '短号',
                itemId:  'shortnum'
            },
            {
                text: '办公号码',
                itemId:  'officenum'
            },
            {
                text: '取消',
                itemId:  'numcancel'
            }]
    },

    onDataSet: function(record) {

        this.onButtonSet(Ext.ComponentQuery.query('#fullnum')[0], record.data.mobile);
        this.onButtonSet(Ext.ComponentQuery.query('#shortnum')[0], record.data.pager);
        this.onButtonSet(Ext.ComponentQuery.query('#officenum')[0], record.data.telephonenumber);

    },

    onButtonSet: function(button, text){

        if(text != 'null'){
            button.setText(text);
            button.show();
        }
        else{
            button.hide();
        }
    }
});
