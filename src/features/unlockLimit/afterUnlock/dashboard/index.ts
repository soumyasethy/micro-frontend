import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  POSITION,
  TemplateSchema,
  WidgetProps,
} from "@voltmoney/types";
import _ from "lodash";
import {
  AmountCardProps,
  AmountCardTypeTokens,
  BottomTabProps,
  BottomTabStateToken,
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  CardProps,
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  IconAlignmentTokens,
  IconSizeTokens,
  IconTokens,
  MessageProps,
  PaddingSizeTokens,
  PromoCardProps,
  RepaymentProps,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  StackWidth,
  TagProps,
  TagTypeTokens,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../../routes";
import { ACTION, CreditPayload, RepaymentPayload } from "./types";
import {
  goBack,
  OpenContactUS,
  OpenProfile,
  repayment,
  withdrawNow,
} from "./actions";
import { fetchUserDetails } from "./repo";
import { User } from "../../../login/otp_verify/types";
import SharedPropsService from "../../../../SharedPropsService";
import { api } from "../../../../configs/api";
import { getAppHeader } from "../../../../configs/config";

export const template: (
  availableCreditAmount: number,
  actualLoanAmount: number,
  repaymentAmount: number,
  isPendingDisbursalApproval: boolean,
  amountPercentage: number
) => TemplateSchema = (
  availableCreditAmount,
  actualLoanAmount,
  repaymentAmount,
  isPendingDisbursalApproval,
) => {
  // const _generateRepaymentDS =
  //   repaymentAmount > 0
  //     ? {
  //         repaymentCard: <CardProps>{
  //           bgColor: ColorTokens.White,
  //           body: {
  //             widgetItems: [
  //               {
  //                 id: "repaymentItem",
  //                 type: WIDGET.REPAYMENT,
                 
  //               },
  //             ],
  //           },
  //         },
  //       }
  //     : {};

      const _generateRepaymentDS =
    repaymentAmount > 0
      ? {
          repaymentStickyCard: <CardProps>{
            bgColor: ColorTokens.White,
            body: {
              widgetItems: [
                {
                  id: "repaymentItem",
                  type: WIDGET.REPAYMENT,
                 
                },
              ],
            },
          },
        }
      : {};
  return {
    layout: <Layout>{
      id: ROUTE.DASHBOARD,
      type: LAYOUTS.LIST,
      widgets: [
        {
          id: "card",
          type: WIDGET.CARD,
          position: POSITION.FIXED_TOP,
          padding: {
            horizontal: 16,
          },
        },
        ...(isPendingDisbursalApproval
          ? [
              {
                id: "message",
                type: WIDGET.MESSAGE,
                position: POSITION.FIXED_TOP,
                padding: {
                  horizontal: 16,
                },
              },
            ]
          : []),
        {
          id: "cardItem",
          type: WIDGET.CARD,
          padding: {
            horizontal: 0,
          },
        },
        ...(repaymentAmount > 0
          ? [
              {
                id: "repaymentStickyCard",
                type: WIDGET.CARD,
                padding: {
                  horizontal: 0,
                  all: 0,
                },
              },
              { id: "repaymentSpace", type: WIDGET.SPACE },
            ]
          : []),
        {
          id: "promoCard",
          type: WIDGET.CARD,
          padding: {
            horizontal: 0,
            all: 0,
          },
        },
        {
          id: "cardNav",
          type: WIDGET.CARD,
          position: POSITION.STICKY_BOTTOM,
          padding: {
            bottom: 0,
            left: 0,
            right: 0,
          },
        },
      ],
    },
    datastore: <Datastore>{
      card: <CardProps>{
        bgColor: ColorTokens.White,
        body: { widgetItems: [{ id: "header", type: WIDGET.STACK }] },
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.spaceBetween,
      },
      header: <StackProps>{
        width: StackWidth.FULL,
        type: StackType.row,
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.spaceBetween,
        padding: PaddingSizeTokens.LG,
        widgetItems: [
          { id: "title", type: WIDGET.TEXT },
          // { id: "leadIcon", type: WIDGET.BUTTON },
          { id: "headerRight", type: WIDGET.STACK },
        ],
      },
      headerRight: <StackProps>{
        type: StackType.row,
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.flexEnd,
        padding: PaddingSizeTokens.LG,
        widgetItems: [
          { id: "contactUs", type: WIDGET.TAG },
          { id: "contactUsSpace", type: WIDGET.SPACE },
          { id: "leadIcon", type: WIDGET.BUTTON },
        ],
      },
      contactUs: <TagProps & WidgetProps>{
        icon: {
          align: IconAlignmentTokens.left,
          name: IconTokens.Support,
          size: IconSizeTokens.XL,
        },
        label: "Contact us",
        labelColor: ColorTokens.Primary_100,
        type: TagTypeTokens.DEFAULT,
        bgColor: ColorTokens.Primary_05,
        action: {
          type: ACTION.CONTACT_US,
          routeId: ROUTE.DASHBOARD,
          payload: {},
        },
      },

      contactUsSpace: <SpaceProps>{ size: SizeTypeTokens.SM },
      title: <TypographyProps>{
        label: "My Account",
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
          name: IconTokens.Account,
          align: IconAlignmentTokens.right,
          size: IconSizeTokens.XXXXL,
        },
        action: {
          type: ACTION.PROFILE,
          payload: {},
          routeId: ROUTE.DASHBOARD,
        },
      },
      cardItem: <CardProps>{
        bgColor: ColorTokens.Primary_05,
        body: {
          widgetItems: [
            { id: "amountItem", type: WIDGET.AMOUNTCARD },
            { id: "cardSpace", type: WIDGET.SPACE },
            { id: "continue", type: WIDGET.BUTTON },
            { id: "continueSpace", type: WIDGET.SPACE },
            ...(repaymentAmount > 0
              ? [
                  {
                    id: "repaymentCard",
                    type: WIDGET.CARD,
                    padding: {
                      horizontal: 0,
                      all: 0,
                    },
                  },
                  { id: "repaymentSpace", type: WIDGET.SPACE },
                ]
              : []),
          ],
        },
      },
      message: <MessageProps>{
        label:
          "Your verification is in progress. Meanwhile you can’t withdraw the amount",
        labelColor: ColorTokens.Grey_Charcoal,
        bgColor: ColorTokens.System_Warning_BG,
        // actionIcon: <IconProps>{
        //   name: IconTokens.Cancel,
        //   size: IconSizeTokens.MD,
        //   color: ColorTokens.Grey_Night,
        // },
      },
      amountItem: <AmountCardProps>{
        title: "Available cash",
        subTitle: `${availableCreditAmount}`.replace(
          /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
          ","
        ),
        subscriptTitle:
          "out of ₹ " +
          `${actualLoanAmount}`.replace(
            /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
            ","
          ),
        progressLabel: `${Math.trunc(((availableCreditAmount/actualLoanAmount)*100))}`+ '% of total limit available',
        warning: "Recommended to use as per limit",
        chipText: "",
        type: AmountCardTypeTokens.wallet,
        progressFillPercentage: `${(
          (availableCreditAmount * 100) /
          actualLoanAmount
        )}%`,
      },
      cardSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
      continue: <ButtonProps & WidgetProps>{
        label: "Withdraw now",
        type: isPendingDisbursalApproval
          ? ButtonTypeTokens.LargeOutline
          : ButtonTypeTokens.LargeFilled,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: ACTION.DASHBOARD,
          payload: <CreditPayload>{
            value: availableCreditAmount,
            widgetId: "continue",
          },
          routeId: ROUTE.DASHBOARD,
        },
      },
      continueSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
      ..._generateRepaymentDS,
     
      repaymentItem: <RepaymentProps>{
        title: "Repayment",
        message: "Outstanding amount",
        amount: `${repaymentAmount}`.replace(
          /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
          ","
        ),
        btnText: "Flexi Pay",
        action: {
          type: ACTION.REPAYMENT,
          payload: <RepaymentPayload>{
            repaymentAmount: `${repaymentAmount}`,
          },
          routeId: ROUTE.DASHBOARD,
        },
      },
      repaymentSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
      promoCard: <CardProps>{
        bgColor: ColorTokens.White,
        body: {
          widgetItems: [{ id: "promoItem", type: WIDGET.PROMOCARD }],
        },
      },
      promoItem: <PromoCardProps>{
        data: [
          {
            id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
            title: "No usage, no interest",
            subTitle: "Pay interest only on the borrow amount",
            image:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOuSURBVHgBlVVdiBtVFP7uzcxssm6SadaudjWS+AObrSIt9cm/rlWXotIHoaCgFMQXfVlfKtpWC32oCtLYUvAH7GMriIqwyrKW1rrUF6Gt7o+0uJvuuu1uaJppOplkfm/vhM1kEia72Q9C7rn3nO8799yTE4I1wCbHH3BC9Hd3bcAYimR25rAO0LUcTLAE/0q5HwnSmcrMrymsA6sKHBmZk7/8bmDrciFSWNlKaWr32N73pt8aGbmQqvuxy6dfs6dPz9kzv33VykGCiLP7rj4VouQQX2537XSyjJ1PX/POv/65F7PXJchRe/SD1/OMAS97GTvkUbL5uam6LbSSH/tofh8cHPKLKyWxyefFbWVcmnUw/ITyEvPtM8Ms21X1Eb6cCrzB0QPzJ/jGnlbR+/o07Hp+EavB0bQaGw1HYNns1a7HXvih6QbH9i98zHPYExSckA2sBdrd3TBERLz9Wub75x8CYQfbBd9/r4aOwF+DVTSF3i6/rf8znvEEKCXfrha3aWMVncDRdZ69KNOenmcFge5194SjBxa3MGY/ExggUiTCOsJddif8vP5h1G/iGMZyTYAxZxdpbVZuF9NRFB+Oo7eyiHXBceCUVZCu8PvW9Hg/DRG21X9uxiUsPHkPCgMyHIHgYqwfN51w5wKUgkZjIJLEl6E0dRjbVLtViMB4PA79lT44CakhyChOaoNYLwgjEzojb1BenoQjS6gM93GBGM+AIBZtdv7PknFOT3ZEbFoEZy9Gl8jkje2RzFBO0LdtmDQHow/6ncQQ0MPbWvV151g1jc3iDfTSSlvyhbyI78/KWCoK/+7I7q51BjUz0bkgZ1dA9E2IChNwSssEEusmxeifcRz/8W4sFwXeIyRXP6Pc+gltEO9ptv2l0qohXMtHcHXxLpwcTeKPvxu/ZErYWH0txP7HX6UkFDDIrQJCm1KxWRNTFxoPVTYtb807PPfpkcFTnti7Q0QlFj5EGwSVauJWv2e70/SW0ZhVhJBv/PHeT+zwFXYGK/O/FRZ/roLCnQ2GxBUFck71zhQ+HkqG6WX/WXYw7Y/1/tGkKt7k6eSCBNxSbVB1JCeWmshLPHM/OX/QodbYpiFxeIalEMIvfNdrFzdr6ZICcUZtCizpBpSV0nDiy5xo+JNsJreqQEPIPshb4Z1Q3tjYdf4mqNp4RNNhKFarqNq1Nlf4gP7CgpHNZrcoQVyBAi4+P15IikulHbynd9uMDFQsO62ZJie28jzsPI88ZzL9RDviOu4A5zhsmkEc0QAAAAAASUVORK5CYII=",
          },
          {
            id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
            title: "Instant money transfer",
            subTitle: "Pay interest only on the borrow amount",
            image:
              "data:image/png;base64,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",
          },
          {
            id: "58694a0f-3da1-471f-bd96-145571e29d72",
            title: "Limit Top-up, no paperwork",
            subTitle: "Pay interest only on the borrow amount",
            image:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOuSURBVHgBlVVdiBtVFP7uzcxssm6SadaudjWS+AObrSIt9cm/rlWXotIHoaCgFMQXfVlfKtpWC32oCtLYUvAH7GMriIqwyrKW1rrUF6Gt7o+0uJvuuu1uaJppOplkfm/vhM1kEia72Q9C7rn3nO8799yTE4I1wCbHH3BC9Hd3bcAYimR25rAO0LUcTLAE/0q5HwnSmcrMrymsA6sKHBmZk7/8bmDrciFSWNlKaWr32N73pt8aGbmQqvuxy6dfs6dPz9kzv33VykGCiLP7rj4VouQQX2537XSyjJ1PX/POv/65F7PXJchRe/SD1/OMAS97GTvkUbL5uam6LbSSH/tofh8cHPKLKyWxyefFbWVcmnUw/ITyEvPtM8Ms21X1Eb6cCrzB0QPzJ/jGnlbR+/o07Hp+EavB0bQaGw1HYNns1a7HXvih6QbH9i98zHPYExSckA2sBdrd3TBERLz9Wub75x8CYQfbBd9/r4aOwF+DVTSF3i6/rf8znvEEKCXfrha3aWMVncDRdZ69KNOenmcFge5194SjBxa3MGY/ExggUiTCOsJddif8vP5h1G/iGMZyTYAxZxdpbVZuF9NRFB+Oo7eyiHXBceCUVZCu8PvW9Hg/DRG21X9uxiUsPHkPCgMyHIHgYqwfN51w5wKUgkZjIJLEl6E0dRjbVLtViMB4PA79lT44CakhyChOaoNYLwgjEzojb1BenoQjS6gM93GBGM+AIBZtdv7PknFOT3ZEbFoEZy9Gl8jkje2RzFBO0LdtmDQHow/6ncQQ0MPbWvV151g1jc3iDfTSSlvyhbyI78/KWCoK/+7I7q51BjUz0bkgZ1dA9E2IChNwSssEEusmxeifcRz/8W4sFwXeIyRXP6Pc+gltEO9ptv2l0qohXMtHcHXxLpwcTeKPvxu/ZErYWH0txP7HX6UkFDDIrQJCm1KxWRNTFxoPVTYtb807PPfpkcFTnti7Q0QlFj5EGwSVauJWv2e70/SW0ZhVhJBv/PHeT+zwFXYGK/O/FRZ/roLCnQ2GxBUFck71zhQ+HkqG6WX/WXYw7Y/1/tGkKt7k6eSCBNxSbVB1JCeWmshLPHM/OX/QodbYpiFxeIalEMIvfNdrFzdr6ZICcUZtCizpBpSV0nDiy5xo+JNsJreqQEPIPshb4Z1Q3tjYdf4mqNp4RNNhKFarqNq1Nlf4gP7CgpHNZrcoQVyBAi4+P15IikulHbynd9uMDFQsO62ZJie28jzsPI88ZzL9RDviOu4A5zhsmkEc0QAAAAAASUVORK5CYII=",
          },
        ],
        heading: "Why Volt?",
      },
      cardNav: <CardProps>{
        bgColor: ColorTokens.White,
        body: {
          widgetItems: [
            {
              id: "bottomNav",
              type: WIDGET.BOTTOMTAB,
            },
          ],
        },
      },
      bottomNav: <BottomTabProps>{
        data: [
          {
            id: "1",
            title: "My Account",
            status: BottomTabStateToken.SELECTED,
            icon: {
              name: IconTokens.Chart,
              size: IconSizeTokens.XL,
              align: IconAlignmentTokens.left,
              color: ColorTokens.Primary_100,
            },
          },
          {
            id: "2",
            title: "Transactions",
            status: BottomTabStateToken.NOT_SELECTED,
            icon: {
              name: IconTokens.RuppeFile,
              size: IconSizeTokens.XL,
              align: IconAlignmentTokens.left,
            },
          },
          {
            id: "3",
            title: "Manage Limit",
            status: BottomTabStateToken.NOT_SELECTED,
            icon: {
              name: IconTokens.ManageLimit,
              size: IconSizeTokens.XL,
              align: IconAlignmentTokens.left,
            },
          },
          {
            id: "4",
            title: "Refer & Earn",
            status: BottomTabStateToken.NOT_SELECTED,
            icon: {
              name: IconTokens.GiftOutline,
              size: IconSizeTokens.XL,
              align: IconAlignmentTokens.left,
            },
          },
        ],
      },
    },
  };
};

export const dashboardMF: PageType<any> = {
  onLoad: async ({ network }) => {
    const userContextResponse = await network.post(
      api.userContext,
      {},
      { headers: await getAppHeader() }
    );
    const user: User = userContextResponse.data;
    const availableCreditAmount: number = _.get(
      user,
      "linkedCredits[0].availableCreditAmount",
      0
    );
    const actualLoanAmount: number = _.get(
      user,
      "linkedCredits[0].actualLoanAmount",
      0
    );
    await SharedPropsService.setUser(user);
    let repaymentAmount = actualLoanAmount - availableCreditAmount;
    let isPendingDisbursalApproval =
      user.linkedCredits[0].creditStatus === "PENDING_DISBURSAL_APPROVAL";
     
    let amountPercentage =  Math.round((availableCreditAmount * 100) /actualLoanAmount);
      console.log("amountPercentage",amountPercentage);

    return Promise.resolve(
      template(
        availableCreditAmount,
        actualLoanAmount,
        repaymentAmount,
        isPendingDisbursalApproval,
        amountPercentage
      )
    );
  },

  actions: {
    [ACTION.DASHBOARD]: withdrawNow,
    [ACTION.REPAYMENT]: repayment,
    [ACTION.MENU]: goBack,
    [ACTION.PROFILE]: OpenProfile,
    [ACTION.CONTACT_US]: OpenContactUS,
  },
  bgColor: "#F3F5FC",
  clearPrevious: true,
};
