import {UserEntity} from "../user.entity";

/**
 * Implement this repository for user storage
 */
export interface UserRepositoryInterface {
    /**
     * Implement this function to retrieve the user associated to the given id
     * @param id
     * @throws UserNotFoundException
     */
    find(id: string): Promise<UserEntity>;

    /**
     * Finds a user by its email
     * @param email
     * @throws UserNotFoundException
     */
    findByEmail(email: string): Promise<UserEntity>;

    /**
     * Create a user and register it into the database
     * @param user
     */
    create(user: UserEntity): Promise<UserEntity>;

    /**
     * Save an existing user
     * @param user
     */
    save(user: UserEntity): Promise<UserEntity>;

    /**
     * Removes a user from the database
     * @param user
     */
    remove(user: UserEntity): Promise<UserEntity>;
}
