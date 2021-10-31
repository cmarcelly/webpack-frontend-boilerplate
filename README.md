<h1 align="center">Webpack Frontend Boilerplate</h1>

<p align="center">
<img src="https://img.shields.io/badge/node-%3E%3D14.16.1-green" alt="Node">
<img src="https://img.shields.io/badge/npm-%3E%3D7.13.0-blue" alt="NPM">
</p>

## Requirements

| Name       | Version  |
| ---------- | -------- |
| [Node]     | >= 14.16.1 |
| [NPM]      | >= 7.13.0   |

[Node]: https://nodejs.org/
[NPM]:  https://npmjs.com/

I recommand using [nvm](https://github.com/nvm-sh/nvm) to install the node version in `.nvmrc`. This CLI will allow you to easily switch from one Node version to another if a project requires it.

## Introduction

The purpose of this boilerplate is to be a UI agnostic frontend framework. That means you will have to build your own custom components. Don't worry, some common and usefull patterns and tools are available inside it.

The build system is based on [Webpack version 5](https://webpack.js.org/).


## Installation

```sh
npm install
```

## Configuration

You can update some global file paths configuration variables in `config/paths.js`.

## Usage

We have 3 commands available.

```sh
# develop build
npm run dev
```

```sh
# production build
npm run prod
```

A special command that you will use most of the time in local developement is the `watch`command.

```sh
# watch command
npm run watch
```

This command will run a local server using [Browsersync](https://browsersync.io/). Your pages will automatically refresh when you'll make a change in your code (HTML, SCSS, Javascript). It is very usefull for synchronised browser testing.

## Scaffolding

Here is how folders and files are structured.

| Folder     | Role |
| ---------- | -------- |
| `config`   | Webpack configuration files. |
| `dist`     | Production build ready for deployement. |
| `src`      | Source development files (SCSS, JS, HTML).  |

## Styles

[SCSS](https://sass-lang.com) is our CSS preprocessor. [Autoprefixer](https://github.com/postcss/autoprefixer) is also included.

#### Architecture

We use [BEMIT](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) as CSS architecture. That means it's a [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) (Inverted Triangle CSS architecture) with [BEM](http://getbem.com/) classes naming convention.

The CSS framework is a custom implementation that initially inherits [Inuitcss framework](https://github.com/inuitcss).

#### BEM Naming Convention

```sh
.block .block__element .block__element--modifier
```

#### ITCSS Architecture

* `settings`: Global variables, site-wide settings, config switches, etc.
* `tools`: Site-wide mixins and functions.
* `generic`: Low-specificity, far-reaching rulesets (e.g. resets).
* `elements`: Unclassed HTML elements (e.g. `a {}`, `blockquote {}`, `address {}`).
* `objects`: Objects, abstractions, and design patterns (e.g. `.o-layout {}`).
* `components`: Discrete, complete chunks of UI (e.g. `.c-carousel {}`).
* `utilities`: High-specificity, very explicit selectors. Overrides and helper
  classes (e.g. `.u-hidden {}`)

[_source_](https://github.com/inuitcss/inuitcss#css-directory-structure)

#### Namespaces

We namespace our classes for more [transparency](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/).

* `o-`: Object that it may be used in any number of unrelated contexts to the one you can currently see it in. Making modifications to these types of class could potentially have knock-on effects in a lot of other unrelated places.
* `c-`: Component is a concrete, implementation-specific piece of UI. All of the changes you make to its styles should be detectable in the context you’re currently looking at. Modifying these styles should be safe and have no side effects.
* `u-`: Utility has a very specific role (often providing only one declaration) and should not be bound onto or changed. It can be reused and is not tied to any specific piece of UI.
* `s-`: Scope creates a new styling context. Similar to a Theme, but not necessarily cosmetic, these should be used sparingly—they can be open to abuse and lead to poor CSS if not used wisely.
* `is-`, `has-`: Is currently styled a certain way because of a state or condition. It tells us that the DOM currently has a temporary, optional, or short-lived style applied to it due to a certain state being invoked.

[_source_](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/#the-namespaces)

## Javascript

We use modular ES6 syntax with Babel to convert the ES6 code to ES5 code that the browsers with older versions can understand.

## Tasks

#### Sourcemaps

#### SVG Sprite for icons optimized with SVGO

#### Favicons

#### Cache Busting