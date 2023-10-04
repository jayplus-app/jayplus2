# Use the official Golang image to create a build artifact.
FROM golang:1.20 AS builder

# Copy local code to the container image.
WORKDIR /app
COPY go.* ./
RUN go mod download
COPY . ./

# Build the command inside the container.
RUN CGO_ENABLED=0 GOOS=linux go build -o /backend cmd/app/main.go

# Use a minimal alpine image
FROM alpine:latest

# Copy the binary to the production image from the builder stage.
COPY --from=builder /backend /backend

RUN apk --no-cache add tzdata

# Run the backend binary.
CMD ["/backend"]
