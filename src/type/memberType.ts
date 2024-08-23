export type Member = {
    memberNo : number
    profile :string
    nickName : string
    email: string
    banner: string
    introduce: string
    follow: FollowList
    comment : Comment[]
}

export type FollowList = {
    follower : number
    following : Member[]
   
}

export type Comment ={
    commentNo : number
    writerNo : number
    content : string
    writerInfo : {
       
        profile : string
        nickName : string
        
    }
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