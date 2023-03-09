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
import {ROUTE} from "../../../../routes";
import {ACTION, ContinuePayload, InputPayload} from "./types";
import {toggleCTA, ValidateForm, verifyPan} from "./actions";
import {User} from "../../../login/otp_verify/types";
import SharedPropsService from "../../../../SharedPropsService";
import { defaultHeaders, RegexConfig } from "../../../../configs/config";
import { api } from "../../../../configs/api";
import moment from "moment";

export const template: (
  applicationId: string,
  targetRoute: string,
  prefilledPanNumber: string,
  dob: string,
  setIsUserLoggedIn?: (isUserLoggedIn: boolean) => void
) => TemplateSchema = (
  applicationId,
  targetRoute,
  prefilledPanNumber,
  dob,
  setIsUserLoggedIn
) => {
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
            setIsUserLoggedIn,
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
          type: ACTION.VALIDATE_FORM,
          payload: <InputPayload>{ value: "", widgetId: "input" },
          routeId: ROUTE.KYC_PAN_VERIFICATION,
        },
        caption: {
          success: "",
          error: "Enter a valid PAN. eg: ABCDE1234F",
        }
      },
      calendarPicker: <CalendarProps & WidgetProps>{
        year: { title: "Year", value: `${dob.substring(6)}`, placeholder: "YYYY" },
        month: { title: "Month", value: `${dob.substring(3,5)}`, placeholder: "MM" },
        date: { title: "Date", value: `${dob.substring(0,2)}`, placeholder: "DD" },
        state: CalendarStateToken.DEFAULT,
        caption: {
          success: "",
          error: "Age should be between 18 and 65",
          default: "Date of birth as per PAN",
        },
        action: {
          type: ACTION.VALIDATE_FORM,
          payload: <InputPayload>{ value: "", widgetId: "calendarPicker" },
          routeId: ROUTE.KYC_PAN_VERIFICATION,
        },
      },
      space1: <SpaceProps>{ size: SizeTypeTokens.SM },
      space2: <SpaceProps>{ size: SizeTypeTokens.Size32 },
      space5: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      space3: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      space4: <SpaceProps>{ size: SizeTypeTokens.Size32 },
    },
  };
};

export const panVerifyMF: PageType<any> = {
  onLoad: async (
    { asyncStorage },
    { applicationId, targetRoute, setIsUserLoggedIn }
  ) => {
    const user: User = await SharedPropsService.getUser();
    const prefilledPanNumber = user.linkedBorrowerAccounts[0].accountHolderPAN;
    const sharedPropDOB = await SharedPropsService.getUserDob();
    const accountId = user.linkedBorrowerAccounts[0].accountId;
    const requestOptions = {
      method: "GET",
      headers: await defaultHeaders(),
    };

    const response =  await fetch(`${api.userProfile}${accountId}`, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log("error", error));
      let dob = "";
      if(response.dob === '' || response.dob === null || response.dob === 'null'){
       dob = sharedPropDOB;
      } else{
        dob =  moment.unix(Number(response?.dob) / 1000).format("DD-MM-yyyy");
      }

    return Promise.resolve(
      template(
        applicationId,
        targetRoute,
        prefilledPanNumber,
        dob,
        setIsUserLoggedIn
      )
    );
  },
  actions: {
    [ACTION.VERIFY_PAN]: verifyPan,
    [ACTION.VALIDATE_FORM]: ValidateForm,
    [ACTION.ENABLE_CONTINUE]: toggleCTA,
    [ACTION.DISABLE_CONTINUE]: toggleCTA,
  },
};
