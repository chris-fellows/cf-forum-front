export interface IAdvert {
    ID: string
    FromDateTime: string
    ToDateTime: string
    Logo: string
    LogoType: number
    Name: string,
    External: string
}

export interface IAuditEvent {
    ID: string
    CreatedDateTime: any,
    UserID: string
    UserName: string
    EventTypeName: string
    EventTypeInternalName: string
    Data: any
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

export interface INewPost {
   groupId: string
   userId: string
   text: string
   rootPostId: string
   parentPostId: string
}

export interface INewRootPost {
   groupId: string
   userId: string
   text: string   
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

 export interface IUserPostInfoTrack {
   userId: string,
   track: number
 }

 export interface IUserPostInfoVote {
   userId: string,
   vote: number
 }

 export interface IUser {
    ID: string
    Name: string
    Email: string
    Logo: string
    UserRoleName: string
    UserRoleInternalName: string
 }

 export interface IUserCredentials {
   username: string
   password: string
 }

 export interface ICurrentUserInfo {    
    //email: string
    userName: string
    userId: string
    role: string
    token : string
 }

 export interface IPaginationProps {
   items : any
   pageSize : number
   setPageItems(pageItems : any) : void
}

export interface ITokenPayload {
   username: string
   userid: number
   role: string
}

export interface ILoaderOverlapProps {
   loading: boolean
   message: string
}

export interface ISearchBarProps {
   setFind: (text : string) => void
   delay: number   
}

export interface IDownloadCSVProps<T> {
   title: string
   columns: string[],
   items: T[]
   file: string   
   delimiter: string
   getLine: (item : T, delimiter : string) => string
}

 // Types for contain dependencies
 export type addPostServiceType = (post : INewPost) => Promise<IPost[]>;
 export type addRootPostServiceType = (post : INewRootPost) => Promise<IPost[]>;
 export type deletePostByIdServiceType = (postId : string) => any;
 export type loginServiceType = (credentials : IUserCredentials) => any;
 export type logoutServiceType = () => any;
 export type getAdvertServiceType = (advertid : string) => Promise<IAdvert[]>;
 export type getAdvertsServiceType = (find : string, pageSize : number, pageNumber : number) => Promise<IAdvert[]>;
 export type getAuditByHoursServiceType = (hours: number, pageSize : number, pageNumber : number) => Promise<IAuditEvent[]>;
 export type getAuditByUserServiceType = (userid: string, pageSize : number, pageNumber : number) => Promise<IAuditEvent[]>;
 export type getGroupServiceType = (id : string) => Promise<IGroup[]>;
 export type getGroupsServiceType = (find : string) => Promise<IGroup[]>;
 export type getPostsByRootPostServiceType = (postId : string, pageSize : number, pageNumber : number) => Promise<IPost[]>;
 export type getPostsByUserServiceType = (userid : string, pageSize : number, pageNumber : number) => Promise<IPost[]>;
 export type getRandomAdvertsServiceType = (number : number) => Promise<IAdvert[]>;
 export type getRootPostsByGroupServiceType = (id : string, find : string, pageSize : number, pageNumber : number) => Promise<IPost[]>;
 export type getUserServiceType = (userid : string) => Promise<IUser[]>;
 export type getUsersServiceType = (find : string, pageSize : number, pageNumber : number) => Promise<IUser[]>;
 export type votePostByIdServiceType = (postId : string, details : IUserPostInfoVote) =>  any;

