import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { ACTION, GetMoreMfPortfolioPayload, LimitPayload } from "./types";
import SharedPropsService from "../../../SharedPropsService";
import { AssetRepositoryType, ConfigTokens } from "../../../configs/config";
import {
  CardProps,
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
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
import { isMorePortfolioRenderCheck } from "../../../configs/utils";
import { SelectAssets } from "../modify_limit/actions";
import { AssetsPayload } from "../modify_limit/types";
import { ACTION as MODIFY_LIMIT_ACTION } from "../modify_limit/types";

export const continueLimit: ActionFunction<LimitPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await navigate(ROUTE.MODIFY_LIMIT, {
    stepResponseObject: action.payload.value,
  });
  // action.payload.value.availableCAS.forEach((item, index) => {
  //   action.payload.value.availableCAS[index].pledgedUnits =
  //     item.totalAvailableUnits;
  // });
  // await navigate(ROUTE.PLEDGE_CONFIRMATION, {
  //   stepResponseObject: action.payload.value,
  // });
};

export const selectPortfolio: ActionFunction<LimitPayload> = async (
  action,
  _datastore,
  { navigate, ...props }
): Promise<any> => {
  // await navigate(ROUTE.MODIFY_LIMIT, {
  //   stepResponseObject: action.payload.value,
  // });
  await SelectAssets(
    {
      type: MODIFY_LIMIT_ACTION.CONFIRM_CTA,
      payload: <AssetsPayload>{
        value: "",
        widgetId: "input",
        stepResponseObject: action.payload.value,
      },
      routeId: ROUTE.MODIFY_LIMIT,
    },
    {},
    { navigate, ...props }
  );
};
export const getMoreMfPortfolio: ActionFunction<
  GetMoreMfPortfolioPayload
> = async (action, _datastore, { navigate, ...props }): Promise<any> => {
  /*** check if the user has pledged any mf portfolio */
  const assetRepoMap = {};
  /*** Get unique asset repository from the cas list */
  for (let i = 0; i < action.payload.casList.length; i++) {
    const item = action.payload.casList[i];
    assetRepoMap[item.assetRepository] = true;
  }
  /*** Change page view type LAYOUT.LIST to LAYOUT.MODAL */
  await SharedPropsService.setConfig(
    ConfigTokens.IS_MF_FETCH_BACK_ALLOWED,
    true
  );
  /*** switch between assetRepositoryType */
  for (const assetRepositoryType of Object.keys(assetRepoMap)) {
    if (assetRepositoryType === AssetRepositoryType.KARVY) {
      await SharedPropsService.setAssetRepositoryType(AssetRepositoryType.CAMS);
    } else if (assetRepositoryType === AssetRepositoryType.CAMS) {
      await SharedPropsService.setAssetRepositoryType(
        AssetRepositoryType.KARVY
      );
    }
  }
  /*** disable pan edit option */
  await SharedPropsService.setConfig(ConfigTokens.IS_PAN_EDIT_ALLOWED, false);
  /*** Enable auto otp trigger when user lands on MF_Fetch */
  await SharedPropsService.setConfig(
    ConfigTokens.IS_MF_FETCH_AUTO_TRIGGER_OTP,
    true
  );
  /*** Go to re-fetch portfolio from other Asset Type **/
  await navigate(ROUTE.MF_FETCH_PORTFOLIO);
  /*** remove fetch more asset type option from UI */
  await removeGetMorePortfolio(
    {
      type: ACTION.REMOVE_GET_MORE_MF_PORTFOLIO,
      routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
      payload: {},
    },
    {},
    { navigate, ...props }
  );
};
export const removeGetMorePortfolio: ActionFunction<any> = async (
  action,
  _datastore,
  { removeWidgets }
): Promise<any> => {
  if (await isMorePortfolioRenderCheck()) {
    await removeWidgets(ROUTE.MF_PLEDGE_PORTFOLIO, [
      { id: "fetchMorePortfolioBtn", type: WIDGET.BUTTON },
    ]);
  }
};

export const ViewAllAction: ActionFunction<any> = async (
  action,
  _datastore,
  { setDatastore, appendWidgets, removeWidgets }
): Promise<any> => {
  console.warn("**** View All Action Triggered ****");
  await removeWidgets(ROUTE.MF_PLEDGE_PORTFOLIO, [
    { id: "chargesCard", type: WIDGET.CARD },
  ]);
  await appendWidgets(
    ROUTE.MF_PLEDGE_PORTFOLIO,
    {
      chargesCard2: <CardProps>{
        bgColor: ColorTokens.White,
        body: { widgetItems: [{ id: "chargesBody2", type: WIDGET.STACK }] },
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.spaceBetween,
      },
      chargesBody2: <StackProps>{
        width: StackWidth.FULL,
        type: StackType.column,
        widgetItems: [{ id: "processingChargeStack2", type: WIDGET.STACK }],
      },
      processingChargeStack2: <StackProps>{
        width: StackWidth.FULL,
        type: StackType.column,
        widgetItems: [
          { id: "charges2", type: WIDGET.TEXT },
          { id: "space21", type: WIDGET.SPACE },
          { id: "processingStack", type: WIDGET.STACK },
          { id: "space22", type: WIDGET.SPACE },
          { id: "interestP10k", type: WIDGET.STACK },
          { id: "space23", type: WIDGET.SPACE },
          { id: "durationStack", type: WIDGET.STACK },
          { id: "space24", type: WIDGET.SPACE },
        ],
      },
      charges2: <TypographyProps>{
        label: "Interest charges",
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "700",
        fontSize: FontSizeTokens.MD,
      },
      space21: <SpaceProps>{
        size: SizeTypeTokens.XL,
      },
      processingStack: <StackProps>{
        width: StackWidth.FULL,
        type: StackType.row,
        justifyContent: StackJustifyContent.spaceBetween,
        alignItems: StackAlignItems.center,
        widgetItems: [
          { id: "processingChargeText2", type: WIDGET.TEXT },
          { id: "processingChargeValue2", type: WIDGET.TEXT },
        ],
      },
      processingChargeText2: <TypographyProps>{
        label: "Processing fee",
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
        fontSize: FontSizeTokens.SM,
      },
      processingChargeValue2: <TypographyProps>{
        label: `₹${action.payload.processingFeesBreakUp['Processing Fee']}`,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "600",
        fontSize: FontSizeTokens.SM,
      },
      space22: <SpaceProps>{
        size: SizeTypeTokens.XL,
      },
      interestP10k: <StackProps>{
        width: StackWidth.FULL,
        type: StackType.row,
        justifyContent: StackJustifyContent.spaceBetween,
        alignItems: StackAlignItems.center,
        widgetItems: [
          { id: "interestP10KText", type: WIDGET.TEXT },
          { id: "interestP10KTextValue", type: WIDGET.TEXT },
        ],
      },
      interestP10KText: <TypographyProps>{
        label: "Interest per ₹10,000",
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
        fontSize: FontSizeTokens.SM,
      },
      interestP10KTextValue: <TypographyProps>{
        label: `₹${
          Math.ceil(((100 * action.payload.stepResponseObject.interestRate) / 12) * 100) / 100
        }/month`,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "600",
        fontSize: FontSizeTokens.SM,
      },
      space23: <SpaceProps>{
        size: SizeTypeTokens.XL,
      },
      durationStack: <StackProps>{
        width: StackWidth.FULL,
        type: StackType.row,
        justifyContent: StackJustifyContent.spaceBetween,
        alignItems: StackAlignItems.center,
        widgetItems: [
          { id: "durationText", type: WIDGET.TEXT },
          { id: "durationValue", type: WIDGET.TEXT },
        ],
      },
      durationText: <TypographyProps>{
        label: "Duration",
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
        fontSize: FontSizeTokens.SM,
      },
      durationValue: <TypographyProps>{
        label: "12 months",
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "600",
        fontSize: FontSizeTokens.SM,
      },
      space24: <SpaceProps>{
        size: SizeTypeTokens.XL,
      },
    },
    [
      {
        id: "chargesCard2",
        type: WIDGET.CARD,
        padding: {
          horizontal: -16,
          vertical: 0,
        },
      },
    ],
    "Mspace1"
  );
};

export const NavSliderAction: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await navigate(ROUTE.SET_CREDIT_LIMIT, {
    maxAmount: action.payload.maxAmount,
    updateAvailableCASMap: action.payload.updateAvailableCASMap,
    stepResponseObject: action.payload.stepResponseObject,
  });
};

export const NavToContactUs: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  navigate(ROUTE.CONTACT_US);
};
