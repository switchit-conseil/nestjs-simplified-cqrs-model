import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    ValidationOptions,
    registerDecorator,
} from 'class-validator';
import {Inject, Injectable} from '@nestjs/common';
import {UserRepositoryInterface} from "../../domain/repository";

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailConstraint implements ValidatorConstraintInterface {
    constructor(
        @Inject('UserRepositoryInterface')
        private readonly repository: UserRepositoryInterface
    ) {}

    validate(email: any, args: ValidationArguments) {
        return this.repository.findByEmail(email).then(user => {
            return !user;
        }).catch(() => {
            return true;
        });
    }
}

export function UniqueEmail(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: UniqueEmailConstraint,
        });
    };
}
