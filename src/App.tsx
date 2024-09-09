
import './App.css';
import Header from './components/Header';

import { createContext, useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { RootState } from './store/store';
import { Member } from './type/memberType';
import { getCookie } from './utils/Cookie';
import axios from './utils/CustomAxios';
import { login } from './features/memberSlice';
import PlaceDevider from './components/PlaceDevider';


import UserPage from './pages/UserPage';
import SearchList from './pages/SearchList';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import MyPageBanner from './pages/MyPageBanner';
import SearchPage from './pages/SearchPage';
import MusicDetail from './pages/MusicDetail';


export let Context = createContext({}); //Context == state 보관소

function App() {
  
  const dispatch = useDispatch();

  const member = useSelector((state:RootState) => state.member);

  // 사이트에 들어오면 보는 가장 처음 화면
  // 첫 화면에서 사용자가 사이트 고유 토큰을 가졌는지 검사하고
  // 그 토큰을 백엔드 서버로 보내서 검증하여야한다.(axios)
  // 검증 결과를 받아서 결과가 true(유효한 토큰이다라는 뜻)이고,
  // 같이 넘어온 사용자 정보가 있다면
  // 사용자 정보를 가지고 로그인 버튼을 로그아웃 버튼으로 바꾸고
  // 프로필 이미지를 헤더 상단에 띄워주는 로직이 필요하다
  
  

  return (
    <div className="App">
          <Header/>
      <PlaceDevider/>
      

      <Routes>    
      {/* 검색어가 없을 경우 null일때  MainBanner를 표시 // 있으면 사라짐 >> 삼항 연산자?*/}
        <Route path='/' element={
          <>  
            {/* <MainBanner/>
            <GenreSearch/>
            <SearchBar/>
            <SearchList/> */}
          </>
        }/>
        <Route path='/search' element={
          <>
            {/* <GenreSearch/>
            <SearchBar/>
            <SearchList /> */}
          </>
          }/>
        <Route path='/myPage' element={
          <>
            <MyPageBanner />
            
          </>
          
        }/>

        <Route path='/member/memberInfo/:memberNo' element={
          <>
            <UserPage />
          </>
        }/>


      <Route path='/search' element={<SearchPage />} />
      <Route path='/music/detail' element={<MusicDetail />} />

      </Routes>
        <Footer/>
    </div>
  );
}

export default App;
