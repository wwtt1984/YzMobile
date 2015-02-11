/**
 * Created by USER on 14-7-12.
 */

Ext.define('YzMobile.controller.ProjectControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            main: 'main',
            info: 'main info',
            infofunction: '[itemId=infofunction]',
            projectlist: 'info projectlist',
            projectdetail: 'info projectdetail',
            projecttree: '[itemId=projecttree]'
        },

        control: {
            projecttree: {
                leafItemTap: 'onProjectItemTap'
            }
        }
    },

    //工情列表页面初始化
    onProjectInitialize: function(){

        var me =  this;
        me.onProjectTreeLoad();
        me.projectlist = me.getProjectlist();
        if(!me.projectlist){
            me.projectlist= Ext.create('YzMobile.view.project.ProjectList');
        }
        me.getInfo().push(me.projectlist);
        me.getMain().setActiveItem(me.getInfo());
    },

    //树状结构store加载
    onProjectTreeLoad: function(){
        var store = Ext.getStore('ProjectTreeStore');
        if(!store.getAllCount()){
            store.getProxy().setExtraParams({
                t: 'GetRStree'
            });
            store.setRoot({expanded: true});
//            segmentstore.load();
        }
    },

    //添加工情列表点击事件，查看单个工程，详细工情信息
    onProjectItemTap: function(container, list, index, target, record, e){

        var me =  this;

        me.projectdetail = this.getProjectdetail();
        if(!me.projectdetail){
            me.projectdetail= Ext.create('YzMobile.view.project.ProjectDetail');
        }
        me.onProjectDetailLoad(record);
        me.getInfofunction().hide();
        me.getInfo().push(me.projectdetail);
    },

    onProjectDetailLoad: function(record){

        var me = this;
        var store = Ext.getStore('ProjectDetailStore');

        store.removeAll();
        store.getProxy().setExtraParams({
            t: 'GetRSInfo',
            results: record.data.sid
        });

        store.load(function(records, operation, success) {
            if(!success)
            {
                plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
            }
            else{
                me.projectdetail.onDataSet(records[0]);
            }
            Ext.Viewport.setMasked(false);
        }, this);
    }
})