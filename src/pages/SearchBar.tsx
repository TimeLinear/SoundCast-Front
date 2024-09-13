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
  const search = useSelector((state:RootState)=>state.search);
  // 입력창에 직접 store의 state를 사용하는 건 지양하는 것이 좋습니다.
  
  const [inputkeyword, setInputKeyword] = useState(searchKeyword);
  
  //검색함수 수정 09/11
  const searchSongs = useSearchSong();

  const onInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    const inputStr = e.target.value;
    setInputKeyword(inputStr);
  }

  //------------수정한 부분(08/21)-------------
  // const searchSong = () => {
  //     dispatch(setKeyword(inputkeyword));      
  //     console.log(inputkeyword);

  //     // search 객체를 보내서 백엔드 측에서 jackson 라이브러리를 통해 다시 HashMap으로 만드는 작업 시도
  //     axios.get(`http://localhost:8087/soundcast/song/search`, {params : search})
  //       .then((response) => {
  //           //키워드로 db에 저장된 노래 불러와 리스트 전역에 저장
  //           console.log(response.data);
  //           dispatch(setSongList(response.data));
  //         })
  //       .catch((err)=>console.log(err));

  //     navi("/search");
      
  //     setInputKeyword('');
  // }
  //-----------------------------------------

  // useEffect(()=>{
    
  //   searchSongs();

  //   navi("/search");
      
  //   setInputKeyword('');

  // },[inputkeyword])


  const serverImagePath = "http://localhost:8087/soundcast/resource/";

  return(
      <div className='search-bar' style={{...searchBarStyle, boxSizing:"border-box"}}>
        <div className='search-bar-body' style={{...searchBarBodyStyle, boxSizing:"border-box"}}>
          <div className='search-icon-box' style={{height: "35px"}}>
            <img src={serverImagePath+'public/main/search-icon.png'} style={{height: "100%"}}/>
          </div>
          <div className='search-bar-input' style={{width:"85%", height:"90%"}}>
            <input
              type="text"
              value={inputkeyword}
              onChange={onInputChange}
              onKeyDown={(e) => {if(e.key === 'Enter'){dispatch(setKeyword(inputkeyword));}}}
              style={{...searchBarFontStyle, border:"0", width:"100%", height:"90%"}} placeholder='Sound CAST의 장르별 음원 검색' />
          </div>
        </div>
      </div>
  );
}
export default SearchBar;