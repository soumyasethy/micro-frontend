import {
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  CardProps,
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  IconTokens,
  ListItemDataProps,
  ListProps,
  ListTypeTokens,
  PaddingProps,
  ShadowTypeTokens,
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
import {
  ACTION,
  CtaPayload,
  EditItemPayload,
  PortfolioTogglePayload,
} from "./types";
import { ROUTE } from "../../../routes";
import { getActualLimit, getPortfolioValue, getTotalLimit } from "./actions";
import { StepResponseObject } from "../unlock_limit/types";
import { Datastore, WidgetProps } from "@voltmoney/types";
import SharedPropsService from "../../../SharedPropsService";
import sharedPropsService from "../../../SharedPropsService";
import {
  addCommasToNumber,
  roundDownToNearestHundred,
} from "../../../configs/utils";
import { getDesiredValue } from "../portfolio_readonly/actions";

export const portfolioListDatastoreBuilderV2 = async (
  stepResponseObject: StepResponseObject,
  searchKeyword: string = ""
): Promise<Datastore> => {
  const selectedMap = {};
  const listItemDataProps: ListItemDataProps[] = [];
  const updateAvailableCASMap = await SharedPropsService.getAvailableCASMap();

  stepResponseObject.availableCAS.forEach((item, index) => {
    const key = `${item.isinNo}-${item.folioNo}`;
    selectedMap[index] = updateAvailableCASMap[key].pledgedUnits > 0;
    stepResponseObject.availableCAS[index] = updateAvailableCASMap[key];

    const title = `₹ ${addCommasToNumber(
      roundDownToNearestHundred(
        getTotalLimit(
          [updateAvailableCASMap[key]],
          stepResponseObject.isinNAVMap,
          stepResponseObject.isinLTVMap
        )
      )
    )}`;

    const subTitle = `/ ₹ ${addCommasToNumber(
      roundDownToNearestHundred(
        getActualLimit(
          [updateAvailableCASMap[key]],
          stepResponseObject.isinNAVMap,
          stepResponseObject.isinLTVMap
        )
      )
    )}`;

    const portfolioValue = `Value ${addCommasToNumber(
      roundDownToNearestHundred(
        getPortfolioValue(
          [updateAvailableCASMap[key]],
          stepResponseObject.isinNAVMap
        )
      )
    )}`;

    listItemDataProps.push({
      label: updateAvailableCASMap[key].schemeName,
      info: "",
      secondaryText: portfolioValue,
      trailIcon: {
        name:
          updateAvailableCASMap[key].pledgedUnits > 0
            ? IconTokens.CheckedSquare
            : IconTokens.NotCheckedSquare,
      },
      trailTitle: title,
      trailSubTitle: subTitle,
      action: "edit",
      trailIconAction: {
        type: ACTION.EDIT_ITEM,
        routeId: ROUTE.PORTFOLIO,
        payload: <EditItemPayload>{
          stepResponseObject,
          selectedMap: selectedMap,
        },
      },
    });
  });

  const props = <ListProps & WidgetProps>{
    type: ListTypeTokens.CHECKLIST,
    data: [
      ...listItemDataProps.filter((item) =>
        JSON.stringify(item.label.toUpperCase()).includes(
          searchKeyword.toUpperCase()
        )
      ),
    ],
    selectedMap: { ...selectedMap },
    action: {
      type: ACTION.TOGGLE_ITEM,
      routeId: ROUTE.PORTFOLIO,
      payload: <PortfolioTogglePayload>{
        stepResponseObject,
        selectedMap,
      },
    },
  };

  const datastoreObj: Datastore = {
    listItem: <ListProps & WidgetProps>props,
    /*
    totalItem: <CtaCardProps>{
      label: "Total credit limit",
      info: addCommasToNumber(
        roundDownToNearestHundred(
          getTotalLimit(
            stepResponseObject.availableCAS,
            stepResponseObject.isinNAVMap,
            stepResponseObject.isinLTVMap
          )
        )
      ),
      actionLabel: "Confirm amount and assets",
      action: {
        type: ACTION.PORTFOLIO,
        payload: <CtaPayload>{ value: stepResponseObject },
        routeId: ROUTE.PORTFOLIO,
      },
    },
    */
    totalItem: <StackProps>{
      type: StackType.column,
       alignItems: StackAlignItems.center,
       justifyContent: StackJustifyContent.center,
      padding: <PaddingProps>{
        vertical: SizeTypeTokens.XL,
      },
      widgetItems: [
        { id: "totalCreditLineCard", type: WIDGET.CARD },
        { id: "totalItemSpace0", type: WIDGET.SPACE },
        { id: "ContinueButtonStack", type: WIDGET.STACK },
        { id: "totalItemSpace1", type: WIDGET.SPACE },
      ],
    },
    ContinueButtonStack: <StackProps>{
      type: StackType.column,
      width: StackWidth.FULL,
      justifyContent: StackJustifyContent.center,
      alignItems: StackAlignItems.center,
      widgetItems: [{ id: "ContinueButton", type: WIDGET.BUTTON }],
    },
    totalItemSpace0: <SpaceProps>{ size: SizeTypeTokens.LG },
    totalItemSpace1: <SpaceProps>{ size: SizeTypeTokens.XL },
    totalCreditLineCard: <CardProps>{
      bgColor: ColorTokens.Primary_05,
      shadow:ShadowTypeTokens.E2,
      body: {
        widgetItems: [
          { id: "CardSpaceHeader", type: WIDGET.SPACE },
          { id: "totalCreditLimitText", type: WIDGET.TEXT },
          { id: "totalCreditLimitStack", type: WIDGET.STACK },
          { id: "CardSpaceFooter", type: WIDGET.SPACE },
        ],
      },
    },

    CardSpaceHeader: <SpaceProps>{ size: SizeTypeTokens.LG },
    CardSpaceFooter: <SpaceProps>{ size: SizeTypeTokens.LG },
    totalCreditLimitStack: <StackProps>{
      type: StackType.row,
      width:StackWidth.FULL,
      justifyContent: StackJustifyContent.spaceBetween,
      alignItems: StackAlignItems.flexEnd,
      widgetItems: [
        { id: "outOfTextStack", type: WIDGET.STACK },
        // { id: 'edit_button', type: WIDGET.BUTTON }
      ],
    },
    outOfTextStack: <StackProps>{
      type: StackType.row,
      width: StackWidth.CONTENT,
      alignItems: StackAlignItems.center,
      widgetItems: [
        { id: "outOfText1", type: WIDGET.TEXT },
        { id: "outOfText2", type: WIDGET.TEXT },
      ],
    },
    outOfText1: <TypographyProps>{
      label: `₹${addCommasToNumber(
        roundDownToNearestHundred(
          getTotalLimit(
            stepResponseObject.availableCAS,
            stepResponseObject.isinNAVMap,
            stepResponseObject.isinLTVMap
          )
        )
      )}`,
      fontWeight: "600",
      fontSize: FontSizeTokens.XL,
      color: ColorTokens.Grey_Night,
      lineHeight:28
    },
    outOfText2: <TypographyProps>{
      label: `/ ₹${addCommasToNumber(
        parseInt(stepResponseObject["availableCreditAmount"].toString())
      )}`,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
      fontSize: FontSizeTokens.XS,
      color: ColorTokens.Grey_Charcoal,
      lineHeight: 18
    },
    // edit_button: <ButtonProps>{
    //   type: ButtonTypeTokens.MediumGhost,
    //   label: "Edit",
    //   paddingHorizontal: SizeTypeTokens.NONE,
    //   paddingVertical: SizeTypeTokens.NONE,
    // },
    totalCreditLimitText: <TypographyProps>{
      label: "Selected credit limit",
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
      fontSize: FontSizeTokens.SM,
      color: ColorTokens.Grey_Night,
      lineHeight: 24
    },
    ContinueButton: <ButtonProps>{
      label: "Confirm amount and assets",
      type: ButtonTypeTokens.LargeFilled,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "700",
      fontSize: FontSizeTokens.SM,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.PORTFOLIO,
        payload: <CtaPayload>{ value: stepResponseObject },
        routeId: ROUTE.PORTFOLIO,
      },
    },
  };
  return datastoreObj;
};

export const togglePortfolio = async (
  index: number,
  isPledged: boolean,
  stepResponseObject: StepResponseObject
) => {
  const updateAvailableCASMap = await SharedPropsService.getAvailableCASMap();
  const item = stepResponseObject.availableCAS[index];
  const key = `${item.isinNo}-${item.folioNo}`;
  updateAvailableCASMap[key].pledgedUnits = isPledged
    ? updateAvailableCASMap[key].totalAvailableUnits
    : 0;
  await SharedPropsService.setAvailableCASMap(updateAvailableCASMap);
  await sharedPropsService.setCreditLimit(
    getTotalLimit(
      stepResponseObject.availableCAS,
      stepResponseObject.isinNAVMap,
      stepResponseObject.isinLTVMap
    )
  );
  const portValue = getDesiredValue(
    stepResponseObject.availableCAS,
    stepResponseObject.isinNAVMap
  );

  await SharedPropsService.setDesiredPortfolio(portValue);
  return updateAvailableCASMap;
};

export const customEditPortfolio = async (
  index: number,
  amount: number,
  stepResponseObject: StepResponseObject
) => {
  const updateAvailableCASMap = await SharedPropsService.getAvailableCASMap();
  const item = stepResponseObject.availableCAS[index];
  const key = `${item.isinNo}-${item.folioNo}`;

  updateAvailableCASMap[key].pledgedUnits =
    amount /
    (stepResponseObject.isinNAVMap[updateAvailableCASMap[key].isinNo] *
      stepResponseObject.isinLTVMap[updateAvailableCASMap[key].isinNo]);
  await SharedPropsService.setAvailableCASMap(updateAvailableCASMap);
};
