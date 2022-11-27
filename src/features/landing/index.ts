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
  IconAlignmentTokens,
  IconProps,
  IconSizeTokens,
  IconTokens,
  ImageProps,
  ImageSizeTokens,
  ResizeModeToken,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackFlexWrap,
  StackHeight,
  StackJustifyContent,
  StackProps,
  StackType,
  StackWidth,
  TextAlignTokens,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { ACTION } from "./types";
import { GoToLoginAction } from "./actions";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.LANDING_PAGE,
    type: LAYOUTS.LIST,
    widgets: [
      {
        id: "bankmegaStack",
        type: WIDGET.STACK,
        position: POSITION.ABSOLUTE_CENTER,
      },
      { id: "space0", type: WIDGET.SPACE, position: POSITION.ABSOLUTE_CENTER },
      { id: "title", type: WIDGET.TEXT, position: POSITION.ABSOLUTE_CENTER },
      { id: "space1", type: WIDGET.SPACE, position: POSITION.ABSOLUTE_CENTER },
      { id: "subTitle", type: WIDGET.TEXT, position: POSITION.ABSOLUTE_CENTER },
      {
        id: "continue",
        type: WIDGET.BUTTON,
        position: POSITION.ABSOLUTE_BOTTOM,
      },
      { id: "space2", type: WIDGET.SPACE, position: POSITION.ABSOLUTE_BOTTOM },
      { id: "footer", type: WIDGET.STACK, position: POSITION.ABSOLUTE_BOTTOM },
    ],
  },
  datastore: <Datastore>{
    bankmegaStack: <StackProps & WidgetProps>{
      type: StackType.row,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.center,
      widgetItems: [
        {
          id: "bankmegaImage",
          type: WIDGET.IMAGE,
        },
      ],
    },
    bankmegaImage: <ImageProps>{
      uri: "https://volt-images.s3.ap-south-1.amazonaws.com/bankmega.svg",
      height: 95,
      width: 208,
      resizeMode: ResizeModeToken.CONTAIN,
    },
    space0: <SpaceProps>{
      size: SizeTypeTokens.Size32,
    },
    title: <TypographyProps>{
      label: "Get loan against\nyour mutual funds",
      fontFamily: FontFamilyTokens.Poppins,
      fontWeight: "600",
      fontSize: FontSizeTokens.XXL,
      textAlign: TextAlignTokens.center,
      color: ColorTokens.Black,
    },
    space1: <SpaceProps>{
      size: SizeTypeTokens.MD,
    },
    subTitle: <TypographyProps>{
      label: "Get loans by pledging your mutual funds\nagaints it.",
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
      fontSize: FontSizeTokens.SM,
      textAlign: TextAlignTokens.center,
      color: ColorTokens.Grey_Charcoal,
    },
    continue: <ButtonProps>{
      label: "Continue",
      fontFamily: FontFamilyTokens.Poppins,
      fontweight: "700",
      labelColor: ColorTokens.White,
      type: ButtonTypeTokens.LargeFilled,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.GO_TO_LOGIN,
        routeId: ROUTE.LANDING_PAGE,
      },
    },
    space2: <SpaceProps>{
      size: SizeTypeTokens.Size32,
    },
    footer: <StackProps>{
      type: StackType.row,
      width: StackWidth.FULL,
      height: StackHeight.FULL,
      flexWrap: StackFlexWrap.wrap,
      justifyContent: StackJustifyContent.spaceEvenly,
      alignItems: StackAlignItems.center,
      widgetItems: [
        { id: "POWERED_BY", type: WIDGET.TEXT },
        { id: "miraeAssetImage", type: WIDGET.IMAGE },
        { id: "volt", type: WIDGET.ICON },
      ],
    },
    POWERED_BY: <TypographyProps>{
      label: "POWERED BY",
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "500",
      fontSize: FontSizeTokens.XXS,
    },
    miraeAssetImage: <ImageProps>{
      uri: "https://volt-images.s3.ap-south-1.amazonaws.com/mirae-assets.svg",
      height: 32,
      width: 104,
      resizeMode: ResizeModeToken.CONTAIN,
    },
    volt: <IconProps>{
      name: IconTokens.VoltFull,
    },
  },
};

export const landingPageMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: {
    [ACTION.GO_TO_LOGIN]: GoToLoginAction,
  },
};
