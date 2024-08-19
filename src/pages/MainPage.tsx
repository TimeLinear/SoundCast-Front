import MainBanner from "./MainBanner";
import GenreSearch from "./GenreSearch";
import SearchBar from "./SearchBar";
import SearchList from "./SearchList";

function MainPage(){

  return ( 
      <>
        <MainBanner/>
        <GenreSearch searchGenre={0} searchMood={0}/>
        <SearchBar searchKeyword=""/>
        <SearchList/>
      </>
  );
}

export default MainPage;
