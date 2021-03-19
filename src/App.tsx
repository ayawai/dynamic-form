import React, { FC } from 'react';
import Home from './Home';
import Login from './Login/index';
import './App.css';

const App: FC = () => (
  <div className="App">
    {
      !0
      ? <Home></Home>
      : <Login></Login>
    }
  </div>
);

export default App;