import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  POSITION,
  TemplateSchema,
  WidgetProps,
} from "@voltmoney/types";
import {
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  FontSizeTokens,
  IconSizeTokens,
  IconTokens,
  keyboardTypeToken,
  TextInputProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../index";
import { ACTIONS, LoginAction } from "./types";
import { loginCognito } from "./actions";

export const template: (phone_number: number) => TemplateSchema = (
  phone_number
) => {
  return {
    layout: <Layout>{
      id: ROUTE.ON_BOARDING,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "back", type: WIDGET.BUTTON, position: POSITION.FIXED_TOP },
        {
          id: "login",
          type: WIDGET.BUTTON,
          position: POSITION.FIXED_BOTTOM,
        },
        { id: "title", type: WIDGET.TEXT },
        { id: "subTitle", type: WIDGET.TEXT },
        { id: "input", type: WIDGET.INPUT },
      ],
    },
    datastore: <Datastore>{
      back: <ButtonProps>{
        type: ButtonTypeTokens.IconGhost,
        icon: { name: IconTokens.Back, size: IconSizeTokens.XL },
      },
      login: <ButtonProps & WidgetProps>{
        label: "login",
        type: ButtonTypeTokens.LargeElevated,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: ACTIONS.LoginWithCognito,
          payload: <LoginAction>{
            username: phone_number.toString(),
            confirmCode: "123456",
          },
          routeId: ROUTE.LOGIN,
        },
      },
      title: <TypographyProps>{
        label: "Enter OTP",
        fontSize: FontSizeTokens.XXL,
      },
      subTitle: <TypographyProps>{
        label: `Please enter 4-digit code sent on your phone number ${phone_number} Edit`,
      },
      input: <TextInputProps>{
        caption: "Enter your OTP",
        title: "Enter your OTP",
        keyboardType: keyboardTypeToken.numberPad,
      },
    },
  };
};

export const loginMF: PageType<any> = {
  onLoad: async (_, { phone_number }) => {
    return Promise.resolve(template(phone_number));
  },
  actions: {
    [ACTIONS.LoginWithCognito]: loginCognito,
  },
};
