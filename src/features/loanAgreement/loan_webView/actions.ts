import { ActionFunction } from "@voltmoney/types";
import { polingDataRepo } from "./repo";
import { ACTION, TestActionPayload } from "./types";
import { ROUTE } from "../../../routes";

export const getPolingData: ActionFunction<any> = async (
    action,
    _datastore,
    { navigate, setDatastore, asyncStorage,showPopup }
  ): Promise<any> => {

     const response = await polingDataRepo();
     await showPopup({
      type: "SUCCESS",
      title: "E-mandate successful!",
      subTitle: "Your autopay request has been submitted successfully. ",
      ctaLabel: "Proceed to loan agreement",
      ctaAction: {
        type: ACTION.GO_NEXT,
        routeId: ROUTE.LOAN_WEBVIEW,
        payload: {
         
        },
      },
    });
    //  console.log("response"+ response);
    //  if(response.status === "SUCCESS"){
    //     await navigate(ROUTE.DASHBOARD);
    //     showPopup({});
    //  }
  };

  export const GoNext: ActionFunction<any> = async (
    action,
    _datastore,
    { navigate, goBack }
  ): Promise<any> => {
    await goBack();
    await navigate(ROUTE.LOAN_REPAYMENT);
  };