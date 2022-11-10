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
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  HeaderProps,
  IconAlignmentTokens,
  IconTokens,
  PromoCardProps,
  SizeTypeTokens,
  SpaceProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import {
  ACTION,
  AvailableCASItem,
  LimitPayload,
} from "./types";
import { continueLimit, modifyLimit } from "./actions";
import { fetchPledgeLimitRepo } from "./repo";

export const template: (
  availableCreditAmount: number, availableCAS: AvailableCASItem[], stepResponseObject
) => TemplateSchema = (availableCreditAmount, availableCAS, stepResponseObject) => ({
  layout: <Layout>{
    id: ROUTE.MF_PLEDGING_PORTFOLIO,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "header", type: WIDGET.HEADER, position: POSITION.FIXED_TOP },
      { id: "space0", type: WIDGET.SPACE },
      { id: "amount", type: WIDGET.AMOUNTCARD },
      { id: "space1", type: WIDGET.SPACE },
      {
        id: "continue",
        type: WIDGET.BUTTON,
      },
      { id: "space2", type: WIDGET.SPACE },
      {
        id: "modify",
        type: WIDGET.BUTTON
      },
      { id: "space3", type: WIDGET.SPACE },
      { id: "promo", type: WIDGET.PROMOCARD },

    ],
  },
  datastore: <Datastore>{
    header: <HeaderProps>{
      title: 'Unlock limit',
      leadIcon: 'https://reactnative.dev/img/tiny_logo.png',
      isBackButton: false,
      trailIcon: 'Account',
      type: 'DEFAULT'
    },
    space0: <SpaceProps>{ size: SizeTypeTokens.LG },
    amount: <AmountCardProps>{
      title: 'Approved Cash List',
      subTitle: `${availableCreditAmount}`,
      chipText: 'How?',
      type: 'default'
    },
    space1: <SpaceProps>{ size: SizeTypeTokens.LG },
    continue: <ButtonProps & WidgetProps>{
      label: "Unlock Limit",
      type: ButtonTypeTokens.LargeFilled,
      icon: {
        name: IconTokens.Clock,
        align: IconAlignmentTokens.left,
      },
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.UNLOCK_LIMIT,
        payload: <LimitPayload>{
          value: stepResponseObject,
          widgetId: "continue",
          isResend: false,
        },
        routeId: ROUTE.MF_PLEDGING_PORTFOLIO,
      },
    },
    space2: <SpaceProps>{ size: SizeTypeTokens.XL },
    modify: <ButtonProps & WidgetProps>{
      label: "Modify Limit",
      type: ButtonTypeTokens.LargeGhost,
      width: ButtonWidthTypeToken.FULL,
      icon: {
        name: IconTokens.ChervonDownRight,
        align: IconAlignmentTokens.right,
      },
      action: {
        type: ACTION.MODIFY_LIMIT,
        payload: <{}>{
          value: "",
          widgetId: "continue",
          isResend: false,
        },
        routeId: ROUTE.PHONE_NUMBER,
      },
    },
    space3: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
    promo: <PromoCardProps>{
      data: [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'No Usage , no Interest',
          subTitle: 'Pay interest only on the borrow amount',
          image: 'https://dev.files.bluelearn.in/STUDENT_PROFILE/AVATARS/MALE/2022-05-05T13%3A21%3A02%2B05%3A30-328.png'
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Instant Money Transfer',
          subTitle: 'Pay interest only on the borrow amount',
          image: 'https://dev.files.bluelearn.in/STUDENT_PROFILE/AVATARS/MALE/2022-05-05T13%3A21%3A02%2B05%3A30-328.png'
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Limit Top-up , No Paper Work',
          subTitle: 'Pay interest only on the borrow amount',
          image: 'https://dev.files.bluelearn.in/STUDENT_PROFILE/AVATARS/MALE/2022-05-05T13%3A21%3A02%2B05%3A30-328.png'
        },
      ],
      heading: 'Why Volt?'
    },

  },
});




export const unlockLimitMF: PageType<any> = {
  onLoad: async () => {
    const response = await fetchPledgeLimitRepo();
    const availableCreditAmount: number = response.stepResponseObject.availableCreditAmount || 0;
    const availableCAS: AvailableCASItem[] = response.stepResponseObject.availableCAS || [];
    const stepResponseObject = response.stepResponseObject;
    return Promise.resolve(template(availableCreditAmount, availableCAS, stepResponseObject));
  },

  actions: {
    [ACTION.UNLOCK_LIMIT]: continueLimit,
    [ACTION.MODIFY_LIMIT]: modifyLimit,
  },
};
