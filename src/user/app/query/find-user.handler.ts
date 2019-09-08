import {QueryHandler, IQueryHandler} from '@nestjs/cqrs';
import {Inject} from "@nestjs/common";
import {UserRepositoryInterface} from "../../domain/repository";
import {FindUserQuery} from "./find-user.query";

@QueryHandler(FindUserQuery)
export class FindUserQueryHandler implements IQueryHandler<FindUserQuery> {
    constructor(
        @Inject('UserRepositoryInterface')
        private readonly repository: UserRepositoryInterface
    ) {
    }

    /**
     * Execute the create CMS Query
     * @param query
     */
    async execute(query: FindUserQuery) {
        return await this.repository.find(query.id);
    }
}
