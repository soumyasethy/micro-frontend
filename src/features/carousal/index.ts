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
  IconAlignmentTokens,
  IconProps,
  IconSizeTokens,
  IconTokens,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { ACTION } from "./types";
import { GoToNumber } from "./actions";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.CAROUSAL_PAGE,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "space1", type: WIDGET.SPACE },
      { id: "stackIcon", type: WIDGET.STACK },
      { id: "space2", type: WIDGET.SPACE },
      { id: "carousal", type: WIDGET.CAROUSAL },
      { id: "button", type: WIDGET.BUTTON, position: POSITION.ABSOLUTE_BOTTOM },
    ],
  },
  datastore: <Datastore>{
    space1: <SpaceProps>{ size: SizeTypeTokens.XL },
    stackIcon: <StackProps & WidgetProps>{
      type: StackType.row,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.center,
      widgetItems: [{ id: "icon", type: WIDGET.ICON }],
    },
    icon: <IconProps>{
      name: IconTokens.VoltFull,
      size: IconSizeTokens.XXXL,
    },
    space2: <SpaceProps>{ size: SizeTypeTokens.XXL },
    carousal: <WidgetProps>{
      action: {},
    },
    button: <ButtonProps>{
      label: "Get started",
      type: ButtonTypeTokens.LargeFilled,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.GOTO_PHONE,
        routeId: ROUTE.CAROUSAL_PAGE,
      },
    },
  },
};

export const carousalPageMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: {
    [ACTION.GOTO_PHONE]: GoToNumber,
  },
};
