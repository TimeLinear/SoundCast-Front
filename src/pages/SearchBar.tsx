import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { setGenre, setKeyword, setMood } from "../features/searchSlice";
import { setSongList } from "../features/songSlice";
import { ChangeEvent, useEffect, useState } from "react";
import useSearchSong from "../hook/useSearchSong";

function SearchBar({searchKeyword}:{searchKeyword:string}){
  
  //스타일
  const searchBarStyle = {display: "flex", justifyContent: "center", alignItems:"center", width:"100%", height:"65px", background:"#1C003B"};
  const searchBarBodyStyle = {display: "flex", justifyContent: "space-evenly", alignItems:"center", width:"60%", height:"70%", background:"#FFFFFF", borderRadius:"20px"}
  const searchBarFontStyle = {fontFamily:"Inter", fontStyle:"normal", fontSize:"20px", fontWeight:"700"};
  
  const navi = useNavigate();
  const dispatch = useDispatch();
  
  const [inputkeyword, setInputKeyword] = useState('');
  
  const onInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    const inputStr = e.target.value;
    setInputKeyword(inputStr);
  }

  const onResetKeyword = () =>{
    setInputKeyword('');
  }

  const serverImagePath = "http://localhost:8087/soundcast/resource/";

  return(
      <div className='search-bar' style={{...searchBarStyle, boxSizing:"border-box"}}>
        <div className='search-bar-body' style={{...searchBarBodyStyle, boxSizing:"border-box"}}>
          <div className='search-icon-box' style={{width: "35px", height: "35px", cursor: "pointer"}} onClick={() => {dispatch(setKeyword(inputkeyword)); navi("/search"); onResetKeyword();}}>
            <img src={serverImagePath+'public/main/search-icon.png'} style={{width: "100%", height: "100%"}}/>
          </div>
          <div className='search-bar-input' style={{width:"85%", height:"90%"}}>
            <input
              type="text"
              value={inputkeyword}
              onChange={onInputChange}
              onKeyDown={(e) => {if(e.key === 'Enter'){dispatch(setKeyword(inputkeyword)); navi("/search"); onResetKeyword();}}}
              style={{...searchBarFontStyle, border:"0", width:"100%", height:"90%"}} placeholder='Sound CAST의 장르별 음원 검색' />
          </div>
        </div>
      </div>
  );
}
export default SearchBar;