import { LucideRockingChair } from "lucide-react";
import axios from "../util";

export const logInApi=async(data)=>{

           const token=localStorage.getItem("mock_interview_token");
      
          return  axios.post("/auth/login",data);
      
}

export const signUp=async(data)=>{

  return  axios.post("/auth/register",data);

}
