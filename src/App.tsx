
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Modal from './components/Modal';
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

  const dispatch = useDispatch();

  // 사이트에 들어오면 보는 가장 처음 화면
  // 첫 화면에서 사용자가 사이트 고유 토큰을 가졌는지 검사하고
  // 그 토큰을 백엔드 서버로 보내서 검증하여야한다.(axios)
  // 검증 결과를 받아서 결과가 true(유효한 토큰이다라는 뜻)이고,
  // 같이 넘어온 사용자 정보가 있다면
  // 사용자 정보를 가지고 로그인 버튼을 로그아웃 버튼으로 바꾸고
  // 프로필 이미지를 헤더 상단에 띄워주는 로직이 필요하다
  useEffect(() => {
    let cookie = getCookie("accessToken");
    console.log(cookie);
    cookie && (
      axios 
            .post("http://localhost:8087/soundcast/auth/login",{
                accessToken:cookie
            })
            .then(res => {
              console.log(res);
              if (!res) {
                return;
              }
              const loginMember:Member = {
                profile:res.data.member.profileImage.profileImagePath,
                nickName:res.data.member.memberNickname,
                email:res.data.member.memberEmail,
                banner:res.data.member.memberBanner.memberBannerPath,
                introduce:res.data.member.memberIntroduce,
                follow:res.data.member.follwer
              }
              dispatch(login(loginMember));
            })
    );
  }, []);

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
