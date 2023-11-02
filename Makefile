# Default target to run when just executing `make`
.DEFAULT_GOAL := up

# Start all services
up:
	@docker-compose up --build

# Start all services in detached mode
up-detached:
	@docker-compose up --build -d

# Stop all services
down:
	@docker-compose down

# Stop and remove all containers, networks, volumes, and images
clean:
	@docker-compose down --rmi all -v