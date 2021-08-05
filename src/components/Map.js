import React from "react";
import mapboxgl from "mapbox-gl";
import './map.css';

class Map extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            
            map: false,
            viewport: { 
                zoom: 10,
                center: [-113.4909, 53.5444]
            },
           
        }
    }


    static initializeMap(state, viewport){
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWZhcTEyMzQ1IiwiYSI6ImNrcndrY2ltbTBoZWoycG94Y3ljNW9yNXkifQ.YeekAmHni0RhHU3LAz3-1Q';
        let map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            ...viewport
        });

        map.on('load', () => {
            map.addLayer({
                'id': 'points',
                'type': 'circle',
                'source': {
                    "type": "geojson",
                    "data": state.data
                },
                'paint': {
                    'circle-radius': 8,
                    'circle-color': '#B42222'
                }
            });
        });

        map.on('click', 'points', function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            var properties = e.features[0].properties;
             
            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
             
            new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`
                <strong>${properties.description}</strong>
                <em>${properties.duration}</em>
                <em>${properties.impact}</em>
                <p>${properties.details}</p>
            `)
            .addTo(map);
        });
             
        // Change the cursor to a pointer when the mouse is over the places layer.
        map.on('mouseenter', 'points', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
             
        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'points', function () {
            map.getCanvas().style.cursor = '';
        });

        return { map };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const {data, map} = nextProps;
        if (data && !map) return Map.initializeMap(nextProps, prevState.viewport)
        else return null;
    }

    

    render (){
        return (
            <div style={{  width: 1100, height: 600, }} id="map" />
        );
    }

}

export default Map;