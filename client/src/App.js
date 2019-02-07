import React, { Component } from 'react';
import './App.css';
import Header from './Component/shared/header';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Header/>
      <h1>Hello react app</h1>
      </div>
    );
  }
}

export default App;
