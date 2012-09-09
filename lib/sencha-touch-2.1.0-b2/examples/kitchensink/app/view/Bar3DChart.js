/**
 * Demonstrates how use Ext.chart.LineChart
 */
Ext.define('Kitchensink.view.Bar3DChart', {
    extend: 'Ext.Panel',
    requires: ['Ext.chart.Chart', 'Ext.chart.interactions.PanZoom', 'Kitchensink.view.Bar3DSeries', 'Ext.chart.axis.Numeric', 'Ext.chart.theme.LabelStyle'],
    config: {
        cls: 'card1',
        layout: 'fit',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        iconCls: 'refresh',
                        iconMask: true,
                        text: '&nbsp;Refresh',
                        handler: function () {
                            Ext.getStore('OrderItems').generateData(50);
                        }
                    }
                ]
            },
            {
                xtype: 'chart',
                store: 'OrderItems',
                background: '#EEE',
                innerPadding: {
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 0
                },
                interactions: [
                    {
                        type: 'panzoom',
                        axes: {
                            "left": {
                                allowPan: false,
                                allowZoom: false
                            },
                            "bottom": {
                                allowPan: true,
                                allowZoom: true
                            }
                        }
                    }
                ],
                series: [
                    {
                        type: 'bar3d',
                        xField: 'name',
                        yField: 'g1',
                        style: {
                            fill: '#8a8',
//                            stroke: 'rgba(143,203,203,0.5)',
                            maxBarWidth: 50,
                            lineJoin: 'miter',
                            miterLimit: 3
                        }
                    }
                ],
                axes: [
                    {
                        type: 'numeric',
                        position: 'left',
                        fields: ['g1', 'g2', 'g3', 'g4'],
                        minimum: 0,
                        maximum: 1000,
                        label: {
                            rotate: {
                                degrees: -30
                            }
                        }
                    },
                    {
                        hidden: true,
                        type: 'category',
                        position: 'bottom',
                        fields: 'name',
                        visibleRange: [0, 0.2],
                        style: {
                            labelInSpan: false
                        }
                    }
                ]
            }
        ]
    },

    initialize: function () {
        this.callParent();
        var toolbar = Ext.ComponentQuery.query('toolbar', this)[0],
            interaction = Ext.ComponentQuery.query('interaction', this)[0];
        toolbar.add(interaction.getModeToggleButton());
    }
});