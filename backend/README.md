# Groupon Encore.dev DEMO project

This is a demo project for Groupon using Encore.dev. It is a simple API for managing articles. Please refer to the [CODE_STANDARDS.md](./backend/CODE_STANDARDS.md) for more information on the coding standards.

## Prerequisites

**Install Encore:**

- **macOS:** `brew install encoredev/tap/encore`
- **Linux:** `curl -L https://encore.dev/install.sh | bash`
- **Windows:** `iwr https://encore.dev/install.ps1 | iex`

**Docker for local development:**

You need to have Docker desktop (or similar) installed and running on your machine.

- **macOS:** https://docs.docker.com/desktop/setup/install/mac-install/
- **Windows:** https://docs.docker.com/desktop/setup/install/windows-install/

## Install Dependencies

```bash
npm install
```

## Login to Encore Cloud

```bash
encore login
```

## Run app locally

Run this command from your application's root folder:

```bash
encore run
```

## Using the API

To see that your app is running, you can ping the API.

```bash
curl http://localhost:4000/articles
```

## Local Development Dashboard

While `encore run` is running, open [http://localhost:9400/](http://localhost:9400/) to access Encore's [local developer dashboard](https://encore.dev/docs/observability/dev-dash).

Here you can see traces for all requests that you made while using the frontend, see your architecture diagram, and view API documentation in the Service Catalog.

## Deployment

### Self-hosting

See the [self-hosting instructions](https://encore.dev/docs/self-host/docker-build) for how to use `encore build docker` to create a Docker image and configure it.

### Encore Cloud Platform

Deploy your application to a free staging environment in Encore's development cloud using `git push encore`:

```bash
git add -A .
git commit -m 'Commit message'
git push encore
```

You can also open your app in the [Cloud Dashboard](https://app.encore.dev) to integrate with GitHub, or connect your AWS/GCP account, enabling Encore to automatically handle cloud deployments for you.

## Link to GitHub

Follow these steps to link your app to GitHub:

1. Create a GitHub repo, commit and push the app.
2. Open your app in the [Cloud Dashboard](https://app.encore.dev).
3. Go to **Settings ➔ GitHub** and click on **Link app to GitHub** to link your app to GitHub and select the repo you just created.
4. To configure Encore to automatically trigger deploys when you push to a specific branch name, go to the **Overview** page for your intended environment. Click on **Settings** and then in the section **Branch Push** configure the **Branch name** and hit **Save**.
5. Commit and push a change to GitHub to trigger a deploy.

[Learn more in the docs](https://encore.dev/docs/how-to/github)

## Testing

To run tests, configure the `test` command in your `package.json` to the test runner of your choice, and then use the command `encore test` from the CLI. The `encore test` command sets up all the necessary infrastructure in test mode before handing over to the test runner. [Learn more](https://encore.dev/docs/ts/develop/testing)

```bash
encore test
```
