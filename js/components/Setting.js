class Setting extends HTMLElement {
    constructor() {
        super();
        
        const template = document.createElement('template');
        template.innerHTML =/*html*/`
        <style>
            :host{
                display:block;
            }
            .wrap{
                display:flex;
                flex-direction:column;
                height:100%;
            }
            .wrap>header{
                text-align:center;
                margin:0;
                background-color:gray;
                justify-content:flex-start;
            }
            .wrap>ul{
                flex:1;
                list-style:none;
                padding:0;
                margin:0;

            }
            .wrap>ul>div{
                background-color:white;
                border:solid 1px gray;
            }
        </style>
        <div class="wrap">
            <header>设置界面</header>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
            
            </ul>
        <div>
        `
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}
customElements.define("wifi-setting", Setting);