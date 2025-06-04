# fcp-sfd-accelerator

The accelerator repository is designed to streamline the setup of GitHub repositories (specifically backend microservices) for the Single Front Door (SFD) team to deploy on CDP (Core Delivery Platform).

## Initial setup

### Pushing the accelerator

As CDP repositories _must_ be created via the CDP portal, setting up a template GitHub repository in the traditional sense (similar to what is/was done on the Farming and Countryside Platform) is not possible. Instead this repository has been created with the specific project layout that meets the needs of the SFD development team and differs from the default [CDP Node.js backend template](https://github.com/DEFRA/cdp-node-backend-template). A Bash script is provided in this repo to automate applying the accelerator template onto a CDP generated repository. The following steps detail what needs to be done:
1. Create a new repo on the [CDP portal](https://portal.cdp-int.defra.cloud) with the parameters `Microservice` and `Node.js Backend`.
2. Once the repo has been created, ensure you have a copy of the [`accelerator`](./accelerator.sh) script to hand.
3. Execute the `accelerator` script by running the following command:
```Bash
./accelerator.sh <template-repo-url> <target-repo-url> [target-branch]
```
E.g.:
```bash
./accelerator.sh https://github.com/DEFRA/fcp-sfd-accelerator.git https://github.com/DEFRA/fcp-sfd-example.git template-setup
```
**All 3 arguments must be provided to run the script successfully.**

4. The following confirmation should appear in the terminal output if successful:
```bash
fcp-sfd-accelerator has been pushed to branch 'test-branch' on https://github.com/DEFRA/fcp-sfd-example.git
```

### Renaming

This repo comes with a [`rename`](./rename.js) script that will update the project name, package description, and port for local development.

To execute the script, run the following command:
```
./rename.js fcp-sfd-example 'this is an example repo' 3001
```
Note the project description must be wrapped in quotes.

### Deleting setup scripts

Once both the `accelerator.sh` and `rename.js` scripts have served their purpose, they should be deleted:
```bash
rm accelerator.sh rename.js
```

## Requirements

### Node.js

Please install [Node.js](http://nodejs.org/) `>= v22` and [npm](https://nodejs.org/) `>= v11`. You will find it
easier to use the Node Version Manager [nvm](https://github.com/creationix/nvm)

To use the correct version of Node.js for this application, via nvm:

```bash
cd fcp-sfd-accelerator
nvm use
```

## Local development

### Setup

Install application dependencies:

```bash
npm install
```

### Development

To run the application in `development` mode run:

```bash
npm run dev
```

### Testing

To test the application run:

```bash
npm run test
```

### Production

To mimic the application running in `production` mode locally run:

```bash
npm start
```

### NPM scripts

All available NPM scripts can be seen in [package.json](./package.json).
To view them in your command line run:

```bash
npm run
```

### Update dependencies

To update dependencies use [npm-check-updates](https://github.com/raineorshine/npm-check-updates):

> The following script is a good start. Check out all the options on
> the [npm-check-updates](https://github.com/raineorshine/npm-check-updates)

```bash
ncu --interactive --format group
```

## Docker

### Development image

Build:

```bash
docker build --target development --no-cache --tag fcp-sfd-accelerator:development .
```

Run:

```bash
docker run -e PORT=3000 -p 3000:3000 fcp-sfd-accelerator:development
```

### Production image

Build:

```bash
docker build --no-cache --tag fcp-sfd-accelerator .
```

Run:

```bash
docker run -e PORT=3000 -p 3000:3000 fcp-sfd-accelerator
```

### Docker Compose

A local environment with:

- Localstack for AWS services (S3, SQS)
- Redis
- MongoDB
- This service.
- A commented out frontend example.

```bash
docker compose up --build -d
```

### SonarCloud

Instructions for setting up SonarCloud can be found in [sonar-project.properties](./sonar-project.properties)

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government license v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of His Majesty's Stationery Office (HMSO) to enable
information providers in the public sector to license the use and re-use of their information under a common open
licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
