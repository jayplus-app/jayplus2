#!/bin/bash

# Stop the running frontend container, if any
docker-compose stop frontend

# Remove the existing frontend container, if any
docker-compose rm -f frontend

# Build and start the frontend container
docker-compose up --build frontend