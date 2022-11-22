import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import { api } from "../../../configs/api";
import { defaultHeaders } from "../../../configs/config";
import { ProgressIndicatorProps } from "@voltmoney/schema";
import { ACTION } from "./types";
let timer = undefined;
export const GetMandateLink: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, setDatastore }
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

  return await fetch(`${api.mandateLink}${applicationId}`, requestOptions)
    .then((response) => {
      console.log("GetMandateLink response status", response.status);
      if (response.status === 200) {
        clearInterval(timer);
        setDatastore(action.routeId, "progressItem", <ProgressIndicatorProps>{
          count: 100,
        });
        return response.json();
      }
    })
    .then((response) => {
      console.log("GetMandateLink response" + JSON.stringify(response));
      navigate(ROUTE.LOAN_REPAYMENT, { url: `${response.stepResponseObject}` });
    })
    .catch((error) => console.log("error", error));
};

export const GoBack: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};
export const MandateLinkPoll: ActionFunction<any> = async (
  action,
  _datastore,
  props
): Promise<any> => {
  timer = setInterval(async () => {
    await GetMandateLink(
      { type: ACTION.AUTOPAY, routeId: ROUTE.LOAN_AUTOPAY, payload: {} },
      {},
      props
    );
  }, 2000);
};
