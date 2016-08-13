# =============================================================================
# HighFive-Client
# Base: Node: 6.3.1
# App Dependencies:
#	- nginx: latest
# =============================================================================

FROM node:6.3.1
MAINTAINER "Ariel Partners"

# -----------------------------------------------------------------------------
# Install common packages required for the deploy process
# -----------------------------------------------------------------------------
RUN apt-get update && \
	apt-get install -y curl && \
	apt-get install -y zip && \
	apt-get install -y unzip

# -----------------------------------------------------------------------------
# Install nginx and supervisord
# -----------------------------------------------------------------------------
RUN apt-get install -y nginx
RUN apt-get install -y supervisor && \
    mkdir -p /var/log/supervisor/


# -----------------------------------------------------------------------------
# Application Processes
# -----------------------------------------------------------------------------

# forward request and error logs to docker log collector
# see - http://veithen.github.io/2015/01/08/supervisord-redirecting-stdout.html
RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
	ln -sf /dev/stderr /var/log/nginx/error.log

# updating default configurations
COPY supervisord.conf /usr/etc/supervisord.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Setup client app
ENV NODE_ENV $NODE_ENV
ENV APP_NAME HighFive-Client

# COPY the deploy artifact
COPY $APP_NAME.zip /opt/$APP_NAME/
ADD scripts/env-vars.js /opt/$APP_NAME/scripts/env-vars.js
WORKDIR /opt/$APP_NAME
RUN mkdir www && \
	unzip $APP_NAME.zip -d www && \
	chmod u+x scripts/env-vars.js

# install npm modules your node shell scripts needs
RUN cd scripts && \
	npm install --save async && \
	npm install --save lodash

# Expose target app ports
EXPOSE 8080

# Run supervisor to manage processes
CMD "/opt/$APP_NAME/scripts/env-vars.js" && \
	"/usr/bin/supervisord"