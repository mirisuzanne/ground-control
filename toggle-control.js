import GroundControl from "./ground-control.js";

export default class ToggleControl extends GroundControl {
  static register(tagName) {
    if ('customElements' in window) {
      customElements.define(
        tagName || 'toggle-control',
        ToggleControl
      );
    }
  }

  toggles = [];

  set pressed(target) {
    this.toggles.forEach((btn) => {
      btn.setAttribute(
        'aria-pressed',
        target === btn ? 'true' : 'false'
      );
    });
  }

  get pressed() {
    return this.toggles.find(
      (btn) => btn.getAttribute('aria-pressed') === 'true'
    );
  }

  get pressedValue() {
    return this.pressed?.dataset.value;
  }

  constructor() {
    super();
    GroundControl.blockDisplay(this);
    this.addEventListener('click', this.onTogglePress);
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.id) this.inputId = this.id;

    this.toggles = this.#findToggles();

    if (!this.toggles) {
      console.error('No toggle buttons found for toggle-control');
      return;
    }

    this.hasInput = true;

    this.toggles.forEach((btn) => {
      btn.setAttribute('type', 'button');

      if (!btn.dataset.value) {
        btn.dataset.value = btn.innerText;
      }
    });

    this.pressed = this.pressed;
    this.initialValue = this.pressedValue || this.dataset.off;

    this.value = this.storedValue || this.initialValue;
  }

  onTogglePress = (event) => {
    this.doPress(event.target);
    this.value = this.pressedValue;
  }

  onValueChange = () => {
    if (this.usedValue !== this.pressedValue) {
      this.pressed = this.#toggleFromValue();
    }
  }

  doPress = (target) => {
    if (!this.toggles.includes(target)) return;

    const isUnPress = this.pressed === target;
    const allowUnPress = this.dataset.off || this.toggles.length === 1;

    if (isUnPress && allowUnPress) {
      this.pressed = undefined;
    } else {
      this.pressed = target;
    }
  }

  #toggleFromValue = () => this.toggles.find(
    (btn) => btn.dataset.value === this.usedValue
  );

  #findToggles = () => [
    ...this.querySelectorAll('button:not([for-reset])')
  ];
}

ToggleControl.register();
