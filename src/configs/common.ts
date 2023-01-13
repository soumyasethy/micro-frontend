import {
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
import { Datastore, POSITION, WidgetItem } from "@voltmoney/types";

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
};
