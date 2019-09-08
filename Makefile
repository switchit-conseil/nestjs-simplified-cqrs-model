#!make
OS=$(shell uname)

include .env
.PHONY: help start-docker stop-docker start stop recreate

.DEFAULT_GOAL := help

# PROJECT_NAME
NODE_ENV?=development
PROJECT_NAME?=simple-cqrs-model

# INITIALIZATIONS
SUBCOMMAND=$(subst +,-, $(filter-out $@,$(MAKECMDGOALS)))
DOCKER_COMPOSE_FILE?=./docker-compose.yml
DOCKER_COMPOSE=docker-compose --file ${DOCKER_COMPOSE_FILE} --project-name=${PROJECT_NAME}
DOCKER_FILE?=./Dockerfile
DOCKER_BUILD_DIR?=.
APP_IMAGE_NAME?=simple-cqrs-model
APP_IMAGE_TAG?=latest
APP_IMAGE_NAMESPACE?=switchit-conseil
APP_IMAGE=${APP_IMAGE_NAMESPACE}/${APP_IMAGE_NAME}

help:
	@clear
	@printf "\033[36m%-30s\033[0m %s\n" help Help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | cut -d: -f2- | sort -t: -k 2,2 | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# Project containers
start-docker: ## (Docker) Start containers (for this project only)
	@${DOCKER_COMPOSE} up -d

stop-docker: ## (Docker) Stop containers (for this project only)
	@${DOCKER_COMPOSE} down --remove-orphans

# All
start: start-docker ## (Docker) Start : dependencies, docker-sync and containers (for this project only)

stop: stop-docker  ## (Docker) Stop : dependencies, docker-sync and containers (for this project only)

restart: stop start ## (Docker) Restart containers (and docker-sync + deps) (for this project only)

recreate: stop ## (Docker) Restart : dependencies, docker-sync and containers with re-build app container (for this project only)
	@${DOCKER_COMPOSE} up --force-recreate --build -d

docker-build-app: ## (Docker) Build application image
	@docker build --target application \
	    --build-arg NODE_ENV=${NODE_ENV} \
	    --file ${DOCKER_FILE} \
	    --tag ${APP_IMAGE}:${APP_IMAGE_TAG} \
	    ${DOCKER_BUILD_DIR}

docker-build: docker-build-app

docker-build-all: docker-build-app

docker-tag: ## (Docker) Tag image
	@docker tag ${APP_IMAGE} ${APP_IMAGE}:${APP_IMAGE_TAG}

docker-push: ## Docker push
	@docker push ${APP_IMAGE}:${APP_IMAGE_TAG}

