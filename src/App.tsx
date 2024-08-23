
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Modal from './components/LoginModal';
import { User } from './type/user';
import KakaoLoginForm from './components/KakaoLoginForm';
import { getCookie } from './utils/Cookie';
import axios from './utils/CustomAxios';
import { useDispatch } from 'react-redux';
import { login } from './features/memberSlice';
import { Member } from './type/memberType';
import PlaceDevider from './components/PlaceDevider';
import { Route, Routes } from 'react-router-dom';
import MainBanner from './pages/MainBanner';
import GenreSearch from './pages/GenreSearch';
import SearchBar from './pages/SearchBar';
import SearchList from './pages/SearchList';
import MyPageBanner from './pages/MyPageBanner';

function App() {
  //카카오 로그인 구현 중 
  const [user,setUser] = useState<User | null>(null);

  return (
    <div className="App">
      <Header/>
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
        <Route path='/myPage' element={
          <>
            <MyPageBanner />
            
          </>
          }/>
      </Routes>

    </div>
  );
}

export default App;
