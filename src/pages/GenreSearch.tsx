import { useEffect, useState } from "react";
import {Genre, initGenres} from "../type/SongType";
import MoodSearch from "./MoodSearch";
import { useDispatch } from "react-redux";
import { setKeyword } from "../features/keywordSlice";
import axios from "axios";

function GenreSearch (){
  
  //스타일
  const genreItemFontStyle = {fontFamily:"Inter", fontStyle:"normal", fontSize:"20px", fontWeight:"700", color:"#000000"};
  const genreCommonStyle = {display: "flex", justifyContent: "center", alignItems:"center"}
  const genreItemStyle = {width: "130px", height:"40px", marginRight:"10px", borderRadius: "10px", background:"#FFFFFF"}
   
  const dispatch = useDispatch();
  const [genres, setGenres] = useState<Genre[]>(initGenres);

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseOver = () => {
    setIsHovered(true);
  }
  const handleMouseOut = () => {
    setIsHovered(false);
  }

  useEffect(()=>{
     
    axios.get("http://localhost:8087/soundcast/genres")
      .then((response) => setGenres(response.data))
      .catch((err) => console.log(err))

  },[]);


    return(
      <>
        <div className='search-genre' 
          onMouseOut={handleMouseOut}
          style={{...genreCommonStyle, boxSizing: "border-box", width:"100%", height:"65px", background:"#1C003B"}} >
          <div className='genre' style={{...genreCommonStyle, ...genreItemStyle, boxSizing: "border-box", background:"#BA9FCC"}}>
            <span style={{...genreItemFontStyle ,color:"#FFFFFF"}} >모든 장르</span>
          </div>
              {/* 여기서 부터 select 결과 출력 */}
          {
            genres.map( genre => (
            <div className='genre'
                key={genre.genreNo}
                onMouseOver={handleMouseOver}
                onClick={()=>
                  dispatch(setKeyword(genre.genreName))
                  
                }
                style={{...genreCommonStyle, ...genreItemStyle, boxSizing: "border-box"}}>
              <span style={{...genreItemFontStyle}}>{genre.genreName}</span>
            </div>
            ))  
          } 
        </div>
        {isHovered && <MoodSearch handleMouseOver={handleMouseOver} handleMouseOut={handleMouseOut}/>}
    </>
       
    );
}

export default GenreSearch;