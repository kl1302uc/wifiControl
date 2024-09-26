export const login=async (value)=>{
 const result=await fetch('./js/files/login.json',{method:'POST',myvalue:value}).then((res)=>res.json())
  //console.log(result,value);
  return result;
}