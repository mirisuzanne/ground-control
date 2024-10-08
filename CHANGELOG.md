# Changes

## v0.3.0 = 2024-09-20

- NEW: Allow `data-reset="*"` universal reset buttons
- REFACTOR: Only add a single event listener per reset button
- BREAKING: Replaced `GroundControl.onReset()` => `GroundControl.reSet()`
- FIX: Changing the `switch-control.value` programmatically
  correctly invokes `onPress` or `onUnpress`

## v0.2.1 - 2024-08-26

- FIX: `switch-control` raw file out-of-date 🙈

## v0.2.0 - 2024-08-26

- BREAKING: Export named classes from `index.js` module
- FIX: `switch-control` value storage works for
  default-pressed switches

## v0.1.7 - 2024-08-26

- FIX: `switch-control` element
  checks for stored values when first connected

## v0.1.6 - 2024-08-11

- FIX: Improve `is-switch` styles for better integration

## v0.1.5 - 2024-08-11

- NEW: `switch-control` element
  is deigned specifically for single-button
  toggle switches.
  - Supports both `data-on` and `data-off` attributes
  - Pass functions to the
    `onPress()` and `onUnPress()` methods
    for additional behaviors
- NEW: `switch-control.css` provides
  styling for any `button[is-switch]`,
  along with custom properties for styling.
- NEW: `GroundControl` provides
  a getter for `inputId`
  (previously only a setter).
- BREAKING: The `usedValue` getter
  defined by `GroundControl`
  does not enforce an empty-string fallback.
  Instead, attributes/properties are removed
  when `usedValue` is undefined.
- BREAKING: `GroundControl` provides
  static `blockDisplay()` method,
  rather than applying `display:block` by default.
  Both `toggle-control` and `input-control`
  apply this as a default setting,
  but `switch-control` does not.

## v0.1.4 - 2024-08-06

- FIX: Don't use ES modules for webC templates

## v0.1.2 - 2024-07-27

- FIX: `index.js` is the main package entry point
- Use default exports

## v0.1.0 - 2024-07-26

Initial Features…

- `GroundControl` base class
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
- `button` element attributes inside `toggle-control`:
  - `data-value` [defaults to the `button.innerText`]:
    provide a value for the toggle
    that is different from the text of the button
  - `aria-pressed` [optional]:
    set the initial pressed state of each toggle
    (only one in a group can be active at a time)
- Support for `output` displays and `reset` buttons:
  - Using the `id` of the `input`/`select` or the `toggle-control`…
  - `<output for="<control-id>">`:
    will set the `output` as a display for the control
  - `<button data-reset="<control-id-list>">`:
    will use the button to clear the referenced controls
