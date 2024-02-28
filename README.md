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
HMPPS_AUTH_EMAIL= # The email address associated with the HMPPS Auth account
HMPPS_AUTH_NAME= # The name of the logged in user (Defaults to "Approved Premises E2ETester")
NOTIFY_API_KEY= # An API key for GOV.UK Notify
```

## Running the tests

### Against the Development environment

To run the tests locally against the MoJ Cloud Platform Development
environment, run the following command:

```bash
npm run test
```

or;

```bash
npm run test:ui
```

To run using the Playwright user interface

### Against your local enviroment

Assuming you have the UI, API and all other required systems running
using the [ap-tools project](https://github.com/ministryofjustice/hmpps-approved-premises-tools),
you can run the tests against your local environment with the following command:

```bash
npm run test:local
```

or;

```bash
npm run test:local:ui
```

To run using the Playwright user interface.

Local variables are contained in the `local` project in [playwright.config.ts](https://github.com/ministryofjustice/hmpps-approved-premises-e2e/blob/main/playwright.config.ts).
