export interface IAdvert {
    Logo: string
    LogoType: number
    Name: string
}

export interface IGroup {
    ID: string
    Name : string
    Description: string
    Logo: string
 }

 export interface INewPostProps {
    groupId : string
    userId : string
    rootPostId : string
    parentPostId : string
}

 export interface IPost {
    ID: string
    Text : string     
    CreatedDateTime : any   
    GroupID : string    
    UserID : string
    RootPostID : string
    ParentPostID : string
    UserName : string
    UserLogo : string
    UserPostInfoVote : number
    UserPostInfoTrack : number
 }

 export interface IUser {
    ID: string
    Name: string
    Email: string
    Logo: string
 }

 export interface ICurrentUserInfo {    
    email: string
    userName: string
    userId: string
    token : string
 }