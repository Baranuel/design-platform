import { cache } from "react";
import { axiosInstance } from "../(network)/axios-instance";
import { UserListing } from "../../../global";


export const getActiveListing = cache( async () => {
    const {data} = await axiosInstance.get<UserListing>("/listing");
    return  data
  })