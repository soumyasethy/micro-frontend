import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
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
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackProps,
  StackType,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTIONS } from "./types";
import { goBack } from "./actions";

export const template = {
  layout: <Layout>{
    id: ROUTE.OTP_AUTH_CAS,
    type: LAYOUTS.MODAL,
    widgets: [{ id: "stack", type: WIDGET.STACK }],
  },
  datastore: <Datastore>{
    stack: <StackProps>{
      type: StackType.column,
      alignItems: StackAlignItems.center,
      widgetItems: [
        { id: "icon", type: WIDGET.ICON },
        { id: "iconSpace", type: WIDGET.SPACE },
        { id: "title", type: WIDGET.TEXT },
        { id: "space1", type: WIDGET.SPACE },
        { id: "subTitle", type: WIDGET.TEXT },
        { id: "space2", type: WIDGET.SPACE },
        { id: "continue", type: WIDGET.BUTTON },
      ],
    },
    icon: <IconProps>{
      name: IconTokens.Fire,
      size: IconSizeTokens.XXXXXXXL,
      align: IconAlignmentTokens.center,
    },
    title: <TypographyProps>{
      label: "Verification failed!",
      fontSize: FontSizeTokens.XL,
      color: ColorTokens.Grey_Night,
      fontFamily: FontFamilyTokens.Poppins,
      fontWeight: "700",
    },
    subTitle: <TypographyProps>{
      label: `We couldn’t find a portfolio matching your details. Please review & try again.`,
      color: ColorTokens.Grey_Charcoal,
      fontSize: FontSizeTokens.SM,
    },
    continue: <ButtonProps & WidgetProps>{
      label: "Edit details",
      type: ButtonTypeTokens.LargeSoftFilled,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTIONS.GO_BACK,
        payload: {},
        routeId: ROUTE.VERIFICATION_FAILED,
      },
    },
    space1: <SpaceProps>{ size: SizeTypeTokens.LG },
    space2: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    iconSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
  },
};

export const verificationFailedMF: PageType<any> = {
  onLoad: async (_) => {
    return Promise.resolve(template);
  },
  actions: {
    [ACTIONS.GO_BACK]: goBack,
  },
};
