#!/bin/bash

# Stop the running backend container, if any
docker-compose stop backend

# Remove the existing backend container, if any
docker-compose rm -f backend

# Build and start the backend container
docker-compose up --build backend