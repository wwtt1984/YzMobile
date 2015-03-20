/**
 * Created by USER on 14-4-3.
 */

Ext.define('YzMobile.view.contact.ContactList', {
    extend: 'Ext.NestedList',
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
        title:'通讯录',
        displayField: 'fileName',
        store: 'ContactTreeStore',
        toolbar: {
            items: [{xtype: 'spacer'}, {xtype: 'button', ui: 'back', iconMask: true, itemId: 'backBtn', text: '返回'}, {xtype:'button', itemId:'contactSearch', text:'搜索', docked:'right'}]
        }
    }

});