import React from "react";
import mapboxgl from "mapbox-gl";
import './map.css';

class Map extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            api_url: "https://data.edmonton.ca/resource/k4tx-5k8p.json",
            map: false,
            viewport: { 
                zoom: 10,
                center: [-113.4909, 53.5444]
            },
            data: null
        }
    }

    initializeMap(){
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWZhcTEyMzQ1IiwiYSI6ImNrcndrY2ltbTBoZWoycG94Y3ljNW9yNXkifQ.YeekAmHni0RhHU3LAz3-1Q';
        let map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            ...this.state.viewport
        });

        map.on('load', () => {
            map.addLayer({
                'id': 'points',
                'type': 'circle',
                'source': {
                    "type": "geojson",
                    "data": this.state.data
                },
                'paint': {
                    'circle-radius': 8,
                    'circle-color': '#B42222'
                }
            });
            console.log("load-data", this.state.data);
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

        this.setState({ map });
    }

    createFeatureCollection(data){
        let feature = [];
        data.forEach( (mark) => 
            feature.push(
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            parseFloat(mark.point.coordinates[0]),
                            parseFloat(mark.point.coordinates[1])   
                        ] 
                    },
                    "properties": {
                        "description": mark.description, 
                        "duration": mark.duration,
                        "impact": mark.impact,
                        "details": mark.details
                    }
                }
            )
        )

        return {
            "type": "FeatureCollection",
            "features": feature
        };

    }

    componentDidMount(){
        const {data, api_url } = this.state;

        if( !data ){
            fetch(api_url, { method: 'GET' })
            .then( response => response.json())
            .then( response => this.createFeatureCollection(response))
            .then( response => this.setState({
                data: response
            }))
        }
    }

    render (){
        const {data, map} = this.state;
        if (data && !map) this.initializeMap();
        return (
            <div style={{  width: 1100, height: 600, }} id="map" />
        );
    }

}

export default Map;