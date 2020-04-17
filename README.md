# Toucan components

Base building blocks of Toucan Toco apps.

## Overview

This package exposes Vue components for use in other Toucan Toco projects.
We use [vue-cli](https://cli.vuejs.org/) as build system and tooling.
Demo and documentation can be found on https://tc-components.edlb.dev.

## Pre-requisites

`node` and `yarn` are required to run the following commands.

Alternatively, the `yarn` commands can be executed in a Docker container, like `node:latest`:
```bash
docker run -iv $PWD:/tc-components -w /tc-components -t node:latest yarn <command>
```

## Build

`yarn build` exports transpiled JS files in the `dist/` folder, prior to publication.

The public API is exposed in `src/main.js`. Export all usable components and utility functions in there.

## Develop

`yarn serve` locally serves the doc site.

To execute the `serve` command using Docker, the `-p` option must be added:
```bash
docker run -ip 8080:8080 -v $PWD:/tc-components -w /tc-components -t node:latest yarn serve
```
