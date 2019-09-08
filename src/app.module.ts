import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from "./user/app/user.module";

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forRoot(),
        GraphQLModule.forRoot({
            typePaths: ['./**/*.graphql'],
            installSubscriptionHandlers: true,
            playground: true,
            context: ({req}) => ({req}),
        }),
    ],
})
export class AppModule {
}
