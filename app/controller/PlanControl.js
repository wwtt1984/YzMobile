/**
 * Created by kukiss on 2015/3/19 0019.
 */
Ext.define('YzMobile.controller.PlanControl', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: 'main',
            info: 'main info',
            planSearch: 'planSearch',
            planSearchBtn: '[itemId=planSearch]'
        },

        control: {
            planSearch: {
                initialize : function() {
                    Ext.Viewport.setMasked({xtype: 'loadmask', message: '加载中,请稍后...'});
                    Ext.getStore('PlanSearchStore').load(function (records, operation, success) {
                        if (!success) {
                            plugins.Toast.ShowToast("网络不给力，无法读取数据!", 3000);
                        }
                        Ext.Viewport.setMasked(false);
                    }, this);
                }
            },
            planSearchBtn: {
                tap: function () {
                    if (this.getInfo() == null) {
                        this.getMain().setActiveItem(Ext.create('YzMobile.view.Info'));
                    }
                    this.getInfo().push(Ext.create('YzMobile.view.plan.PlanSearch'));
                    this.getMain().setActiveItem(this.getInfo());
                }
            }
        }
    }

});