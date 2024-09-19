import './components/Switch.js';
import './components/Footer.js';
import './components/Login.js';//此组件是定义在Switch中的在此引入也可以在组件中使用
import {login} from './request.js';
login('测试');
const wifiSwitch = document.querySelector('wifi-switch');//获取开关组件
const wifiFooter = document.querySelector('wifi-footer');//获取底部按钮导航组件
const winHeight=innerHeight;
document.body.style.height = winHeight + 'px'; //确定body高度防止输入法弹出上上推网页
/*window.addEventListener('resize',()=>{
  console.log('窗口大小发生变化',innerHeight);
  //document.body.style.marginBottom=(innerHeight-winHeight)+'px';
})*/
/*body包括子组件所有内容被点击均关闭登录界面(已设置点击登录界面和底部登录按钮不关闭)*/
document.body.addEventListener('click',(event)=>{
  wifiSwitch.wifiLogin.style.display='none';//点击body内所有内容均关闭登录界面
  
});
/*登录界面登录按钮被点击，将用户名密码通过事件event传到事件函数中*/
wifiSwitch.wifiLogin.addEventListener('loginClick',(ev)=>{
  console.log('loginClick',ev.username+'_'+ev.password);
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
wifiFooter.reconnect.addEventListener('click',(ev)=>{
  
});
/*底部登录按钮被点击显示或关闭登录界面*/
wifiFooter.showLogin.addEventListener('click',(ev)=>{
  let loginDisplay=getComputedStyle(wifiSwitch.wifiLogin).display;//获取登录界面实时样式
  wifiSwitch.wifiLogin.style.display=loginDisplay=='none'?'block':'none';//根据登录界面实时样式确定是否显示登录界面
  ev.stopPropagation();//停止冒泡
});
/*退出网页*/
wifiFooter.exit.addEventListener('click',(ev)=>{
  window.close();//关闭网页
})
