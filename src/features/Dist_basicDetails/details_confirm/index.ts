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
import { ROUTE } from "../../../routes";
import { ACTION, ContinuePayload } from "./types";
import { changePanNo, confirmPan } from "./actions";

export const template: (
  name: string
) => TemplateSchema = (
  name = "Test Name",
) => {
  return {
    layout: <Layout>{
      id: ROUTE.DETAILS_CONFIRM,
      type: LAYOUTS.MODAL,
      widgets: [{ id: "stack_root", type: WIDGET.STACK }],
    },
    datastore: <Datastore>{
      stack_root: <StackProps>{
        justifyContent: StackJustifyContent.center,
        alignItems: StackAlignItems.center,
        widgetItems: [
          { id: "head_space", type: WIDGET.SPACE },
          { id: "title", type: WIDGET.TEXT },
          { id: "title_space", type: WIDGET.SPACE },
          { id: "confirm", type: WIDGET.BUTTON }
        ],
      },
      head_space: <SpaceProps>{ size: SizeTypeTokens.XXL },
      title: <TypographyProps>{
        label: `Application created for \n${name.toUpperCase()}`,
        fontSize: FontSizeTokens.LG,
        color: ColorTokens.Grey_Night,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "700",
        textAlign: TextAlignTokens.center,
      },
      title_space: <SpaceProps>{ size: SizeTypeTokens.XL },
      confirm: <ButtonProps & WidgetProps>{
        label: `Continue`,
        fontSize: FontSizeTokens.SM,
        type: ButtonTypeTokens.LargeFilled,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: ACTION.CONFIRM_PAN,
          payload: <ContinuePayload>{
            widgetId: "panItem",
          },
          routeId: ROUTE.DETAILS_CONFIRM,
        },
      },
    
    },
  };
};

export const detailsConfirmMF: PageType<any> = {
  onLoad: async (_, { name }) => {
    return Promise.resolve(
      template(name)
    );
  },
  actions: {
    [ACTION.CONFIRM_PAN]: confirmPan,
    [ACTION.CHANGE_PAN_NO]: changePanNo,
  },
};
