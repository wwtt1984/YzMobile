/**
 * Created by kukiss on 2015/3/19 0019.
 */
Ext.define('YzMobile.controller.ContactControl', {
    extend:'Ext.app.Controller',

    config: {
        refs:{
            main:'main',
            backBtn:'[itemId=backBtn]' // 通讯录的返回按钮
        },

        control: {
            backBtn: {
                tap: function () {
                    this.getMain().setActiveItem(1); // 返回上一个界面
                }
            }
        }
    }
});