/**
 * Created by USER on 14-4-28.
 */

Ext.define('YzMobile.view.rain.Rain', {
    extend: 'Ext.List',
    xtype: 'rain',

    requires: [
        'Ext.plugin.PullRefresh',
        'Ext.plugin.ListPaging'
    ],

    config: {

        title: '雨情信息',

        loadingText: false,
        scrollToTopOnRefresh: false,

        masked: {
            xtype: 'loadmask',
            message: '努力加载中...'
        },

        plugins: [
            {
                xclass: 'Ext.plugin.ListPaging',
                loadMoreText: '加载更多...',
                noMoreRecordsText: '没有更多记录了...',
                autoPaging: true
            },
            {
                xclass: 'Ext.plugin.PullRefresh',
                pullText: '下拉刷新...',

                releaseText: '松开进行刷新...',

                loadingText: '正在刷新...',

                loadedText: '刷新完成.',

                lastUpdatedText: '刷新时间:&nbsp;'
            }
        ],

        cls: 'tidelist',
        store: 'RainStore',

        emptyText: '<p class="no-searches">没有符合要求的记录</p>',

        itemTpl: [
            '<div style="width:31%;font-size:18px;line-height:2.2em;text-align:center;padding:0;margin:0;' +
            'float:left;overflow:hidden;text-overflow: clip;white-space: nowrap;">{stnm}</div>',
            '<div style="width:23%;font-size:18px;line-height:2.2em;text-align:center;padding:0;margin:0;float:left;">{[this.getContent(values.rain1h, 1)]}</div>',
            '<div style="width:23%;font-size:18px;line-height:2.2em;text-align:center;padding:0;margin:0;float:left;">{[this.getContent(values.rain3h, 2)]}</div>',
            '<div style="width:23%;font-size:18px;line-height:2.2em;text-align:center;padding:0;margin:0;float:right;">{[this.getContent(values.raintoday, 3)]}</div>',
            {

                // 将降雨超标的红色加粗显示
                getContent: function (value, type) {
                    if (value == "") {
                        return "--";
                    }
                    switch (type) {
                        case 1:
                            if (parseFloat(value) > 30) return '<span style="color: #ff0000; font-weight: 600;" >' + value + '</span>';
                            else return value;
                            break;
                        case 2:
                            return value;
                            break;
                        case 3:
                            if (parseFloat(value) > 30) return '<span style="color: #ff0000; font-weight: 600;" >' + value + '</span>';
                            else return value;
                            break;
                    }
                }
            }
        ],

        items: [
            //{
            //    xtype: 'toolbar',
            //    title:'name',
            //    docked: 'top'
            //},
            {
                docked: 'top',
                xtype: 'panel',
                cls: 'tide-header',
                html: '<div style="width:31%;height:100%;float:left;">测站</div>' +
                '<div style="width:23%;height:100%;float:left;">1小时</div>' +
                '<div style="width:23%;height:100%;float:left;">3小时</div>' +
                '<div style="width:23%;height:100%;float:left;">今日</div>'
            }
        ]
    }
});