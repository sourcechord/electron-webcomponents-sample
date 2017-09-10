
class StopwatchElement extends HTMLElement {
    constructor() {
        super();
        this.baseTime = null;
        this.offset = null;
        this.timerId = null;
    }

    /** DOMに要素が追加された際に発生するイベント */
    connectedCallback() {
        const ownerDocument = document.currentScript.ownerDocument;
        const template = ownerDocument.querySelector('#stopwatch-element-template');
        const instance = template.content.cloneNode(true);

        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(instance);

        this.content = shadowRoot.querySelector("#content");
        this.showTime(0);
        // 各種イベントハンドラの設定
        this.btnStartStop = shadowRoot.querySelector("#btnStartStop");
        this.btnStartStop.addEventListener('click', this.onStartStop.bind(this));
        let btnReset = shadowRoot.querySelector("#btnReset");
        btnReset.addEventListener('click', this.onReset.bind(this));
    }

    /** start/stopボタン押下時のイベント */
    onStartStop() {
        if (!this.timerId) {
            this.btnStartStop.textContent = "stop";
            this.baseTime = Date.now(); 
            this.timerId = setInterval(() => {
                let ellapse = this.offset + Date.now() - this.baseTime;
                this.showTime(ellapse);
            }, 10);
        } else {
            clearInterval(this.timerId);
            let ellapse = Date.now() - this.baseTime;
            this.offset += ellapse;
            this.timerId = null;
            this.btnStartStop.textContent = "start";
        }
    }

    /** resetボタン押下時のイベント */
    onReset() {
        clearInterval(this.timerId);
        this.showTime(0);
        this.timerId = null;
        this.baseTime = null;
        this.offset = null;
    }

    /** 経過時間を表示するための関数 */
    showTime(time) {
        let pad = (num, digit) => ('000' + Math.floor(num)).slice(-digit);
        let h = pad(time / (60*60*1000), 2);
        time = time % (60*60*1000);
        let m = pad(time / (60*1000), 2);
        time = time % (60*1000);
        let s = pad(time / 1000, 2);
        time = time % 1000
        let ms = pad(time, 3);
        this.content.textContent = `${h}:${m}:${s}.${ms}`;
    }

}

customElements.define('stopwatch-element', StopwatchElement);
