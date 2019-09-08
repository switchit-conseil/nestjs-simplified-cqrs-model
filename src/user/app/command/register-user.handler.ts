import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs';
import {RegisterUserCommand} from "./register-user.command";
import {Inject} from "@nestjs/common";
import {UserRepositoryInterface} from "../../domain/repository";
import {UserEntity} from "../../domain";
import {UserRegisteredEvent} from "../event";

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
    implements ICommandHandler<RegisterUserCommand> {

    constructor(
        @Inject('UserRepositoryInterface')
        private readonly repository: UserRepositoryInterface,
        private readonly eventBus: EventBus
    ) {}

    async execute(command: RegisterUserCommand) {
        const user = new UserEntity();
        user.password = command.password;
        user.email = command.email;

        const createdUser = await this.repository.save(user);

        this.eventBus.publish(new UserRegisteredEvent(
            createdUser.id,
            createdUser.email,
            createdUser.password
        ));

        return createdUser;
    }
}
