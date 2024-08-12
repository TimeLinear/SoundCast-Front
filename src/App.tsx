import './App.css';
import PlaceDevider from './components/PlaceDevider';
import MainBanner from './pages/MainBanner';
import SearchBar from './pages/SearchBar';
import GenreSearch from './pages/GenreSearch';
import SearchList from './pages/SearchList';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';


function App() {

  const song = useSelector((state:RootState)=>state.song);
  

  return (
    <div className="App">

      {/* 헤더 */}
      <PlaceDevider/>
          
      {/* 검색어가 없을 경우 null일때  MainBanner를 표시 // 있으면 사라짐 >> 삼항 연산자?*/}
      <MainBanner/>             
      
      <GenreSearch/>
      <SearchBar/>
      <SearchList/>
      

      <Routes>    
        <Route path='/' element={<SearchList />}/>
        <Route path='/search' element={<SearchList />}/>
      </Routes>

      
    </div>    
  );
}

export default App;
