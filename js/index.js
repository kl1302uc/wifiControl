import './components/Switch.js';
import './components/Footer.js';
import './components/Setting.js';
import './components/Login.js'; //此组件是定义在Switch中的在此引入也可以在组件中使用
import { login, reconnect, close, open, getStatus } from './request.js';

const message = "01221204a";
const sha256Hash = CryptoJS.SHA256(message).toString();
console.log("SHA-256 Hash:", sha256Hash);

window.msg = document.querySelector('.message');
const wifiSwitch = document.querySelector('wifi-switch'); //获取开关组件
const wifiFooter = document.querySelector('wifi-footer'); //获取底部按钮导航组
const winHeight = innerHeight;
window.userkey = localStorage.getItem('userkey');
document.body.style.height = winHeight + 'px'; //确定body高度防止输入法弹出上上推网页
/* 暂时关闭开始写设置界面 --------------------------------------------------------------------------------*/
wifiSwitch.style.display="none";
wifiFooter.style.display="none";
window.msg.style.display="none";
getStatus();
/*window.addEventListener('resize',()=>{
  console.log('窗口大小发生变化',innerHeight);
  //document.body.style.marginBottom=(innerHeight-winHeight)+'px';
})*/
/*body包括子组件所有内容被点击均关闭登录界面(已设置点击登录界面和底部登录按钮不关闭)*/
document.body.addEventListener('click', (event) => {
  wifiSwitch.wifiLogin.style.display = 'none'; //点击body内所有内容均关闭登录界面
});
/*登录界面登录按钮被点击，将用户名密码通过事件event传到事件函数中*/
wifiSwitch.wifiLogin.addEventListener('loginClick', async (ev) => {
  
  try {
    const result = await login({ username: ev.username, password: ev.password, K:ev.username=='admin'?'manager':'resetUserkey' });
    if (result.userkey) {
      localStorage.setItem('userkey', result.userkey); //若返回的登录信息密钥存在向本地写入永久存储
      localStorage.setItem('login', JSON.stringify({ username: ev.username, password: ev.password })); //向本地写入正确用户名密码
      window.userkey = result.userkey; //将常用的正确密钥保存到全局变量
      msg.innerHTML = '提示信息:登录成功！';
      wifiSwitch.wifiLogin.style.display = 'none'; //登录成功后关闭登录界面
      setTimeout(()=>{getStatus();},1000);
      
    }else if(result.admin){
      console.log('将要跳转设置页面',result.admin);
      window.location="#setting"
    }else {
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
wifiSwitch.addEventListener('upClick', ()=>{
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
wifiFooter.reconnect.addEventListener('click', function(){
  
  this.timer && clearTimeout(this.timer);
    // 禁用按钮
  wifiFooter.reconnect.disabled = true;
  
  // 执行你的点击事件逻辑
  reconnect();

  // 1000毫秒后重新启用按钮
  this.timer=setTimeout(() => {
    wifiFooter.reconnect.disabled = false;
  }, 1000);
  
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
});
/* 阻止弹出菜单 */
//document.body.addEventListener('contextmenu', function(e){ e.preventDefault(); });
/* 跳转组件事件 */
window.onhashchange=()=>{
  if(window.location.hash=="#setting"){
    wifiSwitch.style.display="none";
    wifiFooter.style.display="none";
    window.msg.style.display="none";
  }else{
    wifiSwitch.style.display="flex";
    wifiFooter.style.display="block";
    window.msg.style.display="block";
  }
}