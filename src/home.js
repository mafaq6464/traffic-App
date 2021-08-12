import React from 'react';
import './App.css';
import Header from './components/Header';
import Map from './components/Map';


class Home extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data: null,
      applicationName: 'Traffic App'
    }
  }

  componentDidMount(){
    const { startFetch, API: {data}} = this.props;
    if (!data) startFetch();
  }
  
  render () {
    const { data } = this.props.API;
    const accidentCount = data && data.features.length;
    return (
      <div className="App">
        <Header count={ accidentCount || 0 } appName={this.state.applicationName}  />
        <Map data={this.props.API.data} />
      </div>
    );
  }

}

export default Home;