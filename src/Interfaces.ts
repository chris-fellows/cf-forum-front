import { ServiceFunctionType } from "./customTypes"

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

export interface IContent {
   Name: string
   Data: string
}

export interface IGroup {
    ID: string
    Name : string
    Description: string
    Logo: string
 }

 export interface IGroupTag {
   ID: string
   GroupID : string
   TagID : string
   TagName : string   
}

 export interface ILanguage {
   ID: string
   Name: string   
}

export interface IMenuItem {
   ID: string
   Name: string
}

export interface IPopupMenu {
   IsVisible: boolean
   MenuItems: IMenuItem[]
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

export interface IPage {
   ID: string
   Name: string   
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

 export interface IPostTag {
   ID: string
   PostID : string
   TagID : string
   TagName : string   
}

 export interface ITag {
   ID: string
   Name: string   
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
    isLoggedIn: boolean
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
