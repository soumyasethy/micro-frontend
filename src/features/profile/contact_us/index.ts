import { Linking } from "react-native";
import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  POSITION,
  TemplateSchema,
} from "@voltmoney/types";
import _ from "lodash";
import {
  BorderRadiusTokens,
  CardProps,
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  HeaderProps,
  IconTokens,
  ListItemProps,
  ShadowTypeTokens,
  SizeTypeTokens,
  SpaceProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION } from "./types";
import { goBack } from "./actions";
export const template: () => TemplateSchema = () => {
  return {
    layout: <Layout>{
      id: ROUTE.CONTACT_US,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "header", type: WIDGET.HEADER, position: POSITION.FIXED_TOP },
        { id: "topSpace", type: WIDGET.SPACE },
        { id: "info", type: WIDGET.TEXT },
        { id: "space0", type: WIDGET.SPACE },
        {
          id: "whatsappCard",
          type: WIDGET.CARD,
        },
        { id: "space1", type: WIDGET.SPACE },
        {
          id: "callCard",
          type: WIDGET.CARD,
        },
        { id: "space2", type: WIDGET.SPACE },
        {
          id: "emailCard",
          type: WIDGET.CARD,
        },
      ],
    },
    datastore: <Datastore>{
      header: <HeaderProps>{
        title: "Contact us",
        leadIcon: "https://reactnative.dev/img/tiny_logo.png",
        isBackButton: true,
        type: "DEFAULT",
        action: {
          type: ACTION.BACK_BUTTON,
          payload: <{}>{
            value: "",
            widgetId: "continue",
            isResend: false,
          },
          routeId: ROUTE.CONTACT_US,
        },
      },
      topSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
      info: <TypographyProps>{
        label:
          "We would love to hear from you. You can get back to us via Call, Email or WhatsApp.",
        color: ColorTokens.Grey_Night,
        fontSize: FontSizeTokens.SM,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
      },
      space0: <SpaceProps>{ size: SizeTypeTokens.XL },
      whatsappCard: <CardProps>{
        bgColor: ColorTokens.White,
        borderColor: ColorTokens.Primary_05,
        borderWidth: 1,
        borderRadius: BorderRadiusTokens.BR2,
        shadow: ShadowTypeTokens.E2,
        body: {
          widgetItems: [{ id: "list1", type: WIDGET.LIST_ITEM }],
        },
      },
      list1: <ListItemProps>{
        customTitle: <TypographyProps>{
          label: "WhatsApp",
          color: ColorTokens.Grey_Night,
          fontFamily: FontFamilyTokens.Inter,
          fontWeight: "600",
          fontSize: FontSizeTokens.SM,
        },
        customSubTitle: <TypographyProps>{
          label: "Ask your queries anytime",
          color: ColorTokens.Grey_Charcoal,
          fontFamily: FontFamilyTokens.Inter,
          fontWeight: "400",
          fontSize: FontSizeTokens.XS,
        },
        isDivider: false,
        title: "WhatsApp",
        leadIconName: IconTokens.Whatsapp,
        onPress: () => {
          Linking.openURL("https://wa.me/919611749097"); // whatsapp://send?phone=919611749097
        },
      },
      space1: <SpaceProps>{ size: SizeTypeTokens.XL },
      callCard: <CardProps>{
        bgColor: ColorTokens.White,
        borderWidth: 1,
        borderColor: ColorTokens.Primary_05,
        borderRadius: BorderRadiusTokens.BR2,
        shadow: ShadowTypeTokens.E2,
        body: {
          widgetItems: [
            // { id: "imageOrder1", type: WIDGET.STACK },
            { id: "list2", type: WIDGET.LIST_ITEM },
          ],
        },
      },
      list2: <ListItemProps>{
        customTitle: <TypographyProps>{
          label: "Call",
          color: ColorTokens.Grey_Night,
          fontFamily: FontFamilyTokens.Inter,
          fontWeight: "600",
          fontSize: FontSizeTokens.SM,
        },
        customSubTitle: <TypographyProps>{
          label:
            "Call us at +91 96117-49097. We are available in working days from 9.30 AM to 6.30 PM",
          color: ColorTokens.Grey_Charcoal,
          fontFamily: FontFamilyTokens.Inter,
          fontWeight: "400",
          fontSize: FontSizeTokens.XS,
        },
        isDivider: false,
        title: "Call",
        leadIconName: IconTokens.Phone,
        onPress: () => {
          Linking.openURL(`tel:+919611749097`);
        },
      },

      space2: <SpaceProps>{ size: SizeTypeTokens.XL },
      emailCard: <CardProps>{
        bgColor: ColorTokens.White,
        borderRadius: BorderRadiusTokens.BR2,
        borderWidth: 1,
        borderColor: ColorTokens.Primary_05,
        shadow: ShadowTypeTokens.E2,
        body: {
          widgetItems: [{ id: "list3", type: WIDGET.LIST_ITEM }],
        },
      },
      list3: <ListItemProps>{
        customTitle: <TypographyProps>{
          label: "Email",
          color: ColorTokens.Grey_Night,
          fontFamily: FontFamilyTokens.Inter,
          fontWeight: "600",
          fontSize: FontSizeTokens.SM,
        },
        customSubTitle: <TypographyProps>{
          label: "Email us at support@voltmoney.in",
          color: ColorTokens.Grey_Charcoal,
          fontFamily: FontFamilyTokens.Inter,
          fontWeight: "400",
          fontSize: FontSizeTokens.XS,
        },
        isDivider: false,
        title: "Email",
        subTitle: "Email us at support@voltmoney.in",
        leadIconName: IconTokens.Email,
        onPress: () => {
          Linking.openURL("mailto:support@voltmoney.in");
        },
      },
    },
  };
};

export const contactUsMF: PageType<any> = {
  onLoad: async () => {
    return Promise.resolve(template());
  },

  actions: {
    [ACTION.BACK_BUTTON]: goBack,
  },
  bgColor: "#FFFFFF",
};
