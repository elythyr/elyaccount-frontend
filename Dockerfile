FROM node:alpine

EXPOSE 8080

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --no-progress

# --host 0.0.0.0
# Allow to make webpack dev-server accessible from any local IP (from the container network)
# Given this explenation from: https://www.howtogeek.com/225487/what-is-the-difference-between-127.0.0.1-and-0.0.0.0/
#    In the context of servers, 0.0.0.0 means all IPv4 addresses on the local
#    machine. If a host has two IP addresses, 192.168.1.1 and 10.1.2.1, and a server
#    running on the host listens on 0.0.0.0, it will be reachable at both of those IPs.
# So that's how I can access webpack dev-server while accessing the IP of it's container

# --disable-host-check
# Webpack dev-server option that disable the check of the host
# Needed since I access the container through a proxy (nginx-proxy for the virtual host here)

# --keep-public-path
# Prevents encore to prefix the public path with the dev server url
# Otherwise the assets would be loaded via: http://0.0.0.0/<URI>
# This way the actual host used to access the container is kept
# Meaning: http://<nginx server name>/<URI>
CMD yarn start --host 0.0.0.0 --disable-host-check --keep-public-path
