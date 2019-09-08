/**
 * Main exception used when a user was not found
 */
export class UserNotFoundException extends Error {

    /**
     * The user with the given Id was not found
     *
     * @param id
     */
    static withId(id: string): UserNotFoundException {
        return new UserNotFoundException(`The user with ${id} was not found.`);
    }

    /**
     * The user with the given Id was not found
     *
     * @param email
     */
    static withEmail(email: string): UserNotFoundException {
        return new UserNotFoundException(`The user with ${email} was not found.`);
    }
}