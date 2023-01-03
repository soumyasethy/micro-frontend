import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  POSITION,
  TemplateSchema,
} from "@voltmoney/types";

import { ROUTE } from "../../../routes";
import { commonTemplates } from "../../../configs/common";
import {
  FontFamilyTokens,
  FontSizeTokens,
  ImageProps,
  SizeTypeTokens,
  SpaceProps, StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  StackWidth,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { assetsMap } from "../../../configs/assets";
import { addListItemsOnUI, navigateToNext } from "./actions";
import { ACTION } from "./types";

export const template: () => TemplateSchema = () => {
  return {
    layout: <Layout>{
      id: ROUTE.CHECKING_LIMIT,
      type: LAYOUTS.LIST,
      widgets: [
        commonTemplates.poweredBy.widgetItem,
        {
          id: "topSpace",
          type: WIDGET.SPACE,
        },
        {
          id: "placeholder",
          type: WIDGET.IMAGE,
          position: POSITION.CENTER,
          padding: { horizontal: 0 },
        },
        {
          id: "placeholderSpace",
          type: WIDGET.SPACE,
        },
        { id: "titleStack", type: WIDGET.STACK, position: POSITION.CENTER },
      ],
    },
    datastore: <Datastore>{
      ...commonTemplates.poweredBy.datastore,
      topSpace: <SpaceProps>{ size: SizeTypeTokens.Size80 },
      placeholder: <ImageProps>{
        uri: assetsMap.checking_limit,
        width: 180,
        height: 180,
      },
      placeholderSpace: <SpaceProps>{ size: SizeTypeTokens.Size32 },
      titleStack: <StackProps>{
        type: StackType.row,
        width: StackWidth.CONTENT,
        justifyContent: StackJustifyContent.flexStart,
        alignItems: StackAlignItems.flexStart,
        widgetItems: [{ id: "title", type: WIDGET.TEXT }],
      },
      title: <TypographyProps>{
        label: "Evaluating your mutual funds",
        fontFamily: FontFamilyTokens.Poppins,
        fontSize: FontSizeTokens.XL,
        lineHeight: 28,
        // textAlign: TextAlignTokens.center,
        fontWeight: "600",
      },
    },
  };
};

export const checkingLimitMf: PageType<any> = {
  onLoad: async () => {
    return Promise.resolve(template());
  },
  actions: {
    [ACTION.NAVIGATE_NEXT]: navigateToNext,
    [ACTION.BUILD_LIST_ITEMS]: addListItemsOnUI,
  },
  action: {
    routeId: ROUTE.CHECKING_LIMIT,
    type: ACTION.BUILD_LIST_ITEMS,
    payload: {},
  },
  clearPrevious: true,
};
