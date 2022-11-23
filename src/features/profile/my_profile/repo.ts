import { api } from "../../../configs/api";
import { defaultHeaders } from "../../../configs/config";
import SharedPropsService from "../../../SharedPropsService";

export const fetchUserProfileRepo = async () => {
    const requestOptions = {
      method: "GET",
      headers: await defaultHeaders(),
    };

    const accountId = (await SharedPropsService.getUser()).linkedBorrowerAccounts[0].accountId;
    return await fetch(`${api.userProfile}${accountId}`, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log("error", error));
  };