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
  BottomTabProps,
  BottomTabStateToken,
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  CardProps,
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  HeaderProps,
  HeaderTypeTokens,
  IconAlignmentTokens,
  IconSizeTokens,
  IconTokens,
  ShadowTypeTokens,
  SizeTypeTokens,
  SpaceProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION, NavPayload, transactionPayload } from "./types";
import { getURL, goBack, navigation } from "./actions";
import SharedPropsService from "../../../SharedPropsService";

export const template: (creditStatus: string) => TemplateSchema = (
  creditStatus
) => {
  return {
    layout: <Layout>{
      id: ROUTE.TRANSACTIONS,
      type: LAYOUTS.LIST,
      widgets: [
        {
          id: "headerStack",
          type: WIDGET.HEADER,
          position: POSITION.ABSOLUTE_TOP,
        },
        { id: "headSpace", type: WIDGET.SPACE },
        { id: "title", type: WIDGET.TEXT },
        { id: "titleSpace", type: WIDGET.SPACE },
        { id: "subTitle", type: WIDGET.TEXT },
        { id: "subTitleSpace", type: WIDGET.SPACE },
        // { id: "input", type: WIDGET.INPUT },
        // { id: "inputSpace", type: WIDGET.SPACE },
        // { id: "toInput", type: WIDGET.INPUT },
        // { id: "toInputSpace", type: WIDGET.SPACE },
        { id: "continue", type: WIDGET.BUTTON },
        // {
        //     id: "bottomNav",
        //     type: WIDGET.BOTTOMTAB,
        //     position: POSITION.STICKY_BOTTOM,
        //     padding: {
        //       bottom: 0,
        //       left: 0,
        //       right: 0,
        //     },
        //   },
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
      headerStack: <HeaderProps>{
        title: "Transactions",
        leadIcon: "https://reactnative.dev/img/tiny_logo.png",
        isBackButton: false,
        type: HeaderTypeTokens.DEFAULT,
      },
      headSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
      title: <TypographyProps>{
        label: "Get transactions Pdf",
        fontSize: FontSizeTokens.MD,
        lineHeight: 24,
        color: ColorTokens.Grey_Night,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "700",
      },

      titleSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
      subTitle: <TypographyProps>{
        label: "This pdf will be send to your email address",
        fontSize: FontSizeTokens.SM,
        lineHeight: 24,
        color: ColorTokens.Grey_Charcoal,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
      },

      subTitleSpace: <SpaceProps>{ size: SizeTypeTokens.Size32 },
      // input: <TextInputProps & WidgetProps>{
      //     type: InputTypeToken.CALENDAR,
      //     state: InputStateToken.DEFAULT,
      //     placeholder: "From",
      //     title: "",
      //     caption: { success: "", error: "" },
      //     keyboardType: KeyboardTypeToken.numberPad,
      //     action: {
      //         type: ACTION.EMAIL,
      //         //payload: <PhoneNumberPayload>{ value: "", widgetId: "input" },
      //         routeId: ROUTE.TRANSACTIONS,
      //     },
      // },
      inputSpace: <SpaceProps>{ size: SizeTypeTokens.XXL },
      // toInput: <TextInputProps & WidgetProps>{
      //     type: InputTypeToken.CALENDAR,
      //     state: InputStateToken.DEFAULT,
      //     placeholder: "To",
      //     title: "",
      //     caption: { success: "", error: "" },
      //     keyboardType: KeyboardTypeToken.numberPad,
      //     action: {
      //         type: ACTION.EMAIL,
      //         //payload: <PhoneNumberPayload>{ value: "", widgetId: "input" },
      //         routeId: ROUTE.TRANSACTIONS,
      //     },
      // },
      toInputSpace: <SpaceProps>{ size: SizeTypeTokens.XXL },
      continue: <ButtonProps & WidgetProps>{
        label: "Email statement",
        labelColor:
          creditStatus === "PENDING_DISBURSAL_APPROVAL"
            ? ColorTokens.Grey_Charcoal
            : ColorTokens.White,
        fontFamily: FontFamilyTokens.Poppins,
        type:
          creditStatus === "PENDING_DISBURSAL_APPROVAL"
            ? ButtonTypeTokens.LargeOutline
            : ButtonTypeTokens.LargeFilled,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: ACTION.EMAIL,
          payload: <transactionPayload>{
            value: "",
            widgetId: "continue",
            isResend: false,
          },
          routeId: ROUTE.TRANSACTIONS,
        },
      },
      cardNav: <CardProps>{
        shadow: ShadowTypeTokens.E6,
        padding: {
          top: SizeTypeTokens.Size10,
          bottom: SizeTypeTokens.MD,
        },
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
        action: {
          type: ACTION.NAVIGATION,
          payload: <NavPayload>{
            // value: 'dashboard',
          },
          routeId: ROUTE.TRANSACTIONS,
        },
        data: [
          {
            id: "1",
            title: "My Account",
            status: BottomTabStateToken.NOT_SELECTED,
            icon: {
              name: IconTokens.NOTSELCTEDCHART,
              size: IconSizeTokens.XL,
              align: IconAlignmentTokens.left,
              color: ColorTokens.Primary_100,
            },
          },
          {
            id: "2",
            title: "Transactions",
            status: BottomTabStateToken.SELECTED,
            icon: {
              name: IconTokens.TransactionNotSelected,
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
          // {
          //   id: "4",
          //   title: "Refer & Earn",
          //   status: BottomTabStateToken.NOT_SELECTED,
          //   icon: {
          //     name: IconTokens.GiftOutline,
          //     size: IconSizeTokens.XL,
          //     align: IconAlignmentTokens.left,
          //   },
          // },
        ],
      },
    },
  };
};

export const transactionsMF: PageType<any> = {
  onLoad: async (_) => {
    const creditStatus = await SharedPropsService.getCreditStatus();
    return Promise.resolve(template(creditStatus));
  },
  actions: {
    [ACTION.EMAIL]: getURL,
    [ACTION.NAVIGATION]: navigation,
    [ACTION.MENU]: goBack,
  },
};
