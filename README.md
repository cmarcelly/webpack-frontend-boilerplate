# :boom: Webpack Frontend Boilerplate :boom:

![Node](https://img.shields.io/badge/node-%3E%3D14.16.1-green)
![NPM](https://img.shields.io/badge/npm-%3E%3D7.13.0-blue)


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
# staging build
npm run staging
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

## Environment variables

We have 3 possible Node.js environment variables available depending on which build command you use (development | staging | production). That can be useful for conditional HTML display or conditional behaviors in Javascript and SCSS.

```sh
# Nunjucks
{% if(env == 'development') %}
    <h1>Hello development!</h1>
{% endif %}
```

```sh
# Javascript
if(process.env.NODE_ENV == 'development' {
    // js stuff
}
```

```sh
# SCSS
@if(global-config(env) == 'development') {
    // scss stuff
}
```

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
* `is-`, `has-`: Is currently styled a certain way because of a state or condition. It tells us that the DOM currently has a temporary, optional, or short-lived style applied to it due to a certain state being invoked.
* `js-`: For element that needs to be targeted by a JS script.

[_source_](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/#the-namespaces)

## Javascript

We use modular ES6 syntax with Babel to convert the ES6 code to ES5 code that the browsers with older versions can understand.

## Tasks

#### Sourcemaps

CSS sourcemaps allow the browser to map CSS generated by a pre-processor, such as Sass, back to the original source file, including exactly which Sass mixin, placeholder or variable is responsible for a given line of CSS.

CSS sourcemaps are not used in production build mode.

#### Images

All images has to be in the img folder.

```
src   
└───assets
│   └───img
```

You will have to compress/optimize them before putting them in that folder. I recommand using Squoosh from Google Labs.

[Squoosh Desktop App](https://squoosh-desktop.vercel.app/)  
[Squoosh Online Tool](https://squoosh.app/)  
[Squoosh CLI](https://github.com/GoogleChromeLabs/squoosh/tree/dev/cli), useful for batch compression and conversion.

We use WEBP format for images, so you will have to use that tool to convert any JPG or PNG file into WEBP format. Use the `picture` tag in your markup.

```sh
<picture>
  <source srcset="assets/img/picture.webp" type="image/webp">
  <source srcset="assets/img/picture.jpg" type="image/jpeg">
  <img src="assets/img/picture.jpg" alt="">
</picture>
```

#### SVG Sprite for icons optimized with SVGO

In order to avoid having to make a separate request for each icon we can go back to our old friend the sprite, except this time in SVG. To create a sprite in SVG we use the <symbol> tag and apply an ID for referencing later and the viewBox attribute for defining the canvas size. Inside of the symbol icon we create our shapes, text and any other elements that make up our icon.

We use it here only for icons management. Put all of them in the `icons` folder, then the task will automatically bundle them in the `spritemap.svg` file. 

```
src   
└───assets
│   └───img
│       └───svg
│           └───icons
```

```sh
# reference the icon ID putting the original file name just after sprite-
<svg class="c-icon c-icon--small">
  <use xlink:href="assets/img/spritemap.svg#sprite-ic_facebook"></use>
</svg>
```

#### Favicons

Favicons are automatically generated in various formats and the meta tags are printed in the html file. Just put a high res `favicon.png` file in the `favicons` folder, and the task will do everything else.

```
src   
└───assets
│   └───img
│       └───favicons
```

If you need a SVG favicon, you will need to put it in the `favicons` folder too and reference its path in the `config/paths.js` file.

```
svgFavicon: 'assets/img/favicon.svg'
```

#### Cache Busting

The production build is using cache busting by adding a `hash string` in the bundles file names (CSS & JS).

```
# examples

main.7ac7d2542460b7c4da74.css
main.c218b2f35197aacef922.bundle.js
```

#### HTML Templates

We use [Nunjucks](https://mozilla.github.io/nunjucks/) for HTML templating. You will see a basic boilerplate in the `views` folder.

```
src   
└───views
│   └───layouts
│   |   └───_base.njk
│   └───partials
│   |   └───_nav.njk
│   └───about.njk
│   └───index.njk
```
#### Components with Nunjunks Macro

Nunjunks comes with specials functions to be called to render UI elements called Macros.
We will see that macros can be used to define re-usable components across your pages.

Here is an example of architecture where `text-image` is our component and `_services` is our 
partial page that is used to call the macro component.
```
src   
└───views
│   └───components
│   |   └───text-image.njk
│   └───partials
│   |   └───_services.njk
```

Assuming that we need a card component to be re-usable across some pages that will differ by title, text, link and text color. We can define a `card` component like this:

```
{% macro card(name, title, text, white=false) %}
    <div class="<$ name $>">
        <h1 class="<$ 'u-color-white' if white $>"><$ title $></h1>
        <p class="<$ 'u-color-white' if white $>"><$ text $></p>
        <div class="c-card__know-more">
            <a href="#">
                <span class="<$ 'u-color-white' if white $>">Know more</span>
                {% if white %}
                    {% include 'src/views/elements/_arrow-white.njk' %}
                {% else %}
                    {% include 'src/views/elements/_arrow-black.njk' %}
                {% endif %}
            </a>
        </div>
    </div>
{% endmacro %}
```

This macro will be render dependings of those parameters. <br>
We can easily choose the classname, title, text and decide if we need white or default (black) text color in this case.
You can add up as much parameters but macro component still needs to stay light to be easily usable and customizable ( DRY principles )

In any Nunjunks template or partials you can then add your import 

`{% from "src/views/components/card.njk" import card %}`

This will render a `c-card` component with `My title card`, `My custom text card` in a white color text

Example:
```
    <$ card('c-card','My title card','My custom text card', true) $>
```

!!! Note <sub><sup>Note that `{{ }}` tags are not usable due to webpack/vueJS conflits tags. You must use `<$` and `$>` to use a macro. To define a macro you can use `{% %}`</sup></sub>
