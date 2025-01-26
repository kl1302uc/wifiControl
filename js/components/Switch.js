
class Switch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
    <style>
    :host{
      position:relative;
      display:flex;
      justify-content:center;
      align-item:center;
      overflow:hidden;
    }
    .wrap{
      border:solid 0.5vw black;
      box-shadow:1.5vw 1.5vw 2vw;
      margin:auto;
      background-color:white;
    }
    .up{
     border:solid 25vw transparent;
     border-bottom:solid 50vw black;
     border-top:none;
     box-sizing:border-box;
     position:relative;
     margin-bottom:1vw;
    }
    .up:after{
      content:'';
      display:block;
      border:solid 25vw transparent;
      border-bottom:solid 50vw white;
      border-top:none;
      position:absolute;
      transform-origin:50% 70%;
      transform:translateX(-50%) scale(0.95);
    }
    .up:active.up:after{
      border-bottom-color:gray;
    }
    .down{
      border:solid 25vw transparent;
      border-top:solid 50vw black;
      border-bottom:none;
      box-sizing:border-box;
      position:relative;
    }
    .down:after{
      content:'';
      display:block;
      border:solid 25vw transparent;
      border-top:solid 50vw white;
      border-bottom:none;
      position:absolute;
      top:-50vw;
      transform-origin:50% 30%;
      transform:translateX(-50%) scale(0.95);
    }
    .down:active.down:after{
      border-top-color:gray;
    }
    </style>
     <wifi-login></wifi-login>
    <div class='wrap'>
     
      <div class='up'></div>
      <div class='down'></div>      
    </div>
  `
   this.up=this.shadowRoot.querySelector('.wrap>.up');
   this.down=this.shadowRoot.querySelector('.wrap>.down');
   this.wifiLogin=this.shadowRoot.querySelector('wifi-login');
   /*创建事件*/
   const upClick=new Event('upClick');
   const downClick=new Event('downClick');
   //upClick.name='实验';//测试能否传参
   /*给组件添加自定义事件传送到index获取*/
   /*△被点击*/
   this.up.addEventListener('click',()=>{
     this.dispatchEvent(upClick);//发送自定义事件
   });
   /*▽被点击*/
   this.down.addEventListener('click',()=>{
     this.dispatchEvent(downClick);//发送事件
   });
  }
  
  
}
customElements.define('wifi-switch', Switch);