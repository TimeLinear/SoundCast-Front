export type Member = {
    memberNo : number
    profile :string
    nickName : string
    email: string
    banner: string
    introduce: string
    follow: FollowList

}

export type FollowList = {
    follower : number
    following : Followings[]
}

export type Followings = {
    nickName : string
    profile : string
}


export type SetMember = (list:Member) => void;

export interface Props{
    member: Member;
    setMember: SetMember
}

export type LoginResponse ={
    token_type: string;
    access_token: string;
    expires_in: string;
    refresh_token: string;
    refresh_token_expires_in: number;
    scope: string;
}