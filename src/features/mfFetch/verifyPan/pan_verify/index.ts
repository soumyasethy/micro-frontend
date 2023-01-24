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
  CalendarProps,
  CalendarStateToken,
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  IconProps,
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
import { ROUTE } from "../../../../routes";
import { ACTION, ContinuePayload, InputPayload } from "./types";
import { CalendarOnChange, PanOnChange, toggleCTA, verifyPan } from "./actions";
import { EnableDisableCTA } from "../../../login/phone_number/types";
import { User } from "../../../login/otp_verify/types";
import SharedPropsService from "../../../../SharedPropsService";
import { RegexConfig } from "../../../../configs/config";

export const template: (
  applicationId: string,
  targetRoute: string,
  prefilledPanNumber: string
) => TemplateSchema = (applicationId, targetRoute, prefilledPanNumber) => {
  return {
    layout: <Layout>{
      id: ROUTE.KYC_PAN_VERIFICATION,
      type: LAYOUTS.LIST,
      widgets: [
        {
          id: "continue",
          type: WIDGET.BUTTON,
          position: POSITION.ABSOLUTE_BOTTOM,
        },
        { id: "space0", type: WIDGET.SPACE },
        { id: "title", type: WIDGET.TEXT },
        { id: "space1", type: WIDGET.SPACE },
        { id: "subTitle", type: WIDGET.TEXT },
        { id: "space2", type: WIDGET.SPACE },
        { id: "input", type: WIDGET.INPUT },
        { id: "space5", type: WIDGET.SPACE },
        // { id: "calendarInput", type: WIDGET.INPUT },
        { id: "calendarPicker", type: WIDGET.CALENDAR_PICKER },
        { id: "space3", type: WIDGET.SPACE },
        {
          id: "space4",
          type: WIDGET.SPACE,
          position: POSITION.ABSOLUTE_BOTTOM,
        },
        {
          id: "disclaimerStack",
          type: WIDGET.STACK,
          position: POSITION.ABSOLUTE_BOTTOM,
        },
      ],
    },
    datastore: <Datastore>{
      space0: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      continue: <ButtonProps & WidgetProps>{
        fontSize: FontSizeTokens.MD,
        label: "Continue",
        fontFamily: FontFamilyTokens.Poppins,
        type: ButtonTypeTokens.LargeOutline,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: ACTION.VERIFY_PAN,
          payload: <ContinuePayload>{
            value: prefilledPanNumber || "",
            widgetId: "input",
            applicationId,
            targetRoute: targetRoute,
          },
          routeId: ROUTE.KYC_PAN_VERIFICATION,
        },
      },
      title: <TypographyProps>{
        label: "Verify your PAN",
        fontSize: FontSizeTokens.XL,
        color: ColorTokens.Grey_Night,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "700",
      },
      subTitle: <TypographyProps>{
        label: "PAN is used to get your investment details",
        color: ColorTokens.Grey_Charcoal,
        fontWeight: "400",
        fontFamily: FontFamilyTokens.Inter,
        fontSize: FontSizeTokens.SM,
      },
      input: <TextInputProps & WidgetProps>{
        regex: RegexConfig.PAN,
        value: prefilledPanNumber,
        type: InputTypeToken.DEFAULT,
        state: InputStateToken.DEFAULT,
        charLimit: 10,
        title: "PAN",
        placeholder: "Enter PAN",
        keyboardType: KeyboardTypeToken.default,
        isUpperCase: true,
        action: {
          type: ACTION.ENTER_PAN,
          payload: <InputPayload>{ value: "", widgetId: "input" },
          routeId: ROUTE.KYC_PAN_VERIFICATION,
        },
        caption: {
          success: "",
          error: "Enter a valid PAN. eg: ABCDE1234F",
        },
        errorAction: {
          type: ACTION.DISABLE_CONTINUE,
          routeId: ROUTE.KYC_PAN_VERIFICATION,
          payload: <EnableDisableCTA>{
            value: false,
            targetWidgetId: "continue",
          },
        },
        successAction: {
          type: ACTION.ENABLE_CONTINUE,
          routeId: ROUTE.KYC_PAN_VERIFICATION,
          payload: <EnableDisableCTA>{
            value: true,
            targetWidgetId: "continue",
          },
        },
      },
      calendarPicker: <CalendarProps & WidgetProps>{
        year: { title: "Year", value: "", placeholder: "YYYY" },
        month: { title: "Month", value: "", placeholder: "MM" },
        date: { title: "Date", value: "", placeholder: "DD" },
        state: CalendarStateToken.DEFAULT,
        caption: {
          success: "",
          error: "Please select a proper date",
          default: "Date of birth as per PAN",
        },
        action: {
          type: ACTION.ENTER_DOB,
          payload: <InputPayload>{ value: "", widgetId: "calendarPicker" },
          routeId: ROUTE.KYC_PAN_VERIFICATION,
        },
      },
      space1: <SpaceProps>{ size: SizeTypeTokens.SM },
      space2: <SpaceProps>{ size: SizeTypeTokens.Size32 },
      space5: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      space3: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      space4: <SpaceProps>{ size: SizeTypeTokens.Size32 },
      disclaimerStack: <StackProps>{
        type: StackType.row,
        justifyContent: StackJustifyContent.center,
        alignItems: StackAlignItems.center,
        widgetItems: [
          {
            id: "disclaimerIcon",
            type: WIDGET.ICON,
          },

          { id: "disclaimerSpace", type: WIDGET.SPACE },
          {
            id: "disclaimerText",
            type: WIDGET.TEXT,
          },
        ],
      },
      disclaimerText: <TypographyProps>{
        fontSize: FontSizeTokens.XXS,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "500",
        label: "Your data is secure with us",
        color: ColorTokens.System_Happy,
      },
      disclaimerSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
      disclaimerIcon: <IconProps>{
        name: IconTokens.Secure,
        size: IconSizeTokens.XS,
        color: ColorTokens.Secondary_100,
      },
    },
  };
};

export const panVerifyMF: PageType<any> = {
  onLoad: async ({ asyncStorage }, { applicationId, targetRoute }) => {
    const user: User = await SharedPropsService.getUser();
    const prefilledPanNumber = user.linkedBorrowerAccounts[0].accountHolderPAN;
    const myDob = await SharedPropsService.getUserDob();
    console.log(myDob);
    return Promise.resolve(
      template(applicationId, targetRoute, prefilledPanNumber)
    );
  },
  actions: {
    [ACTION.VERIFY_PAN]: verifyPan,
    [ACTION.ENTER_PAN]: PanOnChange,
    [ACTION.ENTER_DOB]: CalendarOnChange,
    [ACTION.ENABLE_CONTINUE]: toggleCTA,
    [ACTION.DISABLE_CONTINUE]: toggleCTA,
  },
};
