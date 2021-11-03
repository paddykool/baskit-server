FROM ubuntu:20.04

# --- Selenium stuff --------------------------------

# Install all the selenium stuff...
# https://qxf2.com/blog/preparing-a-docker-image-for-running-selenium-tests/

# Essential tools and xvfb
RUN apt-get update && apt-get install -y \
    software-properties-common \
    unzip \
    curl \
    xvfb

# Chrome browser
RUN curl https://dl-ssl.google.com/linux/linux_signing_key.pub -o /tmp/google.pub \
    && cat /tmp/google.pub | apt-key add -; rm /tmp/google.pub \
    && echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' > /etc/apt/sources.list.d/google.list \
    && mkdir -p /usr/share/desktop-directories \
    && apt-get -y update && apt-get install -y google-chrome-stable
# Disable the SUID sandbox so that chrome can launch without being in a privileged container
RUN dpkg-divert --add --rename --divert /opt/google/chrome/google-chrome.real /opt/google/chrome/google-chrome \
    && echo "#!/bin/bash\nexec /opt/google/chrome/google-chrome.real --no-sandbox --disable-setuid-sandbox \"\$@\"" > /opt/google/chrome/google-chrome \
    && chmod 755 /opt/google/chrome/google-chrome

# Chrome Driver
ENV CHROMEDRIVER_VERSION 95.0.4638.54
RUN mkdir -p /opt/selenium \
    && curl http://chromedriver.storage.googleapis.com/$CHROMEDRIVER_VERSION/chromedriver_linux64.zip -o /opt/selenium/chromedriver_linux64.zip \
    && cd /opt/selenium; unzip /opt/selenium/chromedriver_linux64.zip; rm -rf chromedriver_linux64.zip; ln -fs /opt/selenium/chromedriver /usr/local/bin/chromedriver;


# --- NODE server stuff -----------------------------

# What does this do ???
# ENV NODE_ENV=production

RUN apt-get update -y \
    && apt-get install curl gnupg -y \
    && curl -sL https://deb.nodesource.com/setup_10.x | bash \
    && apt-get install nodejs -y

# TODO Where is a good workdir ?????
# TODO do I actualy need a work dir ?
WORKDIR /usr/src/selenium


# TODO: Create a user apparently chrome doesnt like root

# Do i need to copy the package-lock file ?
COPY package*.json ./

# How do I install for production - no dev dependicies ?
RUN npm install 

# Copy over the code file... 
COPY server.js ./
COPY selenium.js ./

# Copy over the start up sh file
COPY run.sh ./

# Set display port and dbus env to avoid hanging
ENV DISPLAY=:99
ENV DBUS_SESSION_BUS_ADDRESS=/dev/null

# Bash script to invoke xvfb and then run the project
CMD ["/bin/bash","run.sh"]