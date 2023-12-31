import {Datastore, Layout, LAYOUTS, PageType, POSITION, TemplateSchema, WidgetProps,} from "@voltmoney/types";
import {
  ButtonBaseProps,
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
  StackHeight,
  StackJustifyContent,
  StackProps,
  StackType,
  StackWidth,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import {ROUTE} from "../../../routes";
import {ACTIONS, OtherEmail} from "./types";
import {loginGoogle, otherEmail} from "./actions";

export const template: (applicationId: string) => TemplateSchema = (
  applicationId
) => ({
  layout: <Layout>{
    id: ROUTE.EMAIL_VERIFY,
    type: LAYOUTS.LIST,
    widgets: [
      {
        id: "stack_root",
        type: WIDGET.STACK,
        position: POSITION.ABSOLUTE_CENTER,
      },
    ],
  },
  datastore: <Datastore>{
    stack_root: <StackProps>{
      type: StackType.column,
      width: StackWidth.FULL,
      height: StackHeight.MATCH_PARENT,
      justifyContent: StackJustifyContent.center,
      alignItems: StackAlignItems.flexStart,
      widgetItems: [
        // { id: "space0", type: WIDGET.SPACE },
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
    // space0: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
    subSpace: <SpaceProps>{ size: SizeTypeTokens.Size32 },
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
      fontWeight: "600",
    },
    subTitle: <TypographyProps>{
      label: "We need email linked with your investments",
      fontSize: FontSizeTokens.SM,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
      color: ColorTokens.Grey_Charcoal,
      numberOfLines: 1,
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
    email: <ButtonBaseProps & WidgetProps>{
      label: "Continue with other email",
      bgColor: ColorTokens.Transparent,
      labelColor: ColorTokens.Primary_100,
      fontSize: FontSizeTokens.SM,
      width: ButtonWidthTypeToken.FULL,
      icon: {
        name: IconTokens.Email,
        size: IconSizeTokens.LG,
        align: IconAlignmentTokens.left,
      },
      paddingVertical: SizeTypeTokens.MD,
      paddingHorizontal: SizeTypeTokens.MD,
      action: {
        type: ACTIONS.OTHER_EMAIL,
        routeId: ROUTE.EMAIL_VERIFY,
        payload: <OtherEmail>{ applicationId },
      },
    },
    space1: <SpaceProps>{ size: SizeTypeTokens.XXL },
    space2: <SpaceProps>{ size: SizeTypeTokens.XXL },
    // space3: <SpaceProps>{ size: SizeTypeTokens.XXL },
  },
});

export const emailVerifyMF: PageType<any> = {
  onLoad: async ({ analytics }, { applicationId }) => {
    return Promise.resolve(template(applicationId));
  },
  actions: {
    [ACTIONS.GOOGLE_LOGIN]: loginGoogle,
    [ACTIONS.OTHER_EMAIL]: otherEmail,
  },
  clearPrevious: true,
};
