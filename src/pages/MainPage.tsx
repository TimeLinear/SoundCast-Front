import { Route, Routes } from "react-router-dom";
import Mypage from "../components/Mypage";
import PlaceDevider from "../components/PlaceDevider";
import MainBanner from "./MainBanner";
import GenreSearch from "./GenreSearch";
import SearchBar from "./SearchBar";
import SearchList from "./SearchList";

function MainPage(){

    return (
        
        <>
        <Mypage/>

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

        </>

    );
}

export default MainPage;
