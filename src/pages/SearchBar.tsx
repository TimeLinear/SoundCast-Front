import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { setKeyword } from "../features/keywordSlice";
import { setSongList } from "../features/songSlice";

function SearchBar(){
  
  //스타일
  const searchBarStyle = {display: "flex", justifyContent: "center", alignItems:"center", width:"100%", height:"65px", background:"#1C003B"};
  const searchBarBodyStyle = {display: "flex", justifyContent: "space-evenly", alignItems:"center", width:"60%", height:"70%", background:"#FFFFFF", borderRadius:"20px"}
  const searchBarFontStyle = {fontFamily:"Inter", fontStyle:"normal", fontSize:"20px", fontWeight:"700"};
  
  const navi = useNavigate();
  const dispatch = useDispatch();
  const keyword = useSelector((state:RootState)=>state.keyword);  

  const searchSongs = () => {
      //searchList에 searchKeyword를 넣고 실행시킴. 
      
      axios.get(`http://localhost:8087/soundcast/searchSong/${keyword}`)
      .then((response) => {
          //키워드로 db에 저장된 노래 불러와 리스트 전역에 저장
          dispatch(setSongList(response.data));
        })
      .catch((err)=>console.log(err))
      console.log(keyword);
      navi('/search');
  }
  

    return(
        <div className='search-bar' style={{...searchBarStyle, boxSizing:"border-box"}}>
          <div className='search-bar-body' style={{...searchBarBodyStyle, boxSizing:"border-box"}}>
            <div className='search-icon-box' style={{height: "35px"}}>
              <img src='images/search-icon.png' style={{height: "100%"}}/>
            </div>
            <div className='search-bar-input' style={{width:"85%", height:"90%"}}>
              <input
                type="text"
                value={keyword}
                onChange={(e)=>{dispatch(setKeyword(e.target.value))}}
                onKeyDown={(e) => {if(e.key === 'Enter'){searchSongs()}}}
                style={{...searchBarFontStyle, border:"0", width:"100%", height:"90%"}} placeholder='Sound CAST의 장르별 음원 검색' />
            </div>
          </div>
        </div>
    );
}
export default SearchBar;