# Container with everythin to build tc-components
#
# NAME toucan/components-builder

FROM node:latest

# global variables
ENV CHROME_BIN       /usr/bin/google-chrome
ENV TOUCAN_BUILD_ENV /etc/toucan_build_env
ENV APP              /app

# remove old repository
RUN sed -i -e '/stretch-updates/d' /etc/apt/sources.list

# install chrome and jq
RUN apt-get update &&\
    apt-get install -fyq apt-transport-https &&\
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - &&\
    echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list &&\
    apt-get update &&\
    apt-get install -fyq google-chrome-stable &&\
    apt-get clean &&\
    apt-get autoclean &&\
    rm -rf /tmp/* /var/tmp/* /var/lib/apt/lists/*

RUN echo "CHROME_BIN=${CHROME_BIN}" >> ${TOUCAN_BUILD_ENV}

RUN mkdir $APP
WORKDIR $APP

# you can always overwrite this
CMD yarn start
