/**
 * Created by kukiss on 2015/3/19 0019.
 */
Ext.define('YzMobile.store.ContactTreeStore', {
    extend:'Ext.data.TreeStore',
    config: {
        autoLoad: true,
        model: 'YzMobile.model.ContactTreeModel',
        defaultRootProperty: 'items',
        proxy: {
            type: 'sk',
            extraParams:{
                t:'GetAdressTree'
            }

        }
    }
});