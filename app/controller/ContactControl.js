/**
 * Created by kukiss on 2015/3/19 0019.
 */
Ext.define('YzMobile.controller.ContactControl', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: 'main',
            info: 'main info',
            contactSearch: 'contactSearch', // 通讯录搜索界面
            backBtn: '[itemId=backBtn]', // 通讯录的返回按钮
            contactSearchBtn: '[itemId=contactSearch]' // 跳转到通讯录搜索的按钮
        },

        control: {
            backBtn: {
                tap: function () {
                    this.getMain().setActiveItem(1); // 返回上一个界面
                }
            },

            contactSearchBtn: {
                tap: function () {
                    if (this.getInfo() == null) {
                        this.getMain().setActiveItem(Ext.create('YzMobile.view.Info'));
                    }
                    this.getInfo().push(Ext.create('YzMobile.view.contact.ContactSearch'));
                    this.getMain().setActiveItem(this.getInfo());
                }
            },

            contactSearch: {
                initialize: function () {
                    // 初始化通讯录用的store
                    Ext.Viewport.setMasked({xtype: 'loadmask', message: '加载中,请稍后...'});
                    Ext.getStore('ContactSearchStore').load(function (records, operation, success) {
                        if (!success) {
                            plugins.Toast.ShowToast("网络不给力，无法读取数据!", 3000);
                        }
                        Ext.Viewport.setMasked(false);
                    }, this);
                }
            }
        }
    }

});