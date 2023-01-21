# Pull a lean debian image to run off of
FROM golang:1.19.1-alpine3.15

# Install git for CI
RUN apk add git

# Set working directory for the project
WORKDIR /app

# Copy all files in to the working directory
COPY . .

# Build binaries
RUN go build -o kame-server .

# Expose port
EXPOSE 8080

# Run exec
CMD ["./kame-server"]