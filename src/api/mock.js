import axios from "../util";

export const getMockQuestion=async(data)=>{
      const token=localStorage.getItem('mock_interview_token');
      return axios.post('/questions/generate',data,{
            headers:{
              'Authorization':  `Bearer ${token}`
            }
          }
      );
}

export const createMockResult=async(data)=>{

       const token=localStorage.getItem('mock_interview_token');
     
       return axios.post('/mock-results',data,{
            headers:{
              'Authorization':  `Bearer ${token}`
            }
          });
}