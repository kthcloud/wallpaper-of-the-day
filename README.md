# Wallpaper of the Day

This is a Node.js server that fetches the Bing Wallpaper of the Day and serves it as a JPEG image.

## Usage

To start the server, run:

`npm start`

The server will listen on port 8080 by default, or the value of the `APP_PORT` environment variable if set. You can access the server by visiting `http://localhost:8080` in your web browser.

## Deployment

You can deploy this server using Docker by building the Docker image and running the container on your server. Alternatively, you can use the public instance of this server at `https://wallpaper-of-the-day.app.cloud.cbh.kth.se/`.

### Deploying with Docker

To deploy with Docker, you can follow these steps:

1. Install Docker on your server.
2. Copy the server files to your server.
3. Build the Docker image by running `docker build -t wallpaper-of-the-day .` in the server directory.
4. Run the Docker container by running `docker run -p 8080:8080 -d wallpaper-of-the-day`.

This will start the server in a Docker container and map port 8080 in the container to port 8080 on the host machine. You can then access the Node.js server by visiting `http://localhost:8080` in your web browser.

### Using the public instance

You can use the public instance of this server at `https://wallpaper-of-the-day.app.cloud.cbh.kth.se/`. This server is hosted on the cloud and does not require any setup or configuration on your part.

## Credits

This server was created by GitHub Copilot Chat.
