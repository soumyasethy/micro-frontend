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
  CardProps,
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  HeaderProps,
  HeaderTypeTokens,
  IconProps,
  IconSizeTokens,
  IconTokens,
  PaddingProps,
  SizeTypeTokens,
  SliderBaseProps,
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
import { ACTION } from "./types";
import {
  editSliderAmount,
  goBack,
  goConfirmPledge,
  goToEditPortFolio,
  OnChangeSlider,
} from "./action";
import { addCommasToNumber } from "../../../configs/utils";
import {
  StepResponseObject,
  UpdateAvailableCASMap,
} from "../unlock_limit/types";
import { AuthCASModel } from "../../../types/AuthCASModel";
import SharedPropsService from "../../../SharedPropsService";
import sharedPropsService from "../../../SharedPropsService";
import { fetchPledgeLimitRepo } from "../unlock_limit/repo";
import { portfolioListDatastoreBuilderSetCreditLimit } from "./utils";
// import { getPortfolioValue } from "../portfolio_readonly/actions";

export const template: (
  maxAmount: number,
  stepResponseObject: StepResponseObject,
  updateAvailableCASMap: UpdateAvailableCASMap
) => Promise<TemplateSchema> = async (
  maxAmount: number,
  stepResponseObject,
  updateAvailableCASMap
) => ({
  layout: <Layout>{
    id: ROUTE.SET_CREDIT_LIMIT,
    type: LAYOUTS.LIST,
    widgets: [
      {
        id: "header",
        type: WIDGET.HEADER,
        position: POSITION.ABSOLUTE_TOP,
      },
      {
        id: "amountStack",
        type: WIDGET.STACK,
      },
      { id: "space2", type: WIDGET.SPACE },
      {
        id: "slider",
        type: WIDGET.SLIDER,
      },
      { id: "space3", type: WIDGET.SPACE },
      { id: "minMaxStack", type: WIDGET.STACK },
      { id: "space4", type: WIDGET.SPACE },
      {
        id: "bottomSheetStack",
        type: WIDGET.STACK,
        padding: {
          left: 0,
          right: 0,
        },
      },
      // {
      //   id: "bottomSheet",
      //   type: WIDGET.BOTTOMSHEET,
      //   position: POSITION.STICKY_BOTTOM,
      //   padding: { left: 0, right: 0 },
      // },
      { id: "listItem", type: WIDGET.LIST },
      {
        id: "ctaCard",
        type: WIDGET.CARD,
        padding: {
          horizontal: 0,
          all: 0,
        },
        position: POSITION.STICKY_BOTTOM,
      },
    ],
  },
  datastore: <Datastore>{
    header: <HeaderProps & WidgetProps>{
      isBackButton: true,
      type: HeaderTypeTokens.DEFAULT,
      title: "Set credit limit",
      action: {
        type: ACTION.GO_BACK,
        routeId: ROUTE.SET_CREDIT_LIMIT,
        payload: {},
      },
    },
    amountStack: <StackProps>{
      width: StackWidth.FULL,
      type: StackType.column,
      alignItems: StackAlignItems.center,
      padding: <PaddingProps>{
        horizontal: SizeTypeTokens.NONE,
        vertical: SizeTypeTokens.NONE,
      },
      widgetItems: [
        { id: "space0", type: WIDGET.SPACE },
        { id: "selectText", type: WIDGET.TEXT },
        { id: "space1", type: WIDGET.SPACE },
        { id: "amountStack2", type: WIDGET.STACK },
      ],
    },
    space0: <SpaceProps>{
      size: SizeTypeTokens.Size32,
    },
    selectText: <TypographyProps>{
      label: "Select the amount",
      fontFamily: FontFamilyTokens.Poppins,
      fontWeight: "500",
      fontSize: FontSizeTokens.MD,
      color: ColorTokens.Grey_Night,
    },
    space1: <SpaceProps>{
      size: SizeTypeTokens.XL,
    },
    amountStack2: <StackProps>{
      width: StackWidth.FULL,
      type: StackType.row,
      justifyContent: StackJustifyContent.center,
      alignItems: StackAlignItems.center,
      padding: <PaddingProps>{
        horizontal: SizeTypeTokens.NONE,
      },
      widgetItems: [
        { id: "rupee", type: WIDGET.TEXT },
        { id: "amount", type: WIDGET.TEXT },
        { id: "space", type: WIDGET.SPACE },
        { id: "icon", type: WIDGET.ICON },
      ],
    },
    rupee: <TypographyProps>{
      label: "₹",
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "700",
      fontSize: FontSizeTokens.XXXXL,
    },
    amount: <TypographyProps>{
      label: `${addCommasToNumber(await SharedPropsService.getCreditLimit())}`,
      fontFamily: FontFamilyTokens.Poppins,
      fontWeight: "700",
      fontSize: FontSizeTokens.XXXXL,
    },
    space: <SpaceProps>{
      size: SizeTypeTokens.Size10,
    },
    icon: <IconProps & WidgetProps>{
      name: IconTokens.EditBlue,
      size: IconSizeTokens.XL,
      action: {
        type: ACTION.EDIT_LIMIT,
        routeId: ROUTE.SET_CREDIT_LIMIT,
        payload: {
          maxAmount,
          stepResponseObject,
          updateAvailableCASMap,
        },
      },
    },
    space2: <SpaceProps>{
      size: SizeTypeTokens.XXXXXL,
    },
    slider: <SliderBaseProps & WidgetProps>{
      value: await SharedPropsService.getCreditLimit(),
      minimumValue: 25000,
      maximumValue: maxAmount,
      step: 1000,
      paddingHorizontal: 10,
      action: {
        type: ACTION.ON_CHANGE_SLIDER,
        routeId: ROUTE.SET_CREDIT_LIMIT,
        payload: {
          stepResponseObject: stepResponseObject,
        },
      },
    },
    space3: <SpaceProps>{
      size: SizeTypeTokens.XXL,
    },
    minMaxStack: <StackProps>{
      width: StackWidth.FULL,
      type: StackType.row,
      justifyContent: StackJustifyContent.spaceBetween,
      padding: <PaddingProps>{
        horizontal: SizeTypeTokens.NONE,
        vertical: SizeTypeTokens.NONE,
      },
      widgetItems: [
        { id: "minText", type: WIDGET.TEXT },
        { id: "maxText", type: WIDGET.TEXT },
      ],
    },
    minText: <TypographyProps>{
      label: `Min ₹${addCommasToNumber(25000)}`,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
      fontSize: FontSizeTokens.XS,
      color: ColorTokens.Grey_Night,
    },
    maxText: <TypographyProps>{
      label: `Max ₹${addCommasToNumber(maxAmount)}`,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
      fontSize: FontSizeTokens.XS,
      color: ColorTokens.Grey_Night,
    },
    space4: <SpaceProps>{
      size: SizeTypeTokens.XXL,
    },
    // bottomSheet: <BottomSheetProps>{
    //   type: BottomSheetType.WEB,
    //   widgetHeaderItems: [
    //     {
    //       id: "bottomSheetStack",
    //       type: WIDGET.STACK,
    //       padding: {
    //         left: 10,
    //         right: 10,
    //         horizontal: 10,
    //       },
    //     },
    //     {
    //       id: "space5",
    //       type: WIDGET.SPACE,
    //     },
    //     {
    //       id: "bottomStackText",
    //       type: WIDGET.TEXT,
    //     },
    //   ],
    //   widgetItems: [
    //     // {
    //     //   id: "space6",
    //     //   type: WIDGET.SPACE,
    //     // },
    //     { id: "listItem", type: WIDGET.LIST },
    //   ],
    //   padding: <PaddingProps>{
    //     horizontal: SizeTypeTokens.XS,
    //   },
    //   initialOffset: 0.4,
    //   finalOffSet: 0.85,
    // },
    bottomSheetStack: <StackProps>{
      type: StackType.row,
      justifyContent: StackJustifyContent.spaceBetween,
      alignItems: StackAlignItems.center,
      padding: <PaddingProps>{
        horizontal: SizeTypeTokens.XS,
        vertical: SizeTypeTokens.XS,
      },
      widgetItems: [
        // { id: "leftSpace", type: WIDGET.SPACE },
        { id: "bottomSheetText", type: WIDGET.TEXT },
        { id: "editText", type: WIDGET.BUTTON },
        // { id: "rightSpace", type: WIDGET.SPACE },
      ],
    },
    bottomSheetText: <TypographyProps>{
      label: "Selected mutual funds",
      fontWeight: "500",
      fontSize: FontSizeTokens.MD,
      fontFamily: FontFamilyTokens.Poppins,
    },
    editText: <ButtonProps & WidgetProps>{
      label: "Edit",
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "600",
      type: ButtonTypeTokens.MediumGhost,
      paddingHorizontal: SizeTypeTokens.Size6,
      paddingVertical: SizeTypeTokens.Size6,
      action: {
        type: ACTION.EDIT_PORTFOLIO,
        payload: {
          stepResponseObject: stepResponseObject,
          updateAvailableCASMap: updateAvailableCASMap,
        },
        routeId: ROUTE.SET_CREDIT_LIMIT,
      },
    },
    space5: <SpaceProps>{
      size: SizeTypeTokens.MD,
    },
    bottomStackText: <TypographyProps>{
      label: `₹${addCommasToNumber(
        await SharedPropsService.getDesiredPortfolio()
      )} out of ₹${addCommasToNumber(
        parseInt(stepResponseObject["totalPortfolioAmount"].toString())
      )} are selected for pledging.`,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
      fontSize: FontSizeTokens.SM,
      color: ColorTokens.Grey_Charcoal,
    },
    space6: <SpaceProps>{
      size: SizeTypeTokens.MD,
    },
    ...(await portfolioListDatastoreBuilderSetCreditLimit(stepResponseObject)),
    ctaCard: <CardProps>{
      bgColor: ColorTokens.White,
      body: { widgetItems: [{ id: "ctaBody", type: WIDGET.STACK }] },
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.spaceBetween,
    },
    ctaBody: <StackProps>{
      width: StackWidth.FULL,
      type: StackType.column,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.center,
      widgetItems: [
        {
          id: "ctaButton",
          type: WIDGET.BUTTON,
        },
      ],
    },
    ctaButton: <ButtonProps & WidgetProps>{
      label: "Confirm amount and assets",
      fontWeight: "700",
      fontFamily: FontFamilyTokens.Inter,
      fontSize: FontSizeTokens.SM,
      type: ButtonTypeTokens.LargeFilled,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.GO_CONFIRM_PLEDGE,
        routeId: ROUTE.SET_CREDIT_LIMIT,
        payload: {
          stepResponseObject: stepResponseObject,
        },
      },
    },
  },
});

export const setCreditLimitMf: PageType<any> = {
  bgColor: "#F3F5FC",
  onLoad: async (_) => {
    const authCAS: AuthCASModel = await SharedPropsService.getAuthCASResponse();
    const pledgeLimitResponse = authCAS
      ? { data: authCAS }
      : await fetchPledgeLimitRepo().then((response) => ({
          data: response,
        }));
    const stepResponseObject = pledgeLimitResponse.data.stepResponseObject;
    const creditAmount = await sharedPropsService.getCreditLimit();
    const updateAvailableCASMapSharedProps =
      await sharedPropsService.getAvailableCASMap();
    const updateAvailableCASMap = updateAvailableCASMapSharedProps;

    if (creditAmount > 0) {
      /*
      stepResponseObject.availableCAS.forEach((item, index) => {
        stepResponseObject.availableCAS[index].pledgedUnits =
            item.totalAvailableUnits;
      });
      stepResponseObject.availableCAS = getUpdateAvailableCAS(
          creditAmount,
          stepResponseObject.availableCAS,
          stepResponseObject.isinNAVMap,
          stepResponseObject.isinLTVMap
      );
      stepResponseObject.availableCAS.map((item, index) => {
        let key = `${item.isinNo}-${item.folioNo}`;
        updateAvailableCASMap[key] = item;
      });
       */
    } else {
      stepResponseObject.availableCAS.map((item, index) => {
        let key = `${item.isinNo}-${item.folioNo}`;
        item.pledgedUnits = item.totalAvailableUnits;
        updateAvailableCASMap[key] = item;
      });
    }
    await SharedPropsService.setAvailableCASMap(updateAvailableCASMap);

    // const portValue = getPortfolioValue(
    //   stepResponseObject["availableCAS"],
    //   stepResponseObject["isinNAVMap"]
    // );

    // console.log("portValue", portValue);
    return Promise.resolve(
      template(
        stepResponseObject.availableCreditAmount,
        stepResponseObject,
        updateAvailableCASMap
      )
    );
  },
  actions: {
    [ACTION.ON_CHANGE_SLIDER]: OnChangeSlider,
    [ACTION.GO_BACK]: goBack,
    [ACTION.GO_CONFIRM_PLEDGE]: goConfirmPledge,
    [ACTION.EDIT_PORTFOLIO]: goToEditPortFolio,
    [ACTION.EDIT_LIMIT]: editSliderAmount,
  },
};
