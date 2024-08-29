import { CSSProperties, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setGenre, setKeyword, setMood, setPlaceNo } from "../features/searchSlice";
import { RootState } from "../store/store";
import axios from "axios";
import { setSongList } from "../features/songSlice";

const PlaceDevider = () => {

    const navi = useNavigate();
    const dispatch = useDispatch();
    const search = useSelector((state:RootState) => (state.search));

    const [cssItems, setCssItems] = useState([
        {backgroundColor:"#1C003B", color:"white"},
        {backgroundColor:"white", color:"black"}]);

    const selectedDevider = {backgroundColor:"#1C003B", color:"white"}
    const unselecttedDevider = {backgroundColor:"white", color:"black"}
    
    const handlePlaceNo = (no:number) => {
        
        dispatch(setPlaceNo(no));
        console.log(no);
        console.log(search.placeNo)
        const newCssItems = cssItems.map((item, index) => 
            index === no ? selectedDevider : unselecttedDevider
        );
        setCssItems(newCssItems);

         //가지고 있던 검색 키워드-장르-무드 비우기
         dispatch(setKeyword(''));
         dispatch(setMood(0));
         dispatch(setGenre(0));
         navi("/");
    }    

    useEffect(()=>{
        const newCssItems = cssItems.map((item, index) => 
            index === search.placeNo ? selectedDevider : unselecttedDevider
        );
        setCssItems(newCssItems);
        
        dispatch(setKeyword(''));
         dispatch(setMood(0));
         dispatch(setGenre(0));
         navi("/");


    },[search.placeNo])




    const placeItemStyle = {flexGrow:"1", fontFamily:"sans-serif", border:"4px solid #770ABF",
        fontStyle:"italic", fontWeight:"bolder", fontSize:"40px", borderRadius:"10px"};

    return (
        <div className='place-devider' style={{height:"74px", lineHeight:"67px", display:"flex", backgroundColor:"#1C003B"}}>
            <div 
                key={0}
                onClick={()=>{handlePlaceNo(0)}}
                style={{...placeItemStyle, ...cssItems[0], textAlign:'center'}}>
                Official Place
            </div>
            <div
                key={1}
                onClick={()=>{handlePlaceNo(1)}}
                style={{...placeItemStyle, ...cssItems[1], textAlign:'center'}}>
                Unofficial Place
            </div>
        </div>
    );
}

export default PlaceDevider;