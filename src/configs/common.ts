import {
  ButtonBaseProps,
  ButtonWidthTypeToken,
  CardOrientation,
  CardProps,
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  IconProps,
  IconTokens,
  ImageProps,
  ResizeModeToken,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  StackWidth,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { assetsMap } from "./assets";
import {
  Action,
  Datastore,
  POSITION,
  WidgetItem,
  WidgetProps,
} from "@voltmoney/types";

export const commonTemplates = {
  poweredBy: {
    widgetItem: <WidgetItem>{
      id: "poweredBy",
      type: WIDGET.STACK,
      position: POSITION.ABSOLUTE_BOTTOM,
    },
    datastore: <Datastore>{
      poweredBy: <StackProps>{
        width: StackWidth.CONTENT,
        type: StackType.row,
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.center,
        widgetItems: [
          { id: "powerBy", type: WIDGET.ICON },
          { id: "powerBySpace", type: WIDGET.SPACE },
          { id: "cams", type: WIDGET.ICON },
          { id: "camsSpace", type: WIDGET.SPACE },
          { id: "kfin", type: WIDGET.ICON },
          // { id: "kfinSpace", type: WIDGET.SPACE },
          // { id: "cdsl", type: WIDGET.ICON },
          // { id: "cdslSpace", type: WIDGET.SPACE },
          // { id: "nsdl", type: WIDGET.IMAGE },
        ],
      },
      powerBy: <IconProps>{ name: IconTokens.PoweredBy },
      powerBySpace: <SpaceProps>{ size: SizeTypeTokens.LG },
      cams: <IconProps>{ name: IconTokens.Cams },
      camsSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
      kfin: <IconProps>{ name: IconTokens.Kfin },
      kfinSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
      cdsl: <IconProps>{ name: IconTokens.Cdsl },
      cdslSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
      nsdl: <ImageProps>{
        uri: assetsMap.nsdl,
        height: 23,
        width: 48,
        resizeMode: ResizeModeToken.CONTAIN,
        padding: SizeTypeTokens.NONE,
      },
    },
  },
  infoMessage: (id: string, message?: string, type?: "error" | "info") => ({
    widgetItem: [
      {
        id: `otpConfirmInfo${id}`,
        type: WIDGET.CARD,
        position: POSITION.ABSOLUTE_BOTTOM,
      },
      {
        id: `continueSpace${id}`,
        type: WIDGET.SPACE,
        position: POSITION.ABSOLUTE_BOTTOM,
      },
    ],
    datastore: <Datastore>{
      [`otpConfirmInfo${id}`]: <CardProps>{
        bgColor:
          type === "error"
            ? ColorTokens.System_Error_05
            : ColorTokens.Secondary_05,
        width: StackWidth.FULL,
        padding: {
          top: SizeTypeTokens.LG,
          bottom: SizeTypeTokens.LG,
          left: SizeTypeTokens.LG,
          right: SizeTypeTokens.LG,
        },
        bodyOrientation: CardOrientation.HORIZONTAL,
        body: {
          widgetItems: [
            { id: `infoIcon${id}`, type: WIDGET.ICON },
            { id: `infoIconSpace${id}`, type: WIDGET.SPACE },
            { id: `infoLabel${id}`, type: WIDGET.TEXT },
          ],
        },
      },
      [`infoIcon${id}`]: <IconProps>{
        name: IconTokens.InfoFilled,
        color:
          type === "error"
            ? ColorTokens.System_Error
            : ColorTokens.Secondary_100,
      },
      [`infoIconSpace${id}`]: <SpaceProps>{ size: SizeTypeTokens.Size10 },
      [`continueSpace${id}`]: <SpaceProps>{ size: SizeTypeTokens.LG },
      [`infoLabel${id}`]: <TypographyProps>{
        label: `${message}`,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
        fontColor:
          type === "error" ? ColorTokens.System_Error : ColorTokens.Grey_Night,
        fontSize: FontSizeTokens.XS,
        lineHeight: 18,
      },
    },
  }),
  fetchMoreFromOtherSource: (id: string, action?: Action<any>) => ({
    layout: { id, type: WIDGET.STACK },
    datastore: {
      otherSourceStack: <StackProps>{
        type: StackType.column,
        alignItems: StackAlignItems.center,
        width: StackWidth.FULL,
        widgetItems: [
          { id: "otherSourceSpace", type: WIDGET.SPACE },
          { id: "infoText", type: WIDGET.TEXT },
          { id: "infoSpace", type: WIDGET.SPACE },
          { id: "infoButton", type: WIDGET.BUTTON },
          { id: "infoButtonSpace", type: WIDGET.SPACE },
        ],
      },
      otherSourceSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
      infoText: <TypographyProps>{
        label: "Don’t see all your mutual funds?",
        fontSize: FontSizeTokens.SM,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
        color: ColorTokens.Grey_Charcoal,
        lineHeight: 24,
      },
      infoSpace: <SpaceProps>{ size: SizeTypeTokens.SM },
      infoButton: <ButtonBaseProps & WidgetProps>{
        label: "Get more portfolio",
        bgColor: ColorTokens.Transparent,
        labelColor: ColorTokens.Primary_100,
        fontSize: FontSizeTokens.SM,
        width: ButtonWidthTypeToken.FULL,
        paddingVertical: SizeTypeTokens.MD,
        paddingHorizontal: SizeTypeTokens.MD,
        borderColor: ColorTokens.Primary_100,
        action: action,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "700",
      },
      infoButtonSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
    },
  }),
};
