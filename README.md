# Toucan components

Base building blocks of Toucan Toco apps.

## Overview

This package exposes Vue components for use in other Toucan Toco projects.
We use [vue-cli](https://cli.vuejs.org/) as build system and tooling.
Demo and documentation can be found on https://tc-components.edlb.dev.

## Pre-requisites

`node` and `yarn` are required to run the following commands.

Alternatively, the `yarn` commands can be executed in a [Docker container](./Dockerfile), like `node:latest`:
`docker run -v $PWD:/tc-components -w /tc-components -i -t node:latest yarn <command>`.

## Build

`yarn build` exports transpiled JS files in the `dist/` folder, prior to publication.

The public API is exposed in `src/main.js`. Export all usable components and utility functions in there.

## Develop

`yarn serve` locally serves the doc site.
