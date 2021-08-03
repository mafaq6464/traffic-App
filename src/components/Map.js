import { Component } from "react";
import ReactMapGL from "react-map-gl";

class Map extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            viewport: {
                width: 1100,
                height: 600,
                zoom: 10,
                latitude: 53.5444,
                longitude: -113.4909
            },
            token: 'pk.eyJ1IjoiYWZhcTEyMzQ1IiwiYSI6ImNrcndrY2ltbTBoZWoycG94Y3ljNW9yNXkifQ.YeekAmHni0RhHU3LAz3-1Q'
        }
    }

    render (){
        return (
            <div>
                <ReactMapGL
                    mapboxApiAccessToken={this.state.token}
                    {...this.state.viewport}
                    onViewportChange={(viewport) => this.setState({viewport})}
                />
            </div>
        );
    }

}

export default Map;