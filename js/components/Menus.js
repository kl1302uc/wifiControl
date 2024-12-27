class Menus extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'}).innerHTML=`
    <style>
    :host{
    
    }
    .wrap{
      
    }
    .wrap>p{
      
       padding:0;
       margin:0;
       text-align:right;
    }
    .wrap>ul{
      padding:0;
      margin:0;
      background:gray;
      list-style:none;
      display:none;
    }
    .wrap>ul>li{
      border-bottom:solid RGB(250, 249, 222) 1px;
    }
    
    </style>
    <div class='wrap'>
      <p class='menuBut'>···</p>
      <ul>
        <li>进入设置</li>
        <li>导出记录</li>
        <li>关于帮助</li>
      </ul>
    </div>
    `
    this.list=this.shadowRoot.querySelector('.wrap>ul');
    this.menuBut=this.shadowRoot.querySelector('.wrap>.menuBut');
    this.menuBut.addEventListener('click',(ev)=>{
      
     this.list.style.display=window.getComputedStyle(this.list,null).getPropertyValue("display")=='none'?'block':'none';
     ev.stopPropagation();
    });
    document.body.addEventListener('click',()=>{
      this.list.style.display='none';
  
    })


  }
  
}
window.customElements.define('wifi-menus',Menus);