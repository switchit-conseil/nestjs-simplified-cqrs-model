#!/bin/bash
set -e

file_env() {
    local var="$1"
    local fileVar="${var}__SECRET_FILE"
    local def="${2:-}"
    if [ "${!var:-}" ] && [ "${!fileVar:-}" ]; then
        echo >&2 "error: both $var and $fileVar are set (but are exclusive)"
        exit 1
    fi
    local val="$def"
    if [ "${!var:-}" ]; then
        val="${!var}"
    elif [ "${!fileVar:-}" ]; then
        val="$(< "${!fileVar}")"
    fi
    export "$var"="$val"
    unset "$fileVar"
}

while IFS='=' read -r name value ; do
    if [[ $name == *__SECRET_FILE ]]
    then
        tmp=${name%__SECRET_FILE*}
        file_env $tmp;
    fi
done < <(env)

if [ "${1#-}" != "${1}" ] || [ -z "$(command -v "${1}")" ]; then
  set -- node "$@"
fi

exec "$@"
