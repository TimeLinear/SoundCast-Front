import MainBanner from "./MainBanner";
import GenreSearch from "./GenreSearch";
import SearchBar from "./SearchBar";
import SearchList from "./SearchList";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useParams } from "react-router-dom";

function SearchPage(){

  const search = useSelector((state:RootState) => state.search);

  return ( 
      <>
        <GenreSearch searchGenre={search.genre} searchMood={search.mood}/>
        <SearchBar searchKeyword={search.keyword}/>
        <SearchList/>
      </>
  );
}

export default SearchPage;
