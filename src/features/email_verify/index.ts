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
  SizeTypeTokens,
  SpaceProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { ACTIONS } from "./types";
import { loginGoogle } from "./actions";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.EMAIL_VERIFY,
    type: LAYOUTS.MODAL,
    widgets: [
      { id: "back", type: WIDGET.BUTTON, position: POSITION.FIXED_TOP },
      { id: "title", type: WIDGET.TEXT },
      { id: "subTitle", type: WIDGET.TEXT },
      { id: "google", type: WIDGET.BUTTON },
      { id: "space1", type: WIDGET.SPACE },
      { id: "apple", type: WIDGET.BUTTON },
      { id: "space2", type: WIDGET.SPACE },
      { id: "email", type: WIDGET.BUTTON },
      { id: "space3", type: WIDGET.SPACE },
      { id: "terms", type: WIDGET.TEXT },
    ],
  },
  datastore: <Datastore>{
    back: <ButtonProps>{
      type: ButtonTypeTokens.IconGhost,
      icon: { name: IconTokens.Back, size: IconSizeTokens.XL },
    },
    title: <TypographyProps>{
      label: "Welcome to Volt",
      fontSize: FontSizeTokens.XXL,
    },
    subTitle: <TypographyProps>{
      label: "Note: It must be registered to your \n" + "mutual fund holdings",
    },
    google: <ButtonProps & WidgetProps>{
      label: "Continue with Google",
      type: ButtonTypeTokens.LargeElevated,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTIONS.GOOGLE_LOGIN,
        routeId: ROUTE.EMAIL_VERIFY,
        payload: {},
      },
    },
    apple: <ButtonProps>{
      label: "Continue with Apple",
      type: ButtonTypeTokens.LargeElevated,
      width: ButtonWidthTypeToken.FULL,
    },
    email: <ButtonProps>{
      label: "Continue with Other Email",
      type: ButtonTypeTokens.LargeElevated,
      width: ButtonWidthTypeToken.FULL,
    },
    terms: <TypographyProps>{
      label: "By pressing ‘Continue’, you agree to Volt’s Terms and Policies",
    },
    space1: <SpaceProps>{ size: SizeTypeTokens.LG },
    space2: <SpaceProps>{ size: SizeTypeTokens.LG },
    space3: <SpaceProps>{ size: SizeTypeTokens.LG },
  },
};

export const emailVerifyMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: { [ACTIONS.GOOGLE_LOGIN]: loginGoogle },
};
