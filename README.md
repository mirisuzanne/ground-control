# `ground-control`

A Web Component for
user control of HTML attributes
and CSS properties
on other elements of the page.

- Use `input-control` to get values
  from `input` and `select` elements
- Use `toggle-control` to get values
  from solo or grouped toggle buttons
- Use `switch-control` for
  single on/off switch buttons
  (and extend by providing functions
  to the `onPress()` and `onUnPress()` methods)
- Store and retrieve values
  in either `sessionStorage` or `localStorage`
- Update `output` elements to display the current values
- Provide reset buttons, to clear any changes
- Extend the `ground-control` base class
  to set up other sources for broadcasting

**[Demo](https://mirisuzanne.github.io/ground-control/index.html)**

## Examples

With a range input:

```html
<script type="module" src="index.js"></script>

<input-control
  data-for=".color-swatch"
  data-prop="--hue"
  data-session="hue"
>
  <label for="hue">Hue</label>
  <input id="hue" type="range" min="0" max="360" value="200">
  <output for="hue"></output>
</input-control>
```

Or a group of toggle buttons:

```html
<toggle-control
  id="color-scheme"
  data-prop="color-scheme"
  data-local="color-scheme"
  data-off="light dark"
>
  <strong>Color Scheme</strong>
  <button data-value="light dark" aria-pressed="true">auto</button>
  <button>light</button>
  <button>dark</button>
</toggle-control>
```

Or a switch:

```html
<switch-control data-prop="color-scheme" data-on="dark">
  <button id="dark-mode" is-switch>dark mode</button>
</switch-control>
```

## Installation

You have a few options (choose one):

1. Install via
   [npm](https://www.npmjs.com/package/@terriblemia/ground-control):
   `npm install @terriblemia/ground-control`
2. [Download the source manually from GitHub](https://github.com/mirisuzanne/ground-control/releases)
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
<script type="module" src="index.js"></script>
```

```html
<!-- 3rd party CDN, not recommended for production use -->
<script
  type="module"
  src="https://www.unpkg.com/@terriblemia/ground-control@0.1.4/index.js"
></script>
```

```html
<!-- 3rd party CDN, not recommended for production use -->
<script
  type="module"
  src="https://esm.sh/@terriblemia/ground-control@0.1.4"
></script>
```

Or use the built in
[WebC](https://www.11ty.dev/docs/languages/webc/) components
with [Eleventy](https://www.11ty.dev/docs/),
by adding `"npm:@terriblemia/ground-control/*.webc"`
to the Eleventy WebC Plugin `components` registry:

```js
// Only one module.exports per configuration file, please!
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyWebcPlugin, {
    components: [
      // Add as a global WebC component
      "npm:@terriblemia/ground-control/*.webc",
    ],
  })
}
```

This provides `input-control` and `toggle-control` components.

## All the attributes

- `ground-control` base class
- `input-control` supports basic `input` and `select` types
  (but not files, checkboxes, or radios)
- `toggle-control` supports solo and grouped toggles
- Built-in WebC components
- Control element attributes:
  - `id="<control-id>"` [optional]:
    A standard HTML id for referencing the control
  - `data-for="<selector>"` [defaults to `:root`]:
    the elements to update
  - `data-prop="<css-property-name>"` [optional]:
    the CSS property to set
  - `data-attr="<attribute-name>"` [optional]:
    the HTML attribute to set
  - `data-local="<localStorage-key>"` [optional]:
    store and retrieve the value from `localStorage`
  - `data-session="<sessionStorage-key>"` [optional]:
    store and retrieve the value from `sessionStorage`
  - `data-event="<event-name>"` [optional]:
    only used by `input-control` at this point,
    which can listen for either `change` (the default) or `input`
  - `data-off="<value>"` [optional]:
    the value to use when no other value is selected
    (primarily for toggles, but also useful with `select`)
  - for `switch-control` only…
    - `data-on="<value>"` [optional]:
      the value to use when toggled on
      (falls back to the button value defined below)
    - `data-id` [optional]:
      establishes which nested `button` to use as a toggle,
      if multiple are present
- `button` element attributes inside `toggle-control`:
  - `data-value` [defaults to the `button.innerText`]:
    provide a value for the toggle
    that is different from the text of the button
  - `aria-pressed` [optional]:
    set the initial pressed state of each toggle
    (only one in a `toggle-control` can be pressed at a time)
- Support for `output` displays and `reset` buttons:
  - Using the `id` of the `input`/`select` or the `toggle-control`…
  - `<output for="<control-id>">`:
    will set the `output` as a display for the control
  - `<button data-reset="<control-id-list>">`:
    will use the button to clear the referenced controls

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
