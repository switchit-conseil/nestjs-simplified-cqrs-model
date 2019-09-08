import {IsNotEmpty} from 'class-validator';
import {UniqueEmail} from '../validator/unique-email.constraint';

/**
 * This is the main class used to create a user
 */
export class RegisterUserDto {
    @IsNotEmpty()
    @UniqueEmail({
        message: 'This email is already taken',
    })
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}
