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
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  StackWidth,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import {ACTION, CtaPayload, EditItemPayload, PortfolioTogglePayload,} from "./types";
import {ROUTE} from "../../../routes";
import {getActualLimit, getPortfolioValue, getTotalLimit} from "./actions";
import {StepResponseObject} from "../unlock_limit/types";
import {Datastore, WidgetProps} from "@voltmoney/types";
import SharedPropsService from "../../../SharedPropsService";
import {addCommasToNumber, roundDownToNearestHundred,} from "../../../configs/utils";

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

    const portfolioValue = `Portfolio value ${addCommasToNumber(
        roundDownToNearestHundred(
            getPortfolioValue(
                [updateAvailableCASMap[key]],
                stepResponseObject.isinNAVMap,
            )
        )
    )}`

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
    totalItem: <StackProps> {
      type: StackType.column,
      widgetItems: [
        { id: 'totalCreditLineCard', type: WIDGET.CARD },
        { id: 'ContinueButtonStack', type: WIDGET.STACK }
      ]
    },
    ContinueButtonStack: <StackProps> {
      type: StackType.column,
      widgetItems: [
          { id: 'ContinueButton', type: WIDGET.BUTTON }
      ]
    },
    totalCreditLineCard: <CardProps> {
      bgColor: ColorTokens.Grey_Milk_1,
      width: '100%',
      body: {
        widgetItems: [
          { id: 'totalCreditLimitText', type: WIDGET.TEXT },
          { id: 'totalCreditLimitStack', type: WIDGET.STACK },
        ]
      }
    },
    totalCreditLimitStack: <StackProps>{
      type: StackType.row,
      justifyContent: StackJustifyContent.spaceBetween,
      alignItems: StackAlignItems.flexEnd,
      widgetItems: [
        { id: 'outOfTextStack', type: WIDGET.STACK },
        { id: 'edit_button', type: WIDGET.BUTTON }
      ]
    },
    outOfTextStack: <StackProps> {
      type: StackType.row,
      width: StackWidth.CONTENT,
      alignItems: StackAlignItems.center,
      widgetItems: [
        { id: 'outOfText1', type: WIDGET.TEXT },
        { id: 'outOfText2', type: WIDGET.TEXT },
      ]
    },
    outOfText1: <TypographyProps> {
      label: '₹30,00,000 ',
      fontFamily: FontFamilyTokens.Poppins,
      fontWeight: '600',
      fontSize: FontSizeTokens.XL,
      color: ColorTokens.Grey_Night,
    },
    outOfText2: <TypographyProps> {
      label: '/ ₹50,00,000',
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: '400',
      fontSize: FontSizeTokens.XS,
      color: ColorTokens.Grey_Charcoal,
    },
    edit_button: <ButtonProps> {
      type: ButtonTypeTokens.MediumGhost,
      label: 'Edit',
    },
    totalCreditLimitText: <TypographyProps> {
      label: 'Total credit limit',
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: '400',
      fontSize: FontSizeTokens.SM,
      color: ColorTokens.Grey_Night,
    },
    ContinueButton: <ButtonProps> {
      label: 'Confirm amount and assets',
      type: ButtonTypeTokens.LargeFilled,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.PORTFOLIO,
        payload: <CtaPayload>{ value: stepResponseObject },
        routeId: ROUTE.PORTFOLIO,
      },
    }
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
