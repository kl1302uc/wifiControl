import './EditUser.js';
class Setting extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement('template');
    template.innerHTML = /*html*/ `
        <style>
            :host{
                display:block;
                position:relative;
                height:100%;
                z-index:120;
              
            }
            .wrap{
                display:flex;
                flex-direction:column;
                height:100%;
            }
            .wrap>header{
                font-size:5vw;
                text-align:center;
                background-color:RGB(204, 232, 207);
                justify-content:flex-start;
            }
            .wrap ul{
              flex:1;
              list-style:none;
              padding:0;
              margin:0;
            }
            .wrap>ul{
                display:flex;
                flex-direction:column;
                flex:1;
                height:0;
            }
            .wrap>ul>li{
              padding:1vw 2vw;
              border-bottom:solid 1px gray;
              font-size:5vw;  
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
              font-size:5vw;
            
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
              font-size:5vw;
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
            .manage>.setManage{
              display:flex;
              align-items:center;
            }
            .manage>.setManage>span{
              flex:1;
              font-size:3vw;
              color:red;
              
            }
            .manage>.setManage>button{
            font-size:5vw;
              margin-right:0;
            }
            .wrap>ul>.setUserList{
              padding:0;
              flex:1;
              height:0;
              min-height:0;
              display:flex;
              flex-direction:column;
             
            }
            .wrap .userList{
              flex:1;
              height:0;
              min-height:0;
              overflow:auto;
              color:white;
            }
            .wrap .userList>.addUser{
              text-align:center;
            }
            .wrap .userList>li{
                background-color:RGB(110, 123, 108);
            }
            .wrap .userList>li:not(.addUser){
              display:flex;
              justify-content:space-between;
              align-items:center;
              padding:1vw 3vw;
              border-bottom:solid 1px black;
             
            }
            .wrap .userList>li>span:nth-child(2){
              display:block;
              flex:1;
              color:#FDE6E0;
            
              overflow:auto;
              white-space:nowrap; 
              margin:0 1vw;
              
            }
            .wrap .userList>li:active{
              background:RGB(234,234,239);
           
            }
            .wrap .userList>li>button{
              /*pointer-events:none;*/
              font-size:5vw;
            }
        </style>
        <div class="wrap">
            <edit-user></edit-user>
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
                
                  <label><span>管理员旧密码:</span><input type='text'/></label>
                  <label><span>管理员新密码:</span><input type='text'/></label>
                  <div class='setManage'><span>忘记密码按重置按钮5秒以上，默认密码admin</span><button>保存设置</button></div>
                
              </li>
                <li class='setUserList'>
                  <ul class='userList'>
                    <li><span>刘波</span><span>123456</span><button>删除</button></li>
                    <li><span>刘菲菲</span><span>123456789</span><button>删除</button></li>
                    <li><span>刘雨桐</span><span>1234567894466646443466464646464649</span><button>删除</button></li>
                    <li><span>刘妍</span><span>12</span><button>删除</button></li>
                    <li><span>刘宗广</span><span>a</span><button>删除</button></li>
                    <li><span>刘一</span><span>a</span><button>删除</button></li>
                    <li><span>刘二</span><span>a</span><button>删除</button></li>
                    <li><span>刘三</span><span>a</span><button>删除</button></li>
                    <li><span>刘世界</span><span>a</span><button>删除</button></li>
                    <li><span>刘世野</span><span>a</span><button>删除</button></li>
                    <li><span>刘世纪</span><span>a</span><button>删除</button></li>
                    <li><span>刘世杰</span><span>a</span><button>删除</button></li>
                    <li><span>刘世面</span><span>a</span><button>删除</button></li>
                    <li><span>张三</span><span>a</span><button>删除</button></li>
                    <li><span>李四</span><span>a</span><button>删除</button></li>
                    <li class='addUser'>+添加用户</li>
  
                  </ul>
                  
                </li>
               
            
            </ul>
        <div>
        `
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.userList = this.shadowRoot.querySelector('.setUserList>.userList');
    this.editUser = this.shadowRoot.querySelector('.wrap>edit-user');
    /*列表被点击ul事件*/
    this.userList.addEventListener('click', (ev) => {

      if (ev.target.nodeName == 'BUTTON') { //删除按钮被点击
        let result = confirm("确定要删除" + ev.target.parentNode.firstElementChild.innerText + "吗?");
        if (result) {
          //--------------------------此处添加删除单片机的相关用户函数--------------------------------------
          ev.target.parentNode.parentNode.removeChild(ev.target.parentNode);
        }

      } else if (ev.target.innerText == '+添加用户') { //最下面添加用户被点击
        console.log('添加用户被点击');
        this.editUser.style.display = 'block';
        this.editUser.key = { username: '', password: '' };
        this.editUser.currentLi = ev.target.closest('.userList>li');
      } else if(ev.target.nodeName!='UL') { //获取被点击列表项中的用户名密码
        this.editUser.style.display = 'block';
        this.editUser.key = { username: ev.target.closest('.userList>li').firstElementChild.innerText, password: ev.target.closest('.userList>li').children[1].innerText };
        this.editUser.currentLi = ev.target.closest('.userList>li');
      }

    });
    /*添加编辑后点击保存按钮触发的事件*/
    this.editUser.addEventListener('confirmClick', (ev) => {
      let username = this.editUser.username.value.trim();
      let password = this.editUser.password.value.trim();
      const limitUsername = /^[\w\u4e00-\u9fa5]+$/g; //限定用户名只能为汉子字母数字及下划线
      const limitPassword = /[^\w]+/g;
      /*判断用户名密码是否为空*/
      if (!username || !password) {
        alert('用户名或密码不能为空');
        return
      }
      /*判断用户名是否合法*/
      if (!limitUsername.test(username)) {
        alert('用户名只能为汉子、字母、数字及下划线！');
        return;
      };
      /*判断密码是否合法*/
      if (limitPassword.test(password)) {
        alert('密码只能为字母、数字及下划线！');
        return;
      };

      /*区分添加与编辑用户*/
      if (ev.target.currentLi.innerText == '+添加用户') {//添加用户处理事件
        if (this.queryRepeat(username) == true) {
          alert('用户名已存在');
          return;
        }
        const li = document.createElement('li');
        li.innerHTML = `<span>${username}</span><span>${password}</span><button>删除</button>`;
        ev.target.currentLi.parentNode.insertBefore(li, ev.target.currentLi)
        console.log('添加用户被点击触发事件');//-----------------------------------------------------------
      } else {//编辑处理事件
        if (this.queryRepeat(username, Array.from(this.editUser.currentLi.parentNode.children).indexOf(this.editUser.currentLi)) == true) {
          alert('用户名已存在');
          return;
        }
        //console.log(Array.from(this.editUser.currentLi.parentNode.children).indexOf(this.editUser.currentLi));
        this.editUser.currentLi.firstElementChild.innerText = username; //将编辑的用户名赋值到点击的列表中
        this.editUser.currentLi.children[1].innerText = password; //将编辑的密码赋值到点击的列表中

      }
      this.editUser.style.display = 'none'; //关闭用户编辑窗口
    })
    console.log('设置界面加载后');
  }

  /*处理用户名是否除了本身是否还有重名，index为本身的排列号*/
  queryRepeat(username, index = -1) {
    for (let i = 0; i < this.userList.children.length - 1; i++) {
      if (this.userList.children[i].children[0].innerText == username && index != i) {
        return true;
      }
    }
    return false;
  }
}
customElements.define("wifi-setting", Setting);