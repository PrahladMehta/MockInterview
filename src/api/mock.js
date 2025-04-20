import axios from "../util";

export const getMockQuestion=async(data)=>{
      console.log(data);
      return axios.post('/api/questions/generate',data);
}