import { ButtonProps, ButtonTypeTokens, ButtonWidthTypeToken, CalendarProps, CalendarStateToken, ColorTokens, FontFamilyTokens, FontSizeTokens, HeaderBaseProps, HeaderProps, HeaderTypeTokens, InputStateToken, InputTypeToken, KeyboardTypeToken, SizeTypeTokens, SpaceProps, StackAlignItems, StackJustifyContent, StackProps, StackType, StackWidth, StepperItem, StepperProps, StepperStateToken, StepperTypeTokens, TextInputProps, TextInputTypeToken, TypographyBaseProps, WIDGET } from "@voltmoney/schema";
import { Datastore, Layout, LAYOUTS, PageType, POSITION, TemplateSchema, WidgetProps } from "@voltmoney/types";
import {  partnerApi } from "../../../configs/api";
import { ROUTE } from "../../../routes";
import _ from "lodash";
import SharedPropsService from "../../../SharedPropsService";
import { getAppHeader, RegexConfig } from "../../../configs/config";
import { ACTION, EnableDisableCTA } from "./types";
import { InputPayload } from "./types";
import {  goBack, onChangeInput, onChangeInput2, toggleCTA, toggleCTA1, triggerCTA } from "./actions";

export const template: (
  //stepper: StepperItem[],
  isDisabled:string,
  stepper_data:any
) => TemplateSchema = (//stepper,
  isDisabled,stepper_data) => {
  return {
    layout: <Layout>{
      id: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "header", type: WIDGET.HEADER, position: POSITION.ABSOLUTE_TOP },
        { id: "topSpace1", type: WIDGET.SPACE },
        { id: "mobileNumberInput", type: WIDGET.INPUT },
        { id: "space2", type: WIDGET.SPACE },
        { id: "emailInput", type: WIDGET.INPUT },
        { id: "space0", type: WIDGET.SPACE },
        { id: "panNumberInput", type: WIDGET.INPUT },
        { id: "space1", type: WIDGET.SPACE },
        { id: "calendarPicker", type: WIDGET.CALENDAR_PICKER },
        { id: "bottomStack", type: WIDGET.STACK, position: POSITION.ABSOLUTE_BOTTOM },
      ]
    },
    datastore: <Datastore>{
      header: <HeaderProps & WidgetProps>{
        title: "Create new applications",
        type: HeaderTypeTokens.verification,
        stepperProps: <StepperProps>{
          data: stepper_data,
          type: StepperTypeTokens.HORIZONTAL,
        },
        action: {
          type: ACTION.GO_BACK,
          routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
          payload: {},
        },
      },
      //topSpace0: <SpaceProps>{ size: SizeTypeTokens.XXL },
      topSpace1: <SpaceProps>{ size: SizeTypeTokens.XL },
      panNumberInput: <TextInputProps & WidgetProps>{
        regex: RegexConfig.PAN,
        type: InputTypeToken.DEFAULT,
        state: InputStateToken.DEFAULT,
        charLimit: 10,
        title: "PAN Number",
        placeholder: "Enter PAN Number",
        keyboardType: KeyboardTypeToken.default,
        isUpperCase: true,
        isFocus:false,
        caption: {
          success: "",
          error: "Enter a valid PAN.",
        },
        action: {
          type: ACTION.CHANGE_INPUT,
          routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
          payload: <InputPayload>{
            value: "",
            widgetId: "panNumberInput"
          }
        },
        errorAction: {
          type: ACTION.DISABLE_CONTINUE,
          routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
          payload: <EnableDisableCTA>{ value: false, targetWidgetId: "continue" },
        },
      },

      space0: <SpaceProps>{ size: SizeTypeTokens.Size32 },
      calendarPicker: <CalendarProps & WidgetProps>{
        regex: RegexConfig.MOBILE,
        year: { title: "Year", value: "", placeholder: "YYYY" },
        month: { title: "Month", value: "", placeholder: "MM" },
        date: { title: "Date", value: "", placeholder: "DD" },
        state: CalendarStateToken.DEFAULT,
        caption: {
          success: "",
          error: "Please select a proper date",
          default: "Date of birth as per PAN",
        },
      errorAction: {
        type: ACTION.DISABLE_CONTINUE,
        routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
        payload: <EnableDisableCTA>{ value: false, targetWidgetId: "continue" },
      },
      successAction: {
        type: ACTION.ENTER_DOB,
        routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
        payload: <InputPayload>{ value: "", widgetId: "calendarPicker" },
      },
        action: {
          type: ACTION.ENTER_DOB,
          payload: <InputPayload>{ value: "", widgetId: "calendarPicker" },
          routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
        },
      },
      space1: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      space2: <SpaceProps>{ size: SizeTypeTokens.Size32 },

      mobileNumberInput: <TextInputProps & WidgetProps>{
        isFocus: true,
        width: TextInputTypeToken.CONTENT,
        regex: RegexConfig.MOBILE,
        title: "Mobile Number",
        charLimit: 10,
        fontFamily: FontFamilyTokens.Inter,
        keyboardType: KeyboardTypeToken.email,
        fontSize: FontSizeTokens.MD,
        lineHeight: 24,
        fontWeight: "400",
        placeholder: "Mobile Number",
        color: ColorTokens.Grey_Smoke,
        type: InputTypeToken.MOBILE,
        state: InputStateToken.DEFAULT,
        action: {
          type: ACTION.CHANGE_INPUT,
          routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
          payload: <InputPayload>{
            value: "",
            widgetId: "mobileNumberInput"
          }
        },
        errorAction: {
          type: ACTION.DISABLE_CONTINUE,
          routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
          payload: <EnableDisableCTA>{ value: false, targetWidgetId: "continue" },
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
         //type: ACTION.CHANGE_INPUT_EMAIL,
          routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
          payload: <InputPayload>{
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
          type: ACTION.CHANGE_INPUT_EMAIL,
          routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
          payload: <InputPayload>{
            value: "",
            widgetId: "emailInput"
          }
        },
      },
      bottomStack: <StackProps>{
        type: StackType.row,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.center,
        widgetItems: [
          { id: "continue", type: WIDGET.BUTTON }
        ]
      },
      continue: <ButtonProps & WidgetProps>{
        type: `${isDisabled}` ? ButtonTypeTokens.LargeFilled:ButtonTypeTokens.LargeOutline,
        label: "Save & Continue",
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
    }
  }
}

export const distBasicDetailsMF: PageType<any> = {
  onLoad: async ({network}) => {
    const data = await SharedPropsService.getBasicData();
    const applicationId = "";
    const response = await network.post(
        partnerApi.stepperData,
        {},
        { headers: await getAppHeader() }
    );

    let data1 = [];
    let stepper_data = [];
    Object.keys(response.data.partnerViewStepperMap).map(key=> {
      const value = response.data.partnerViewStepperMap[key];
      const stepData:any = new Object();
      if(value.isEditable === true){
        if (value.horizontalDisplayName === "Basic Details") {
          stepData.title = value.verticalDisplayName;
          stepData.subTitle = value.verticalDescription;
          stepData.horizontalTitle = value.horizontalDisplayName;
          stepData.id = value.order;
          stepData.status = StepperStateToken.IN_PROGRESS;
      } else {
          stepData.title = value.verticalDisplayName;
          stepData.subTitle = value.verticalDescription;
          stepData.id = value.order;
          stepData.horizontalTitle = value.horizontalDisplayName;
          stepData.status = value.status;
      }
       
        data1.push(stepData);
      }
      })
      stepper_data = data1.sort(function (a, b) {
        return a.id - b.id;
      });
    await SharedPropsService.setStepperData(stepper_data);
    let isDisabled = "";
    if(data.panNumber !== "" && data.mobileNumber !== "" && data.email !== ""){
      isDisabled = "true";
    }
    return Promise.resolve(template(isDisabled,stepper_data));

  },
  actions: {
    [ACTION.ENTER_DOB]: onChangeInput,
    [ACTION.GO_BACK]: goBack,
    [ACTION.CHANGE_INPUT]: onChangeInput,
    [ACTION.CHANGE_INPUT_EMAIL]: onChangeInput2,
    [ACTION.DISABLE_CONTINUE]: toggleCTA1,
    [ACTION.ENABLE_CONTINUE]: toggleCTA,
    [ACTION.TRIGGER_CTA]: triggerCTA,
  },
  clearPrevious:true
}