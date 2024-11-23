// do not load any features
const fireLayersDefinitionQuery = '1!=1'; //`acq_date >= '${yesterday()}' and acq_date <= '${today()}'`;

const tracksLayerStyles = [{
    "name": "Track A",
    "filters": {
        "field": "name",
        "operator": "contain",
        "value": "Track A"
    },
    "stroke": {
        "color": "#31CCEC",
        "width": 20
    }
}, {
    "name": "Track B",
    "filters": {
        "field": "name",
        "operator": "contain",
        "value": "Track A"
    },
    "stroke": {
        "color": "#31CCEC",
        "width": 20
    }
}];

export default {
    value: {
        "map": {
            "flashOnClick": false,
            "displayPopups": false,
            "zoom": 8,
            "minZoom": 6,
            "maxZoom": 18,
            "latitude": 42.63795635422295,
            "longitude": 25.19576409343405,
            "basemap": "topo_mapycz",
            "controls": {
                "attribution": false,
                "zoom": false,
                "rotate": true,
                "altShiftDragRotate": true,
                "pinchRotate": true
            },
            "defaultSelectStyle": {
                "circle": {
                    "radius": 10,
                    "fill": {
                        "color": "#31CCEC"
                    }
                },
                "fill": {
                    "color": "#31CCEC"
                },
                /* The above code is setting the stroke color to "#31CCEC" and the stroke width to 20. */
                "stroke": {
                    "color": "#31CCEC",
                    "width": 40
                }
            },
            "layers": [
                {
                    "visible": true,
                    "content": "tracks",
                    "metadata": {
                        "name": "tracks",
                        "title": "Tracks",
                        "sourceCRS": "EPSG:4326",
                        "layerUrl": "http://192.168.1.156:9876/mapserver/tracks",
                        "type": "md",
                        "selectable": true,
                        "sourceTable": "tracks",
                        "displayMask": "{name}",
                        "displayPopupsMask": "<strong>Name: </strong>{name}",
                        "displayPopupsOnClick": true,
                        "definitionQuery": null,
                        "objectIdField": "id",
                        "strategy": "bbox",
                        "minScale": 10,
                        "maxScale": 10000000,
                        "showInLegend": true,
                        "styles": tracksLayerStyles,
                        "labels": [],
                        "fields": []
                    }
                }
            ],
            "basemaps": [
                {
                    "visible": true,
                    "metadata": {
                        "name": "topo_mapycz",
                        "title": "Tourist map",
                        "showInLegend": false,
                        "provider": "xyz",
                        "url": "https://windytiles.mapy.cz/turist-m/{z}-{x}-{y}",
                        "type": "basemap",
                        "icon": "https://windytiles.mapy.cz/turist-m/13-4678-3025",
                        "minScale": 100,
                        "maxScale": 30000001
                    }
                },
                {
                    "visible": false,
                    "metadata": {
                        "name": "open_topo",
                        "title": "Open Topo map",
                        "showInLegend": false,
                        "provider": "xyz",
                        "url": "https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png",
                        "type": "basemap",
                        "icon": "https://a.tile.opentopomap.org/15/18511/12082.png",
                        "minScale": 100,
                        "maxScale": 30000001
                    }
                },
                {
                    "visible": false,
                    "url": "https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
                    "metadata": {
                        "name": "arcgis_world_imagery",
                        "title": "Aerial map",
                        "showInLegend": false,
                        "provider": "arcgisrest",
                        "url": "https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
                        "type": "basemap",
                        "icon": "https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/13/4684/5165",
                        "minScale": 100,
                        "maxScale": 30000001
                    }
                }
            ]
        },
        "widgets": [
            {
                "name": "select",
                "active": true,
                "hitTolerance": 10,
                "useDefaultSelectStyle": true,
                "singleSelect": true,
                "selectTopMostFeature": true,
                "selectStyleOnTop": false,
                "style": {
                    "fillColor": "#FFFF00",
                    "strokeColor": "#FFFF00",
                    "strokeWidth": 10,
                    "radiusRatio": 0.5
                }
            }
        ]
    }
};