import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button'
import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <Home></Home>      
      <Button name="test"></Button>
        
    </div>
  );
}

export default App;
