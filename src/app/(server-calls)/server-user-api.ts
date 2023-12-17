import { cache } from "react";
import { axiosInstance } from "../(network)/axios-instance";
import { User } from "../../../global";



export const getUser = cache(async () => {
    const {data} = await axiosInstance.get<User>('/profile')
    return data;
  })
