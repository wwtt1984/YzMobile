/**
 * Created by kukiss on 2015/3/19 0019.
 */
Ext.define('YzMobile.store.PlanStore', {
    extend: 'Ext.data.TreeStore',
    config: {
        autoLoad: false,
        model: 'YzMobile.model.PlanModel',
        defaultRootProperty: 'items',
        proxy: {
            type: 'sk',
            extraParams: {
                t: 'GetFxPlanTree'
            }

        }
    }
});