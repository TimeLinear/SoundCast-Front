import { CSSProperties, MouseEvent, useEffect, useState } from "react";
import {Genre, initGenres} from "../type/SongType";
import MoodSearch from "./MoodSearch";
import { useDispatch } from "react-redux";
import axios from "axios";


export interface SearchProps {
  handleMouseOver: (e:MouseEvent) => void,
  handleMouseOut: (e:MouseEvent) => void,
  onLeaveSearchs: () => void,
  searchGenreNo: number
}

function GenreSearch ({searchGenre, searchMood}:{searchGenre:number, searchMood:number}){
  
  //스타일
  const genreItemFontStyle:CSSProperties = {fontFamily:"Inter", fontStyle:"normal", fontSize:"20px", fontWeight:"700", color:"#000000"};
  const genreCommonStyle:CSSProperties = {display: "flex", justifyContent: "center", alignItems:"center", boxSizing: "border-box",
    width: "130px", height:"40px", marginRight:"10px", borderRadius: "10px", background:"#FFFFFF"}
  const genreItemStyle:CSSProperties = {...genreCommonStyle, background:"#BA9FCC", color:"#FFFFFF"}
  
  const [genres, setGenres] = useState<Genre[]>(initGenres);

  const [isHovered, setIsHovered] = useState({genreDiv:false, moodDiv:false});
  
  const handleMouseOver = (e:MouseEvent) => {
    if((e.target as HTMLDivElement).id === "search-genre") {
      setIsHovered({...isHovered, genreDiv:true});
    } else if((e.target as HTMLDivElement).id === "search-mood") {
      setIsHovered({...isHovered, moodDiv:true});
    }
  }

  const handleMouseOut = (e:MouseEvent) => {
    if((e.target as HTMLDivElement).id === "search-genre") {
      setIsHovered({genreDiv:false, moodDiv:isHovered.moodDiv});
    } else if((e.target as HTMLDivElement).id === "search-mood") {
      setIsHovered({genreDiv:isHovered.genreDiv, moodDiv:false});
    }
  }
  const [searchGenreNo, setSearchGenreNo] = useState(searchGenre);

  const onLeaveSearchs = () => {
    if(!(isHovered.genreDiv || isHovered.moodDiv)) {
      setSearchGenreNo(-1);
    }
  }

  const props:SearchProps = {
    handleMouseOver,
    handleMouseOut,
    onLeaveSearchs,
    searchGenreNo
  }

  const dispatch = useDispatch();

   //------------수정한 부분(08/21)
  useEffect(()=>{
     axios.get("http://localhost:8087/soundcast/song/genres")
     .then((response) => setGenres(response.data))
     .catch((err) => console.log(err))

  },[]);
  //--------------------------

  return(
    <>
      <div id='search-genre'
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        style={{...genreCommonStyle, borderRadius:"", boxSizing: "border-box", width:"100%", height:"65px", background:"#1C003B"}} >
        
        {
          genres.map( genre => (
          <div id='genre'
              key={genre.genreNo}
              onMouseEnter={()=>setSearchGenreNo(genre.genreNo)}
              style={searchGenreNo === genre.genreNo ? genreItemStyle : genreCommonStyle}>
            <span style={searchGenreNo === genre.genreNo ? {...genreItemFontStyle, color:"#FFFFFF"} : genreItemFontStyle}>{genre.genreName}</span>
          </div>
          ))  
        } 
      </div>
      {(isHovered.moodDiv || isHovered.genreDiv) && <MoodSearch {...props}/>}
  </>
      
  );
}

export default GenreSearch;