export interface ILoginRequest {
  login: string;
  password: string;
}

export interface IRegisterRequest extends ILoginRequest {
  name: string;
}

export interface IAuthRequest {
  name?: string;
  login: string;
  password: string;
}

export interface IRegisterResponse {
  _id: string;
  name: string;
  login: string;
}

export interface ILoginResponse {
  token: string;
}

export interface IToken {
  id: string;
  login: string;
  iat: number;
  exp: number;
}

export interface IUser {
  _id: string;
  name: string;
  login: string;
}

export interface IStatusPayload {
  isLoading: boolean;
  isError: boolean;
}
