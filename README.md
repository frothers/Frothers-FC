# Frothers Static Website
**Static website built on Hugo (Victor Hugo) and Forrestsry.io**

This is a boilerplate for using [Hugo](https://gohugo.io/) as a static site generator, [Webpack](https://webpack.js.org/) as your asset pipeline and [Forestry.io](https://forestry.io/) as the CMS.

This is setup to use SASS and Typescript for CSS and JavaScript compiling/transpiling.

This project is released under the [MIT license](LICENSE). Please make sure you understand its implications and guarantees.

To run:
git clone
git submodule init
git submodule update
yarn install

yarn start


## Usage

### :exclamation: Prerequisites

You need to have the latest/LTS [node](https://nodejs.org/en/download/) and yarn versions installed in order to use this Static Website builder.

Hugo is also required [hugo](https://gohugo.io/)

Next step, clone this repository and run:

```bash
npm install
```

This will take some time and will install all packages necessary to run Hugo and its tasks.

Then clone the submodules and update.

```bash
git submodule init
git submodule update
```

### :computer: Development

While developing your website, use:

```bash
npm start
```

or for developing your website with `hugo server --buildDrafts --buildFuture`, use:

```bash
npm run preview
```

Then visit http://localhost:1313/ _- or a new browser windows popped-up already -_ to preview your new website. Webpack Dev Server will automatically reload the CSS or refresh the whole page, when stylesheets or content changes.

### :package: Static build

To build a static version of the website inside the `/dist` folder, run:

```bash
npm run build
```

See [package.json](package.json#L8) for all tasks.

## Structure

```
|--content          // Pages and collections - ask if you need extra pages
|--data             // YAML data files with any data for use in examples
|--layouts          // This is where all templates go
|  |--partials      // This is where includes live
|  |--index.html    // The index page
|--static           // Files in here ends up in the public folder
|--assets           // Files that will pass through the asset pipeline
|  |--sass          // Webpack will bundle imported sass separately
|  |--index.ts      // index.ts is the webpack entry for your js assets
```

## Basic Concepts

You can read more about Hugo's template language in their documentation here:

https://gohugo.io/templates/overview/

The most useful page there is the one about the available functions:

https://gohugo.io/templates/functions/

For assets that are completely static and don't need to go through the asset pipeline,
use the `site/static` folder. Images, font-files, etc, all go there.

Files in the static folder end up in the web root. So a file called `site/static/favicon.ico`
will end up being available as `/favicon.ico` and so on...

The `assets/index.js` file is the entrypoint for webpack and will be built to `/dist/main.js`


## Environment variables

To separate the development and production _- aka build -_ stages, all gulp tasks run with a node environment variable named either `development` or `production`.

You can access the environment variable inside the theme files with `getenv "NODE_ENV"`. See the following example for a conditional statement:

    {{ if eq (getenv "NODE_ENV") "development" }}You're in development!{{ end }}

All tasks starting with _build_ set the environment variable to `production` - the other will set it to `development`.

## Hooking up Forrestry

- Push your clone to your own GitHub repository.
- Create an account on Forestry.io.
- Link your repo to your forestry account

**Preview**
*Todo*

## Deploying to Netlify

- [Create a new site on Netlify](https://app.netlify.com/start) and link the repository.

Now Netlify will build and deploy your site whenever you push to git.

