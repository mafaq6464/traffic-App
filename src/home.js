import React from 'react';
import './App.css';
// import Introduction from './components/introduction';
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
    const { startFetch, API: {data}} = this.props ;
    if (!data) startFetch();
  }
 
  render () {
    return (
      <div className="App">
        <Header appName={this.state.applicationName}  />
        <Map data={this.props.API.data} />
      </div>
    );
  }

}

export default Home;