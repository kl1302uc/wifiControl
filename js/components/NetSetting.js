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
        height:100%;
        background-color:gray;
        overflow:auto;
        
      }
      .wrap{
        display:flex;
        flex-direction:column;
        justify-content:flex-start;
        font-size:6vw;
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
      .wrap > label > input:not(input[type="checkbox"]) {
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
      <label><span>DHCP</span><input name="DHCP" type="checkbox"/></label>
      <label><span>IP地址:</span><input name='localIP'/><span>x</span></label>
      <label><span>子网掩码:</span><input name='subnet'/><span>x</span></label>
      <label><span>网关:</span><input name='gateway'/><span>x</span></label>
      <label><span>DNS1:</span><input name='dns1'/><span>x</span></label>
      <label><span>DNS2:</span><input name='dns2'/><span>x</span></label>
      
      <h3>接入点配置(WIFI_AP)</h3>
      <label><span>隐藏WiFi</span><input name="AP_hidden" type="checkbox"/></label>
      <label><span>WiFi名称:</span><input name='AP_SSID'/><span>x</span></label>
      <label><span>WiFi密码:</span><input name='AP_PASS'/><span>x</span></label>
      <label><span>IP地址:</span><input name='AP_localIP'/><span>x</span></label>
      <label><span>子网掩码:</span><input name='AP_subnet'/><span>x</span></label>
      <label><span>网关:</span><input name='AP_gateway'/><span>x</span></label>
      <label><span>频道:</span><input type="number" name='AP_channel' placeholder='共13个频道'/><span>x</span></label>
      <label><span>在线数:</span><input type="number" name='AP_maxConection' placeholder='允许的最多10个'/><span>x</span></label>
      <div class='btn'><button>取消</button><button>保存</button></div>
    </div>
    
    `
    this.wrap = this.shadowRoot.querySelector('.wrap');
    this.cancel = this.wrap.querySelector('.btn>button:first-child');
    this.confirm = this.cancel.nextElementSibling;
    this.SSID = this.shadowRoot.querySelector('.wrap>label>input[name="SSID"]');
    this.PASS = this.shadowRoot.querySelector('.wrap>label>input[name="PASS"]');
    this.DHCP = this.shadowRoot.querySelector('.wrap>label>input[name="DHCP"]');
    this.localIP = this.shadowRoot.querySelector('.wrap>label>input[name="localIP"]');
    this.subnet = this.shadowRoot.querySelector('.wrap>label>input[name="subnet"]');
    this.gateway = this.shadowRoot.querySelector('.wrap>label>input[name="gateway"]');
    this.dns1 = this.shadowRoot.querySelector('.wrap>label>input[name="dns1"]');
    this.dns2 = this.shadowRoot.querySelector('.wrap>label>input[name="dns2"]');
    this.AP_hidden = this.shadowRoot.querySelector('.wrap>label>input[name="AP_hidden"]');
    this.AP_SSID = this.shadowRoot.querySelector('.wrap>label>input[name="AP_SSID"]');
    this.AP_PASS = this.shadowRoot.querySelector('.wrap>label>input[name="AP_PASS"]');
    this.AP_localIP = this.shadowRoot.querySelector('.wrap>label>input[name="AP_localIP"]');
    this.AP_subnet = this.shadowRoot.querySelector('.wrap>label>input[name="AP_subnet"]');
    this.AP_gateway = this.shadowRoot.querySelector('.wrap>label>input[name="AP_gateway"]');
    this.AP_channel = this.shadowRoot.querySelector('.wrap>label>input[name="AP_channel"]');
    this.AP_maxConection = this.shadowRoot.querySelector('.wrap>label>input[name="AP_maxConection"]');
    this.spanX = this.shadowRoot.querySelectorAll(".wrap>label>span:nth-child(3)");
    this.input = this.shadowRoot.querySelectorAll(".wrap>label>input");
    const matchInput = () => {
      this.input.forEach((element) => {
        if (element.name == 'SSID' || element.name == "AP_SSID") {
          let regex = /^[\w\-\.@#\u4e00-\u9fa5]{1,32}$/g; //匹配汉字、字母、数字的字符
          element.nextElementSibling.style.visibility = regex.test(element.value) ? "hidden" : "visible";
        } else if (element.name == 'PASS' || element.name == "AP_PASS") {
          let regex = /^[\w\-\.@#]{8,32}$/g; //匹配非汉字
          element.nextElementSibling.style.visibility = regex.test(element.value) ? "hidden" : "visible";
        } else if (['localIP', 'subnet', 'gateway', 'dns1', 'dns2', "AP_local", "AP_subnet", "AP_gateway"].includes(element.name)) {
          let regex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/g; //匹配IP地址
          element.nextElementSibling.style.visibility = regex.test(element.value) ? "hidden" : "visible";
        } else if (element.name == 'AP_maxConection') {
          let regex = /^([1-9]|10)$/g;//匹配1-10
          element.nextElementSibling.style.visibility = regex.test(element.value) ? "hidden" : "visible";
        } else if (element.name == "AP_channel") {
          let regex = /^(1[0-3]|[1-9])$/g; //匹配1-13
          element.nextElementSibling.style.visibility = regex.test(element.value) ? "hidden" : "visible";
        }

      })
    }
    this.DHCP.addEventListener("input", () => {
      const disabled = this.DHCP.checked;
      this.localIP.disabled = disabled;
      this.subnet.disabled = disabled;
      this.gateway.disabled = disabled;
      this.dns1.disabled = disabled;
      this.dns2.disabled = disabled;
      if (disabled) {
        this.localIP.value = this._wifiSettingData.localIP ?? '';
        this.subnet.value = this._wifiSettingData.subnet ?? '';
        this.gateway.value = this._wifiSettingData.gateway ?? '';
        this.dns1.value = this._wifiSettingData.dns1 ?? '';
        this.dns2.value = this._wifiSettingData.dns2 ?? '';
      }
      matchInput();
    })
    const event = new Event('confirmClick');
    /* 取消按钮被点击关闭此页面 */
    this.cancel.addEventListener('click', () => {
      this.style.display = 'none';
    });
    /* 保存按钮被点击将会发送自定义事件到Setting组件中赋值给settingData.wifiConfig */
    this.confirm.addEventListener('click', () => {
      let x = [...this.spanX].some(
        element => getComputedStyle(element).visibility === "visible"
      );
      console.log("x=" + x);
      if (x) {
        alert("输入有误！");
        return;
      }
      Object.assign(event, { wifiSettingData: this.wifiSettingData });//向event中添加参数被点击的wifi名
      this.dispatchEvent(event);
      this.style.display = 'none';
    });
    /* 当input事件触发匹配正则是否正确不正确将会在右侧显示X */
    this.wrap.addEventListener("input", (ev) => {
      if (ev.target.matches('.wrap>label>input')) {//css选择器匹配输入框
        if (["SSID", "AP_SSID"].includes(ev.target.name)) {
          let regex = /^[\w\-\.@#\u4e00-\u9fa5]{1,32}$/g; //匹配汉字、字母、数字的字符
          ev.target.nextElementSibling.style.visibility = regex.test(ev.target.value) ? "hidden" : "visible";
        } else if (['AP_PASS', 'PASS'].includes(ev.target.name)) {
          let regex = /^[\w\-\.@#]{8,32}$/g; //匹配非汉字
          ev.target.nextElementSibling.style.visibility = regex.test(ev.target.value) ? "hidden" : "visible";
        } else if (['localIP', 'subnet', 'gateway', 'dns1', 'dns2', "AP_localIP", "AP_subnet", "AP_gateway"].includes(ev.target.name)) {
          let regex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/g; //匹配IP地址
          ev.target.nextElementSibling.style.visibility = regex.test(ev.target.value) ? "hidden" : "visible";
        } else if (ev.target.name == "AP_maxConection") {
          let regex = /^([1-9]|10)$/g; //匹配1-10
          ev.target.nextElementSibling.style.visibility = regex.test(ev.target.value) ? "hidden" : "visible";

        } else if (ev.target.name == "AP_channel") {
          let regex = /^(1[0-3]|[1-9])$/g; //匹配1-13
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
        DHCP: this.DHCP.checked,
        localIP: this.localIP.value,
        subnet: this.subnet.value,
        gateway: this.gateway.value,
        dns1: this.dns1.value,
        dns2: this.dns2.value,
        AP_hidden: this.AP_hidden.value,
        AP_SSID: this.AP_SSID.value,
        AP_PASS: this.AP_PASS.value,
        AP_localIP: this.AP_localIP.value,
        AP_subnet: this.AP_subnet.value,
        AP_gateway: this.AP_gateway.value,
        AP_channel: this.AP_channel.value,
        AP_maxConection: this.AP_maxConection.value,

      });
    return this._wifiSettingData;

  }
  set wifiSettingData(value) {
    this._wifiSettingData = value ?? {};
    this.SSID.value = value.SSID ?? '';
    this.PASS.value = value.PASS ?? '';
    this.DHCP.checked = value.DHCP ?? false;
    this.localIP.value = value.localIP ?? '';
    this.subnet.value = value.subnet ?? '';
    this.gateway.value = value.gateway ?? '';
    this.dns1.value = value.dns1 ?? '';
    this.dns2.value = value.dns2 ?? '';
    this.AP_hidden.checked = value.AP_hidden ?? false;
    this.AP_SSID.value = value.AP_SSID ?? '';
    this.AP_PASS.value = value.AP_PASS ?? '';
    this.AP_localIP.value = value.AP_localIP ?? '';
    this.AP_subnet.value = value.AP_subnet ?? '';
    this.AP_gateway.value = value.AP_gateway ?? '';
    this.AP_channel.value = value.AP_channel ?? 1;
    this.AP_maxConection.value = value.AP_maxConection ?? 4;
  }
}
customElements.define('net-setting', NetSetting);