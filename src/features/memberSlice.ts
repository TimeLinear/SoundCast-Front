import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Member } from "../type/memberType";
import { removeCookie, setCookie } from "../utils/Cookie";



const initialState:Member= {
    profile : '',
    nickName : '',
    email: '',
    banner: '',
    introduce: '',
    follow: 0
}



let memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers:{
        login : (state, action : PayloadAction<Member>) =>{
            const member:Member = action.payload;
           
            return {
                profile:member.profile,
                nickName: member.nickName,
                email: member.email,
                banner: member.banner,
                introduce: member.introduce,
                follow: member.follow
                
            }

           
        },
        logout : (state) =>{
            removeCookie('accessToken');
            
            return initialState;

        }
    }
})

export const{login,logout} = memberSlice.actions;
export default memberSlice.reducer;