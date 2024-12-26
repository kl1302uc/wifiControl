let instruct = JSON.parse(localStorage.getItem('login'));
const IP = 'http://119.176.174.204:8867';
//const IP = 'http://192.168.3.176:8866';
window.timer = 0;
window.timer2=0;
/*登录并接收返回加密后的密钥*/
export const login = async (value) => {
  /*获取存储在服务器中的用户发送的信息*/
  try {
    const response = await fetch(IP + '/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(value)
    });

    if (!response.ok) {
      const errorText = await response.text(); // Get more details on the error
      throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
    }

    const result = await response.json();
    //console.log('返回的参数',result);
    return result;
  } catch (err) {
    console.error('Error:', err.message);
    throw err; // Propagate the error so it can be handled by the caller
  }

  // const result=await fetch('./js/files/login.json',{method:'POST',controlMessage:value}).then((res)=>res.json())
}
/*将英文返回结果转为中文*/
const interpret = (value) => {
  let test = ''
  switch (value) {
    case 'stopping':
      test = '电机暂停中';
      break;
    case 'opening':
      test = '电机开门中';
      break;
    case 'closing':
      test = '电机关门中';
      break;

    case 'halfway':
      test = '门半开中';
      break;
    case 'opened':
      test = '门已打开';
      break;
    case 'closed':
      test = '门已关闭';
      break;

    default:
    console.log(value);
      test = value;
      // Tab to edit
  }
  return test;
}
/*获取开关状态公共函数*/
const readStatusPublic = async (status) => {
  try {
    const result = await login({ userkey: window.userkey, K: status });
    result.error && clearInterval(timer);
    return result.status ||result.error;
  } catch (err) {
    console.warn(err.message);
    return "";
  }
}
/*获取限位开关状态*/
const readStatus = async () => {
  let result = await readStatusPublic('readStatus');
  return result;
}
/*获取电机开关状态*/
const readMotor = async () => {
  let result = await readStatusPublic('readMotor');
  return result;
}

/*定时30秒获取车库状态*/

export const getStatus = async () => {
  let i = 0;
  window.clearInterval(window.timer);
  window.clearTimeout(window.timer2);

  // 获取初始状态
  let resultMotor = await readMotor();
  let resultStatus = await readStatus();

  // 如果条件满足，则开始定时轮询
  if (resultMotor!=resultStatus && resultMotor != 'stopping' || resultStatus == 'halfway') {
    window.msg.innerHTML = '提示信息:' + interpret(resultMotor === 'stopping' ? resultStatus : resultMotor);
    window.timer = setInterval(async () => {
      resultMotor = await readMotor();
      resultStatus = await readStatus();
      i++;
      console.log(resultMotor === 'stopping' ? resultStatus : resultMotor);
      // 修正逻辑表达式的优先级
      window.msg.innerHTML = '提示信息:' + interpret(resultMotor === 'stopping' ? resultStatus : resultMotor);
      // 如果满足条件，或者超时，停止轮询
      if ((resultMotor === 'stopping' && resultStatus != 'halfway') || i > 30) {
        clearInterval(window.timer);
        clearTimeout(window.timer2);
      }
    }, 1000);
  } else {
    // 初始状态下直接显示信息
    window.msg.innerHTML = '提示信息:' + interpret(resultStatus);
  }
}
/*△被点击发送控制开门指令*/
export const open = async ()=>{
  

  window.clearInterval(window.timer);
  window.clearTimeout(window.timer2);
  const result = await login({ userkey: window.userkey, K: "open" });
  result.msg && (window.msg.innerHTML = '提示信息:' + result.msg);
  
  window.timer2=setTimeout(()=>{getStatus();},1000);
  // console.log(JSON.stringify(result));
}
/*▽被点击发送控制关门指令*/
export const close = async () => {
  
  window.clearInterval(window.timer);
  window.clearTimeout(window.timer2);
  const result = await login({ userkey: window.userkey, K: "close" });
  //console.log(JSON.stringify(result));
  result.msg && (window.msg.innerHTML = '提示信息:' + result.msg);
  //console.log(JSON.stringify(result));
  window.timer2=setTimeout(()=>{getStatus();console.log('执行')},1000);

}
/*通过本地userkey重新获取变换的userkey并保存本地*/
export const reconnect = async () => {
  window.clearInterval(window.timer);
    window.clearTimeout(window.timer2);


  const result = await login({ userkey: window.userkey, K: 'reconnect' });
  if (result.userkey) {
    localStorage.setItem('userkey', result.userkey);
    window.userkey = result.userkey;
    window.msg.innerHTML = '提示信息:密钥更换成功！'
  
  } else {
    window.msg.innerHTML = '提示信息:密钥更换失败！'
  
  }
  console.log(result.userkey);
  setTimeout(()=>{getStatus();},1000);

  
}