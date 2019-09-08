FROM node:11 as builder

WORKDIR /home/app

COPY . .
RUN NODE_ENV=development yarn install && \
    NODE_ENV=development yarn build && \
    NODE_ENV=development yarn graphql:dist


FROM node:11 as application

ARG NODE_ENV

ENV PORT=3000 \
    TYPEORM_CONNECTION=postgres \
    TYPEORM_USERNAME=postgres \
    TYPEORM_HOST=localhost \
    TYPEORM_PORT=5432 \
    TYPEORM_DATABASE=switchit_simple_cqrs_model \
    TYPEORM_ENTITIES=dist/**/*.entity.js

WORKDIR /home/app

COPY --from=builder /home/app/dist ./dist
COPY --from=builder /home/app/package.json /home/app/yarn.lock ./
COPY ./docker/docker-entrypoint.sh /usr/bin/docker-secret-entrypoint.sh

RUN chmod +x /usr/bin/docker-secret-entrypoint.sh && \
    yarn install --production

EXPOSE 3000
ENTRYPOINT ["/usr/bin/docker-secret-entrypoint.sh"]
CMD [ "yarn", "start:prod" ]
