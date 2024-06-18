import { UserType } from "./usersTypes.model";
// Objeto a renderizar
// de cats sólo se extrae "fact" que es de tipo string y no necesita un tipado profundo
export interface factWithUser {
    fact: string,
    user: UserType
}