# Container with everything to build tc-components
#
# NAME toucan/components-builder

FROM node:latest

# global variables
ENV TOUCAN_BUILD_ENV /etc/toucan_build_env
ENV PROJECT_DIR      /tc-components

# remove old repository
RUN sed -i -e '/stretch-updates/d' /etc/apt/sources.list

RUN mkdir $PROJECT_DIR
WORKDIR $PROJECT_DIR

# you can always overwrite this
CMD yarn build
