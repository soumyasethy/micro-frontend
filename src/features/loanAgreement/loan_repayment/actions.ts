import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { ACTION, LimitPayload } from "./types";
import { fetchLinkRepo } from "./repo";
import { ButtonProps } from "@voltmoney/schema";

let stepResponseObject: string = null;
export const authenticateRepayment: ActionFunction<LimitPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  if (action.payload.value)
    await navigate(ROUTE.LOAN_WEBVIEW, {
      urlData: action.payload.value,
    });
};

export const goBack: ActionFunction<LimitPayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};

export const AutoPayPoll: ActionFunction<LimitPayload> = async (
  action,
  _datastore,
  props
): Promise<any> => {
  await props.setDatastore(ROUTE.LOAN_REPAYMENT, "btnItem", <ButtonProps>{
    loading: true,
  });
  const timer = setInterval(async () => {
    const response = await fetchLinkRepo();
    if (response.stepResponseObject)
      stepResponseObject = response.stepResponseObject;
    if (stepResponseObject) {
      await props.setDatastore(ROUTE.LOAN_REPAYMENT, "btnItem", <ButtonProps>{
        loading: false,
      });
      clearInterval(timer);
      await authenticateRepayment(
        {
          type: ACTION.REPAYMENT,
          payload: <LimitPayload>{
            value: stepResponseObject,
            widgetId: "input",
          },
          routeId: ROUTE.LOAN_REPAYMENT,
        },
        {},
        props
      );
    }
  }, 2000);
};
