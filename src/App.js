import React from 'react';
import './App.css';
// import Introduction from './components/introduction';
import Header from './components/Header';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      applicationName: 'Traffic App'
    }
  }

  render () {
    return (
      <div className="App">
        <Header appName={this.state.applicationName}  />
      </div>
    );
  }

}

export default App;
