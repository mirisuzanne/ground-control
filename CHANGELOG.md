# Changes

## v0.1.0 - UNRELEASED

Initial Features…

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
