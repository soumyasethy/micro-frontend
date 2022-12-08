import { IconTokens } from "@voltmoney/schema";
import { ActionFunction } from "@voltmoney/types";
import { api } from "../../../configs/api";
import { defaultHeaders } from "../../../configs/config";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import { AlertNavProps } from "../../popup_loader/types";
import { ACTION, NavPayload, transactionPayload } from "./types";


export const getURL: ActionFunction<transactionPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  const requestOptions = {
    method: "GET",
    headers: await defaultHeaders(),
  };
  const accountId = (await SharedPropsService.getUser())
    .linkedBorrowerAccounts[0].accountId;
  const url_data = await fetch(`${api.pdfLink}${accountId}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  const image = await fetch(`${url_data[0].documentPath}`);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const anchor = document.createElement("a");
  anchor.href = imageURL;
  anchor.download = "voltMoney_transaction";

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(imageURL);
}


export const navigation: ActionFunction<NavPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, showPopup, asyncStorage }
): Promise<any> => {
  if (action.payload.value === 0) {
    await navigate(ROUTE.DASHBOARD);
  }
  if (action.payload.value === 2) {
    await navigate(ROUTE.ALERT_PAGE, {
      alertProps: <AlertNavProps>{
        type: "DEFAULT",
        iconName: IconTokens.Sound,
        title: "Coming soon",
        subTitle: '',
        ctaLabel: "Got It",
        ctaAction: {
          type: ACTION.MENU,
          routeId: ROUTE.TRANSACTIONS,
          payload: {},
        },
      },
    });
  }
  if (action.payload.value === 3) {
    await navigate(ROUTE.ALERT_PAGE, {
      alertProps: <AlertNavProps>{
        type: "DEFAULT",
        iconName: IconTokens.Sound,
        title: "Coming soon",
        subTitle: '',
        ctaLabel: "Got It",
        ctaAction: {
          type: ACTION.MENU,
          routeId: ROUTE.TRANSACTIONS,
          payload: {},
        },
      },
    });
  }

};

export const goBack: ActionFunction<{}> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};