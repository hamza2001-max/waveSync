import axios, { AxiosResponse } from "axios"
import { useQuery } from "react-query"
import { useState } from "react";

type UserData = {
    userId: number;
    profileImage: string | null;
    fullname: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  };
  
  export const GetAllUsers = () => {
    const [getEm, setGetEm] = useState(false);
    const { data } = useQuery<UserData[]>(
      ['dataKey'],
      async () => {
        const response: AxiosResponse<UserData[]> = await axios.get("http://localhost:7000/user/getAllUsers", {
          withCredentials: true
        });
        return response.data; // Return only the data from the Axios response
      },
      { enabled: getEm }
    );

    return (
        <div>
            {getEm && data?.map(val => {
                return <li>{val.email}</li>
            })}
            <button onClick={() => setGetEm(prev => !prev)}>get em</button>
        </div>
    )
}
