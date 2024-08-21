import { CSSProperties, MouseEvent, useEffect, useState } from "react";
import { initMoods, Mood } from "../type/SongType";
import { SearchProps } from "./GenreSearch";
import axios from "axios";

function MoodSearch(props:SearchProps){

    const {handleMouseOver, handleMouseOut, searchGenreNo, onLeaveSearchs} = props

    const moodItemFontStyle:CSSProperties = {fontFamily:"Inter", fontStyle:"normal", fontSize:"16px", lineHeight: "19px", fontWeight:"700", color:"#000000"};
    const moodCommonStyle:CSSProperties = {display: "flex", justifyContent: "center", alignItems:"center", width: "130px", height:"40px", marginRight:"10px", boxSizing: "border-box"};
  
     //------------수정한 부분(08/21)
    const [moods, setMoods] = useState<Mood[]>(initMoods);
    
    useEffect(()=>{
      axios.get("http://localhost:8087/soundcast/song/moods")
      .then((response) => setMoods(response.data))
      .catch((err) => console.log(err))
 
    },[]);
    //--------------------------------


    const [searchMoodNo, setSearchMoodNo] = useState<number>(-1);

    const onHoverMood = (e:MouseEvent, moodNo:number) => {
      e.stopPropagation();
      setSearchMoodNo(moodNo);
    }

    const onLeaveMood = (e:MouseEvent) => {
      e.stopPropagation();
      setSearchMoodNo(-1);
    }
  
    return (
      <div id="search-mood" 
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        style={{...moodCommonStyle, position : "absolute", zIndex: 10, boxSizing: "border-box", width:"100%",
          height:"75px", background: "rgba(217, 217, 217, 0.8)"}}>
        
        {/* 여기서 부터 select 결과 출력 */}
        {
          moods.map( mood => (
            <div id='mood' style={{...moodCommonStyle}} onMouseOver={(e) => onHoverMood(e, mood.moodNo)} onMouseLeave={(e) => onLeaveMood(e)}>
              <span style={searchMoodNo === mood.moodNo ? {...moodItemFontStyle, color:"#FFFFFF"} : moodItemFontStyle}>{mood.moodName}</span>
            </div>
          ))  
        }
      </div>
  
    );
  }
  

export default MoodSearch;
  
  