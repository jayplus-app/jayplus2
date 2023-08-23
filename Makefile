# Default target to run when just executing `make`
.DEFAULT_GOAL := up

# Start both frontend and backend services
up:
	@docker-compose up --build

# Start the backend service
backend-up:
	@docker-compose up --build backend

# Start the frontend service
frontend-up:
	@docker-compose up --build frontend

# Stop all services
down:
	@docker-compose down

# Stop and remove all containers and networks
clean:
	@docker-compose down -v
