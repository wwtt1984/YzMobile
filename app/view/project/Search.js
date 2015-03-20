/**
 * Created by USER on 14-4-3.
 */

Ext.define('YzMobile.view.project.Search', {
    extend: 'Ext.List',
    xtype: 'search',

    requires: [],

    config: {
        title: '工情搜索',
        itemId: 'ctsearch',

        cls: 'contact-list',

        pinHeaders: false,

        //itemTpl defines the template for each item in the list
        itemTpl: Ext.create('Ext.XTemplate',
            '<div class="contact-list-item">',
            '    <h1>{rsnm}&nbsp;&nbsp;{MyType}</h1>',
            '</div>'
        ),

        //give it a link to the store instance
        store: {
            model: 'YzMobile.model.SearchModel'
        },

        useSimpleItems: true,

        emptyText: '<div style="margin-top: 20px; text-align: center">无匹配的记录</div>',
        disableSelection: true,

        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                ui: 'light',

                cls: 'contact-search',
                style: 'border:none;',

                items: [
                    {
                        xtype: 'searchfield',
                        placeHolder: '请输入汉字或拼音首字母组合...',
                        style: 'width:96%; border: none;margin: 0 2% 0 2%;',
                        listeners: {
                            clearicontap: function () {
                                Ext.ComponentQuery.query('#ctsearch')[0].onSearchClearIconTap();
                            },
                            keyup: function (field) {
                                Ext.ComponentQuery.query('#ctsearch')[0].onSearchKeyUp(field);
                            }
                        }
                    }
                ]
            }
        ]
    },

    onSearchKeyUp: function (field) {
        //get the store and the value of the field
        var value = field.getValue(),
            store = Ext.getStore('SearchStore');

        var me = this;

        //first clear any current filters on the store. If there is a new value, then suppress the refresh event
            store.clearFilter(!!value);

        //check if a value is set first, as if it isnt we dont have to do anything
        if (value) {
            ////the user could have entered spaces, so we must split them so we can loop through them all
            //var searches = value.split(','),
            //    regexps = [],
            //    i, regex;
            //
            ////loop them all
            //for (i = 0; i < searches.length; i++) {
            //    //if it is nothing, continue
            //    if (!searches[i]) continue;
            //
            //    regex = searches[i].trim();
            //    regex = regex.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            //
            //    //if found, create a new regular expression which is case insenstive
            //    regexps.push(new RegExp(regex.trim(), 'i'));
            //}
            //
            ////now filter the store by passing a method
            ////the passed method will be called for each record in the store
            //store.filter(function(record) {
            //    var matched = [];
            //
            //    //loop through each of the regular expressions
            //    for (i = 0; i < regexps.length; i++) {
            //        var search = regexps[i],
            //            didMatch = search.test(record.get('displayname') + record.get('samaccountname'));
            //
            //        //if it matched the first or last name, push it into the matches array
            //        matched.push(didMatch);
            //
            //    }
            //
            //    return (regexps.length && matched.indexOf(true) !== -1);
            //});

            store.filter([{
                filterFn: function (item) {
                    return item.get('MySearchName').toUpperCase().indexOf(value.toUpperCase()) >= 0;
                }
            }]);

            me.getStore().setData(store.getData().items);
        }
    },

    onSearchClearIconTap: function () {
        var me = this;
        //call the clearFilter method on the store instance
        Ext.getStore('ContactSearchStore').clearFilter();
        me.getStore().removeAll();
    }
});