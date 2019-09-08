import {Args, Query, Mutation, Resolver} from '@nestjs/graphql';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {RegisterUserDto} from "../dto";
import {UserEntity} from "../../domain";
import {RegisterUserCommand} from "../../app/command";
import {FindUserQuery} from "../../app/query";

@Resolver('User')
export class UserResolvers {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {
    }

    @Query('findUser')
    async find(@Args('id') id: string): Promise<UserEntity> {
        return await this.queryBus.execute<FindUserQuery, UserEntity>(new FindUserQuery(id));
    }

    @Mutation('registerUser')
    async register(
        @Args('registerUser') arg: RegisterUserDto,
    ): Promise<UserEntity> {
        // Create the user
        return await this.commandBus.execute(new RegisterUserCommand(
            arg.email,
            arg.password
        ));
    }
}
