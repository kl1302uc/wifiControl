class WiFiList extends HTMLElement {
    listWifi = [];
    constructor() {
        super();
    }
    connectedCallback() {
        console.log('当自定义元素第一次被连接到文档DOM时被调用', this.IPAddress);
        this.attachShadow({ mode: 'open' }).innerHTML = /*html*/ `
        <style>
        :host{
          display:none;
          position:fixed;
          height:100%;
          width:100%;
          background-color:rgba(0,0,0,0.3);
          z-index:189;
          box-sizing:border-box;
          padding:0 1vw;
            
        }
        .wrap{
           
            height:100%;
            text-align:left;
            
            box-sizing:border-box;
            background-color:black;
            display:flex;
           flex-direction:column;
           justify-content:flex-start;
          
        }
        .wrap>div{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color:white;
        }
        .wrap>ul{
            flex:1;
            list-style:none;
            padding:0;
            margin:0;
            color:gray;
           
            overflow-y:auto;
            overflow-x:auto;
         
        }
        .wrap>ul>li{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            border-top:solid gray 1px;
        }
        </style>
        <div class='wrap'>
            <div>wifi名，信号强度,是否加密wifi名,信号强度,是否加密</div>
            <ul>
                <li>wifi名,信号强度,是否加密wifi名,信号强度，是否加密</li>
                <li>wifi名，信号强度，是否加密</li>
                <li>wifi名，信号强度，是否加密</li>
                <li>wifi名，信号强度，是否加密</li>
                <li>wifi名，信号强度，是否加密</li>
                <li>wifi名，信号强度，是否加密</li>
            </ul>
        </div>       

        `
        
        const event = new Event('confirmClick');

        this.ul = this.shadowRoot.querySelector('.wrap>ul');
        this.divLabel = this.shadowRoot.querySelector('.wrap>div');
        this.ul.addEventListener('click',(ev)=>{
          
           Object.assign(event, { SSID:ev.target.dataset.SSID });//向event中添加参数被点击的wifi名
           this.dispatchEvent(event); //触发自定义事件
           this.style.display='none';
        })
        
    }
    
    disconnectedCallback() {
        console.log('当自定义元素与文档DOM断开连接时被调用');
    }
    
    adoptedCallback() {
        console.log('当自定义元素被移动到新文档时被调用');
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log("自定义正方形元素的属性已变更。", newValue);
        //this.list=newValue;
    }
    static get observedAttributes() {
        return ["list"];
    }
    get list() {
        
        return this.listWifi;
    }
    set list(value) {
        let objstr = '';
        this.listWifi = value;
        this.divLabel.innerText = '';
        for (var prop in this.listWifi[0]) {
            // Tab to edit
            objstr += prop + ' | ';
        }
        this.divLabel.innerText = objstr;
        
        this.ul.innerHTML = "";
        for (let i = 0; i < this.listWifi.length; i++) {
            //this.ul.innerHTML+=`<li>${JSON.stringify(value[i],(key,value)=>{return value[key]})}</li>`;
            objstr = '';
            for (var prop in this.listWifi[i]) {
                objstr += this.listWifi[i][prop] + '&nbsp|&nbsp';
                
                
            }
            let li = document.createElement('li');
            li.dataset.SSID=this.listWifi[i].SSID;
            li.innerHTML=objstr;
            this.ul.appendChild(li);
            //this.ul.innerHTML += `<li>${objstr}</li>`;
           
            //  this.ul.innerHTML+=`<li>${value[i].)}</li>`;
            // console.log(this.listWifi[i]);
        }
        
        
    }
    
    
}
customElements.define("wifi-list", WiFiList);