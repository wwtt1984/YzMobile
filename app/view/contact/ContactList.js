/**
 * Created by USER on 14-4-3.
 */

Ext.define('YzMobile.view.contact.ContactList', {
    extend: 'Ext.dataview.NestedList',
    xtype: 'contactList',

    // 编辑显示内容的模板
    //getTitleTextTpl: function() {
    //    return '{' + this.getDisplayField() + '}<tpl if="leaf !== true">/</tpl>';
    //},
    //// add a / for folder nodes in the list
    //getItemTextTpl: function() {
    //    return '{' + this.getDisplayField() + '}<tpl if="leaf !== true">/</tpl>';
    //},

    config: {
        title: '通讯录',
        fullscreen: true,
        displayField: 'fileName',
        store: 'ContactTreeStore',
        toolbar: {
            layout: 'fit', // 若没有, spacer无法使按钮靠右边!重要!!!
            items: [
                {xtype: 'button', itemId: 'backBtn', ui: 'back', text: '主界面'},
                {xtype: 'spacer'},
                {xtype: 'button', itemId: 'contactSearch', ui: 'plain', iconCls: 'search'}
            ]
        }
    },

    listeners: {
        leafitemtap: function (me, list, index, target, record, e, eOpts) {
            debugger;
            //var panel = Ext.Viewport.add({
            //    docked: 'bottom',
            //    modal: true,
            //    centered: true,
            //    hideOnMaskTap: true,
            //    padding: 10,
            //    items: [
            //        {xtype: 'button', text: record.data.mobile}
            //    ]
            //});
            //
            //panel.showBy(target);
            var popup = Ext.create('YzMobile.view.contact.ContactPopup');
            popup.onDataSet(record);
            popup.showBy(target);
        }
    }

});