SHELL 		   = /bin/bash
DOCKER_CMD   = docker
DOCKER_IMAGE = toucan/components-builder
SSH_USER_DIR = ${HOME}/.ssh
PORT         = 8000

DOCKERHUB_REGISTRY = docker.io

sudo = disable
bold:=`tput bold`
green:=`tput setaf 2`
reset:=`tput sgr0`
ifeq ($(sudo),enable)
	DOCKER_CMD := sudo ${DOCKER_CMD}
endif

docker:
	${DOCKER_CMD} build -t ${DOCKER_IMAGE} .

	test -t 1 && USE_TTY="-t"; \
	for a in $$ports; do PORT_DOCKER="-p $$a:$$a $$PORT_DOCKER";done; \
	if [ -n "$$name" ]; then NAME_DOCKER="--name tucana_$$name"; fi && \
	${DOCKER_CMD} run --rm -i $$USE_TTY \
		-v "${PWD}":/app:Z \
		-v "${SSH_USER_DIR}":/root/.ssh:ro \
		-v /etc/ssh/ssh_known_hosts:/etc/ssh/ssh_known_hosts:ro \
		$$PORT_DOCKER \
		$$NAME_DOCKER \
		${DOCKER_IMAGE} \
		bash -c "$$cmd"

  HOST_ID=`id -u`; HOST_GID=`id -g`; \
  ${DOCKER_CMD} run --rm \
	  -v "${PWD}":/app:Z \
		${DOCKER_IMAGE} \
		bash -c "chown -R $$HOST_ID:$$HOST_GID ."
