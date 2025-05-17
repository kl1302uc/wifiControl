class Menus extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = /*html*/ `
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
      <ul class='menuList'>
        <li data-option='setting'>进入设置</li>
        <li data-option='changePassword'>修改密码</li>

        <li data-option='record'>导出记录</li>
        <li data-option='helf'>关于帮助</li>
      </ul>
    </div>
    `
    this.list = this.shadowRoot.querySelector('.wrap>.menuList');
    this.menuBut = this.shadowRoot.querySelector('.wrap>.menuBut');
   // this.menuWrap = this.shadowRoot.querySelector('.wrap');
    
    
    
    this.menuBut.addEventListener('click', (ev) => {
      
      this.list.style.display = window.getComputedStyle(this.list, null).getPropertyValue("display") == 'none' ? 'block' : 'none';
    });
    const listClick = new Event('listClick');
    this.list.addEventListener('click', (ev) => {
      Object.assign(listClick, { option: ev.target.dataset.option });
      this.dispatchEvent(listClick);
      this.list.style.display = 'none';
      ev.stopPropagation(); 
      
    });
    
    document.body.addEventListener('click', () => {
      this.list.style.display = 'none';
    });
    
  }
  
}
window.customElements.define('wifi-menus', Menus);