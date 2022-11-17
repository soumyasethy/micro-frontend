import { api } from "../../../configs/api";
import SharedPropsService from "../../../SharedPropsService";
import { defaultHeaders } from "../../../configs/config";

export const polingDataRepo = async () => {
  const requestOptions = {
    method: "GET",
    headers: await defaultHeaders(),
  };
  const applicationId = (await SharedPropsService.getUser())
    .linkedApplications[0].applicationId;


    const getApiLoad = () => {
         fetch(`${api.mandateStatus}${applicationId}`, requestOptions)
        .then((response) => response.json())
        .catch((error) => console.log("error", error));
    }

    const getLoaderStatus =  () => {
        setInterval(getApiLoad,10000);
    }


    getLoaderStatus();
    
};
