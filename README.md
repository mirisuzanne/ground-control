# `component-name`

A Web Component for…

## Features


**[Demo](https://mirisuzanne.github.io/component-name/index.html)**

[![Open in StackBlitz][]](https://stackblitz.com/~/github.com/mirisuzanne/component-name?file=component-name.js&initialPath=/index.html)

[Open in StackBlitz]: https://developer.stackblitz.com/img/open_in_stackblitz.svg

## Examples

General usage example:

```html
<script type="module" src="component-name.js"></script>

<component-name></component-name>
```

## Installation

You have a few options (choose one):

1. Install via
   [npm](https://www.npmjs.com/package/@terriblemia/component-name):
   `npm install @terriblemia/component-name`
2. [Download the source manually from GitHub](https://github.com/mirisuzanne/component-name/releases)
   into your project.
3. Skip this step
   and use the script directly
   via a 3rd party CDN
   (not recommended for production use)

## Usage

Make sure you include the `<script>` in your project
(choose one, and update the version number as needed):

```html
<!-- Host yourself -->
<script type="module" src="component-name.js"></script>
```

```html
<!-- 3rd party CDN, not recommended for production use -->
<script
  type="module"
  src="https://www.unpkg.com/@terriblemia/component-name@1.0.0/component-name.js"
></script>
```

```html
<!-- 3rd party CDN, not recommended for production use -->
<script
  type="module"
  src="https://esm.sh/@terriblemia/component-name@1.0.0"
></script>
```

Or use the built in
[WebC](https://www.11ty.dev/docs/languages/webc/) component
with [Eleventy](https://www.11ty.dev/docs/),
by adding `"npm:@terriblemia/component-name/*.webc"`
to the Eleventy WebC Plugin `components` registry:

```js
// Only one module.exports per configuration file, please!
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyWebcPlugin, {
    components: [
      // Add as a global WebC component
      "npm:@11ty/component-name/*.webc",
    ],
  });
}
```

### Style hooks


### Slots


## ToDo

- [ ] There's always more to do

## Support

At [OddBird](https://oddbird.net/),
we enjoy collaborating and contributing
as part of an open web community.
But those contributions take time and effort.
If you're interested in supporting our
open-source work,
consider becoming a
[GitHub sponsor](https://github.com/sponsors/oddbird),
or contributing to our
[Open Collective](https://opencollective.com/oddbird-open-source).

❤️ Thanks!

## Credit

With thanks to the following people:

- [David Darnes](https://darn.es/) for the
  [Web Component repo template](https://github.com/daviddarnes/component-template)
  that this one is based on.
