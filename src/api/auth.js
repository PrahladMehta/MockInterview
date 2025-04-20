import axios from "../util/axios";

export const logIn=async(data)=>{
      
          return  axios.post("/auth/login",{data});
      
}

export const signUp=async(data)=>{

  return  axios.post("/auth/signup",{data});

}
