import { Admin, User } from "./auth.types";

export function isAdmin(value: unknown): value is Admin {
  return !!value
    && typeof value === "object"
    && typeof (value as Admin)?.role === "number";
}

export function isUser(value: unknown): value is User {
  return !!value
    && typeof value === "object"
    && typeof (value as User)?.nationality === "string";
}
