/**
 * Created by USER on 14-5-4.
 */

Ext.define('YzMobile.view.water.Water', {
    extend: 'Ext.List',
    xtype: 'water',

    requires: [
        'Ext.plugin.PullRefresh',
        'Ext.plugin.ListPaging'
    ],

    config: {

        title: '水情信息',

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
                autoPaging:true
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
        store: 'WaterStore',

        emptyText: '<p class="no-searches">没有符合要求的记录</p>',

        itemTpl: [
            '<div style="width:30%;font-size:16px;line-height:2.6em;text-align:center;padding:0;margin:0;float:left;overflow:hidden;text-overflow: clip;white-space: nowrap;">{stnm}</div>',
            '<div style="width:35%;font-size:14px;line-height:3.0em;text-align:center;padding:0;margin:0;overflow:hidden;text-overflow: clip;white-space: nowrap;float:left;">{[this.getContent(values.new, values.newTime)]}</div>',
            '<div style="width:35%;font-size:14px;line-height:3.0em;text-align:center;padding:0;margin:0;overflow:hidden;text-overflow: clip;white-space: nowrap;float:right;">{[this.getContent(values.max, values.maxTime)]}</div>',
            {
                getContent: function(value, time){
                    var string = '';
                    if(value == ""){
                        string = "--";
                    }
                    else{
                        string = value + '(' + this.getTime(time) + ')';
                    }
                    return string;

                },
                getTime: function(values){
                    var string = '';
                    string = values.substr(8,2) + '日' + values.substr(11,2) + '时';
                    return string;
                }
            }
        ],

        items: [
            {
                docked: 'top',
                xtype: 'panel',
                cls: 'tide-header',
                html: '<div style="width:30%;height:100%;float:left;">测站</div><div style="width:35%;height:100%;float:left;">最新(m)</div><div style="width:35%;height:100%;float:left;">最高水位</div>'
            }
        ]
    }
});