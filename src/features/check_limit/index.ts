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
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  IconTokens,
  ListItemProps,
  SizeTypeTokens,
  SpaceProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { ACTION, FetchPortfolioPayload, PanEditPayload } from "./types";
import {
  editEmailId,
  editMobileNumber,
  editPanNumber,
  fetchMyPortfolio,
} from "./actions";
import { User } from "../otp_verify/types";
import { StoreKey } from "../../configs/api";

export const template: (
  applicationId: string,
  panNumber: string,
  phoneNumber: string,
  emailId: string
) => TemplateSchema = (applicationId, panNumber, phoneNumber, emailId) => {
  return {
    layout: <Layout>{
      id: ROUTE.MF_PLEDGING,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "space0", type: WIDGET.SPACE },
        { id: "title", type: WIDGET.TEXT },
        { id: "space1", type: WIDGET.SPACE },
        { id: "subTitle", type: WIDGET.TEXT },
        { id: "space2", type: WIDGET.SPACE },
        { id: "panItem", type: WIDGET.LIST_ITEM },
        { id: "mobileItem", type: WIDGET.LIST_ITEM },
        { id: "emailItem", type: WIDGET.LIST_ITEM },
        {
          id: "fetchCTA",
          type: WIDGET.BUTTON,
          position: POSITION.ABSOLUTE_BOTTOM,
        },
      ],
    },
    datastore: <Datastore>{
      space0: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
      title: <TypographyProps>{
        label: "Check available cash limit",
        fontSize: FontSizeTokens.XL,
        color: ColorTokens.Grey_Night,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "700",
      },
      subTitle: <TypographyProps>{
        label: "PAN is used to check your approved limit",
        color: ColorTokens.Grey_Charcoal,
        fontWeight: "400",
        fontSize: FontSizeTokens.SM,
      },

      space1: <SpaceProps>{ size: SizeTypeTokens.SM },
      space2: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      panItem: <ListItemProps & WidgetProps>{
        title: "PAN Number",
        subTitle: panNumber,
        leadIconName: IconTokens.CreditCard,
        trailIconName: IconTokens.Edit,
        action: {
          routeId: ROUTE.MF_PLEDGING,
          type: ACTION.EDIT_PAN,
          payload: <PanEditPayload>{
            applicationId,
            targetRoute: ROUTE.MF_PLEDGING,
            panNumber: panNumber,
          },
        },
      },
      mobileItem: <ListItemProps & WidgetProps>{
        title: "Mobile Number",
        subTitle: phoneNumber,
        leadIconName: IconTokens.Phone,
        trailIconName: IconTokens.Edit,
        action: {
          type: ACTION.EDIT_MOBILE_NUMBER,
          routeId: ROUTE.MF_PLEDGING,
          payload: { targetWidgetId: "mobileItem" },
        },
      },
      emailItem: <ListItemProps & WidgetProps>{
        title: "Email ID",
        subTitle: emailId,
        leadIconName: IconTokens.Email,
        trailIconName: IconTokens.Edit,
        action: {
          type: ACTION.EDIT_EMAIL,
          routeId: ROUTE.MF_PLEDGING,
          payload: { targetWidgetId: "emailItem" },
        },
      },
      fetchCTA: <ButtonProps & WidgetProps>{
        label: "Fetch my portfolio",
        width: ButtonWidthTypeToken.FULL,
        type: ButtonTypeTokens.LargeFilled,
        action: {
          routeId: ROUTE.MF_PLEDGING,
          type: ACTION.FETCH_MY_PORTFOLIO,
          payload: <FetchPortfolioPayload>{
            applicationId,
            emailId,
            phoneNumber,
            panNumber,
            assetRepository: "KARVY",
          },
        },
      },
    },
  };
};

export const checkLimitMF: PageType<any> = {
  onLoad: async (
    { asyncStorage },
    { applicationId, email, panNumber, mobileNumber }
  ) => {
    const user: User = await asyncStorage
      .get(StoreKey.userContext)
      .then((response) => JSON.parse(response));
    const panNumberX =
      panNumber || user.linkedBorrowerAccounts[0].accountHolderPAN;
    const phoneNumber =
      mobileNumber || user.linkedBorrowerAccounts[0].accountHolderPhoneNumber;
    const emailId = email || user.linkedBorrowerAccounts[0].accountHolderEmail;
    if (!applicationId) {
      applicationId = applicationId || user.linkedApplications[0].applicationId;
    }

    return Promise.resolve(
      template(applicationId, panNumberX, phoneNumber, emailId)
    );
  },
  actions: {
    [ACTION.FETCH_MY_PORTFOLIO]: fetchMyPortfolio,
    [ACTION.EDIT_PAN]: editPanNumber,
    [ACTION.EDIT_MOBILE_NUMBER]: editMobileNumber,
    [ACTION.EDIT_EMAIL]: editEmailId,
    [ACTION.EDIT_PAN]: editPanNumber,
  },
};
