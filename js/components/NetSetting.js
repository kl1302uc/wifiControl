class NetSetting extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    console.log('当自定义元素第一次被连接到文档DOM时被调用', this.IPAddress);
    this.attachShadow({ mode: 'open' }).innerHTML = /*html*/ `
    <style>
    *{
      padding:0;
      margin:0;
    }
      :host{
        display:none;
        position:fixed;
        z-index:200;
        width:100%;
        background-color:gray;
        
      }
      .wrap{
        display:flex;
        flex-direction:column;
        justify-content:flex-start;
        font-size:5vw;
          height:100dvh;
      }
      .wrap>label{
      /* border:solid 2px red;*/
        display:flex;
        align-items:stretch;
        margin-top:2vw;

      
      
      }
      .wrap>label>span:last-child{
        color:red;
      }
      .wrap > label > input {
         border: solid 1 px green;
          outline: 0;
          display: block;
          width: 100%;
          box-sizing: border-box;
          flex: 1;
          font-size: 5vw;
         
      }   
      .wrap>label>input:focus{
        border:solid orange 1px;
      }
      
    </style>
    <div class='wrap'>
      <h3>移动终端配置</h3>
      <label><span>WiFi名称:</span><input/><span>x</span></label>
      <label><span>WiFi密码:</span><input/><span>x</span></label>
      <label><span>IP地址:</span><input placeholder='不填就使用自动获取'/><span>x</span></label>
      <label><span>子网掩码:</span><input/><span>x</span></label>
      <label><span>DNS1:</span><input/><span>x</span></label>
      <label><span>DNS2:</span><input/><span>x</span></label>
    </div>
    
    `
  }
}
customElements.define('net-setting', NetSetting);