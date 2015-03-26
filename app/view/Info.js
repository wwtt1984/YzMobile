Ext.define('YzMobile.view.Info', {
    extend: 'Ext.navigation.View',
    xtype: 'info',

    requires: [],
    config: {

        navigationBar: {
            ui: 'light',
            layout: 'fit',
            items: [
                {
                    xtype: 'button',
                    itemId: 'infofunction',
                    ui: 'back',
                    text: '主页面'
                },
                {
                    xtype: 'button',
                    itemId: 'infosearch',
                    ui: 'plain',
//                    docked: 'right',
                    right: 0,
                    iconCls: 'search',
                    iconMasked: true,
                    hidden: true
                },
                {
                    xtype: 'button',
                    itemId: 'locationconfirm',
                    text: '确定',
//                    docked: 'right',
                    right: 0,
                    hidden: true
                },
                {
                    xtype: 'button',
                    itemId: 'uploadall',
                    text: '全部上传',
//                    docked: 'right',
                    right: 0,
                    hidden: true
                },
                {
                    xtype: 'button',
                    itemId: 'rainwarning',
                    text: '降雨预警',
                    right: 0,
                    hidden: true
                },
                {
                    xtype: 'button',
                    itemId: 'waterwarning',
                    text: '水位预警',
                    right: 0,
                    hidden: true
                },
                {
                    xtype: 'button',
                    itemId: 'modelsearch', // 搜索水库,大坝等模块
                    ui: 'plain',
                    iconCls: 'search',
                    right: 0,
                    hidden: true
                },
                {
                    xtype: 'button',
                    itemId: 'showplace', // 显示站点
                    text: '筛选',
                    right: 0,
                    hidden: true
                }
            ]
        },

        itemId: 'info',

        defaultBackButtonText: '返回'
    },

    onImageShow: function (values) {
        this.view = this.down('newsimg');
        if (!this.view) {
            this.view = Ext.create('YzMobile.view.mark.NewsImg');
        }

        this.view.onImgDataSet(values);

        if (!this.view.getParent()) {
            Ext.Viewport.add(this.view);
        }
        this.view.show();
    },

    onViewHide: function () {
        this.view.hide();
        this.view.destroy();
    },

    onPhotoShow: function (id, index) {
        this.view = this.down('newsimg');
        if (!this.view) {
            this.view = Ext.create('YzMobile.view.mark.NewsImg');
        }

        this.view.onPhotoDataSet(id, index);

        if (!this.view.getParent()) {
            Ext.Viewport.add(this.view);
        }
        this.view.show();
    },

    onPhotoDelete: function () {
        this.view.onPhotoDelete();
    }
});
