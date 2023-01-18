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
  FontFamilyTokens,
  InputStateToken,
  InputTypeToken,
  KeyboardTypeToken,
  SizeTypeTokens,
  SpaceProps,
  TextInputProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION } from "./types";
import {updateSliderAmount, sliderAmountOnChange, getEditAmountOnLoad} from "./actions";
import { RegexConfig } from "../../../configs/config";
import {
  StepResponseObject,
  UpdateAvailableCASMap,
} from "../unlock_limit/types";

export const template: (
  maxAmount: number,
  stepResponseObject: StepResponseObject,
  updateAvailableCASMap: UpdateAvailableCASMap
) => TemplateSchema = (
  maxAmount,
  stepResponseObject,
  updateAvailableCASMap
) => ({
  layout: <Layout>{
    id: ROUTE.UPDATE_SLIDER_AMOUNT,
    type: LAYOUTS.MODAL,
    widgets: [
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
    space0: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
    continue: <ButtonProps & WidgetProps>{
      label: "Confirm",
      fontFamily: FontFamilyTokens.Poppins,
      type: ButtonTypeTokens.LargeOutline,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.EDIT_SLIDER_AMOUNT,
        payload: {
          value: "",
          maxAmount,
          stepResponseObject,
          updateAvailableCASMap,
        },
        routeId: ROUTE.UPDATE_SLIDER_AMOUNT,
      },
    },
    input: <TextInputProps & WidgetProps>{
      type: InputTypeToken.DEFAULT,
      state: InputStateToken.DEFAULT,
      title: "Credit limit",
      placeholder: "Enter credit limit",
      keyboardType: KeyboardTypeToken.numberPad,
      action: {
        type: ACTION.SLIDER_AMOUNT_ONCHANGE,
        payload: {
          value: '',
          maxAmount: maxAmount,
          targetWidgetId: "continue",
        },
        routeId: ROUTE.UPDATE_SLIDER_AMOUNT,
      },
      // caption: { error: "Enter a valid amount" },
      // errorAction: {
      //   type: ACTION.DISABLE_CONTINUE,
      //   routeId: ROUTE.UPDATE_SLIDER_AMOUNT,
      //   payload: { targetWidgetId: "continue", minAmount: 25000 },
      // },
      // successAction: {
      //   type: ACTION.ENABLE_CONTINUE,
      //   routeId: ROUTE.UPDATE_SLIDER_AMOUNT,
      //   payload: { targetWidgetId: "continue", minAmount: 25000 },
      // },
    },
    space1: <SpaceProps>{ size: SizeTypeTokens.SM },
    space3: <SpaceProps>{ size: SizeTypeTokens.XXXL },
  },
});

export const updateSliderAmountMF: PageType<any> = {
  onLoad: async (
    _,
    { maxAmount, stepResponseObject, updateAvailableCASMap }
  ) => {
    // const prevMob = `${(
    //   await SharedPropsService.getUser()
    // ).linkedBorrowerAccounts[0].accountHolderPhoneNumber.replace("+91", "")}`;
    return Promise.resolve(
      template(maxAmount, stepResponseObject, updateAvailableCASMap)
    );
  },
  actions: {
    [ACTION.EDIT_SLIDER_AMOUNT]: updateSliderAmount,
    [ACTION.SLIDER_AMOUNT_ONCHANGE]: sliderAmountOnChange,
    [ACTION.GET_EDIT_AMOUNT_ONLOAD]: getEditAmountOnLoad,
    //[ACTION.ENABLE_CONTINUE]: toggleCTA,
    //[ACTION.DISABLE_CONTINUE]: toggleCTA,
  },
  action: {
    type: ACTION.GET_EDIT_AMOUNT_ONLOAD,
    payload: {},
    routeId: ROUTE.UPDATE_SLIDER_AMOUNT
  }
};
