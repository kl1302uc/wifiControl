class EditUser extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'}).innerHTML=`
    <style>
    :host{
      display:none;
      position:fixed;
      height:100%;
      background-color:rgba(0,0,0,0.5);
      z-index:100;
    }
    .wrap{
      width:100%;
    
      background-color:RGB(253, 230, 224);
      display:flex;
      flex-direction:column;
      justify-content:start;
      font-size:5vw;
    }
    .wrap>*{
      margin:2vw;
      font-size:5vw;
    }
    .wrap>label{
      
    
    }
    .wrap>label>input{
      width:75%;
      font-size:6vw;
      border:solid 1px green;
      outline:0;
    }
    .wrap>label>input:focus{
      border-color:orange;
    }
    .wrap>.btn{ 
      text-align:center;
    }
    .wrap>.btn>button{
      font-size:6vw;
      margin:0 5vw;
    }
    </style>
    <div class='wrap'>
      <label>用户名称:<input type='text'/></label>
      <label>用户密码:<input type='text'/></label>
      <div class='btn'>
        <button>取消</button>
        <button>保存</button>
      </div>
    </div>

    `
    const confirmClick=new Event('confirmClick');
    
    this.username=this.shadowRoot.querySelector('.wrap>label:first-child>input');
    this.password=this.shadowRoot.querySelector('.wrap>label:nth-child(2)>input');
    this.cancel=this.shadowRoot.querySelector('.wrap>.btn>button');
    this.confirm=this.cancel.nextElementSibling;
    /*取消按钮被单击*/
    this.cancel.addEventListener('click',()=>{
      this.style.display='none';
    });
    /*确定按钮被点击*/
    this.confirm.addEventListener('click',()=>{
      //Object.assign(confirmClick,{mode:this.index});
      this.dispatchEvent(confirmClick);//发送事件
    })
    /*this.username.addEventListener('input',(ev)=>{
      console.log(ev.target.value);
    })
    this.username.addEventListener('blur',(ev)=>{
      console.log(ev.target.value);
    });*/
  }
  get key() {
    return {username:this.username.value,password:this.password.value};
  }
  
  set key(value) {
  
    this.username.value=value.username;
    this.password.value=value.password;
  }

  connectedCallback() {
    console.log('当自定义元素第一次被连接到文档DOM时被调用', this.IPAddress);
  }

  disconnectedCallback() {
    console.log('当自定义元素与文档DOM断开连接时被调用');
  }

  adoptedCallback() {
    console.log('当自定义元素被移动到新文档时被调用');
  }
}
window.customElements.define('edit-user',EditUser);