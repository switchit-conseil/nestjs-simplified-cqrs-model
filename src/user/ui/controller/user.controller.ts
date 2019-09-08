import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {QueryBus, CommandBus} from '@nestjs/cqrs';
import {UserEntity} from "../../domain";
import {FindUserQuery} from "../../app/query";
import {RegisterUserDto} from "../dto";
import {RegisterUserCommand} from "../../app/command";

@Controller('users')
export class UserController {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus
    ) {}

    @Get()
    async find(
        @Query('id') id: string,
    ): Promise<UserEntity> {
        return await this.queryBus.execute<FindUserQuery, UserEntity>(new FindUserQuery(id));
    }

    @Post()
    async register(
        @Body() arg: RegisterUserDto,
    ): Promise<UserEntity> {
        // Create the user
        return await this.commandBus.execute(new RegisterUserCommand(
            arg.email,
            arg.password
        ));
    }
}
