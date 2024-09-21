import GroundControl from "./ground-control.js";

export default class InputControl extends GroundControl {
  static register(tagName) {
    if ('customElements' in window) {
      customElements.define(
        tagName || 'input-control',
        InputControl
      );
    }
  }

  static rejectInputTypes = [
    'file',
    'submit', 'reset', 'button', 'image',
    'checkbox', 'radio'
  ];

  #input;

  get listenFor () {
    return this.dataset.event || 'change';
  }

  constructor() {
    super();
    GroundControl.blockDisplay(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.#input = this.#findInput();

    if (!this.#input) {
      console.error('No input found for input-control');
      return;
    }

    this.hasInput = true;
    if (this.#input.id) this.inputId = this.#input.id;

    this.initialValue = this.#input.value;
    this.value = this.storedValue || this.initialValue;

    this.addEventListener(this.listenFor, this.onInputChange);
  }

  disconnectedCallback() {
    this.removeEventListener(this.listenFor, this.onInputChange);
  }

  onInputChange = () => {
    this.value = this.#input.value;
  }

  onValueChange = () => {
    if (this.#input.value === this.value) return;

    this.#input.value = this.value;
  }

  #findInput = () => {
    const inputSelect = InputControl.rejectInputTypes.reduce(
      (all, type) => {
        const item = `[type=${type}]`;
        return all ? `${all}, ${item}` : item;
      }
    );

    return this.querySelector(`select, input:not(${inputSelect})`);
  }
}

InputControl.register();
