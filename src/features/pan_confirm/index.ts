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
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { ACTION, ContinuePayload } from "./types";
import { changePanNo, confirmPan } from "./actions";

export const template: (
  name: string,
  panNumber: string,
  targetRoute: string
) => TemplateSchema = (name = "Test Name", panNumber, targetRoute) => {
  return {
    layout: <Layout>{
      id: ROUTE.PAN_CONFIRM_NAME,
      type: LAYOUTS.MODAL,
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
          { id: "confirm_stack", type: WIDGET.STACK },
        ],
      },
      title: <TypographyProps>{
        label: name,
        fontSize: FontSizeTokens.LG,
        color: ColorTokens.Grey_Night,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "700",
      },
      title_space: <SpaceProps>{ size: SizeTypeTokens.XL },
      confirm: <ButtonProps & WidgetProps>{
        label: `Confirm I am ${name}`,
        type: ButtonTypeTokens.LargeFilled,
        action: {
          type: ACTION.CONFIRM_PAN,
          payload: <ContinuePayload>{
            targetRoute,
            panNumber,
            widgetId: "panItem",
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
        label: "Wrong name? ",
        fontSize: FontSizeTokens.SM,
        color: ColorTokens.Grey_Night,
      },
      wrong2: <TypographyProps>{
        label: "Renter PAN",
        fontSize: FontSizeTokens.SM,
        color: ColorTokens.Primary_100,
      },
    },
  };
};

export const panConfirmMF: PageType<any> = {
  onLoad: async (_, { name, panNumber, targetRoute }) => {
    return Promise.resolve(template(name, panNumber, targetRoute));
  },
  actions: {
    [ACTION.CONFIRM_PAN]: confirmPan,
    [ACTION.CHANGE_PAN_NO]: changePanNo,
  },
};
