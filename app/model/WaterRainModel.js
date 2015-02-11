/**
 * Created by USER on 14-7-12.
 */

Ext.define('YzMobile.model.WaterRainModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['stnm', 'stcd', 'type', 'jd', 'wd', 'rain', 'water', 'area']
    }
});
