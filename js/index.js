import './components/Switch.js';
import './components/Footer.js';
import './components/Login.js'; //此组件是定义在Switch中的在此引入也可以在组件中使用
import { login } from './request.js';

    const message = "01221204a";
    const sha256Hash = CryptoJS.SHA256(message).toString(); console.log("SHA-256 Hash:", sha256Hash);


    const wifiSwitch = document.querySelector('wifi-switch'); //获取开关组件
    const wifiFooter = document.querySelector('wifi-footer'); //获取底部按钮导航组件
    const winHeight = innerHeight; document.body.style.height = winHeight + 'px'; //确定body高度防止输入法弹出上上推网页
    /*window.addEventListener('resize',()=>{
      console.log('窗口大小发生变化',innerHeight);
      //document.body.style.marginBottom=(innerHeight-winHeight)+'px';
    })*/
    /*body包括子组件所有内容被点击均关闭登录界面(已设置点击登录界面和底部登录按钮不关闭)*/
    document.body.addEventListener('click', (event) => {
      wifiSwitch.wifiLogin.style.display = 'none'; //点击body内所有内容均关闭登录界面

    });
    /*登录界面登录按钮被点击，将用户名密码通过事件event传到事件函数中*/
    wifiSwitch.wifiLogin.addEventListener('loginClick', async(ev) => {
      
      const result=await login(`{username:${ev.username},password:${ev.password}}`);//发送登录信息用户名密码
      if(result.password){
        localStorage.setItem('login',JSON.stringify(result));//若返回的登录信息密码存在向本地写入永久存储
        
      }
      console.log('getItem',localStorage.getItem('login'));
      console.log(result.password);
      console.log('loginClick', ev.username + '_' + ev.password);
    });
    /*△被点击*/
    wifiSwitch.addEventListener('upClick', (event) => {
      console.log('upClick', event.name);
    });
    /*▽被点击*/
    wifiSwitch.addEventListener('downClick', (event) => {
      console.log('downClick');
    });

    /*重连按钮被点击*/
    wifiFooter.reconnect.addEventListener('click', (ev) => {

    });
    /*底部登录按钮被点击显示或关闭登录界面*/
    wifiFooter.showLogin.addEventListener('click', (ev) => {
      let loginDisplay = getComputedStyle(wifiSwitch.wifiLogin).display; //获取登录界面实时样式
      wifiSwitch.wifiLogin.style.display = loginDisplay == 'none' ? 'block' : 'none'; //根据登录界面实时样式确定是否显示登录界面
      ev.stopPropagation(); //停止冒泡
    });
    /*退出网页*/
    wifiFooter.exit.addEventListener('click', (ev) => {
      window.close(); //关闭网页
    })