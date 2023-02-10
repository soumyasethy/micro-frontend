import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  TemplateSchema,
  WidgetProps,
} from "@voltmoney/types";
import {
  ButtonBaseProps,
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
  StackJustifyContent,
  StackProps,
  StackType,
  StackWidth,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTIONS } from "./types";
import {
  authCAS,
  confirmCTA,
  fetchMyPortfolio,
  goBack,
  navToFetch,
  toggleRadio,
} from "./actions";
import SharedPropsService from "../../../SharedPropsService";
import { AssetRepositoryType } from "../../../configs/config";
import {heightMap} from "../../../configs/height";

export const template: (
  assetRepository: AssetRepositoryType
) => TemplateSchema = (assetRepository) => {
  return {
    layout: <Layout>{
      id: ROUTE.SELECT_SOURCE,
      type: LAYOUTS.MODAL,
      style: {
        height: heightMap[ROUTE.SELECT_SOURCE]
      },
      widgets: [
        {
          id: "headerStack",
          type: WIDGET.STACK,
        },
        // { id: "title", type: WIDGET.TEXT },
        { id: "space1", type: WIDGET.SPACE },
        { id: "subTitleStack", type: WIDGET.STACK },
        { id: "space2", type: WIDGET.SPACE },
        { id: "camsStack", type: WIDGET.STACK },
        { id: "space3", type: WIDGET.SPACE },
        { id: "kfinStack", type: WIDGET.STACK },
        { id: "space4", type: WIDGET.SPACE },
        { id: "continueButton", type: WIDGET.BUTTON },
      ],
    },
    datastore: <Datastore>{
      headerStack: <StackProps>{
        type: StackType.row,
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.spaceBetween,
        widgetItems: [
          { id: "title", type: WIDGET.TEXT },
          { id: "leadIcon", type: WIDGET.BUTTON },
        ],
      },
      title: <TypographyProps>{
        label: "Select source for MF portfolio",
        fontSize: FontSizeTokens.MD,
        color: ColorTokens.Grey_Night,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "700",
      },
      leadIcon: <ButtonProps & WidgetProps>{
        label: "",
        type: ButtonTypeTokens.SmallGhost,
        width: ButtonWidthTypeToken.CONTENT,
        stack: <StackProps>{
          type: StackType.row,
          alignItems: StackAlignItems.flexStart,
          justifyContent: StackJustifyContent.flexStart,
        },
        icon: {
          name: IconTokens.Cancel,
          align: IconAlignmentTokens.right,
          size: IconSizeTokens.XXXL,
        },
        action: {
          type: ACTIONS.GO_BACK,
          payload: <{}>{
            value: "",
            widgetId: "input",
            isResend: false,
          },
          routeId: ROUTE.SELECT_SOURCE,
        },
      },
      subTitleStack: <StackProps & WidgetProps>{
        type: StackType.column,
        alignItems: StackAlignItems.flexStart,
        justifyContent: StackJustifyContent.flexStart,
        widgetItems: [
          { id: "subTitle", type: WIDGET.TEXT },
          { id: "subTitleSpace", type: WIDGET.SPACE },
          { id: "subTitle2", type: WIDGET.TEXT },
        ],
      },
      subTitle: <TypographyProps>{
        label: `CAMS & KFintech are regulated entity which maintain`,
        color: ColorTokens.Grey_Charcoal,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
        fontSize: FontSizeTokens.XS,
      },
      subTitleSpace: <SpaceProps>{
        size: SizeTypeTokens.SM,
      },
      subTitle2: <TypographyProps>{
        label: `records of mutual investments.`,
        color: ColorTokens.Grey_Charcoal,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
        fontSize: FontSizeTokens.XS,
      },
      camsStack: <StackProps & WidgetProps>{
        width: StackWidth.FULL,
        type: StackType.row,
        justifyContent: StackJustifyContent.flexStart,
        alignItems: StackAlignItems.center,
        widgetItems: [
          { id: "camsRadio", type: WIDGET.ICON },
          { id: "camsSpace", type: WIDGET.SPACE },
          { id: "camsIcon", type: WIDGET.ICON },
        ],
        action: {
          type: ACTIONS.TOGGLE_RADIO,
          payload: {
            value: "cams",
          },
          routeId: ROUTE.SELECT_SOURCE,
        },
      },
      camsRadio: <IconProps>{
        name:
          assetRepository === AssetRepositoryType.CAMS
            ? IconTokens.RadioCircleFilled
            : IconTokens.RadioCircleNotFilled,
        size: IconSizeTokens.XL,
      },
      camsSpace: <SpaceProps>{
        size: SizeTypeTokens.LG,
      },
      camsIcon: <IconProps>{
        name: IconTokens.Cams,
        size: IconSizeTokens.XL,
      },
      space1: <SpaceProps>{ size: SizeTypeTokens.MD },
      space2: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      space3: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      kfinStack: <StackProps & WidgetProps>{
        width: StackWidth.FULL,
        type: StackType.row,
        justifyContent: StackJustifyContent.flexStart,
        alignItems: StackAlignItems.center,
        widgetItems: [
          { id: "kfinRadio", type: WIDGET.ICON },
          { id: "kfinSpace", type: WIDGET.SPACE },
          { id: "kfinIcon", type: WIDGET.ICON },
        ],
        action: {
          type: ACTIONS.TOGGLE_RADIO,
          payload: {
            value: "kfin",
          },
          routeId: ROUTE.SELECT_SOURCE,
        },
      },
      kfinRadio: <IconProps>{
        name:
          assetRepository === AssetRepositoryType.KARVY
            ? IconTokens.RadioCircleFilled
            : IconTokens.RadioCircleNotFilled,
        size: IconSizeTokens.XL,
      },
      kfinSpace: <SpaceProps>{
        size: SizeTypeTokens.MD,
      },
      kfinIcon: <IconProps>{
        name: IconTokens.Kfin,
        size: IconSizeTokens.XL,
      },
      space4: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      continueButton: <ButtonBaseProps & WidgetProps>{
        label: "Confirm",
        bgColor: ColorTokens.Transparent,
        labelColor: ColorTokens.Primary_100,
        fontSize: FontSizeTokens.SM,
        width: ButtonWidthTypeToken.FULL,
        paddingVertical: SizeTypeTokens.MD,
        paddingHorizontal: SizeTypeTokens.MD,
        borderColor: ColorTokens.Primary_100,
        action: {
          type: ACTIONS.CONFIRM,
          payload: {},
        },
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "700",
      },
    },
  };
};

export const selectSourceMF: PageType<any> = {
  onLoad: async () => {
    const assetRepository = await SharedPropsService.getAssetRepositoryType();
    console.log("assetRepository", assetRepository);
    return Promise.resolve(template(assetRepository));
  },
  actions: {
    [ACTIONS.AUTH_CAS]: authCAS,
    [ACTIONS.RESEND_OTP_AUTH_CAS]: fetchMyPortfolio,
    [ACTIONS.GO_BACK]: goBack,
    [ACTIONS.NAV_TO_FETCH]: navToFetch,
    [ACTIONS.TOGGLE_RADIO]: toggleRadio,
    [ACTIONS.CONFIRM]: confirmCTA,
  },
  clearPrevious: true,
};
