/**
 * Created by USER on 14-7-19.
 */

Ext.define('YzMobile.view.gis.GisTitle', {
    extend: 'Ext.Panel',
    xtype: 'gistitle',

    requires: [
        'Ext.XTemplate'
    ],

    config:{

        itemId: 'gistitle',


        tpl: Ext.create('Ext.XTemplate',
            '<div class="gmap" style="background:#fff;height:100%;width:100%;font-size:16px;padding: 5px 0 0 0;">',
//                '<div class="gmap-item-selected" style="width:100%;height:25px;" id="{[this.getLinkId(values, 1)]}">',
//                    '<div class="gmap-select"></div>',
//                    '<img src="resources/images/gis/s.png" style="float:left;"/>',
//                    '<div style="float:left;">雨量站</div>',
//                '</div>',
//                '<div class="gmap-item-selected" style="width:100%;height:25px;" id="{[this.getLinkId(values, 2)]}">',
//                    '<div class="gmap-select"></div>',
//                    '<img src="resources/images/gis/y.png" style="float:left;"/>',
//                    '<div style="float:left;">水位站</div>',
//                '</div>',
//                '<div class="gmap-item-selected" style="width:100%;height:25px;" id="{[this.getLinkId(values, 3)]}">',
//                    '<div class="gmap-select"></div>',
//                    '<img src="resources/images/gis/sk.png" style="float:left;"/>',
//                    '<div style="float:left;">水位雨量站</div>',
//                '</div>',
            '<div class="gmap-item-selected" style="width:30%;height:25px;float:left;" id="{[this.getLinkId(values, 1)]}">',
            '<div class="gmap-select"></div>',
            '<img src="resources/images/gis/s.png" style="float:left;"/>',
            '<div style="float:left;">雨量站</div>',
            '</div>',
            '<div class="gmap-item-selected" style="width:30%;height:25px;float:left;" id="{[this.getLinkId(values, 2)]}">',
            '<div class="gmap-select"></div>',
            '<img src="resources/images/gis/y.png" style="float:left;"/>',
            '<div style="float:left;">水位站</div>',
            '</div>',
            '<div class="gmap-item-selected" style="width:40%;height:25px;float:left;" id="{[this.getLinkId(values, 3)]}">',
            '<div class="gmap-select"></div>',
            '<img src="resources/images/gis/sk.png" style="float:left;"/>',
            '<div style="float:left;">水位雨量站</div>',
            '</div>',
            '</div>',
            {
                getLinkId: function(values, index){
                    var result = Ext.id();
                    Ext.Function.defer(this.addListener, 1, this, [result,values, index]);
                    return result;
                },
                addListener: function(id, values, index) {
                    Ext.get(id).on('tap', function(e){
                        e.stopEvent();
                        var me = this;
                        if(me.dom.className == 'gmap-item-selected'){

                            switch(index){
                                case 1:
                                    me.dom.className = 'gmap-item';
                                    Ext.ComponentQuery.query('#gmap')[0].onStationHide(Ext.ComponentQuery.query('#gmap')[0].makerarr1);
                                    break;
                                case 2:
                                    me.dom.className = 'gmap-item';
                                    Ext.ComponentQuery.query('#gmap')[0].onStationHide(Ext.ComponentQuery.query('#gmap')[0].makerarr0);
                                    break;
                                case 3:
                                    me.dom.className = 'gmap-item';
                                    Ext.ComponentQuery.query('#gmap')[0].onStationHide(Ext.ComponentQuery.query('#gmap')[0].makerarr2);
                                    break;
                            }
                        }
                        else{

                            switch(index){
                                case 1:
                                    me.dom.className = 'gmap-item-selected';
                                    Ext.ComponentQuery.query('#gmap')[0].onStationShow(Ext.ComponentQuery.query('#gmap')[0].makerarr1);
                                    break;
                                case 2:
                                    me.dom.className = 'gmap-item-selected';
                                    Ext.ComponentQuery.query('#gmap')[0].onStationShow(Ext.ComponentQuery.query('#gmap')[0].makerarr0);
                                    break;
                                case 3:
                                    me.dom.className = 'gmap-item-selected';
                                    Ext.ComponentQuery.query('#gmap')[0].onStationShow(Ext.ComponentQuery.query('#gmap')[0].makerarr2);
                                    break;
                            }
                        }
                    })//////增加add图片的事件
                }
            }
        )
    }
})
