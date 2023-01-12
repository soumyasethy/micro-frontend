import {Datastore, Layout, LAYOUTS, PageType, WidgetProps,} from "@voltmoney/types";
import {
  BorderRadiusTokens,
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  CardProps,
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
  StackWidth,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import {ROUTE} from "../../../routes";
import {ACTIONS} from "./types";
import {goBack} from "./actions";

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
        { id: "subTitle1", type: WIDGET.TEXT },
        { id: "subTitle2", type: WIDGET.TEXT },
        { id: "space3", type: WIDGET.SPACE },
        { id: "instructionCard", type: WIDGET.CARD},
        { id: "space2", type: WIDGET.SPACE },
        { id: "continue", type: WIDGET.BUTTON },
      ],
    },
    icon: <IconProps>{
      name: IconTokens.Failed,
      size: IconSizeTokens.XXXXXXXL,
      align: IconAlignmentTokens.center,
    },
    title: <TypographyProps>{
      label: "Couldn’t find portfolio",
      fontSize: FontSizeTokens.XL,
      color: ColorTokens.Grey_Night,
      fontFamily: FontFamilyTokens.Poppins,
      fontWeight: "700",
      lineHeight: 28
    },
    subTitle1: <TypographyProps>{
      label: `We tried fetching your portfolio. But no `,
      color: ColorTokens.Grey_Charcoal,
      fontSize: FontSizeTokens.SM,
      fontWeight: "400",
      lineHeight: 24
    },
    subTitle2:  <TypographyProps>{
      label: `matching portfolio found.`,
      color: ColorTokens.Grey_Charcoal,
      fontSize: FontSizeTokens.SM,
      fontWeight: "400",
      lineHeight: 24
    },
    instructionCard: <CardProps> {
      bgColor: ColorTokens.Grey_Milk,
      borderRadius: BorderRadiusTokens.BR2,
      padding: { vertical: SizeTypeTokens.MD, horizontal: SizeTypeTokens.MD},
      body:{
        widgetItems: [
          { id: 'instructionCardStack1', type: WIDGET.STACK },
          { id: 'instructionCardStack2', type: WIDGET.STACK },
          { id: 'cardBottomSpace1', type: WIDGET.SPACE},
        ]
      }
    },
    cardBottomSpace1: <SpaceProps> {
      size: SizeTypeTokens.MD
    },
    cardBottomSpace2: <SpaceProps> {
      size: SizeTypeTokens.SM
    },
    cardBottomSpace3: <SpaceProps> {
      size: SizeTypeTokens.SM
    },
    instructionCardStack1: <StackProps> {
      type: StackType.row,
      width: StackWidth.CONTENT,
      widgetItems: [
        { id: 'instructionCardIcon1', type: WIDGET.ICON },
        { id: 'cardBottomSpace2', type: WIDGET.SPACE},
        { id: 'instructionText1', type: WIDGET.TEXT }
      ]
    },
    instructionCardStack2: <StackProps> {
      type: StackType.row,
      width: StackWidth.CONTENT,
      widgetItems: [
        { id: 'instructionCardIcon2', type: WIDGET.ICON },
        { id: 'cardBottomSpace3', type: WIDGET.SPACE},
        { id: 'instructionText2', type: WIDGET.TEXT }
      ]
    },
    instructionCardIcon1: <IconProps> {
      name: IconTokens.Dot,
      color: ColorTokens.Grey_Charcoal,
      size: IconSizeTokens.XL,
      padding: {
        top: SizeTypeTokens.SM,
        right: SizeTypeTokens.XS,
      }
    },
    instructionCardIcon2: <IconProps> {
      name: IconTokens.Dot,
      color: ColorTokens.Grey_Charcoal,
      size: IconSizeTokens.XL,
      padding: {
        top: SizeTypeTokens.SM,
        right: SizeTypeTokens.XS,
      }
    },
    instructionText1: <TypographyProps>{
      label: `Please check your PAN is correct.`,
      color: ColorTokens.Grey_Charcoal,
      fontSize: FontSizeTokens.XS,
      fontWeight: "400",
      lineHeight: 18
    },
    instructionText2:  <TypographyProps>{
      label: `Please check that email id & PAN are linked with your investment.`,
      color: ColorTokens.Grey_Charcoal,
      fontSize: FontSizeTokens.XS,
      fontWeight: "400",
      lineHeight: 18
    },
    continue: <ButtonProps & WidgetProps>{
      label: "Edit details",
      type: ButtonTypeTokens.LargeSoftFilled,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTIONS.GO_BACK,
        payload: {},
        routeId: ROUTE.VERIFICATION_FAILED_NEW,
      },
    },
    space1: <SpaceProps>{ size: SizeTypeTokens.MD },
    space2: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    space3: <SpaceProps> { size: SizeTypeTokens.XL },
    iconSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
  },
};

export const verificationFailedMFNew: PageType<any> = {
  onLoad: async (_) => {
    return Promise.resolve(template);
  },
  actions: {
    [ACTIONS.GO_BACK]: goBack,
  },
};
