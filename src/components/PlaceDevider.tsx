import { CSSProperties, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPlaceNo } from "../features/searchSlice";

const PlaceDevider = () => {

    const navi = useNavigate();
    const dispatch = useDispatch();
   
    
    const [cssItems, setCssItems] = useState([
        {backgroundColor:"#1C003B", color:"white"},
        {backgroundColor:"white", color:"black"}]);

    const selectedDevider = {backgroundColor:"#1C003B", color:"white"}
    const unselecttedDevider = {backgroundColor:"white", color:"black"}
    
    const handlePlaceNo = (no:number) => {
        dispatch(setPlaceNo(no));
        
        const newCssItems = cssItems.map((item, index) => 
            index === no ? selectedDevider : unselecttedDevider
        );
        setCssItems(newCssItems);
        navi("/");
    } 

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