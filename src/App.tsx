
import './App.css';
import Header from './components/Header';

import { createContext} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import PlaceDevider from './components/PlaceDevider';


import UserPage from './pages/UserPage';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import SearchPage from './pages/SearchPage';
import MusicDetail from './pages/MusicDetail';
import Mypage from './pages/Mypage';
import MainPage from './pages/MainPage';
import Commnuity from './pages/Commnuity';
import Introduce from './pages/Introduce';



export let Context = createContext({}); //Context == state 보관소

function App() {

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
      <Header />
      <PlaceDevider />
      <Routes>
        
        <Route path='/' element={<MainPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/song/detail/:musicNo' element={<MusicDetail/>} />
        <Route path='/member/mypage' element={<Mypage />} />
        <Route path='/member/memberInfo/:memberNo' element={<UserPage/>}/>

        <Route path='/community' element={<Commnuity />}/>
        <Route path='/introduce/:section' element={<Introduce />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
