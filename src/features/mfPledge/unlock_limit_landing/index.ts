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
  AmountCardProps,
  AspectRatioToken,
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  CardProps,
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  LottieProps,
  LottieSizeTokens,
  LottieTokens,
  ShadowTypeTokens,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION, LimitPayload } from "./types";
import { continueLimit } from "./actions";
import { fetchPledgeLimitRepo } from "./repo";
import { roundDownToNearestHundred } from "../../../configs/utils";
import { commonTemplates } from "../../../configs/common";

export const template: (availableCreditAmount: number) => TemplateSchema = (
  availableCreditAmount
) => ({
  layout: <Layout>{
    id: ROUTE.UNLOCK_LIMIT_LANDING,
    type: LAYOUTS.LIST,
    widgets: [
      {
        id: "lottie",
        type: WIDGET.LOTTIE,
        position: POSITION.ABSOLUTE_CENTER,
      },
      { id: "space0", type: WIDGET.SPACE },
      { id: "space1", type: WIDGET.SPACE },
      { id: "welcomeStack", type: WIDGET.STACK },
      { id: "space2", type: WIDGET.SPACE },
      { id: "amount", type: WIDGET.AMOUNTCARD },
      {
        id: "cardItem",
        type: WIDGET.CARD,
        position: POSITION.ABSOLUTE_BOTTOM,
      },
      commonTemplates.poweredBy.widgetItem,
    ],
  },
  datastore: <Datastore>{
    ...commonTemplates.poweredBy.datastore,
    lottie: <LottieProps>{
      uri: LottieTokens.Confetti,
      size: LottieSizeTokens.FULL,
      autoplay: true,
      loop: true,
    },
    space0: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
    space1: <SpaceProps>{ size: SizeTypeTokens.XXXXXL },
    welcomeStack: <StackProps>{
      type: StackType.column,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.center,
      widgetItems: [
        { id: "greetingText", type: WIDGET.TEXT },
        { id: "infoText", type: WIDGET.TEXT },
      ],
    },
    greetingText: <TypographyProps>{
      label: "Congratulations!",
      fontSize: FontSizeTokens.SM,
      lineHeight: 24,
      color: ColorTokens.Grey_Night,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "600",
    },
    infoText: <TypographyProps>{
      label: "We have evaluated your portfolio",
      fontSize: FontSizeTokens.SM,
      lineHeight: 24,
      color: ColorTokens.Grey_Night,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "600",
    },
    space2: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    amount: <AmountCardProps>{
      title: "Approved cash limit",
      shadow: ShadowTypeTokens.E5,
      subTitle: `${roundDownToNearestHundred(availableCreditAmount)}`.replace(
        /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
        ","
      ),
      chipText: "",
      type: "default",
    },
    cardItem: <CardProps>{
      bgColor: ColorTokens.White,
      padding: {},
      body: {
        widgetItems: [
          { id: "unlockItem", type: WIDGET.BUTTON },
          { id: "space3", type: WIDGET.SPACE },
          // { id: "portfolioItem", type: WIDGET.BUTTON },
          // { id: "space4", type: WIDGET.SPACE },
        ],
      },
    },
    unlockItem: <ButtonProps & WidgetProps>{
      label: "Continue",
      fontFamily: FontFamilyTokens.Inter,
      type: ButtonTypeTokens.LargeFilled,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.UNLOCK_LIMIT,
        payload: <LimitPayload>{
          value: {},
          widgetId: "continue",
          isResend: false,
        },
        routeId: ROUTE.UNLOCK_LIMIT_LANDING,
      },
    },
    space3: <SpaceProps>{ size: SizeTypeTokens.XL },
    portfolioItem: <ButtonProps & WidgetProps>{
      label: "Add more portfolio",
      fontFamily: FontFamilyTokens.Inter,
      type: ButtonTypeTokens.LargeOutline,
      width: ButtonWidthTypeToken.FULL,
      labelColor: ColorTokens.Primary_100,
      action: {
        type: ACTION.MODIFY_LIMIT,
        payload: <{}>{
          value: {},
          widgetId: "continue",
          isResend: false,
        },
        routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
      },
    },
    space4: <SpaceProps>{ size: SizeTypeTokens.XXXL },
  },
});

export const unlockLimitLandingMF: PageType<any> = {
  onLoad: async ({ network }, { response }) => {
    const responseX = response ? response.data : await fetchPledgeLimitRepo();
    const availableCreditAmount: number =
      responseX.stepResponseObject.availableCreditAmount || 0;
    return Promise.resolve(template(availableCreditAmount));
  },

  actions: {
    [ACTION.UNLOCK_LIMIT]: continueLimit,
  },
};
