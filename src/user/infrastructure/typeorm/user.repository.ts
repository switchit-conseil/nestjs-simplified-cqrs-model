import {UserRepositoryInterface} from "../../domain/repository";
import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity, UserNotFoundException} from "../../domain";

/**
 * TypeORM user repository implementation
 */
@Injectable()
export class UserRepository implements UserRepositoryInterface {

    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>) {
    }

    async find(id: string): Promise<UserEntity> {
        const user = await this.repository.findOne(id);
        if (!user) {
            throw UserNotFoundException.withId(id);
        }

        return user;
    }

    async findByEmail(email: string): Promise<UserEntity> {
        const user = await this.repository.findOne({
            where: {email: email}
        });

        if (!user) {
            throw UserNotFoundException.withEmail(email);
        }

        return user;
    }

    async create(user: UserEntity): Promise<UserEntity> {
        return await this.repository.save(user);
    }

    async save(user: UserEntity): Promise<UserEntity> {
        return await this.repository.save(user);
    }

    async remove(user: UserEntity): Promise<UserEntity> {
        user.isDeleted = true;
        return await this.repository.save(user);
    }
}