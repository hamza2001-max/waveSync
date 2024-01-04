import { useQuery } from "react-query";
import { queryClient } from "../App";

export interface IUseGetUser {
  message: string,
  formatedData:{
  email: string;
  fullname: string;
  profileImage: string | null;
  username: string;
  createdAt: string;
}}

// export const useGetUser = (key: string, initialData: IUseGetUser) => [
//   useQuery(key, () => initialData, {
//     enabled: false,
//     initialData,
//   }).data,
//   (value: IUseGetUser) => queryClient.setQueryData(key, value)
// ];
