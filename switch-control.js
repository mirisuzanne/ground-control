import GroundControl from "./ground-control.js";

export default class SwitchControl extends GroundControl {
  static register(tagName) {
    if ("customElements" in window) {
      customElements.define(tagName || "switch-control", SwitchControl);
    }
  };

  static observedAttributes = [
    ...super.observedAttributes,
    'data-on',
    'data-id',
  ];

  #toggle;
  target;

  onPress;
  onUnPress;

  get toggle() { return this.#toggle; };

  set toggle(el) {
    if (!el) throw 'A toggle is required';
    if (el.tagName !== 'BUTTON') throw 'The toggle must be a button';
    if (this.#toggle) this.#removeToggleListener(this.#toggle);

    el.setAttribute('type', 'button');
    if (!el.hasAttribute('aria-pressed')) {
      el.setAttribute('aria-pressed', 'false');
    }

    this.#toggle = el;

    if (!this.dataset.on) {
      this.dataset.on = el.dataset.value || el.innerText;
    }

    this.initialValue = this.pressedValue;

    this.#addToggleListener(el);
    if (el.id) this.inputId = el.id;
    this.hasInput = true;
  };

  get pressed() {
    return this.toggle.getAttribute('aria-pressed') === 'true';
  };

  set pressed(to) {
    this.toggle.setAttribute('aria-pressed', to ? 'true' : 'false');
  };

  get pressedValue() {
    return this.pressed
      ? this.dataset.on
      : this.dataset.off;
  };

  constructor() {
    super();
  };

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);

    switch (name) {
      case 'data-id':
        this.#findToggle();
        break;
    }

    this.doToggleActions();
  };

  connectedCallback() {
    super.connectedCallback();
    this.#findToggle();
    this.pressed = this.#isPressedValue(this.storedValue);
    this.doToggleActions();
  };

  disconnectedCallback() {
    this.#removeToggleListener(this.toggle);
  };

  onTogglePress = () => {
    this.pressed = !this.pressed;
    this.doToggleActions();
  };

  doToggleActions = () => {
    if (!this.toggle) return;

    this.value = this.pressedValue;

    if (this.pressed && this.onPress) this.onPress();
    if (!this.pressed && this.onUnPress) this.onUnPress();
  };

  onValueChange = () => {
    if (this.usedValue !== this.pressedValue) {
      this.pressed = this.#isPressedValue(this.usedValue);
    }
  };

  onReset = () => {
    this.pressed = this.#isPressedValue(this.initialValue);
    this.doToggleActions();
  };

  #isPressedValue = (value) => this.dataset.on === value;

  #findToggle = () => {
    const foundToggle = this.dataset.id
      ? this.querySelector(`button[id='${this.dataset.id}']`)
      : this.querySelector('button');

    this.toggle = foundToggle;
  };

  #addToggleListener = (el) => {
    el.addEventListener('click', this.onTogglePress);
  };

  #removeToggleListener = (el) => {
    el.removeEventListener('click', this.onTogglePress);
  };
}

SwitchControl.register();
