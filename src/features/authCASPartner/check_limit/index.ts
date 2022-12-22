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
  HeaderProps,
  HeaderTypeTokens,
  IconTokens,
  ListItemProps,
  SizeTypeTokens,
  SpaceProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION, FetchPortfolioPayload, InputPayload, PanEditPayload } from "./types";
import {
  editEmailId,
  editMobileNumber,
  editPanNumber,
  fetchMyPortfolio,
  goBack,
} from "./actions";
import { User } from "../../login/otp_verify/types";
import SharedPropsService from "../../../SharedPropsService";
import { AssetRepositoryType, getAppHeader } from "../../../configs/config";
import { partnerApi } from "../../../configs/api";

export const template: (
  headTitle:string,
  panNumber: string,
  phoneNumber: string,
  emailId: string
) => TemplateSchema = (headTitle, panNumber, phoneNumber, emailId) => {
  return {
    layout: <Layout>{
      id: ROUTE.CHECK_PARTNER_LIMIT,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "header", type: WIDGET.HEADER,position:POSITION.ABSOLUTE_TOP },
        { id: "space0", type: WIDGET.SPACE },
        { id: "space1", type: WIDGET.SPACE },
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
      header: <HeaderProps & WidgetProps>{
        isBackButton: true,
        type: HeaderTypeTokens.DEFAULT,
        title: `Fetch From ${headTitle}`,
        action: {
            type: ACTION.GO_BACK,
            routeId: ROUTE.CHECK_PARTNER_LIMIT,
            payload: {},
        },
    },
    space0: <SpaceProps>{ size: SizeTypeTokens.SM },
    space1: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    
      panItem: <ListItemProps & WidgetProps>{
        title: "PAN Number",
        subTitle: panNumber,
        leadIconName: IconTokens.CreditCard,
       // trailIconName: IconTokens.Edit,
        subTitleLineHeight: 24,
        isDivider:true,
        // action: {
        //   routeId: ROUTE.MF_FETCH_PORTFOLIO,
        //   type: ACTION.EDIT_PAN,
        //   payload: <PanEditPayload>{
        //    // applicationId,
        //     targetRoute: ROUTE.MF_FETCH_PORTFOLIO,
        //     panNumber: panNumber,
        //   },
        // },
      },
      mobileItem: <ListItemProps & WidgetProps>{
        title: "Mobile Number",
        subTitle: `${phoneNumber}`.substring(3),
        leadIconName: IconTokens.Phone,
        trailIconName: IconTokens.Edit,
        subTitleLineHeight: 24,
        isDivider:true,
        action: {
          type: ACTION.EDIT_MOBILE_NUMBER,
          routeId: ROUTE.CHECK_PARTNER_LIMIT,
          payload: <InputPayload>{ value:`${phoneNumber}`,widgetId: "mobileItem" },
        },
      },
      emailItem: <ListItemProps & WidgetProps>{
        title: "Email",
        subTitle: emailId,
        leadIconName: IconTokens.Email,
        trailIconName: IconTokens.Edit,
        subTitleLineHeight: 24,
        isDivider:true,
        action: {
          type: ACTION.EDIT_EMAIL,
          routeId: ROUTE.CHECK_PARTNER_LIMIT,
          payload: <InputPayload>{ value:`${emailId}`,widgetId: "emailItem" },
        },
      },
      fetchCTA: <ButtonProps & WidgetProps>{
        label: "Verfiy by OTP",
        fontFamily: FontFamilyTokens.Inter,
        width: ButtonWidthTypeToken.FULL,
        type: ButtonTypeTokens.LargeFilled,
        action: {
          routeId: ROUTE.CHECK_PARTNER_LIMIT,
          type: ACTION.FETCH_MY_PORTFOLIO,
          payload: <FetchPortfolioPayload>{
            //applicationId,
            emailId,
            phoneNumber,
            panNumber,
            // assetRepository: "CAMS",
            assetRepository: AssetRepositoryType.DEFAULT,
          },
        },
      },
    },
  };
};

export const checkPartnerLimitMF: PageType<any> = {
  onLoad: async (
    { network },
    {headTitle}
  ) => {
    const userContextResponse = await network.post(partnerApi.userContext, {}, {
      headers: await getAppHeader(),
    });
    const user: User = userContextResponse.data;
 //  const accountId = "20ea8350-ba8c-4bd5-857d-1ee6ecdbafa7";
    const accountId = await SharedPropsService.getAccountId();
      const response = await network.get(
            `${partnerApi.userProfile}${accountId}`,
            { headers: await getAppHeader() }
        );
    console.log(headTitle);
    // const user: User = await SharedPropsService.getUser();
    // const panNumberX =
    //   panNumber || user.linkedBorrowerAccounts[0].accountHolderPAN;
    const phoneNumber = response.data.phoneNumber;
    const emailId = response.data.emailId.toLowerCase();
    const panNumber = response.data.panNumber;
    // const emailId = `${
    //   email || user.linkedBorrowerAccounts[0].accountHolderEmail
    // }`.toLowerCase();
    // if (!applicationId) {
    //   applicationId = applicationId || user.linkedApplications[0].applicationId;
    // }
    //const user: User = await SharedPropsService.getUser();


    return Promise.resolve(
      template(headTitle, panNumber, phoneNumber, emailId)
    );
  },
  actions: {
    [ACTION.FETCH_MY_PORTFOLIO]: fetchMyPortfolio,
    [ACTION.EDIT_PAN]: editPanNumber,
    [ACTION.EDIT_MOBILE_NUMBER]: editMobileNumber,
    [ACTION.EDIT_EMAIL]: editEmailId,
    [ACTION.EDIT_PAN]: editPanNumber,
    [ACTION.GO_BACK]: goBack,
  },
};
