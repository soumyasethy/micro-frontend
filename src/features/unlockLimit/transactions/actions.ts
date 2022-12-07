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

  console.log("url_data", url_data);

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


// export const downloadFile: ActionFunction<transactionPayload> = async (
//   action,
//   _datastore,
//   { navigate, setDatastore, asyncStorage }
// ): Promise<any> => {
//  const image = await fetch(`https://volt-loan-statements-prod.s3.ap-south-1.amazonaws.com/V402LAS00058178_1670143007251_1638607007251.pdf?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCmFwLXNvdXRoLTEiRzBFAiBjLpNlF%2FNt%2BUXLD6BeAlXoE8W5ufoFU%2Fy%2FH1LZo4rj7AIhAOiWqdK8AmA4s5UFdAdtS0X3WYXsMt3RPm0xoQl%2BYs0iKv0CCCoQABoMNTYwMDEzNzgyNzA0IgydbuVcyIVa%2B35yMg4q2gJcXWLUfRSMS6VmJYhZTTXMfGA9rOjXb0WrMI9IxRS%2FyP4mMY3n4a5EmtOAPScsXM%2FFy1RzYXOCcUhQCYfx5XBdWe8jLWjFkHpSwBcr9I0gin91EQizzVTiI4q1HT6OGvcq5qNFudjK4MGi66%2B8L1mP784vqh6DS8PX1V8aSIWYQ4w5gGJ1blxPkYtjqp6R0wkcHMUKQExNvx2fI1OVQcFM6yuxR3855S%2FrlON8p90X9nSWiaUyLNTPUNnfn5lzv%2BH220wx4Oe30t0GN9tMr%2BoWyMlV625vGBL%2F8QGBCrBJp4mc9KcrMQr8Q8vfUDvTM9i3bDOAdC06PhYXAT41rSlVrvNq2kuVd2jzruhbdXkiL9JCCqqNyQQ%2BJeHHRmHd3gMVWCAajc2JYwTMxICzigf4Rt9q4AK3b68HpP%2FIfJ9JzROIbv8Yd4adBWw8Mgri6kWKHSCJypyOIejTMOa4wJwGOrMCW4%2F8DmBV%2BdCkjwbIIlG%2BQYJ9dhCkGOhV5RqJvcteBiX%2F4we5lG0j0p4swldCCAYpDw5x%2Fpjy443V2xVTRkW%2BOiw7pY%2BkdmZWzd4bKC1KEwpclqmweswac95bm%2F%2Fmtez3NXlui7XSxDmdT9XjzsDte7hBk31OXBa8mKIKm3xSMrIkSpobyCUTrKbV2kAjUcovLyjQzFZ0UDOljVLKiTHou%2BpSHXTlzaiKbPUBQhotQyhjrqMOo2j9%2Bi9Yu2HHNs%2Bv0oAbREHfOkwQZIfw0SfjG%2BehbfIB4GIqfsR%2BvSJ8cMoVEo5pUno3pdhOf3mv1h99hcMcWMqD9fhPqF66xMhV4j9XJHBJQQVHNkqcj9ssDch6Cq%2BV4GkyhXBBkCCbcmqAaHfI9yorq6KWWaB2Qgrhwi%2B3lQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221207T083248Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIAYEY3MF2YFRF37INW%2F20221207%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=fb06820e70d614414171cc5748ac66eefe7d201c370cb44d169ecde08b03ab0f`);
//  const imageBlog = await image.blob();
//  const imageURL = URL.createObjectURL(imageBlog);

//  const anchor = document.createElement("a");
//  anchor.href = imageURL;
//  anchor.download = "FILE_NAME";

//  document.body.appendChild(anchor);
//  anchor.click();
//  document.body.removeChild(anchor);

//  URL.revokeObjectURL(imageURL);
// };

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