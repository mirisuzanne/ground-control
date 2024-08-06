class GroundControl extends HTMLElement {
  static observedAttributes = [
    'data-for', // <selector-list> of elements to update…
    // by setting either…
    'data-attr', // <attribute-name>
    'data-prop', // <css-property-name>
    // and optionally storing the value for later…
    'data-local', // <localStorage key>
    'data-session', // <sessionStorage key>
    // override event listeners (mainly for inputs)
    'data-event',
    // provide an 'off' value (mainly for toggles)
    'data-off',
  ];

  static register(tagName) {
    if ('customElements' in window) {
      customElements.define(
        tagName || 'ground-control',
        GroundControl
      );
    }
  }

  static _appendShadowTemplate = (node) => {
    const template = document.createElement('template');
    const shadowRoot = node.attachShadow({ mode: 'open' });
    template.innerHTML = `<slot></slot>`;
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
  static _adoptShadowStyles = (node) => {
    const shadowStyle = new CSSStyleSheet();
    shadowStyle.replaceSync(`:host { display: block }`);
    node.shadowRoot.adoptedStyleSheets = [shadowStyle];
  }

  #related = {};
  #inputId;
  #currentValue;
  hasInput;
  initialValue;

  constructor() {
    super();
    GroundControl._appendShadowTemplate(this);
    GroundControl._adoptShadowStyles(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue === oldValue) return;

    switch (name) {
      case 'data-for':
        this.targets = newValue;
        break;
      case 'data-local':
        localStorage.removeItem(oldValue);
        break;
      case 'data-session':
        sessionStorage.removeItem(oldValue);
        break;
      case 'data-event':
        if (this.onEventChange) this.onEventChange();
        break;
    }
    this.broadCast();
  }

  connectedCallback() {
    this.targets = this.dataset.for;
  }

  disconnectedCallback() {
    this.#removeResetListener();
  }

  // getters and setters
  set value(newValue) {
    this.#currentValue = newValue;
    if (this.onValueChange) this.onValueChange();
    this.broadCast();
  }

  get value() { return this.#currentValue; }
  get usedValue() {
    return this.value || this.dataset.off || '';
  }

  set inputId(value) {
    this.#inputId = value;

    this.#removeResetListener();
    this.#related.resets = this.#findAll(
      `button[data-reset~=${value}]`
    );
    this.#addResetListener();

    this.#related.displays = this.#findAll(
      `output[for=${value}]`
    );
  }

  set targets(to) {
    this.#related.targets = (to && typeof to === 'object')
      ? to
      : this.#findAll(to || ':root');
  }

  get targets() { return this.#related.targets || []; }
  get displays() { return this.#related.displays || []; }

  get storedValue() {
    return sessionStorage.getItem(this.dataset.session)
      || localStorage.getItem(this.dataset.local);
  }

  set storedValue(value) {
    const clearWhen = [
      this.initialValue,
      undefined, 'undefined',
    ];

    this.#updateStorage(clearWhen.includes(value));
  }

  // public methods
  onValueChange;
  onEventChange;

  onReset = () => {
    this.value = this.initialValue;
  };

  broadCast = () => {
    if (!this.hasInput) { return; }

    this.storedValue = this.value;

    this.targets.forEach((el) => {
      if (this.dataset.prop) {
        el.style.setProperty(this.dataset.prop, this.usedValue);
      }
      if (this.dataset.attr) {
        el.setAttribute(this.dataset.attr, this.usedValue);
      }
    });

    this.displays.forEach((el) => {
      el.value = this.usedValue;
    });
  };

  #updateStorage = (clear) => {
    if (this.dataset.local) {
      clear
        ? localStorage.removeItem(this.dataset.local)
        : localStorage.setItem(this.dataset.local, this.value);
    }

    if (this.dataset.session) {
      clear
        ? sessionStorage.removeItem(this.dataset.session)
        : sessionStorage.setItem(this.dataset.session, this.value);
    }
  }

  // private methods
  #findAll = (selector) => [
    ...document.querySelectorAll(selector)
  ];

  #addResetListener = () => {
    this.#related.resets.forEach((resetBtn) => {
      resetBtn.addEventListener('click', this.onReset);
    });
  }

  #removeResetListener = () => {
    if (!this.#related.resets) { return; }

    this.#related.resets.forEach((resetBtn) => {
      resetBtn.removeEventListener('click', this.onReset);
    });
  }
}
