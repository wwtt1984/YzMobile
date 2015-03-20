/**
 * Created by kukiss on 2015/3/11 0011.
 */
Ext.define('YzMobile.controller.ProjectMenuControl', {
    extend: 'Ext.app.Controller',

    initialize: function () {
        this.partType = ''; // 区分是加载水库还是其他
    },

    config: {
        refs: {
            main: 'main',
            info: 'main info',
            projectMenu: 'projectmenu',
            infofunction: '[itemId=infofunction]', // 返回主页面按钮
            modelSearch: '[itemId=modelsearch]', // 搜索水库,大坝等模块
            projectMenuPart: 'projectMenuPart',
            search: 'search' // 搜索页面
        },

        control: {
            projectMenu: {
                itemtap: 'loadSks',
                show: function () {
                    this.getModelSearch().show();
                },
                hide: function () {
                    this.getModelSearch().hide();
                }
            },

            modelSearch: {
                tap: function () {
                    this.getInfo().push(Ext.create('YzMobile.view.project.Search'));
                }
            },

            projectMenuPart: {
                initialize: function (list, eOpts) {
                    Ext.Viewport.setMasked({xtype: 'loadmask', message: '加载中,请稍后...'});
                    this.store = Ext.getStore('ProjectMenuPartStore');
                    this.store.removeAll();
                    this.store.getProxy().setExtraParams({
                        t: 'GetProjects',
                        results: this.partType
                    });

                    this.store.load(function (records, operation, success) {
                        if (!success) {
                            plugins.Toast.ShowToast("网络不给力，无法读取数据!", 3000);
                        }
                        Ext.Viewport.setMasked(false);
                    }, this);

                    var title = '';
                    switch (this.partType) {
                        case 'sk':
                            title = '水库信息';
                            break;
                        case 'sz':
                            title = '水闸信息';
                            break;
                        case 'df':
                            title = '提防信息';
                            break;
                        case 'yb':
                            title = '堰坝信息';
                            break;
                        case 'sdz':
                            title = '水电站信息';
                            break;
                        case 'st':
                            title = '山塘信息';
                            break;
                    }
                    this.getProjectMenuPart().setTitle(title);
                },

                itemtap: function (list, index, target, record, e, eOpts) {
                    var detail = Ext.create('YzMobile.view.project.ProjectMenuDetail');
                    detail.onDataSet(record, record.data.RSNM);
                    this.getInfo().push(detail);
                }
            },

            search: {
                initialize: function () {
                    this.getInfofunction().hide();

                    var store = Ext.getStore('SearchStore');
                    store.getProxy().setExtraParams({
                        t: 'GetProjectsSearch'
                    });
                    store.load(function (records, operation, success) {
                        if (!success) {
                            plugins.Toast.ShowToast("网络不给力，无法读取数据!", 3000);
                        }
                        Ext.Viewport.setMasked(false);
                    }, this);
                },

                itemtap: function (list, index, target, record, e, eOpts) {
                    var detail = Ext.create('YzMobile.view.project.ProjectMenuDetail');
                    detail.onDataSet(record, record.data.rsnm);
                    this.getInfo().push(detail);
                }
            }

        }
    },

    loadSks: function (list, index, target, record, e, eOpts) {
        this.getInfofunction().hide();
        switch (index) {
            case 0:
                this.partType = 'sk';
                var view = Ext.create('YzMobile.view.project.ProjectMenuPart');
                this.getInfo().push(view);
                break;
            case 1:
                this.partType = 'sz';
                var view = Ext.create('YzMobile.view.project.ProjectMenuPart');
                this.getInfo().push(view);
                break;
            case 2:
                this.partType = 'df';
                var view = Ext.create('YzMobile.view.project.ProjectMenuPart');
                this.getInfo().push(view);
                break;
            case 3:
                this.partType = 'yb';
                this.getInfofunction().show();
                Ext.Msg.alert('暂无堰坝记录');
                //var view = Ext.create('YzMobile.view.project.ProjectMenuPart');
                //this.getInfo().push(view);
                break;
            case 4:
                this.partType = 'sdz';
                var view = Ext.create('YzMobile.view.project.ProjectMenuPart');
                this.getInfo().push(view);
                break;
            case 5:
                this.partType = 'st';
                var view = Ext.create('YzMobile.view.project.ProjectMenuPart');
                this.getInfo().push(view);
                break;

        }
    }
});