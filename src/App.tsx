import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import PlaceDevider from './components/PlaceDevider';
import { Route, Routes } from 'react-router-dom';
import MusicDetail from './pages/MusicDetail';

function App() {
  
  return (
    <div className="App">
      <div className='header' style={{height:"110px", width:"1024px", boxSizing:"border-box", flexGrow:"1"}}></div>
      <PlaceDevider/>
      <Routes>
          <Route path='/' element={<div>메인페이지</div>}/>
          <Route path='/music/detail' element={<MusicDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
