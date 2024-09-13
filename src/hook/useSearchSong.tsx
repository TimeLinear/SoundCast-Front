import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setSongList } from "../features/songSlice";

function useSearchSong(){

    const search = useSelector((state:RootState) => state.search)
    const dispatch = useDispatch();

    const searchSongs = () => {
      axios.get(`http://localhost:8087/soundcast/song/search`, {params : search})
        .then((response) => {
          console.log(response.data);
          dispatch(setSongList(response.data));
        })
        .catch((err) => console.log(err));
    }

    return searchSongs;

}

export default useSearchSong;