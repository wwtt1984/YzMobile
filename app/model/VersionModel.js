Ext.define('YzMobile.model.VersionModel',{
	extend: 'Ext.data.Model',
    config: {
       fields: [
            'id', 
            'strThisVersion',
			'strGetFileVersionFileURL',
			'strFileName'
        ]
    }
        
});