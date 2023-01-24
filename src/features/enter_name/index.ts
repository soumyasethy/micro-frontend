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
  IconProps,
  IconSizeTokens,
  IconTokens,
  InputStateToken,
  InputTypeToken,
  KeyboardTypeToken,
  SizeTypeTokens,
  SpaceProps,
  TextInputProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { ACTION, ContinuePayload, NamePayload } from "./types";
import { goBack, saveName, textOnChange_email, textOnChange_name } from "./actions";
import { EnableDisableCTA } from "../login/phone_number/types";
import { toggleCTA } from "../login/phone_number/actions";
import SharedPropsService from "../../SharedPropsService";
import { RegexConfig } from "../../configs/config";
import { EmailPayload } from "../mfFetch/enter_email/types";

export const template: (applicationId: string) => TemplateSchema = (
  applicationId
) => {
  return {
    layout: <Layout>{
      id: ROUTE.ENTER_NAME,
      type: LAYOUTS.LIST,
      widgets: [
        {
          id: "continue",
          type: WIDGET.BUTTON,
          position: POSITION.FIXED_BOTTOM,
        },
        { id: "space0", type: WIDGET.SPACE },
       // { id: "backButton", type: WIDGET.ICON },
        { id: "space1", type: WIDGET.SPACE },
        { id: "title", type: WIDGET.TEXT },
        { id: "space2", type: WIDGET.SPACE },
        { id: "input", type: WIDGET.INPUT },
        { id: "space_input", type: WIDGET.SPACE },
        { id: "input_email", type: WIDGET.INPUT },
        { id: "space3", type: WIDGET.SPACE },
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
          type: ACTION.CONTINUE,
          payload: <ContinuePayload>{
            value: "",
            widgetId: "input",
            applicationId,
          },
          routeId: ROUTE.ENTER_NAME,
        },
      },
      title: <TypographyProps>{
        label: "Before we start, what do we call you?",
        fontSize: FontSizeTokens.XL,
        color: ColorTokens.Grey_Night,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "600",
      },
      input: <TextInputProps & WidgetProps>{
        isFocus:true,
        clearEnabled: false,
        type: InputTypeToken.DEFAULT,
        state: InputStateToken.DEFAULT,
        title: "Name",
        placeholder: "Enter your name",
        keyboardType: KeyboardTypeToken.default,
        action: {
          type: ACTION.ENTER_NAME,
          payload: <NamePayload>{ value: "", widgetId: "input" },
          routeId: ROUTE.ENTER_NAME,
        },
        // errorAction: {
        //   type: ACTION.DISABLE_CONTINUE,
        //   routeId: ROUTE.ENTER_NAME,
        //   payload: <EnableDisableCTA>{
        //     value: false,
        //     targetWidgetId: "continue",
        //   },
        // },
        // successAction: {
        //   type: ACTION.ENABLE_CONTINUE,
        //   routeId: ROUTE.ENTER_NAME,
        //   payload: <EnableDisableCTA>{
        //     value: true,
        //     targetWidgetId: "continue",
        //   },
        // },
      },
      space_input: <SpaceProps>{ size: SizeTypeTokens.XXL },
      input_email: <TextInputProps & WidgetProps>{
        isFocus:false,
        regex: RegexConfig.EMAIL,
        isLowerCase: true,
        clearEnabled: false,
        type: InputTypeToken.EMAIL,
        state: InputStateToken.DEFAULT,
        title: "Email",
        placeholder: "Enter email",
        keyboardType: KeyboardTypeToken.email,
        action: {
          type: ACTION.ENTER_EMAIL,
          payload: <EmailPayload>{ value: "", widgetId: "input" },
          routeId: ROUTE.ENTER_NAME,
        },
        caption: { success: "", error: "Enter a valid email address" },
        errorAction: {
          type: ACTION.DISABLE_CONTINUE,
          routeId: ROUTE.ENTER_NAME,
          payload: <EnableDisableCTA>{
            value: false,
            targetWidgetId: "continue",
          },
        },
        successAction: {
          type: ACTION.ENABLE_CONTINUE,
          routeId: ROUTE.ENTER_NAME,
          payload: <EnableDisableCTA>{
            value: true,
            targetWidgetId: "continue",
          },
        },
      },
      space1: <SpaceProps>{ size: SizeTypeTokens.LG },
      space2: <SpaceProps>{ size: SizeTypeTokens.Size32 },
      space3: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      backButton: <IconProps & WidgetProps>{
        name: IconTokens.ChevronLeft,
        size: IconSizeTokens.XXL,
        color: ColorTokens.Grey_Night,
        action: {
          type: ACTION.BACK,
          routeId: ROUTE.ENTER_NAME,
        },
      },
    },
  };
};

export const nameMF: PageType<any> = {
  onLoad: async (_, {  }) => {
   const applicationId = (await SharedPropsService.getUser())
      .linkedPartnerAccounts[0].accountId;
    return Promise.resolve(template(applicationId));
  },
  actions: {
    [ACTION.BACK]: goBack,
    [ACTION.CONTINUE]: saveName,
    [ACTION.ENTER_NAME]: textOnChange_name,
    [ACTION.ENTER_EMAIL]: textOnChange_email,
    [ACTION.ENABLE_CONTINUE]: toggleCTA,
    [ACTION.DISABLE_CONTINUE]: toggleCTA,
  },
};
