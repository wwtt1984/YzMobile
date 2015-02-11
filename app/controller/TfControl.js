/**
 * Created by USER on 14-7-12.
 */

Ext.define('YzMobile.controller.TfControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            main: 'main',
            info: 'main info',
            infofunction: '[itemId=infofunction]',
            tfmap: '[itemId=tfmap]',
            tfmain: 'info tfmain',
            tflist: 'info tflist'
        },

        control: {
            tflist: {
                itemtap: 'onTfListItemTap'
            }
        }
    },

    onTyphoonInitialize: function(){

        var me = this;

        me.tfmain = me.getTfmain();

        if(!me.tfmain){
            me.tfmain = Ext.create('YzMobile.view.typhoon.TfMain');
        }

        me.mytflist();

        me.getApplication().getController('MainControl').getInfosearch().show();

    },

    //取得台风数据(年份列表)
    mytflist: function() {
        var me = this;
        var store = Ext.getStore('TfStore');
        store.getProxy().setExtraParams({
            t: 'GetTFzt'
        });
        var tfbh = null, tfname = null, tfactive = null;
        store.load(function(records, operation, success) {
            if (store.getCount() > 0) {
                tfbh = store.getAt(0).get('tfbh');
                tfname = store.getAt(0).get('tfname');
                tfactive = store.getAt(0).get('tfactive');

                me.tfmain.setTitle(tfname + "（" + tfbh + "）");
                me.getInfo().push(me.tfmain);
                me.getMain().setActiveItem(me.getInfo());

                me.tfname = tfname;
                me.tfbh = tfbh;
                me.getTfmap().mydate(tfname,tfbh,tfactive);
//            this.getTfForecast();
            }
            else
            {
                alert("该年到当前暂无台风!");
            }
        }, this);

    },

    onTfListShow: function() {
        var me = this;

        me.tflist = me.getTflist();

        if(!me.tflist){
            me.tflist = Ext.create('YzMobile.view.typhoon.TfList');
        }
        me.getInfofunction().hide();
        me.getApplication().getController('MainControl').getInfosearch().hide();
        me.getInfo().push(me.tflist);

    },

    onTfListItemTap: function(list, index, target, record, e, eOpts){
        var me = this;

        me.tfname = record.data.tfname;
        me.tfbh = record.data.tfbh;

//        me.tfmain.setTitle(record.data.tfname + "（" + record.data.tfbh + "）");
        me.getInfofunction().show();
        me.getApplication().getController('MainControl').getInfosearch().show();
        me.getTfmap().reloadtfsj(record);
        me.getInfo().pop();
        me.getInfo().getNavigationBar().setTitle(record.data.tfname + "（" + record.data.tfbh + "）");
    },

    onTitleBarSet: function(){
        var me = this;
        me.getInfo().getNavigationBar().setTitle(me.tfname + "（" + me.tfbh + "）");
    }
})