const template = document.createElement('template');
template.innerHTML = `
<style>
:host{
  position:absolute;
  z-index:99;
  text-align:center;
  background-color:red;
  overflow:hidden;
  display:none;
}
.loginWrap{
  display:inline-flex;
  background-color:gray;
  flex-direction:column;
  justify-content:flex-start;
  align-items:center;
  font-size:6vw;
  padding:5vw;
}
.loginWrap>label{
  text-align:right;
  width:100%;
  margin-bottom:6vw;
}
.loginWrap>label>input{
  font-size:6vw;
  width:50vw;
}
.loginWrap>button{
  font-size:6vw;
}
</style>
<div class='loginWrap'>
  <label>用户名:<input type='text' name='username'></label>
  <label>密码:<input type='password' name='password'></label>
  <button>登录</button>
</div>

`
class Login extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    /*登录界面被点击阻止冒泡到body避免关闭自己*/
    this.addEventListener('click', (ev) => {
      ev.stopPropagation(); //阻止冒泡
    });
    this.username = this.shadowRoot.querySelector('.loginWrap>label>input[name=username]');
    this.password = this.shadowRoot.querySelector('.loginWrap>label>input[name=password]');
    let login = JSON.parse(localStorage.getItem('login'));
    if (login) {
      this.username.value = login.username;
      this.password.value = login.password;
    }else{
      this.style.display='block';
    }
    /*创建这个组件自定义事件*/
    const event = new Event('loginClick');
    this.shadowRoot.querySelector('.loginWrap>button').addEventListener('click', (ev) => {
      Object.assign(event, { username: this.username.value, password: this.password.value }); //向event中添加参数本地input输入的内容
      this.dispatchEvent(event); //触发自定义事件
    });
  }
}
customElements.define('wifi-login', Login);