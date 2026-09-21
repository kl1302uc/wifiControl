class WiFiList extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        console.log('当自定义元素第一次被连接到文档DOM时被调用', this.IPAddress);
        this.attachShadow({ mode: 'open' }).innerHTML = /*html*/`
        <style>
        :host{
            display:block; 
        }
        .wrap{
            width:100%; 
           
       
        }
        .wrap>ul{
            list-style:none;
            padding:0;
        }
        </style>
        <div class='wrap'>
            <ul>
                <li>wifi名，信号强度，是否加密</li>
                <li>wifi名，信号强度，是否加密</li>
                <li>wifi名，信号强度，是否加密</li>
                <li>wifi名，信号强度，是否加密</li>
                <li>wifi名，信号强度，是否加密</li>
                <li>wifi名，信号强度，是否加密</li>
            </ul>
        </div>       

        `
    }

    disconnectedCallback() {
        console.log('当自定义元素与文档DOM断开连接时被调用');
    }

    adoptedCallback() {
        console.log('当自定义元素被移动到新文档时被调用');
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log("自定义正方形元素的属性已变更。");
    }
    static get observedAttributes() {
        return ["color", "size"];
    }
}
customElements.define("wifi-list", WiFiList);