# Approved Premises End to End tests

A suite of end to end tests for the [Approved Premises project](https://github.com/ministryofjustice/hmpps-approved-premises-ui) using [Playwright](https://playwright.dev/).

## Getting started

We strongly recommend using the [VS Code Playwright plugin](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) and use the plugin's commands.

### Prerequisites

- Node.JS
- NPM

### Setup

Install the dependencies with:

```bash
npm install
npm run install-playwright
```

Add a `.env` file to the root of the project with the following variables:

```text
HMPPS_AUTH_USERNAME= # A valid HMPPS Auth Username
HMPPS_AUTH_PASSWORD= # A valid HMPPS Auth Password
```

## Running the tests

To run the tests locally, run the following command:

```bash
npm run test
```
