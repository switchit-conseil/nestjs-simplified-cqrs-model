
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class RegisterUserInput {
    email: string;
    password: string;
}

export abstract class IMutation {
    abstract registerUser(registerUser?: RegisterUserInput): User | Promise<User>;
}

export abstract class IQuery {
    abstract findUser(id: string): User | Promise<User>;
}

export class User {
    id: string;
    email: string;
}
