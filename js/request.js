export const login=async (value)=>{
 const result=await fetch('./js/files/login.json').then((res)=>res.json())
  console.log(result);
}