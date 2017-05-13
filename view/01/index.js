class SampleElement extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
<div>
    <h1>Sample Component</h1>
    <p>
        CustomElements v1のサンプル
    </p>
    <button>sample</button>
</div>`;
    }
}

customElements.define('sample-element', SampleElement);
