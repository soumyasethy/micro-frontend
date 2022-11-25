import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import { api } from "../../../configs/api";
import { APP_CONFIG, defaultHeaders } from "../../../configs/config";
import { ProgressIndicatorProps } from "@voltmoney/schema";
import { ACTION } from "./types";

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

  const apiPollerRef = setInterval(
    () =>
      fetch(`${api.mandateLink}${applicationId}`, requestOptions)
        .then((response) => {
          if (response.status === 200) {
            clearInterval(apiPollerRef);
            setDatastore(action.routeId, "progressItem", <
              ProgressIndicatorProps
            >{
              count: 100,
            });
            return response.json();
          }
        })
        .then((response) => {
          navigate(ROUTE.LOAN_REPAYMENT, {
            url: `${response.stepResponseObject}`,
          });
        })
        .catch((error) => console.log("error", error)),
    APP_CONFIG.POLLING_INTERVAL
  );
};

export const goBack: ActionFunction<any> = async (
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
  await GetMandateLink(
    { type: ACTION.AUTOPAY, routeId: ROUTE.LOAN_AUTOPAY, payload: {} },
    {},
    props
  );
};
