import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const MainBanner = () => {
    

    const search = useSelector((state:RootState) => state.search)
    const url = "http://localhost:8087/soundcast/resource/";

    return(
        <div className='banner-box' style={{width:"100%", height:"410px"}}>
              <img src={ search.placeNo === 0 ? url+"public/main/banner-image-official.png" : url+"public/main/banner-image-unofficial.jpg"} 
                style={{width:"100%", height:"100%", objectFit:"fill"}}/>
        </div>

    );
}
export default MainBanner;