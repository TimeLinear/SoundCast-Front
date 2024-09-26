import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setSongList } from "../features/songSlice";
import { setGenre, setKeyword, setMood } from "../features/searchSlice";
import { useEffect } from "react";

function useSearchSong(){

    const search = useSelector((state:RootState) => state.search)
    const dispatch = useDispatch();

    const searchSongs = () => {
      axios.get(`http://localhost:8087/soundcast/song/search`, {params : search})
        .then((response) => {
          dispatch(setSongList(response.data));
        })
        .catch((err) => console.log(err));
    }

  // `searchSongs`를 반환하기 때문에 `searchSongs` 호출 이후에만 상태를 초기화
  useEffect(() => {
    if (search.keyword !== '' || search.genre >= 0 || search.mood >= 0) {
      searchSongs();

    }
  }, [search, dispatch]); // 의존성 배열에 `search`와 `dispatch` 추가

    return searchSongs;

}

export default useSearchSong;