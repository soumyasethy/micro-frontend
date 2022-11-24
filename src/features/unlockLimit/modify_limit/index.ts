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
  HeaderProps,
  IconAlignmentTokens,
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
import { ROUTE } from "../../../routes";
import { ACTION, AssetsPayload } from "./types";
import { ConfirmCTA, EnterAmountAction, goBack, SelectAssets } from "./actions";
import { StepResponseObject } from "../unlock_limit/types";
import { getTotalLimit } from "../portfolio/actions";

export const template: (
  stepResponseObject: StepResponseObject
) => TemplateSchema = (stepResponseObject) => {
  const totalAmount = getTotalLimit(
    [
      ...stepResponseObject.availableCAS.map((item) => ({
        ...item,
        pledgedUnits: item.totalAvailableUnits,
      })),
    ],
    stepResponseObject.isinNAVMap,
    stepResponseObject.isinLTVMap
  );

  return {
    layout: <Layout>{
      id: ROUTE.PLEDGE_CONFIRMATION,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "header", type: WIDGET.HEADER, position: POSITION.FIXED_TOP },
        { id: "space0", type: WIDGET.SPACE },
        { id: "inputItem", type: WIDGET.INPUT },
        { id: "inputSpace", type: WIDGET.SPACE },
        { id: "selectAssetForPledge", type: WIDGET.STACK },
        {
          id: "otpItem",
          type: WIDGET.BUTTON,
          position: POSITION.ABSOLUTE_BOTTOM,
        },
      ],
    },
    datastore: <Datastore>{
      header: <HeaderProps>{
        title: "Modify Limit",
        leadIcon: "https://reactnative.dev/img/tiny_logo.png",
        isBackButton: true,
        type: "DEFAULT",
        action: {
          type: ACTION.BACK_BUTTON,
          payload: <AssetsPayload>{
            value: "",
            widgetId: "continue",
            isResend: false,
            stepResponseObject,
          },
          routeId: ROUTE.MODIFY_LIMIT,
        },
      },
      space0: <SpaceProps>{ size: SizeTypeTokens.XL },
      inputItem: <TextInputProps & WidgetProps>{
        placeholder: "",
        type: InputTypeToken.DEFAULT,
        keyboardType: KeyboardTypeToken.decimalPad,
        title: "Enter amount",
        state: InputStateToken.DEFAULT,
        limit: totalAmount,
        limitLabel:
          "out of " +
          `${totalAmount}`.replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ","),
        caption: { success: "", error: "" },
        action: {
          type: ACTION.ENTER_AMOUNT,
          routeId: ROUTE.MODIFY_LIMIT,
          payload: <AssetsPayload>{
            value: "",
            widgetId: "input",
          },
        },
      },
      inputSpace: <SpaceProps>{ size: SizeTypeTokens.XXL },
      selectAssetForPledge: <StackProps & WidgetProps>{
        type: StackType.row,
        alignItems: StackAlignItems.flexStart,
        justifyContent: StackJustifyContent.flexStart,
        widgetItems: [
          { id: "label", type: WIDGET.TEXT },
          { id: "space", type: WIDGET.SPACE },
          { id: "icon", type: WIDGET.ICON },
        ],
        action: {
          type: ACTION.MODIFY_LIMIT,
          payload: <AssetsPayload>{
            value: "",
            widgetId: "input",
            stepResponseObject,
          },
          routeId: ROUTE.MODIFY_LIMIT,
        },
      },
      label: <TypographyProps>{
        label: "Select assets for pledging",
        color: ColorTokens.Primary_100,
        fontWeight: "500",
        fontSize: FontSizeTokens.SM,
      },
      space: <SpaceProps>{ size: SizeTypeTokens.XS },
      icon: <IconProps>{
        name: IconTokens.ChervonDownRight,
        align: IconAlignmentTokens.right,
        size: IconSizeTokens.XL,
        color: ColorTokens.Primary_100,
      },
      otpItem: <ButtonProps & WidgetProps>{
        label: "Confirm & get OTP",
        fontFamily: FontFamilyTokens.Poppins,
        type: ButtonTypeTokens.LargeFilled,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: ACTION.CONFIRM_CTA,
          payload: <AssetsPayload>{
            value: "",
            widgetId: "input",
            stepResponseObject,
          },
          routeId: ROUTE.MODIFY_LIMIT,
        },
      },
    },
  };
};

export const modifyLimitMF: PageType<any> = {
  onLoad: async ({}, { stepResponseObject }) => {
    return Promise.resolve(template(stepResponseObject));
  },
  actions: {
    [ACTION.ENTER_AMOUNT]: EnterAmountAction,
    [ACTION.MODIFY_LIMIT]: SelectAssets,
    [ACTION.CONFIRM_CTA]: ConfirmCTA,
    [ACTION.BACK_BUTTON]: goBack,
  },
};
