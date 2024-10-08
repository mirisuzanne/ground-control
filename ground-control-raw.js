class GroundControl extends HTMLElement {
  static register(tagName) {
    if ('customElements' in window) {
      customElements.define(
        tagName || 'ground-control',
        GroundControl
      );
    }
  };

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

  static _appendShadowTemplate = (node) => {
    const template = document.createElement('template');
    const shadowRoot = node.attachShadow({ mode: 'open' });
    template.innerHTML = `<slot></slot>`;
    shadowRoot.appendChild(template.content.cloneNode(true));
  };

  static _adoptShadowStyles = (node) => {
    const shadowStyle = new CSSStyleSheet();
    shadowStyle.replaceSync(`:host { display: block }`);
    node.shadowRoot.adoptedStyleSheets = [shadowStyle];
  };

  static blockDisplay = (node) => {
    GroundControl._appendShadowTemplate(node);
    GroundControl._adoptShadowStyles(node);
  };

  #related = {};
  #inputId;
  #currentValue;
  hasInput;
  initialValue;

  constructor() {
    super();
  };

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
  };

  connectedCallback() {
    this.targets = this.dataset.for;
  };

  disconnectedCallback() {
    this.#removeResetListener();
  };

  // getters and setters
  set value(newValue) {
    this.#currentValue = newValue;
    if (this.onValueChange) this.onValueChange();
    this.broadCast();
  };

  get value() { return this.#currentValue; }
  get usedValue() { return this.value || this.dataset.off; }

  set inputId(value) {
    if (this.#inputId) { this.#removeResetListener(); }

    this.#inputId = value;
    this.#related.resets = this.#findAll(
      `button:is([data-reset~=${value}], [data-reset="*"])`
    );
    this.#addResetListener();

    this.#related.displays = this.#findAll(
      `output[for=${value}]`
    );
  };

  get inputId() { return this.#inputId; }

  set targets(to) {
    this.#related.targets = (to && typeof to === 'object')
      ? to
      : this.#findAll(to || ':root');
  };

  get targets() { return this.#related.targets || []; }
  get displays() { return this.#related.displays || []; }

  get storedValue() {
    return sessionStorage.getItem(this.dataset.session)
      || localStorage.getItem(this.dataset.local);
  };

  set storedValue(value) {
    const clearWhen = [
      this.initialValue,
      undefined, 'undefined',
    ];

    this.#updateStorage(clearWhen.includes(value));
  };

  // public methods
  onValueChange;
  onEventChange;

  reSet = () => {
    this.value = this.initialValue;
  };

  broadCast = () => {
    if (!this.hasInput) { return; }
    this.storedValue = this.value;

    this.targets.forEach((el) => {
      if (this.dataset.prop) {
        if (this.usedValue) {
          el.style.setProperty(this.dataset.prop, this.usedValue);
        } else {
          el.style.removeProperty(this.dataset.prop);
        }
      }
      if (this.dataset.attr) {
        if (this.usedValue) {
          el.setAttribute(this.dataset.attr, this.usedValue);
        } else {
          el.removeAttribute(this.dataset.attr);
        }
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
  };

  // private methods
  #findAll = (selector) => [
    ...document.querySelectorAll(selector)
  ];

  #addResetListener = () => {
    this.#related.resets.forEach((resetBtn) => {
      resetBtn.resetTargets = [
        ...(resetBtn.resetTargets || []),
        this
      ];

      if (!resetBtn.resetListener) {
        resetBtn.resetListener = () => {
          resetBtn.resetTargets.forEach((target) => { target.reSet(); });
        }
        resetBtn.addEventListener('click', resetBtn.resetListener);
      }
    });
  };

  #removeResetListener = () => {
    this.#related.resets?.forEach((resetBtn) => {
      resetBtn.resetTargets.filter((target) => target !== this);

      if (resetBtn.resetTargets.length === 0) {
        resetBtn.removeEventListener('click', resetBtn.resetListener);
      }
    });
  };
}
