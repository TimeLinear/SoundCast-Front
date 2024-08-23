import MainBanner from "./MainBanner";
import GenreSearch from "./GenreSearch";
import SearchBar from "./SearchBar";
import SearchList from "./SearchList";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function MainPage(){

  //const songs = useSelector((state:RootState) => (state.song))
  return ( 
      <>
        <MainBanner/>
        <GenreSearch searchGenre={-1} searchMood={-1}/>
        <SearchBar searchKeyword=""/>
        <SearchList/>
      </>
  );
}

export default MainPage;
