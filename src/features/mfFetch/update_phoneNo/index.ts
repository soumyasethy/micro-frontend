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
import { ACTION, UpdateMobileNumber } from "./types";
import { EnableDisableCTA } from "../../login/phone_number/types";
import { phoneOnChange, updateMobileNumber } from "./actions";
import { toggleCTA } from "../../login/phone_number/actions";
import SharedPropsService from "../../../SharedPropsService";
import { RegexConfig } from "../../../configs/config";
import { heightMap } from "../../../configs/height";
import { goBack } from "../otp_CAS/actions";

export const template: (prevMob: string) => TemplateSchema = (prevMob) => ({
  layout: <Layout>{
    id: ROUTE.UPDATE_PHONE_NUMBER,
    type: LAYOUTS.MODAL,
    style: {
      height: heightMap[ROUTE.UPDATE_PHONE_NUMBER],
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
        type: ACTION.GO_BACK,
        payload: {
          value: "",
          widgetId: "input",
          isResend: false,
        },
        routeId: ROUTE.UPDATE_PHONE_NUMBER,
      },
    },
    text: <TypographyProps>{
      label: "Edit mobile number",
      fontWeight: "700",
      fontFamily: FontFamilyTokens.Poppins,
      fontSize: FontSizeTokens.MD,
      color: ColorTokens.Grey_Night,
    },
    text2: <TypographyProps>{
      label: "Use mobile number linked to your investments",
      fontSize: FontSizeTokens.SM,
      fontWeight: "400",
      fontFamily: FontFamilyTokens.Inter,
      color: ColorTokens.Grey_Charcoal,
    },
    space0: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
    continue: <ButtonProps & WidgetProps>{
      label: "Update mobile number",
      fontFamily: FontFamilyTokens.Poppins,
      type: ButtonTypeTokens.LargeOutline,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.EDIT_MOBILE_NUMBER,
        payload: <UpdateMobileNumber>{
          value: "",
          targetWidgetId: "mobileItem",
        },
        routeId: ROUTE.UPDATE_PHONE_NUMBER,
      },
    },
    input: <TextInputProps & WidgetProps>{
      value: prevMob,
      regex: RegexConfig.MOBILE,
      type: InputTypeToken.MOBILE,
      state: InputStateToken.DEFAULT,
      title: "Mobile Number",
      charLimit: 10,
      placeholder: "Enter mobile number",
      keyboardType: KeyboardTypeToken.numberPad,
      action: {
        type: ACTION.PHONE_NUMBER_ONCHANGE,
        payload: <UpdateMobileNumber>{ value: "", targetWidgetId: "input" },
        routeId: ROUTE.UPDATE_PHONE_NUMBER,
      },
      caption: { error: "Enter a 10 digit mobile number" },
      errorAction: {
        type: ACTION.DISABLE_CONTINUE,
        routeId: ROUTE.UPDATE_PHONE_NUMBER,
        payload: <EnableDisableCTA>{ value: false, targetWidgetId: "continue" },
      },
      successAction: {
        type: ACTION.ENABLE_CONTINUE,
        routeId: ROUTE.UPDATE_PHONE_NUMBER,
        payload: <EnableDisableCTA>{ value: true, targetWidgetId: "continue" },
      },
    },
    space1: <SpaceProps>{ size: SizeTypeTokens.Size32 },
    space3: <SpaceProps>{ size: SizeTypeTokens.XXXL },
  },
});

export const updateMobileNumberMF: PageType<any> = {
  onLoad: async () => {
    const prevMob = `${(
        await SharedPropsService.getUser()
    ).linkedBorrowerAccounts[0].accountHolderPhoneNumber.replace("+91", "")}`;
    return Promise.resolve(template(prevMob));
  },
  actions: {
    [ACTION.EDIT_MOBILE_NUMBER]: updateMobileNumber,
    [ACTION.PHONE_NUMBER_ONCHANGE]: phoneOnChange,
    [ACTION.ENABLE_CONTINUE]: toggleCTA,
    [ACTION.DISABLE_CONTINUE]: toggleCTA,
    [ACTION.GO_BACK]: goBack,
  },
};
