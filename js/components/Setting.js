class Setting extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement('template');
    template.innerHTML = /*html*/ `
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
                font-size:5vw;
                text-align:center;
                background-color:gray;
                justify-content:flex-start;
            }
            .wrap ul{
              flex:1;
              list-style:none;
              padding:0;
              margin:0;

            }
            .wrap>ul>li{
              padding:1vw 2vw;
              border-bottom:solid 1px gray;
              font-size:6vw;
                
            }
            .wrap>ul>.setWiFi{
              display:flex;
              flex-direction:column;
              justify-content:flex-start;
            }
            .wrap>ul>.setWiFi>.setWiFiModule{
              display:flex;
              align-items:center;
            }
            .wrap>ul>.setWiFi>.setWiFiModule>div{
              flex:1;
            }

            .wrap>ul>.setWiFi>.setWiFiModule>button{
              font-size:6vw;
            
            }

            .wrap>ul>.setWiFi>.setWiFiName{
              flex:1;
              flex-direction:column;
              /*box-shadow:0px 0px 1px red;*/
            }
          
            .wrap>ul>li label{
              display:flex;
              align-items:center;
              justify-content:flex-start;
            }
            .wrap>ul>li input[type='text']{
              display:block;
              width:30vw;
              flex:1;
              font-size:6vw;
            }
            .wrap>ul>li input[type='text']:focus{
              border:solid orange 1px;
            }
            .wrap>ul>li input[type='text']{
              border:solid 1px green;
              outline:0;
            }
            .wrap>ul>li input[type='radio']{
              width:5vw;
              height:5vw;
            }
            .wrap>ul>.setUserList{
              padding:1vw 0;
            }
            .wrap .userList{
              background:gray;
              color:white;
          
            }
            .wrap .userList>.addUser{
              text-align:center;

            }
            .wrap .userList>li:not(.addUser){
              display:flex;
              justify-content:space-between;
              align-items:center;
              padding:1vw 3vw;
              border-bottom:solid 1px red;
            }
            .wrap .userList>li:active{
              background:white;
              color:black;
            }
            .wrap .userList>li>button{
              
              font-size:5vw;
            }
        </style>
        <div class="wrap">
            <header>设置界面</header>
            <ul>
              <li class='setWiFi'>
                <div class='setWiFiName'>
                  <label><span>WiFi名称:</span><input type='text'/></label>
                  <label><span>WiFi密码:</span><input type='text'/></label>
                </div>
                <div class='setWiFiModule'>
                  <label><input type='radio' name='module'/>无线终端</label>
                  <label><input type='radio' name='module'/>接入点</label>
                  <div></div>
                  <button>保存设置</button>
                </div>
              </li>
              <li class='manage'>
                <div class='setManage'>
                  <label><span>管理员旧密码:</span><input type='text'/></label>
                  <label><span>管理员新密码:</span><input type='text'/></label>
                </div>
              </li>
                <li class='setUserList'>
                  <ul class='userList'>
                    <li><span>刘波</span><button>删除</button></li>
                    <li><span>刘波</span><button>删除</button></li>
                    <li><span>刘波</span><button>删除</button></li>
                    <li><span>刘波</span><button>删除</button></li>
                    <li class='addUser'>+添加用户</li>
  
                  </ul>
                </li>
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