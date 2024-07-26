class ComponentName extends HTMLElement {
  static register(tagName) {
    if ("customElements" in window) {
      customElements.define(tagName || "component-name", ComponentName);
    }
  }

  static observedAttributes = [];

  static #appendShadowTemplate = (node) => {
    const template = document.createElement("template");
    template.innerHTML = `
      <slot></slot>
      <div>(shadow dom)</div>
    `;
    const shadowRoot = node.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static #adoptShadowStyles = (node) => {
    const shadowStyle = new CSSStyleSheet();
    shadowStyle.replaceSync(`
      * { box-sizing: border-box; }
    `);
    node.shadowRoot.adoptedStyleSheets = [shadowStyle];
  }

  constructor() {
    super();
    ComponentName.#appendShadowTemplate(this);
    ComponentName.#adoptShadowStyles(this);
  }

  attributeChangedCallback() {
  }

  connectedCallback() {
  }

  disconnectedCallback() {
  }
}

ComponentName.register();
