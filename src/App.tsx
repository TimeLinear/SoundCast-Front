import { Route, Routes } from 'react-router-dom';
import './App.css';
import PlaceDevider from './components/PlaceDevider';
import MainPage from './pages/MainPage';
import MusicDetail from './pages/MusicDetail';
import Mypage from './pages/Mypage';
import Footer from './components/Footer';


function App() {

  return (
    <div className="App">
      <div className='header' style={{ height: "110px", boxSizing: "border-box", minWidth: "600px" }}></div>
      <PlaceDevider />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/search/:keyword' element={<MainPage />} />
        <Route path='/music/detail' element={<MusicDetail />} />
        <Route path='/member/mypage' element={<Mypage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
