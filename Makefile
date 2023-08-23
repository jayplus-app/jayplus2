# Default target to run when just executing `make`
.DEFAULT_GOAL := up

# Start both frontend and backend services
up:
	@docker-compose up --build

# Start both frontend and backend services in detached mode
up-detached:
	@docker-compose up --build -d

# Start the backend service
backend-up:
	@docker-compose up --build backend

# Start the backend service in detached mode
backend-up-detached:
	@docker-compose up --build -d backend

# Start the frontend service
frontend-up:
	@docker-compose up --build frontend

# Start the frontend service in detached mode
frontend-up-detached:
	@docker-compose up --build -d frontend

# Stop all services
down:
	@docker-compose down

# Stop and remove all containers and networks
clean:
	@docker-compose down -v
