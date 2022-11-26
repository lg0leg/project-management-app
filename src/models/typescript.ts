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
  passwordRepeat?: string;
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
export interface ITitleJSON {
  title: string;
  description: string;
}
export interface IHandleErrorPayload {
  code: number;
}
export interface IStatusPayload {
  isLoading: boolean;
  isError: boolean;
}

export type navigateType = (path: string) => void;

export interface IAuthValidate {
  value: number;
  message: string;
}

export type ValueOf<T> = T[keyof T];
