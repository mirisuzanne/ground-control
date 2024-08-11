class SwitchControl extends GroundControl {
  static register(tagName) {
    if ("customElements" in window) {
      customElements.define(tagName || "switch-control", SwitchControl);
    }
  }

  static observedAttributes = [
    ...super.observedAttributes,
    'data-on',
    'data-id',
  ];

  #toggle;
  target;

  onPress;
  onUnPress;

  get toggle() { return this.#toggle; }

  set toggle(el) {
    if (!el) throw 'A toggle is required';
    if (el.tagName !== 'BUTTON') throw 'The toggle must be a button';
    if (this.#toggle) this.#removeToggleListener(this.#toggle);

    el.setAttribute('type', 'button');
    if (!el.hasAttribute('aria-pressed')) {
      el.setAttribute('aria-pressed', 'false');
    }

    this.#toggle = el;

    this.initialValue = this.pressed;
    this.#addToggleListener(el);
    if (el.id) this.inputId = el.id;
    this.hasInput = true;
    if (!this.dataset.on) {
      this.dataset.on = el.dataset.value || el.innerText;
    }
  }

  get pressed() {
    return this.toggle.getAttribute('aria-pressed') === 'true';
  };

  set pressed(to) {
    this.toggle.setAttribute('aria-pressed', to ? 'true' : 'false');
  };

  constructor() {
    super();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);

    switch (name) {
      case 'data-id':
        this.#findToggle();
        break;
    }

    this.toggleActions();
  }

  connectedCallback() {
    super.connectedCallback();
    this.#findToggle();
    this.toggleActions();
  }

  disconnectedCallback() {
    this.#removeToggleListener(this.toggle);
  }

  togglePress = () => {
    this.pressed = !this.pressed;
    this.toggleActions();
  }

  toggleActions = () => {
    if (!this.toggle) return;

    this.value = this.pressed
      ? this.dataset.on
      : this.dataset.off;

    if (this.pressed && this.onPress) this.onPress();
    if (!this.pressed && this.onUnPress) this.onUnPress();
  }

  onReset = () => {
    this.pressed = this.initialValue;
    this.toggleActions();
  };

  #findToggle = () => {
    const foundToggle = this.dataset.id
      ? this.querySelector(`button[id='${this.dataset.id}']`)
      : this.querySelector('button');

    this.toggle = foundToggle;
  }

  #addToggleListener = (el) => {
    el.addEventListener('click', this.togglePress);
  }

  #removeToggleListener = (el) => {
    el.removeEventListener('click', this.togglePress);
  }
}

SwitchControl.register();
