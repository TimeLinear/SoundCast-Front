import { useEffect, useState } from "react";
import { initMoods, Mood } from "../type/SongType";
import axios from "axios";

function MoodSearch(props:{ handleMouseOver: () => void; handleMouseOut: () => void; }){

    const {handleMouseOver, handleMouseOut} = props

    const moodItemFontStyle = {fontFamily:"Inter", fontStyle:"normal", fontSize:"16px", lineHeight: "19px", fontWeight:"700", color:"#000000"};
    const moodCommonStyle = {display: "flex", justifyContent: "center", alignItems:"center"};
    const moodItemStyle = {width: "130px", height:"40px", marginRight:"10px"}

    const [moods, setMoods] = useState<Mood[]>(initMoods)
    
    useEffect(()=>{
     
      axios.get("http://localhost:8087/soundcast/moods")
        .then((response) => setMoods(response.data))
        .catch((err) => console.log(err))
  
    },[]);
  
    return (
      <div className="search-mood" 
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{...moodCommonStyle, position : "absolute", zIndex: 10, boxSizing: "border-box", width:"100%", height:"75px", background: "rgba(217, 217, 217, 0.8)"}}>
        
        <div className='mood' style={{...moodCommonStyle, ...moodItemStyle, boxSizing: "border-box"}}>
          <span style={{...moodItemFontStyle ,color:"#FFFFFF"}} >모든 장르</span>
        </div>
        {/* 여기서 부터 select 결과 출력 */}
        {
          moods.map( mood => (
            <div className='genre' style={{...moodCommonStyle, ...moodItemStyle, boxSizing: "border-box"}}>
              <span style={{...moodItemFontStyle}}>{mood.moodName}</span>
            </div>
          ))  
        }
      </div>
  
    );
  }
  

export default MoodSearch;
  
  