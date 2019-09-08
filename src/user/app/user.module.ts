import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CqrsModule} from '@nestjs/cqrs';
import {UserEntity} from '../domain';
import {UniqueEmailConstraint} from "../ui/validator";
import {UserRepository} from "../infrastructure/typeorm";
import {FindUserQueryHandler} from "./query";
import {UserResolvers} from "../ui/graphql";
import {RegisterUserHandler} from "./command";
import {UserController} from "../ui/controller";

/* Export command handlers */
export const CommandHandlers = [
    RegisterUserHandler,
];

/* Export query handlers */
export const QueryHandlers = [
    FindUserQueryHandler,
];

/* Export GraphQL resolvers */
export const Resolvers = [
    UserResolvers
];

/* Export services */
export const Services = [];

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        CqrsModule,
    ],
    controllers: [
        UserController,
    ],
    providers: [
        { provide: 'UserRepositoryInterface', useClass: UserRepository },
        ...Resolvers,
        ...Services,
        UniqueEmailConstraint,
        ...CommandHandlers,
        ...QueryHandlers
    ],
    exports: [
        ...Services,
    ],
})
export class UserModule {
}
