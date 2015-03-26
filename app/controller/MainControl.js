/**
 * Created by USER on 14-8-13.
 */

Ext.define('YzMobile.controller.MainControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            main: 'main',
            maintitle: 'maintitle',
            functionmain: 'functionmain',
            functionlist: '#functionlist',

            confirm: '#confirm',

            info: 'main info',

            infofunction: '[itemId=infofunction]',

            infosearch: '[itemId=infosearch]',

            dateselect: 'dateselect',
            startdate: '[itemId=startdate]',
            enddate: '[itemId=enddate]',
            dateconfirm: '[itemId=dateconfirm]',

            load: '[itemId=load]',
            contactList:'contactList'
        },

        control: {
            main: {
                initialize: 'onMainInit'
            },
            confirm: {
                tap: 'onLoginTap'
            },
            functionlist: {
                itemtap: 'onFunctionItemTap'
            },
            info:{
                back: 'onInfoBackTap'
            },
            infofunction: {
                tap: 'onInfoFunctionBackTap'
            },
            infosearch: {
                tap: 'onInfoSearchTap'
            },
            startdate:{
                change: 'onStartDateChange'
            },
            enddate: {
                change: 'onEndDateChange'
            },
            dateconfirm: {
                tap: 'onDateConfirmTap'
            },
            contactList:{

            }
        }
    },

    onMainInit: function(){
        var me = this;
        YzMobile.app.mainthis = this;

        me.onBtnConfirm();
        //me.onUserDataFile();
        //android返回键事件监听s
        document.addEventListener("backbutton", me.onBackKeyDown, false);
    },

    onBackKeyDown: function(){
        var me  = YzMobile.app.mainthis;
        var mainactive = Ext.Viewport.getActiveItem().getActiveItem().xtype;

        if((mainactive == "login") || (mainactive == "functionmain") )
        {
            //当当前页面是“登录”或“主功能页面”时，双击“返回键”退出应用程序
            plugins.Toast.ShowToast("请再点一次退出",1000);

            document.removeEventListener("backbutton", me.onBackKeyDown, false); // 注销返回键
            document.addEventListener("backbutton", me.onQuitSystemTap, false);//绑定退出事件

            var intervalID = window.setInterval(function() {
                window.clearInterval(intervalID);
                document.removeEventListener("backbutton", me.onQuitSystemTap, false); // 注销返回键
                document.addEventListener("backbutton", me.onBackKeyDown, false); // 返回键

            }, 2000);
        }
        else if(mainactive == "info")
        {
            document.removeEventListener("backbutton", me.onBackKeyDown, false); // 注销返回键
            me.onBackKeyTap();
        }
        else
        {
            navigator.app.backHistory();
        }
    },

    //当前页面是其他的页面时，返回上一级页面
    onBackKeyTap: function(){
        var me  = YzMobile.app.mainthis;
        var screen = me.getMain();
        var info = screen.getActiveItem();
        var active = info.getActiveItem();

        switch(active.xtype){

            ////////////////雨情//////////////
            case 'rain':
                me.onInfoFunctionBackTap();
                break;

            case 'rainbar':
                if(me.dateselect && (me.dateselect.getHidden() == false)){
                    me.dateselect.hide();
                }
                else{
                    me.getInfosearch().hide();
                    me.getInfo().pop();
                    me.getInfofunction().show();
                }
                break;

            ////////////////水情//////////////
            case 'water':
                me.onInfoFunctionBackTap();
                break;

            case 'waterline':
                if(me.dateselect && (me.dateselect.getHidden() == false)){
                    me.dateselect.hide();
                }
                else{
                    me.getInfosearch().hide();
                    me.getInfo().pop();
                    me.getInfofunction().show();
                }
                break;

            ////////////////工情//////////////
            case 'projectlist':
                me.onInfoFunctionBackTap();
                break;

            case 'projectdetail':
                me.getInfo().pop();
                me.getInfofunction().show();
                break;

            ////////////////天气预报//////////////
            case 'weather':
                me.onInfoFunctionBackTap();
                break;

            ////////////////气象国土//////////////
            case 'landmain':
                me.onInfoFunctionBackTap();
                break;

            case 'cloud':
                me.getInfo().pop();
                me.getInfofunction().show();
                break;

            case 'radar':
                me.getInfo().pop();
                me.getInfofunction().show();
                break;

            ////////////////GIS应用//////////////
            case 'gismain':
                me.onInfoFunctionBackTap();
                break;


            ////////////////台风信息//////////////
            case 'tfmain':
                me.onInfoFunctionBackTap();
                break;

            case 'tflist':
                me.getInfosearch().show();
                me.getInfo().pop();
                me.getInfofunction().show();
                break;

            ////////////////基本信息//////////////
            case 'baselist':
                me.onInfoFunctionBackTap();
                break;

            case 'basedetail':
                me.getInfosearch().hide();
                me.getInfo().pop();
                me.getInfofunction().show();
                break;
        }

        document.addEventListener("backbutton", me.onBackKeyDown, false); // 返回键
    },

    onQuitSystemTap: function(){
        navigator.app.exitApp(); //////////////////退出系统
    },

    //判断本地文件fail.json中是否有失败记录，若有，则取出放入UploadStore中
    onUserDataFile: function(){
        var me = this;

        Ext.device.FileSystem.requestFileSystem({
            type: LocalFileSystem.PERSISTENT,
            size: 1024 * 1024,
            success: function(fileSystem) {

                me.fs = fileSystem;

                var fe = Ext.create("Ext.device.filesystem.FileEntry", YzMobile.app.local.userfile, fileSystem);

                fe.getEntry(
                    {
                        file: YzMobile.app.local.userfile,
                        options: {create: true},
                        success: function(entry) {

                            fe.read({
                                type: 'text',
                                success: function(data){

                                    if(data){
                                        var hq = Ext.JSON.decode(data);

                                        if(hq){
                                            YzMobile.app.user.sid = hq[0].sid;
                                            YzMobile.app.user.password = hq[0].password;
                                            me.onUserCheck();
                                        }
                                    }

                                },

                                failure: function(error){
                                    plugins.Toast.ShowToast("不存在记录文件！",3000);
                                }
                            });
                        },
                        failure: function(error) {plugins.Toast.ShowToast("读取记录文件失败！",3000);}
                    });
            },
            failure: function(err) {
                plugins.Toast.ShowToast("请求文件系统失败！" + err.code,3000);
            }
        });
    },

    onBtnConfirm: function(){ ////////////////////重写Confirm////////////////////

        if(Ext.MessageBox) {
            var MB = Ext.MessageBox;
            Ext.apply(MB, {
                YES: { text: '确认', itemId: 'yes', ui: 'action' },
                NO:  { text: '取消', itemId: 'no' },
                OK:  { text: '确定', itemId: 'ok' }
            });
            Ext.apply(MB, {
                YESNO: [Ext.MessageBox.NO, Ext.MessageBox.YES]
            });
        }
    },

    onLoginTap: function(){

        var me = this;
        YzMobile.app.user.sid = Ext.getCmp('name').getValue();
        YzMobile.app.user.password = Ext.getCmp('password').getValue();


        me.onUserCheck();

    },

    //用户验证
    onUserCheck: function(){

        var me = this;

        var results = YzMobile.app.user.sid + "$" +  YzMobile.app.user.password;
        Ext.Viewport.setMasked({xtype:'loadmask',message:'登录中,请稍后...'});

        if(YzMobile.app.user.sid && YzMobile.app.user.password){
            //用户名、密码输入完整
            var store = Ext.getStore('UserStore');

            var results = YzMobile.app.user.sid + '$' + YzMobile.app.user.password + '$' + '1.0.0.1';
            store.getProxy().setExtraParams({
                t: 'Login',
                results: results
            });

            store.load(function(records, operation, success) {
                if(records.length == 0){
                    Ext.Viewport.setMasked(false);
                    plugins.Toast.ShowToast("验证失败！请重新输入！",3000);
                }
                else{
                    YzMobile.app.user.name = records[0].data.name;
                    YzMobile.app.user.mobile = records[0].data.mobile;

                    records[0].data.password = YzMobile.app.user.password;

                    Ext.getCmp('maintitle').onDataSet(records[0].data);

                    Ext.Viewport.setMasked(false);
                    me.getMain().setActiveItem(me.getFunctionmain());
                    me.onUserWriteJson(store); //将验证成功的用户信息，存在本地
                    me.onCheckVesion(me);  /////////////////判断是否有新版本/////////////////////
                }

            });
        }
        else{
            //用户名、密码输入不完整
            Ext.Viewport.setMasked(false);
            plugins.Toast.ShowToast("用户名和密码不能为空！",3000);
        }
    },

    onUserWriteJson: function(store){
        var hq = [];

        hq.push({
            sid: YzMobile.app.user.sid,
            name: YzMobile.app.user.name,
            password: YzMobile.app.user.password,
            mobile: YzMobile.app.user.mobile
        });

        var me = this;

        Ext.device.FileSystem.requestFileSystem({
            type: LocalFileSystem.PERSISTENT,
            size: 1024 * 1024,
            success: function(fileSystem) {

                me.fs = fileSystem;

                var fe = Ext.create("Ext.device.filesystem.FileEntry", YzMobile.app.local.userfile, fileSystem);

                fe.getEntry(
                    {
                        file: YzMobile.app.local.userfile,
                        options: {create: true},
                        success: function(entry) {

                            fe.write(
                                {
                                    data: Ext.JSON.encode(hq),
                                    success: function() {

                                        plugins.Toast.ShowToast("用户信息已保存！",3000);

                                    },
                                    failure: function(error) {
                                        plugins.Toast.ShowToast("用户信息保存失败！请重试！",3000);
                                    }
                                });
                        },

                        failure: function(error){
                            plugins.Toast.ShowToast("用户信息获取失败！",3000);
                        }
                    });
            },

            failure: function(err) {
                plugins.Toast.ShowToast("请求文件系统失败！" + err.code,3000);
            }
        });
    },

    //监听info页面的“主页面”按钮，点击后，返回“主功能”页面
    onInfoFunctionBackTap: function(){
        var me = this;
        me.getMain().setActiveItem(me.getFunctionmain());
//        if(this.getInfo().getActiveItem().xtype == 'markmain'){
//            Ext.ComponentQuery.query('#photo')[0].clearImgListeners();
//        }
        me.getInfo().destroy();
    },

    //info的“返回键”事件，当只有一张页面时，返回至“主功能”页面
    onInfoBackTap: function(view, eOpts){

        var me = this;
        if(view.getActiveItem() == view.getAt(1)){
            me.getInfofunction().show();
            me.getInfosearch().hide();

            switch(view.getActiveItem().xtype){
                case 'tfmain':
                    me.getInfosearch().show();
                    break;
            }
        }
    },

    onFunctionItemTap: function(list, index, target, record, e, eOpts ){

        var me = this;

        me.info = me.getInfo();
        if(!me.info){
            me.info = Ext.create('YzMobile.view.Info');
        }

        me.getMain().add(me.info);

        var titlestr = ['rain', 'water', 'weather', 'land', 'gis', 'typhoon', 'project', 'base', 'contact','plan'];

        switch(record.data.name){
            case titlestr[0]:
                me.getApplication().getController('RainControl').onRainInitialize();
                me.searchxtype = 'rain';
                break;
            case titlestr[1]:
                me.getApplication().getController('WaterControl').onWaterInitialize();
                me.searchxtype = 'water';
                break;
            case titlestr[2]:
                me.getApplication().getController('WeatherControl').onWeatherInitialize();
                me.searchxtype = 'weather';
                break;
            case titlestr[3]:
                me.getApplication().getController('LandControl').onLandInitialize();
                break;
            case titlestr[4]:
                me.getApplication().getController('GisControl').onGisMapInitialize();
                break;
            case titlestr[5]:
                me.getApplication().getController('TfControl').onTyphoonInitialize();
                me.searchxtype = 'typhoon';
                break;
            case titlestr[6]:
                me.getApplication().getController('ProjectControl').onProjectInitialize();
                break;
            case titlestr[7]:
                me.getApplication().getController('BaseControl').onBaseInitialize();
                break;
            case titlestr[8]:
                var view = Ext.create('YzMobile.view.contact.ContactList');
                me.getMain().setActiveItem(view);
                break;
            case titlestr[9]:
                var view = Ext.create('YzMobile.view.plan.PlanList');
                me.getMain().setActiveItem(view);
                break;
        }
//        me.getMain().setActiveItem(me.getInfo());
    },

    onInfoSearchTap: function(){
        var me = this;

        switch(me.searchxtype){
            case 'rain':

            case 'water':
                me.onDateSearchViewShow();
                break;

            case 'weather':
                me.getApplication().getController('WeatherControl').onWeatherPick();
                break;
            case 'typhoon':
                me.getApplication().getController('TfControl').onTfListShow();
                break;
        }

    },

    onCheckVesion:function(me)
    {
        var store = Ext.getStore('VersionStore');
        store.getProxy().setExtraParams({
            t: 'CheckVersion'
        });
        store.load(function(records, operation, success){

            if(records.length > 0)
            {

                if(records[0].data.strThisVersion != YzMobile.app.user.version)
                {
                    Ext.Msg.confirm("当前版本 " + YzMobile.app.user.version,
                        "新版本("+records[0].data.strThisVersion+")，是否下载更新？",function(btn){
                            if(btn == 'yes'){

//                                me.load = me.getLoad();
//                                if(!me.load){
//                                    me.load = Ext.create('YzMobile.view.Load',{
//                                        itemId: 'load',
//                                        style: 'height: 20px; position:absolute; top:80%;'
//                                    });
//                                }
//                                me.getLoad().onDataSet(0);
//                                me.getFunctionmain().add(me.load);
//
//                                me.downLoad(records[0].data.strFileName,records[0].data.strGetFileVersionFileURL,me);

                                me.onLoadOrUploadViewShow('更新下载中', '正在下载中');

                                me.downLoad(records[0].data.strFileName,records[0].data.strGetFileVersionFileURL,me);
                            }
                        });
                }
            }

        }, this);

    },

    downLoad:function(name,url,me)
    {
        var uri = encodeURI(url);
        var fileTransfer = new FileTransfer();

        fileTransfer.onprogress = function(progressEvent) {
            if (progressEvent.lengthComputable) {
                var percent = Number((progressEvent.loaded / progressEvent.total) * 100).toFixed(0);
                me.getLoad().onDataSet('更新下载中', '正在下载中', percent);
            } else {
                plugins.Toast.ShowToast("error",1000);
                me.getLoad().hide();
            }
        };

        fileTransfer.download(
            uri,
            "cdvfile://localhost/persistent/Download/" + name,
            function(entry) {
                Ext.Viewport.setMasked(false);
                plugins.Toast.ShowToast("下载完成"+entry.fullPath,3000);
                me.getLoad().hide();
                plugins.Install.InstallApk("mnt/sdcard"+entry.fullPath);
            },
            function(error) {
                Ext.Viewport.setMasked(false);
                plugins.Toast.ShowToast(' '+error.source,3000);
                me.getLoad().hide();
            }
        );
    },

    onLoadOrUploadViewShow: function(header, text){

        var me = this;

        me.load = me.getLoad();

        if(!me.load){
            me.load = Ext.create('YzMobile.view.Load');
        }

        if (Ext.os.deviceType.toLowerCase() == "phone") {
            me.load.setMinHeight('35%');
        }

        me.load.onDataSet(header, text, 0);
        if (!me.load.getParent()) {
            Ext.Viewport.add(me.load);
        }
        me.load.show();

    },

    onDateSearchViewShow: function(){
        var me = this;

        me.dateselect = me.getDateselect();

        if(!me.dateselect){
            me.dateselect = Ext.create('YzMobile.view.DateSelect');
        }

//        if (Ext.os.deviceType.toLowerCase() == "phone") {
            me.dateselect.setMinHeight('55%');
//        }

//        me.dateselect.onDataSet(header, text, 0);
        if (!me.dateselect.getParent()) {
            Ext.Viewport.add(me.dateselect);
        }
        me.dateselect.show();
    },

    onDateSearchViewHide: function(){
        var me = this;
        me.dateselect.hide();
    },

    onStartDateChange: function(datepicker, newDate, oldDate, eOpts){

        var me = this;

        if(newDate >= new Date()){
            plugins.Toast.ShowToast("开始日期应该早于今天！",3000);
//            alert("开始日期不能晚于今天！");
            datepicker.setValue(oldDate);
        }
    },

    onEndDateChange: function(datepicker, newDate, oldDate, eOpts){

        var me = this;

        if(newDate > new Date()){
            plugins.Toast.ShowToast("结束日期不能晚于今天！",3000);
//            alert("结束日期不能晚于今天！");
            datepicker.setValue(oldDate);
        }
        else if(newDate < me.getStartdate().getValue()){
            plugins.Toast.ShowToast("结束不能早于开始日期！",3000);
//            alert("结束不能早于开始日期！");
            datepicker.setValue(oldDate);
        }
    },

    onDateConfirmTap: function(){
        var me = this;

        var start = Ext.Date.format(me.getStartdate().getValue(), 'Y-m-d').toString();
        var end = Ext.Date.format(me.getEnddate().getValue(), 'Y-m-d').toString();

        switch(me.searchxtype){
            case 'rain':
                me.getApplication().getController('RainControl').onRainDayDetailLoad(start, end);
                break;
            case 'water':
                me.getApplication().getController('WaterControl').onWaterDayDetailLoad(start, end);
                break;
        }
    }

})