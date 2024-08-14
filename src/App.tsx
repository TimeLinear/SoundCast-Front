import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import PlaceDevider from './components/PlaceDevider';
import { Route, Routes } from 'react-router-dom';
import MusicDetail from './pages/MusicDetail';
import Footer from './components/Footer';

function App() {
  
  return (
    <div className="App">
      <div className='header' style={{height:"110px", boxSizing:"border-box", minWidth:"600px"}}></div>
      <PlaceDevider/>
      <Routes>
          <Route path='/' element={<div>메인페이지</div>}/>
          <Route path='/music/detail' element={<MusicDetail/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
