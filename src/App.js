import React from 'react';

import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './Login';
import Home from './Home';
import Admin from './Admin';
import Old from './Old';


function App() {
  
  return (
    <div>
      <Routes>

        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={ <Home/> } />
        <Route path="/admin" element={ <Admin/> } />
        <Route path="/logino" element={ <Old/> } /> 
        <Route path="/" element={ <Old/> } /> 
      </Routes>

    </div>
  );
}

export default App;
