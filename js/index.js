import './components/Switch.js';
import './components/Footer.js';
import './components/Setting.js';
import './components/Login.js'; //此组件是定义在Switch中的在此引入也可以在组件中使用
import './components/Menus.js';
import { login, reconnect, close, open, getStatus } from './request.js';

//const message = "01221204a";
//const sha256Hash = CryptoJS.SHA256(message).toString();
//console.log("SHA-256 Hash:", sha256Hash);
const header = document.querySelector('header');
window.msg = document.querySelector('header>.message');
const wifiMenus = document.querySelector('wifi-menus');
const wifiSwitch = document.querySelector('wifi-switch'); //获取开关组件
const wifiFooter = document.querySelector('wifi-footer'); //获取底部按钮导航组
const wifiSetting = document.querySelector('wifi-setting');
const winHeight = innerHeight;
window.userkey = localStorage.getItem('userkey');
document.body.style.height = winHeight + 'px'; //确定body高度防止输入法弹出上上推网页
/* 暂时关闭开始写设置界面 --------------------------------------------------------------------------------*/
/*wifiSwitch.style.display = "none";
wifiFooter.style.display = "none";
window.msg.style.display = "none";
wifiSetting.style.display = 'block';*/
/* 暂时关闭开始写主界面 --------------------------------------------------------------------------------*/
wifiSwitch.style.display = "relative";
wifiFooter.style.display = "block";
window.msg.style.display = "block";
wifiSetting.style.display = 'none';
getStatus();
/*window.addEventListener('resize',()=>{
  console.log('窗口大小发生变化',innerHeight);
  //document.body.style.marginBottom=(innerHeight-winHeight)+'px';
})*/
wifiMenus.addEventListener('click',(ev)=>{
    wifiSwitch.wifiLogin.style.display = 'none'; //点击body内所有内容均关闭登录界面
    ev.stopPropagation();//停止冒泡
});
/*右上角获取点击的哪个菜单打开相应的功能*/
wifiMenus.addEventListener('listClick', (ev) => {
  
  if (ev.option == 'setting') { //进入登录界面设置管理员用户名admin
    wifiSwitch.wifiLogin.style.display = 'block';
    wifiSwitch.wifiLogin.username.value = 'admin';
    wifiSwitch.wifiLogin.password.value = '';
    wifiSwitch.wifiLogin.password.focus();
  } else if (ev.option == 'helf') {
    alert(`
关于帮助:
        这款软件是我利用业余时间编写的，只在方便出行，希望大家喜欢！
        简要说一下，在打开软件时就会自动获取车库门状态，每次点击开关门和登录成功后都会自动获取状态信息，连续30秒获取或返回已关门或已开门就不会在获取。
        点击登录按钮弹出登录界面，输入登录成功后会自动获取长度为16位的key值，软件将使用此key值控制和获取状态，此外每次点击重连按钮会根据已获取的key值自动随机变换key值，登录成功是根据用户名密码获取变换的key值，两种方法都能改变key值
        点击右上角的···会弹出菜单列表，点击第一项进入设置，会弹出登录界面，自动将管理员用户名填写(管理员用户名只能是admin);默认密码为admin99999请尽快修改，点击登录会进入设置界面!
                            作者微信:fy1302uc        
        
        `)
  }
  console.log(ev.option);
});
/*body包括子组件所有内容被点击均关闭登录界面(已设置点击登录界面和底部登录按钮不关闭)*/
document.body.addEventListener('click', (event) => {
  wifiSwitch.wifiLogin.style.display = 'none'; //点击body内所有内容均关闭登录界面
});
/*登录界面登录按钮被点击，将用户名密码通过事件event传到事件函数中*/
wifiSwitch.wifiLogin.addEventListener('loginClick', async (ev) => {
  clearInterval(timer); //关闭启动界面后自动获取状态定时器
  try {
    const result = await login({ username: ev.username, password: ev.password, K: ev.username == 'admin' ? 'manager' : 'resetUserkey' });
    if (result.userkey) {
      localStorage.setItem('userkey', result.userkey); //若返回的登录信息密钥存在向本地写入永久存储
      localStorage.setItem('login', JSON.stringify({ username: ev.username, password: ev.password })); //向本地写入正确用户名密码
      window.userkey = result.userkey; //将常用的正确密钥保存到全局变量
      msg.innerHTML = '提示信息:登录成功！';
      wifiSwitch.wifiLogin.style.display = 'none'; //登录成功后关闭登录界面
      setTimeout(() => { getStatus(); }, 1000);

    } else if (result.admin) {
      console.log('将要跳转设置页面', result.admin); //登录管理员界面成功后返回succeed
      window.location = "#setting";
    } else {
      msg.innerText = '提示信息:' + result.error;
    }
    //console.log('getItem', localStorage.getItem('login'));
    //console.log('userkey', result.userkey);
    //console.log('loginClick', ev.username + '_' + ev.password);
  } catch (err) {
    console.warn('error:' + err);
    msg.innerText = '错误信息:' + err;
  }
});
/*△被点击*/
wifiSwitch.addEventListener('upClick', () => {
  //if(this.deltaT && performance.now()-this.deltaT<2000) return;
  open();
  //console.log('upClick', event.name);
  //this.deltaT=performance.now();
});
/*▽被点击*/
wifiSwitch.addEventListener('downClick', (event) => {
  close();
  //console.log('downClick');
});

/*重连按钮被点击*/
wifiFooter.reconnect.addEventListener('click', function() {
  window.clearInterval(window.timer);
  window.clearTimeout(window.timer2);

  this.timer && clearTimeout(this.timer);
  // 禁用按钮
  wifiFooter.reconnect.disabled = true;

  // 执行你的点击事件逻辑
  reconnect();

  // 1000毫秒后重新启用按钮
  this.timer = setTimeout(() => {
    wifiFooter.reconnect.disabled = false;
  }, 1000);

});
/*底部登录按钮被点击显示或关闭登录界面*/
wifiFooter.showLogin.addEventListener('click', (ev) => {
  let loginDisplay = getComputedStyle(wifiSwitch.wifiLogin).display; //获取登录界面实时样式
  wifiSwitch.wifiLogin.style.display = loginDisplay == 'none' ? 'block' : 'none'; //根据登录界面实时样式确定是否显示登录界面
  wifiMenus.list.style.display='none';//关闭菜单列表
  ev.stopPropagation(); //停止冒泡
});
/*退出网页*/
wifiFooter.exit.addEventListener('click', (ev) => {
  window.close(); //关闭网页
});
/* 阻止弹出菜单 */
//document.body.addEventListener('contextmenu', function(e){ e.preventDefault(); });
/* 跳转组件事件 */
window.onhashchange = () => {
  if (window.location.hash == "#setting") {
    wifiSwitch.style.display = "none";
    wifiFooter.style.display = "none";
    header.style.display = "none";
    wifiSetting.style.display = 'block';
  } else {
    wifiSwitch.style.display = "flex";
    wifiFooter.style.display = "block";
    header.style.display = "block";
    wifiSetting.style.display = 'none';
  }
}