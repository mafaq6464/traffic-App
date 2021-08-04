import { Component } from "react";
import ReactMapGL, {Marker} from "react-map-gl";
import Pin  from "./pin";

class Map extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            api_url: "https://data.edmonton.ca/resource/k4tx-5k8p.json",
            viewport: {
                width: 1100,
                height: 600,
                zoom: 10,
                latitude: 53.5444,
                longitude: -113.4909
            },
            coords: [
                { latitude: 53.5444, longitude: -113.4909 },
                { latitude: 53.5451, longitude: -113.4923 },
                { latitude: 53.5438, longitude: -113.5678 }
            ],
            token: 'pk.eyJ1IjoiYWZhcTEyMzQ1IiwiYSI6ImNrcndrY2ltbTBoZWoycG94Y3ljNW9yNXkifQ.YeekAmHni0RhHU3LAz3-1Q',
            data: null
        }
    }

    componentDidMount(){
        const {api_url, data} = this.state;
        fetch(api_url, { method: 'GET' })
        .then( Response => Response.json())
        // .then( Response => console.log("response", Response))
        .then( Response => this.setState({
            data: Response
        }))
    }

    render (){
        const {coords, data} = this.state;
        return (
            <div>
                <ReactMapGL
                    mapboxApiAccessToken={this.state.token}
                    {...this.state.viewport}
                    onViewportChange={(viewport) => this.setState({viewport})}
                >

                    {data && data.map((coord, i) => (
                        <Marker key={i} latitude={coord.point.coordinates[1]} longitude={coord.point.coordinates[0]} >
                            <Pin />
                        </Marker>
                    ))}

                </ReactMapGL>
            </div>
        );
    }

}

export default Map;