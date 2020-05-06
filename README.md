


# CPDB v2 Mobile

## Table of contents
* [Development](#development)
* [Deployment](#deployment)
* [Browser supports](#browser-supports)
* [Development Guides](#development-guides)

## Development

### Getting Started

- Install `yarn`
- `yarn start` to run development server.
- visit `localhost:9967` to see live changes.

If you want to access the dev site from another device through LAN, remember
to define your host machine's LAN IP as the API hostname. For example:

```bash
CPDB_API_HOST=[IP_ADDRESS]:8000 yarn run start
```

### Run Unit Tests

- `yarn test` to run tests.

### Run Integration Tests

- `yarn integration-test` to run selenium tests.
- To run specific test

```bash
yarn run integration-test -- --file integration-test/test/complaint-page.spec.js  
# or
yarn run integration-test -- --file complaint-page
```

## Deployment

Deployment should be almost automatic depending on which branch you pushed. 
- `master` branch push will trigger production deploy
- `beta` branch push will trigger beta deploy
- `staging` branch push will trigger staging deploy

If you want to see each step, look at `.circleci/config.yml`.

### Building & pushing the docker image

**Important: Current version of Docker image is 0.0.1. Please update this when you make changes to it.**

```bash
docker login
docker build -t cpdbdev/cpdbv2_mobile:0.0.1 .circleci/docker
docker push cpdbdev/cpdbv2_mobile:0.0.1
```

Remember to bump the version of course.

## Browser supports

Chrome 45+, Firefox 45+, IE 11, Safari 9+ and iOS 8+ Safari.

## Development Guides

- [CSS development guide](docs/css-development-guide.md)
