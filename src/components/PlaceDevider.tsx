
const PlaceDevider = () => {

    const placeItemStyle = {flexGrow:"1", fontFamily:"sans-serif", border:"4px solid #770ABF",
        fontStyle:"italic", fontWeight:"bolder", fontSize:"35px", borderRadius:"10px", minWidth:"300px"};

    return (
        <div className='place-devider' style={{height:"74px", lineHeight:"67px", display:"flex", backgroundColor:"#1C003B", width:"100vw", boxSizing:"border-box"}}>
            <div style={{...placeItemStyle, color:"white", flexBasis:"512px", boxSizing:"border-box"}}>
                Official Place
            </div>
            <div style={{...placeItemStyle, backgroundColor:"white", color:"black", flexBasis:"512px", boxSizing:"border-box"}}>
                Unofficial Place
            </div>
        </div>
    );
}

export default PlaceDevider;