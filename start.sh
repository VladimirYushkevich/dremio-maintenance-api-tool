#!/bin/bash

# This script is used to start swaggerUI(in docker) from the OpenAPI maintenance.yaml file

OPENAPI_YAML="openapi.yaml"

check_env_var() {
  local var_name=$1
  local var_value
  var_value=$(eval echo \$"$var_name")
  if [ -z "$var_value" ]; then
    echo "$var_name is not set"
    exit 1
  else
    echo "$var_name is set to $var_value"
  fi
}

check_env_var "AUTH_TOKEN"
check_env_var "DREMIO_HOME"

cp "$DREMIO_HOME/openapi/enterprise/src/main/openapi/maintenance.yaml" "$OPENAPI_YAML"
echo "Copied maintenance.yaml"

docker-compose build --no-cache
docker-compose up
