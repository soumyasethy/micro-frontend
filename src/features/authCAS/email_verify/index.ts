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
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  GoogleButtonProps,
  IconAlignmentTokens,
  IconSizeTokens,
  IconTokens,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackFlexWrap,
  StackHeight,
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
    widgets: [{ id: "stack_root", type: WIDGET.STACK, position: POSITION.ABSOLUTE_CENTER, }],
  },
  datastore: <Datastore>{
    stack_root: <StackProps>{
      type: StackType.column,
      height: StackHeight.FULL,
      flexWrap: StackFlexWrap.wrap, 
      justifyContent: StackJustifyContent.spaceAround,
      alignItems: StackAlignItems.flexStart,
      widgetItems: [
        { id: "space0", type: WIDGET.SPACE },
        { id: "title", type: WIDGET.TEXT },
        { id: "titleSpace", type: WIDGET.SPACE },
        { id: "subTitle", type: WIDGET.TEXT },
        { id: "subSpace", type: WIDGET.SPACE },
        { id: "google", type: WIDGET.GOOGLE_BUTTON },
        // { id: "space1", type: WIDGET.SPACE },
        // { id: "apple", type: WIDGET.BUTTON },
        { id: "space2", type: WIDGET.SPACE },
        { id: "email", type: WIDGET.BUTTON },
        { id: "space3", type: WIDGET.SPACE },
      ],
    },
    space0: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
    subSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
    titleSpace: <SpaceProps>{ size: SizeTypeTokens.SM },
    back: <ButtonProps>{
      type: ButtonTypeTokens.IconGhost,
      icon: { name: IconTokens.Back, size: IconSizeTokens.XL },
    },
    title: <TypographyProps>{
      label: "Verify your email",
      fontSize: FontSizeTokens.XL,
      color: ColorTokens.Grey_Night,
      fontFamily: FontFamilyTokens.Poppins,
      fontWeight: "700",
    },
    subTitle: <TypographyProps>{
      label: "We need email linked with your investments",
      fontSize: FontSizeTokens.SM,
      color: ColorTokens.Grey_Charcoal,
    },
    google: <GoogleButtonProps & WidgetProps>{
      label: "Continue with Google",
      action: {
        type: ACTIONS.GOOGLE_LOGIN,
        routeId: ROUTE.EMAIL_VERIFY,
        payload: {},
      },
    },
    // apple: <ButtonProps>{
    //   label: "Continue with Apple",
    //   type: ButtonTypeTokens.LargeOutline,
    //   width: ButtonWidthTypeToken.FULL,
    // },
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
    return Promise.resolve(template(applicationId));
  },
  actions: {
    [ACTIONS.GOOGLE_LOGIN]: loginGoogle,
    [ACTIONS.OTHER_EMAIL]: otherEmail,
  },
};
