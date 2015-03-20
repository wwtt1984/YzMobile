/**
 * Created by kukiss on 2015/3/19 0019.
 */
Ext.define('YzMobile.model.ContactModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            'ID',
            'personNM',
            'deptID',
            'post',
            'mobile',
            'OfficeTel',
            'HomeTel',
            'ShortTel',
            'Email',
            'MySearchName'
        ]
    }
});