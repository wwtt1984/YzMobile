/**
 * Created by kukiss on 2015/3/25 0025.
 */
Ext.define('YzMobile.view.plan.PlanList', {
    extend: 'Ext.dataview.NestedList',
    xtype: 'planList',

    config: {
        title: '防汛预案',
        fullscreen: true,
        displayField: 'fileName',
        store: 'PlanStore',
        toolbar: {
            layout: 'fit', // 若没有, spacer无法使按钮靠右边!重要!!!
            items: [
                {xtype: 'button', itemId: 'backBtn', ui: 'back', text: '主界面'},
                {xtype: 'spacer'},
                {xtype: 'button', itemId: 'planSearch', ui: 'plain', iconCls: 'search'}
            ]
        },

        listeners: {
            leafitemtap: function (me, list, index, target, record, e, eOpts) {
                Ext.Msg.alert(record.data.planUrl);
            }
        }
    }


});