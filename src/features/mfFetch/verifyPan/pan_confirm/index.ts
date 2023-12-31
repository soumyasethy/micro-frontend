import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
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
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  TextAlignTokens,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../../routes";
import { ACTION, ContinuePayload } from "./types";
import { changePanNo, confirmPan } from "./actions";
import {heightMap} from "../../../../configs/height";

export const template: (
  name: string,
  panNumber: string,
  targetRoute: string,
  currentStepId: string,
  setIsUserLoggedIn?: (isUserLoggedIn: boolean) => void
) => TemplateSchema = (
  name = "Test Name",
  panNumber,
  targetRoute,
  currentStepId,
  setIsUserLoggedIn
) => {
  return {
    layout: <Layout>{
      id: ROUTE.PAN_CONFIRM_NAME,
      type: LAYOUTS.MODAL,
      style: {
        height: heightMap[ROUTE.PAN_CONFIRM_NAME]
      },
      widgets: [{ id: "stack_root", type: WIDGET.STACK }],
    },
    datastore: <Datastore>{
      stack_root: <StackProps>{
        justifyContent: StackJustifyContent.center,
        alignItems: StackAlignItems.center,
        widgetItems: [
          { id: "title", type: WIDGET.TEXT },
          { id: "title_space", type: WIDGET.SPACE },
          { id: "confirm", type: WIDGET.BUTTON },
          { id: "wrong_space", type: WIDGET.SPACE },
          {
            id: "confirm_stack",
            type: WIDGET.STACK,
          },
        ],
      },
      title: <TypographyProps>{
        label: `Hello, \n${name.toUpperCase()}`,
        fontSize: FontSizeTokens.LG,
        color: ColorTokens.Grey_Night,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "700",
        textAlign: TextAlignTokens.center,
      },
      title_space: <SpaceProps>{ size: SizeTypeTokens.XL },
      confirm: <ButtonProps & WidgetProps>{
        label: `I confirm, this is me`,
        fontSize: FontSizeTokens.SM,
        type: ButtonTypeTokens.LargeFilled,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: ACTION.CONFIRM_PAN,
          payload: <ContinuePayload>{
            targetRoute,
            panNumber,
            currentStepId,
            widgetId: "panItem",
            setIsUserLoggedIn,
          },
          routeId: ROUTE.PAN_CONFIRM_NAME,
        },
      },
      wrong_space: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      confirm_stack: <StackProps & WidgetProps>{
        type: StackType.row,
        widgetItems: [
          { id: "wrong1", type: WIDGET.TEXT },
          { id: "wrong2", type: WIDGET.TEXT },
        ],
        action: {
          type: ACTION.CHANGE_PAN_NO,
          routeId: ROUTE.PAN_CONFIRM_NAME,
          payload: {},
        },
      },
      wrong1: <TypographyProps>{
        label: "Not you? ",
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
        fontSize: FontSizeTokens.SM,
        color: ColorTokens.Grey_Night,
      },
      wrong2: <TypographyProps>{
        label: "Enter PAN again",
        fontSize: FontSizeTokens.SM,
        color: ColorTokens.Primary_100,
        fontWeight: "600",
      },
    },
  };
};

export const panConfirmMF: PageType<any> = {
  onLoad: async (
    _,
    { name, panNumber, targetRoute, currentStepId, setIsUserLoggedIn }
  ) => {
    return Promise.resolve(
      template(name, panNumber, targetRoute, currentStepId, setIsUserLoggedIn)
    );
  },
  actions: {
    [ACTION.CONFIRM_PAN]: confirmPan,
    [ACTION.CHANGE_PAN_NO]: changePanNo,
  },
};
