import axios from "../util";

export const logInApi=async(data)=>{
      
          return  axios.post("/auth/login",data);
      
}

export const signUp=async(data)=>{

  return  axios.post("/auth/register",data);

}
