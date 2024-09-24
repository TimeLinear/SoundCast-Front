import GenreSearch from "./GenreSearch";
import SearchBar from "./SearchBar";
import SearchList from "./SearchList";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function SearchPage(){

  const search = useSelector((state:RootState) => state.search);
  const song = useSelector((state:RootState) => state.song)


  return ( 
      <>
        <GenreSearch searchGenre={search.genre} searchMood={search.mood}/>
        <SearchBar searchKeyword={search.keyword}/>
        <SearchList />
      </>
  );
}

export default SearchPage;
