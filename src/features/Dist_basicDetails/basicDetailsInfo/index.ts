import { ButtonProps, ButtonTypeTokens, ButtonWidthTypeToken, CalendarProps, CalendarStateToken, ColorTokens, FontFamilyTokens, FontSizeTokens, HeaderBaseProps, HeaderProps, HeaderTypeTokens, InputStateToken, InputTypeToken, KeyboardTypeToken, SizeTypeTokens, SpaceProps, StackAlignItems, StackJustifyContent, StackProps, StackType, StackWidth, StepperItem, StepperProps, StepperTypeTokens, TextInputProps, TextInputTypeToken, TypographyBaseProps, WIDGET } from "@voltmoney/schema";
import { Datastore, Layout, LAYOUTS, PageType, POSITION, TemplateSchema, WidgetProps } from "@voltmoney/types";
import { api } from "../../../configs/api";
import { horizontalDistributorStepperRepo, horizontalStepperRepo } from "../../../configs/utils";
import { ROUTE } from "../../../routes";
import _ from "lodash";
import SharedPropsService from "../../../SharedPropsService";
import { getAppHeader, RegexConfig } from "../../../configs/config";
import { ACTION, EnableDisableCTA } from "./types";
import { InputPayload } from "./types";
import { CalendarOnChange, onChangeInput, toggleCTA, triggerCTA } from "./actions";

export const template: (
  stepper: StepperItem[],
  //stepResponseObject: { [key in string]: string }
) => TemplateSchema = (stepper) => {
  return {
    layout: <Layout> {
       id: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
       type: LAYOUTS.LIST,
       widgets: [
        { id: "header", type: WIDGET.HEADER, position: POSITION.ABSOLUTE_TOP },
        { id: "topSpace0", type: WIDGET.SPACE },
        { id: "topSpace1", type: WIDGET.SPACE },
        { id: "panNumberInput", type: WIDGET.INPUT },
        { id: "space0", type: WIDGET.SPACE },
       // { id: "fullNameInput", type: WIDGET.INPUT },
       // { id: "panNumberSubText", type: WIDGET.TEXT },
       { id: "calendarPicker", type: WIDGET.CALENDAR_PICKER },
        { id: "space1", type: WIDGET.SPACE },
        { id: "mobileNumberInput", type: WIDGET.INPUT },
        { id: "space2", type: WIDGET.SPACE },
        { id: "emailInput", type: WIDGET.INPUT },
        { id: "bottomStack", type: WIDGET.STACK, position: POSITION.ABSOLUTE_BOTTOM },
       ]
    },
    datastore: <Datastore> {
      header: <HeaderProps & WidgetProps>{
        title: "Create new applications",
        type: HeaderTypeTokens.verification,
        stepperProps: <StepperProps>{
          data: stepper,
          type: StepperTypeTokens.HORIZONTAL,
        },
        action: {
          type: ACTION.GO_BACK,
          routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
          payload: {},
        },
      },
      topSpace0: <SpaceProps> { size: SizeTypeTokens.Size30 },
      topSpace1: <SpaceProps> { size: SizeTypeTokens.XL },
      panNumberInput: <TextInputProps & WidgetProps>{
        regex: RegexConfig.PAN,
        type: InputTypeToken.DEFAULT,
        state: InputStateToken.DEFAULT,
        charLimit: 10,
        title: "PAN Number",
        placeholder: "Enter PAN Number",
        keyboardType: KeyboardTypeToken.default,
        isUpperCase: true,
        isFocus: true,
        caption: {
          success: "",
          error: "Enter a valid PAN.",
        },
        action: {
          type: ACTION.CHANGE_INPUT,
          routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
          payload: <InputPayload> {
            value: "",
            widgetId: "panNumberInput"
          }
        },
        errorAction: {
          type: ACTION.DISABLE_CONTINUE,
          routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
          payload: <EnableDisableCTA>{ value: false, targetWidgetId: "continue" },
        },
        successAction: {
          type: ACTION.ENABLE_CONTINUE,
          routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
          payload: <EnableDisableCTA>{ value: true, targetWidgetId: "continue" },
        },
      },
      // panNumberSubText: <TypographyBaseProps> {
      //   label: "We will fetch your name from PAN Card",
      //   fontSize: FontSizeTokens.XS,
      //   color: ColorTokens.Grey_Smoke,
      //   fontFamily: FontFamilyTokens.Inter,
      //   fontWeight: "400",
      //   lineHeight: 18,
      // },
      space0: <SpaceProps> { size: SizeTypeTokens.Size32 },
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
          routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
        },
      },
      space1: <SpaceProps> { size: SizeTypeTokens.XXXL },
      space2: <SpaceProps> { size: SizeTypeTokens.Size32 },
      fullNameInput: <TextInputProps & WidgetProps>{
        width: TextInputTypeToken.CONTENT,
        isFocus: false,
        title: "Full name",
        fontFamily: FontFamilyTokens.Inter,
        fontSize: FontSizeTokens.MD,
        keyboardType: KeyboardTypeToken.default,
        lineHeight: 24,
        fontWeight: "400",
        placeholder: "Full name",
        color: ColorTokens.Grey_Smoke,
        type: InputTypeToken.DEFAULT,
        state: InputStateToken.DEFAULT,
        action: {
          type: ACTION.CHANGE_INPUT,
          routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
          payload: <InputPayload> {
            value: "",
            widgetId: "fullNameInput"
          }
        },
        errorAction: {
          type: ACTION.DISABLE_CONTINUE,
          routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
          payload: <EnableDisableCTA>{ value: false, targetWidgetId: "continue" },
        },
        successAction: {
          type: ACTION.ENABLE_CONTINUE,
          routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
          payload: <EnableDisableCTA>{ value: true, targetWidgetId: "continue" },
        },
      },
      mobileNumberInput: <TextInputProps & WidgetProps>{
        width: TextInputTypeToken.CONTENT,
        charLimit: 10,
        isFocus: false,
        regex: RegexConfig.MOBILE,
        title: "Mobile number",
        caption: { error: "Enter a 10 digit mobile number" },
        fontFamily: FontFamilyTokens.Inter,
        fontSize: FontSizeTokens.MD,
        keyboardType: KeyboardTypeToken.phone,
        lineHeight: 24,
        fontWeight: "400",
        placeholder: "Mobile number",
        color: ColorTokens.Grey_Smoke,
        type: InputTypeToken.MOBILE,
        state: InputStateToken.DEFAULT,
        action: {
          type: ACTION.CHANGE_INPUT,
          routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
          payload: <InputPayload> {
            value: "",
            widgetId: "mobileNumberInput"
          }
        },
        errorAction: {
          type: ACTION.DISABLE_CONTINUE,
          routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
          payload: <EnableDisableCTA>{ value: false, targetWidgetId: "continue" },
        },
        successAction: {
          type: ACTION.ENABLE_CONTINUE,
          routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
          payload: <EnableDisableCTA>{ value: true, targetWidgetId: "continue" },
        },
      },
      emailInput: <TextInputProps & WidgetProps>{
        width: TextInputTypeToken.CONTENT,
        regex: RegexConfig.EMAIL,
        title: "Email address",
        isFocus: false,
        fontFamily: FontFamilyTokens.Inter,
        keyboardType: KeyboardTypeToken.email,
        fontSize: FontSizeTokens.MD,
        lineHeight: 24,
        fontWeight: "400",
        placeholder: "Email address",
        color: ColorTokens.Grey_Smoke,
        type: InputTypeToken.EMAIL,
        state: InputStateToken.DEFAULT,
        action: {
          type: ACTION.CHANGE_INPUT,
          routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
          payload: <InputPayload> {
            value: "",
            widgetId: "emailInput"
          }
        },
        errorAction: {
          type: ACTION.DISABLE_CONTINUE,
          routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
          payload: <EnableDisableCTA>{ value: false, targetWidgetId: "continue" },
        },
        successAction: {
          type: ACTION.ENABLE_CONTINUE,
          routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
          payload: <EnableDisableCTA>{ value: true, targetWidgetId: "continue" },
        },
      },
      bottomStack: <StackProps> {
        type: StackType.row,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.center,
        widgetItems: [
          { id: "continue", type: WIDGET.BUTTON }
        ]
      },
      continue: <ButtonProps & WidgetProps>{
        type: ButtonTypeTokens.LargeOutline,
        label: "Save & Confirm",
        width: ButtonWidthTypeToken.FULL,
        fontFamily: FontFamilyTokens.Inter,
        fontSize: FontSizeTokens.MD,
        lineHeight: SizeTypeTokens.XXL,
        fontWeight: "700",
        action: {
          type: ACTION.TRIGGER_CTA,
          routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
          payload: <any>{},
        },
      },
  }}
}

export const distBasicDetailsMF: PageType<any> = {
    onLoad: async () => {
    const stepper: StepperItem[] = await horizontalDistributorStepperRepo();
    return Promise.resolve(template(stepper));
    },
    actions: {
      [ACTION.ENTER_DOB]: CalendarOnChange,
      [ACTION.CHANGE_INPUT]: onChangeInput,
      [ACTION.DISABLE_CONTINUE]: toggleCTA,
      [ACTION.ENABLE_CONTINUE]: toggleCTA,
      [ACTION.TRIGGER_CTA]: triggerCTA,
    },
}