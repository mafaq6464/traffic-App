import React from 'react';
import './App.css';
// import Introduction from './components/introduction';
import Header from './components/Header';
import Map from './components/Map';


class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      api_url: "https://data.edmonton.ca/resource/k4tx-5k8p.json",
      data: null,
      applicationName: 'Traffic App'
    }
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

  render () {
    return (
      <div className="App">
        <Header appName={this.state.applicationName}  />
        <Map data={this.state.data} />
      </div>
    );
  }

}

export default App;
