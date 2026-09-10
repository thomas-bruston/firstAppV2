export interface IAuthUser {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
}

export interface ILoginRequest {
    username: string;
    password: string;
    expiresInMins?: number;

}
export interface IRefreshRequest{
    refreshToken : string;
    expiresInMins?: number;

}

export type ILoginResponse = IAuthUser & {accessToken:string; refreshToken: string}
export type IRefreshResponse = Pick<ILoginResponse, 'accessToken' | 'refreshToken'>;
