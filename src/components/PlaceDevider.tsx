import { CSSProperties, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setGenre, setKeyword, setMood, setPlaceNo } from "../features/searchSlice";
import { RootState } from "../store/store";
import useSearchSong from "../hook/useSearchSong";

const PlaceDevider = () => {

    const navi = useNavigate();
    const dispatch = useDispatch();
    const search = useSelector((state:RootState) => (state.search));
    const searchSongs = useSearchSong();

    const [cssItems, setCssItems] = useState([
        {backgroundColor:"#1C003B", color:"white"},
        {backgroundColor:"white", color:"black"}]);

    const selectedDevider = {backgroundColor:"#1C003B", color:"white"}
    const unselecttedDevider = {backgroundColor:"white", color:"black"}
    
    const [trigger, setTrigger] = useState(false);
    //영역 클릭시 placeNo를 전역으로 저장 후 메인페이지로 돌아가기
    const handlePlaceNo = (no:number) => {
            dispatch(setPlaceNo(no));
            setTrigger(prev => !prev);  // 트리거 상태를 변경해 강제로 useEffect 실행
            navi("/");
    }   

    //전역에 저장된 placeNo 바뀔 때마다 useEffect 내부 함수 실행. 영역간 CSS 변경 및 음원 검색함수 호출.
    useEffect(()=>{
        const newCssItems = cssItems.map((item, index) => 
            index === search.placeNo ? selectedDevider : unselecttedDevider
        );
        setCssItems(newCssItems);
        
        dispatch(setKeyword(''));
        dispatch(setMood(0));
        dispatch(setGenre(0));

        searchSongs();

        console.log(search.genre);
        console.log(search.mood);

    },[trigger])

    const placeItemStyle = {flexGrow:"1", fontFamily:"sans-serif", border:"4px solid #770ABF",
        fontStyle:"italic", fontWeight:"bolder", fontSize:"40px", borderRadius:"10px"};

    return (
        <div className='place-devider' style={{height:"74px", lineHeight:"67px", display:"flex", backgroundColor:"#1C003B"}}>
            <div 
                key={0}
                onClick={()=>{
                    handlePlaceNo(0);
                }}
                style={{...placeItemStyle, ...cssItems[0], textAlign:'center'}}>
                Official Place
            </div>
            <div
                key={1}
                onClick={()=>{
                    handlePlaceNo(1);
                }}
                style={{...placeItemStyle, ...cssItems[1], textAlign:'center'}}>
                Unofficial Place
            </div>
        </div>
    );
}

export default PlaceDevider;