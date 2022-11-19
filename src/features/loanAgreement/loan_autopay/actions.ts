import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import { api } from "../../../configs/api";
import _ from "lodash";
import { defaultHeaders, getAppHeader } from "../../../configs/config";
import { ProgressIndicatorProps } from "@voltmoney/schema";

export const getStatusData: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, setDatastore, showPopup, network }
): Promise<any> => {
  await setDatastore(action.routeId, "progressItem", <ProgressIndicatorProps>{
    count: 0,
  });
  const applicationId = (await SharedPropsService.getUser())
    .linkedApplications[0].applicationId;
    const requestOptions = {
      method: "GET",
      headers: await defaultHeaders(),
    };

    return await fetch(`${api.approvalCheck}${applicationId}`, requestOptions)
      .then((response) => {
        console.log("response"+response.status);
       if(response.status === 200){
        console.log(response.status);
         setDatastore(action.routeId, "progressItem", <ProgressIndicatorProps>{
          count: 100,
        });
       
        navigate(ROUTE.LOAN_REPAYMENT);
       }
      })
      .catch((error) => console.log("error", error));
  
};

export const GoBack: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  goBack();
};