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

  constructor() {
    super();

    this.addEventListener('change', this.onInputChange);
    this.addEventListener('input', this.onInputChange);
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
  }

  onInputChange = (event) => {
    const onType = this.dataset.event || 'change';
    if (onType !== event.type) return;

    this.value = this.#input.value;
  }

  onValueChange = () => {
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
