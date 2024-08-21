import { useSelector } from "react-redux";
import Header from "../components/Header";
import PlaceDevider from "../components/PlaceDevider";
import { RootState } from "../store/store";

export default function myPage() {
    const user = useSelector((state: RootState) => state.member);


    return(
        <div>
            <h4>ㅇㅇ</h4>
        </div>
    );
}