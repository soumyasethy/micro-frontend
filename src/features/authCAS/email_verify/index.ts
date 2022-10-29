import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  TemplateSchema,
  WidgetProps,
} from "@voltmoney/types";
import {
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  IconAlignmentTokens,
  IconSizeTokens,
  IconTokens,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTIONS, OtherEmail } from "./types";
import { loginGoogle, otherEmail } from "./actions";

export const template: (applicationId: string) => TemplateSchema = (
  applicationId
) => ({
  layout: <Layout>{
    id: ROUTE.EMAIL_VERIFY,
    type: LAYOUTS.LIST,
    widgets: [{ id: "stack_root", type: WIDGET.STACK }],
  },
  datastore: <Datastore>{
    stack_root: <StackProps>{
      type: StackType.column,
      justifyContent: StackJustifyContent.center,
      alignItems: StackAlignItems.flexStart,
      widgetItems: [
        { id: "title", type: WIDGET.TEXT },
        { id: "titleSpace", type: WIDGET.SPACE },
        { id: "subTitle", type: WIDGET.TEXT },
        { id: "subSpace", type: WIDGET.SPACE },
        { id: "google", type: WIDGET.BUTTON },
        // { id: "space1", type: WIDGET.SPACE },
        // { id: "apple", type: WIDGET.BUTTON },
        { id: "space2", type: WIDGET.SPACE },
        { id: "email", type: WIDGET.BUTTON },
        { id: "space3", type: WIDGET.SPACE },
      ],
    },
    subSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
    titleSpace: <SpaceProps>{ size: SizeTypeTokens.SM },
    back: <ButtonProps>{
      type: ButtonTypeTokens.IconGhost,
      icon: { name: IconTokens.Back, size: IconSizeTokens.XL },
    },
    title: <TypographyProps>{
      label: "Verify your email id",
      fontSize: FontSizeTokens.XL,
      color: ColorTokens.Grey_Night,
      fontFamily: FontFamilyTokens.Poppins,
      fontWeight: "700",
    },
    subTitle: <TypographyProps>{
      label: "Your Volt app will only work with this email id",
      fontSize: FontSizeTokens.SM,
      color: ColorTokens.Grey_Charcoal,
    },
    google: <ButtonProps & WidgetProps>{
      label: "Continue with Google",
      type: ButtonTypeTokens.LargeSoftFilled,
      width: ButtonWidthTypeToken.FULL,
      // icon: {
      //   name: IconTokens.Google,
      //   size: IconSizeTokens.MD,
      //   align: IconAlignmentTokens.left,
      // },
      action: {
        type: ACTIONS.GOOGLE_LOGIN,
        routeId: ROUTE.EMAIL_VERIFY,
        payload: {},
      },
    },
    apple: <ButtonProps>{
      label: "Continue with Apple",
      type: ButtonTypeTokens.LargeOutline,
      width: ButtonWidthTypeToken.FULL,
    },
    email: <ButtonProps & WidgetProps>{
      label: "Continue with Other Email",
      type: ButtonTypeTokens.LargeGhost,
      width: ButtonWidthTypeToken.FULL,
      icon: {
        name: IconTokens.Email,
        size: IconSizeTokens.MD,
        align: IconAlignmentTokens.left,
      },
      action: {
        type: ACTIONS.OTHER_EMAIL,
        routeId: ROUTE.EMAIL_VERIFY,
        payload: <OtherEmail>{ applicationId },
      },
    },
    space1: <SpaceProps>{ size: SizeTypeTokens.XXL },
    space2: <SpaceProps>{ size: SizeTypeTokens.XXL },
    space3: <SpaceProps>{ size: SizeTypeTokens.XXL },
  },
});

export const emailVerifyMF: PageType<any> = {
  onLoad: async (_, { applicationId }) => {
    console.warn('applicationId')
    return Promise.resolve(template(applicationId));
  },
  actions: {
    [ACTIONS.GOOGLE_LOGIN]: loginGoogle,
    [ACTIONS.OTHER_EMAIL]: otherEmail,
  },
};
