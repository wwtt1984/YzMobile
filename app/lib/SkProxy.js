Ext.define('Ext.data.proxy.SkProxy', {
    extend: 'Ext.data.proxy.JsonP',
    alias: 'proxy.sk',
		
    config: {
        //url: 'http://60.190.55.114/YzMobileWebService/Data_Ys.ashx',
        url: 'http://115.236.169.28/webserca/data.ashx',
//        url: 'http://localhost/YzMobileWebService/Data_Ys.ashx',
        callbackKey: 'callback'
    },
	
    buildRequest: function(operation) {
    	
        var request = this.callParent(arguments);
        return request;
    }
});