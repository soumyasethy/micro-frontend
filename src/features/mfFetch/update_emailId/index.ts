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
  IconAlignmentTokens,
  IconSizeTokens,
  IconTokens,
  InputStateToken,
  InputTypeToken,
  KeyboardTypeToken,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  TextInputProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION, UpdateEmailIdPayload } from "./types";
import { EnableDisableCTA } from "../../login/phone_number/types";
import { emailOnChange, updateEmailId } from "./actions";
import { toggleCTA } from "../../login/phone_number/actions";
import SharedPropsService from "../../../SharedPropsService";
import { heightMap } from "../../../configs/height";
import { ACTIONS } from "../otp_CAS/types";
import { goBack } from "../otp_CAS/actions";

export const template: (email: String) => TemplateSchema = (email) => ({
  layout: <Layout>{
    id: ROUTE.UPDATE_EMAIL_ID,
    type: LAYOUTS.MODAL,
    style: {
      height: heightMap[ROUTE.UPDATE_EMAIL_ID],
    },
    widgets: [
      { id: "headerStack", type: WIDGET.STACK },
      { id: "text2", type: WIDGET.TEXT },
      { id: "space1", type: WIDGET.SPACE },
      { id: "input", type: WIDGET.INPUT },
      { id: "space3", type: WIDGET.SPACE },
      {
        id: "continue",
        type: WIDGET.BUTTON,
        position: POSITION.FIXED_BOTTOM,
      },
    ],
  },
  datastore: <Datastore>{
    headerStack: <StackProps>{
      type: StackType.row,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.spaceBetween,
      widgetItems: [
        { id: "text", type: WIDGET.TEXT },
        { id: "leadIcon", type: WIDGET.BUTTON },
      ],
    },
    leadIcon: <ButtonProps & WidgetProps>{
      label: "",
      type: ButtonTypeTokens.SmallGhost,
      width: ButtonWidthTypeToken.CONTENT,
      stack: <StackProps>{
        type: StackType.row,
        alignItems: StackAlignItems.flexStart,
        justifyContent: StackJustifyContent.flexStart,
      },
      icon: {
        name: IconTokens.Cancel,
        align: IconAlignmentTokens.right,
        size: IconSizeTokens.XXXXL,
      },
      action: {
        type: ACTIONS.GO_BACK,
        payload: <{}>{
          value: "",
          widgetId: "input",
          isResend: false,
        },
        routeId: ROUTE.UPDATE_EMAIL_ID,
      },
    },
    text: <TypographyProps>{
      label: "Edit email",
      fontWeight: "700",
      fontFamily: FontFamilyTokens.Poppins,
      fontSize: FontSizeTokens.MD,
      color: ColorTokens.Grey_Night,
    },
    text2: <TypographyProps>{
      label: "Use email linked to your investments",
      fontSize: FontSizeTokens.SM,
      fontWeight: "400",
      fontFamily: FontFamilyTokens.Inter,
      color: ColorTokens.Grey_Charcoal,
    },
    space0: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
    continue: <ButtonProps & WidgetProps>{
      label: "Update email",
      fontFamily: FontFamilyTokens.Poppins,
      type: ButtonTypeTokens.LargeOutline,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.UPDATE_EMAIL_ID,
        payload: <UpdateEmailIdPayload>{
          value: "",
          targetWidgetId: "emailItem",
        },
        routeId: ROUTE.UPDATE_EMAIL_ID,
      },
    },
    input: <TextInputProps & WidgetProps>{
      value: email,
      isLowerCase: true,
      clearEnabled: true,
      type: InputTypeToken.EMAIL,
      state: InputStateToken.DEFAULT,
      title: "Email Id",
      charLimit: 10,
      placeholder: "Enter email id",
      keyboardType: KeyboardTypeToken.email,
      action: {
        type: ACTION.EMAIL_NUMBER_ONCHANGE,
        payload: <UpdateEmailIdPayload>{ value: "", targetWidgetId: "input" },
        routeId: ROUTE.UPDATE_EMAIL_ID,
      },
      caption: { error: "Enter a valid email id" },
      errorAction: {
        type: ACTION.DISABLE_CONTINUE,
        routeId: ROUTE.UPDATE_EMAIL_ID,
        payload: <EnableDisableCTA>{ value: false, targetWidgetId: "continue" },
      },
      successAction: {
        type: ACTION.ENABLE_CONTINUE,
        routeId: ROUTE.UPDATE_EMAIL_ID,
        payload: <EnableDisableCTA>{ value: true, targetWidgetId: "continue" },
      },
    },
    space1: <SpaceProps>{ size: SizeTypeTokens.Size32 },
    space3: <SpaceProps>{ size: SizeTypeTokens.XXXL },
  },
});

export const updateEmailMF: PageType<any> = {
  onLoad: async () => {
    const prevEmail = `${
      (await SharedPropsService.getUser()).linkedBorrowerAccounts[0]
        .accountHolderEmail
    }`;
    return Promise.resolve(template(prevEmail));
  },
  actions: {
    [ACTION.UPDATE_EMAIL_ID]: updateEmailId,
    [ACTION.EMAIL_NUMBER_ONCHANGE]: emailOnChange,
    [ACTION.ENABLE_CONTINUE]: toggleCTA,
    [ACTION.DISABLE_CONTINUE]: toggleCTA,
    [ACTION.GO_BACK]: goBack,
  },
};
