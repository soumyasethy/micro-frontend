import {
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
};
