class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = `
    <style>
    :host{
      width:100%;
    }
    .wrap{
      display:flex;
      justify-content:space-evenly;
    }
    .wrap>button{
      font-size:8vw;
    }
    </style>
    <div class='wrap'>
      <button class='reconnect'>重连</button>
      <button class='showLogin'>登陆</button>
      <button class='exit'>退出</button>
    </div>
  `
    this.showLogin=this.shadowRoot.querySelector('.wrap>.showLogin');
    this.exit=this.shadowRoot.querySelector('.wrap>.exit');
    this.reconnect=this.shadowRoot.querySelector('.wrap>.reconnect');
  }

}
customElements.define('wifi-footer', Footer);