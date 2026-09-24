class NetSetting extends HTMLElement {
  _wifiSettingData = {};
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
        font-size:6vw;
        height:100dvh;
        margin:0 1vw;
      }
      .wrap>h3{
        text-align:center;
        font-size:6vw;
        margin:2vw 0;
      }
      .wrap>label{
      /* border:solid 2px red;*/
        display:flex;
        align-items:stretch;
        margin-top:2vw;

      
      
      }
      
      .wrap>label>span:first-child{
        width:30%;
        text-align:right;
        margin-right:2vw;
      }
      .wrap>label>span:last-child{
        color:red;
        visibility:hidden;
      }
      .wrap > label > input {
         border: solid 1 px green;
          outline: 0;
          display: block;
          width: 100%;
          box-sizing: border-box;
          flex: 1;
          font-size: 6vw;
         
      }   
      .wrap>label>input:focus{
        border:solid orange 1px;
      }
      .wrap>.btn{
        text-align:center;
        margin-top:5vw;
      }
      .wrap>.btn>button{  
        font-size:6vw;
        margin:1vw 5vw;
        padding:1vw 5vw;
       
      }
      
    </style>
    <div class='wrap'>
      <h3>移动终端配置(WIFI_STA)</h3>
      <label><span>WiFi名称:</span><input name='SSID'/><span>x</span></label>
      <label><span>WiFi密码:</span><input name='PASS'/><span>x</span></label>
      <label><span>IP地址:</span><input placeholder='不填就使用自动获取' name='localIP'/><span>x</span></label>
      <label><span>子网掩码:</span><input name='subnet'/><span>x</span></label>
      <label><span>网关:</span><input name='gateway'/><span>x</span></label>
      <label><span>DNS1:</span><input name='dns1'/><span>x</span></label>
      <label><span>DNS2:</span><input name='dns2'/><span>x</span></label>
      <div class='btn'><button>取消</button><button>保存</button></div>
    </div>
    
    `
    this.wrap = this.shadowRoot.querySelector('.wrap');
    this.cancel = this.wrap.querySelector('.btn>button:first-child');
    this.confirm = this.cancel.nextElementSibling;
    this.SSID = this.shadowRoot.querySelector('.wrap>label:nth-child(2)>input');
    this.PASS = this.shadowRoot.querySelector('.wrap>label:nth-child(3)>input');
    this.localIP = this.shadowRoot.querySelector('.wrap>label:nth-child(4)>input');
    this.subnet = this.shadowRoot.querySelector('.wrap>label:nth-child(5)>input');
    this.gateway = this.shadowRoot.querySelector('.wrap>label:nth-child(6)>input');
    this.dns1 = this.shadowRoot.querySelector('.wrap>label:nth-child(7)>input');
    this.dns2 = this.shadowRoot.querySelector('.wrap>label:nth-child(8)>input');
    const event = new Event('confirmClick');
    this.cancel.addEventListener('click', () => {
      this.style.display = 'none';
    });
    this.confirm.addEventListener('click', () => {
      Object.assign(event, { wifiSettingData: this.wifiSettingData });//向event中添加参数被点击的wifi名
      this.dispatchEvent(event);
      this.style.display = 'none';
    });
    this.wrap.addEventListener("input", (ev) => {
      if (ev.target.matches('.wrap>label>input')) {//css选择器匹配输入框
        if (ev.target.name == 'SSID') {
          let regex = /^[\w\-\.@#\u4e00-\u9fa5]{1,32}$/g; //匹配汉字、字母、数字的字符
          this.SSID.nextElementSibling.style.visibility = regex.test(ev.target.value) ? "hidden" : "visible";
        } else if (ev.target.name == 'PASS') {
          let regex = /^[\w\-\.@#]{8,32}$/g; //匹配非汉字
          this.PASS.nextElementSibling.style.visibility = regex.test(ev.target.value) ? "hidden" : "visible";
        } else if (['localIP', 'subnet', 'gateway', 'dns1', 'dns2'].includes(ev.target.name)) {
          let regex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/g; //匹配IP地址
          ev.target.nextElementSibling.style.visibility = regex.test(ev.target.value) ? "hidden" : "visible";
        }

      }
    });

  }
  get wifiSettingData() {
    Object.assign(
      this._wifiSettingData, //将当前组件中输入框的值赋值给wifiSettingData对象,替换原来的值
      {
        SSID: this.SSID.value,
        PASS: this.PASS.value,
        localIP: this.localIP.value,
        subnet: this.subnet.value,
        gateway: this.gateway.value,
        dns1: this.dns1.value,
        dns2: this.dns2.value
      });
    return this._wifiSettingData;

  }
  set wifiSettingData(value) {
    this._wifiSettingData = value ?? {};
    this.SSID.value = value.SSID ?? '';
    this.PASS.value = value.PASS ?? '';
    this.localIP.value = value.localIP ?? '';
    this.subnet.value = value.subnet ?? '';
    this.gateway.value = value.gateway ?? '';
    this.dns1.value = value.dns1 ?? '';
    this.dns2.value = value.dns2 ?? '';
  }
}
customElements.define('net-setting', NetSetting);