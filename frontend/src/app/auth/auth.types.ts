export type User = {
  _id: string;
  nationality: string;
}

export type Admin = {
  _id: string;
  role: Roles;
}

export enum Roles {
  CONTENT,
  ACCOUNTING,
  TECHNICAL,
  USER_SUPPORT
}

export type UserLoginDto = {
  mail: string;
  password: string;
}

export type AdminAccessDto = {
  internNum: string;
  password: string;
}
