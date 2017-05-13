
class SampleElement extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const ownerDocument = document.currentScript.ownerDocument;
        const template = ownerDocument.querySelector('#sample-element-template');
        const instance = template.content.cloneNode(true);
        this.appendChild(instance);
    }
}

customElements.define('sample-element', SampleElement);
