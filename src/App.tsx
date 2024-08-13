import './App.css';
import PlaceDevider from './components/PlaceDevider';
import MainBanner from './pages/MainBanner';
import SearchBar from './pages/SearchBar';
import GenreSearch from './pages/GenreSearch';
import SearchList from './pages/SearchList';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { useEffect, useState } from 'react';
import { setSongList } from './features/songSlice';
import axios from 'axios';


function App() {

  const songs = useSelector((state:RootState)=>state.song);
  const dispatch = useDispatch();

  useEffect(()=>{
    //
    axios.get("http://localhost:8087/soundcast/selectAll")
      .then((response) => {
        dispatch(setSongList(response.data))
      })
      .catch((err) => console.log(err))
    
  },[]);

  return (
    <div className="App">
      {/* 헤더 */}
      <PlaceDevider/>
        
      <Routes>    
      {/* 검색어가 없을 경우 null일때  MainBanner를 표시 // 있으면 사라짐 >> 삼항 연산자?*/}
        <Route path='/' element={
          <>  
            <MainBanner/>
            <GenreSearch/>
            <SearchBar/>
            <SearchList/>
          </>
        }/>
        <Route path='/search' element={
          <>
            <GenreSearch/>
            <SearchBar/>
            <SearchList />
          </>
          }/>
      </Routes>

      
    </div>    
  );
}

export default App;
