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
import { ACTION, FetchPortfolioPayload, PanEditPayload } from "./types";
import {
  autoTriggerOtp,
  editEmailId,
  editMobileNumber,
  editPanNumber,
  fetchMyPortfolio,
  goBack,
} from "./actions";
import { User } from "../../login/otp_verify/types";
import SharedPropsService from "../../../SharedPropsService";
import { AssetRepositoryType, getAppHeader,ConfigTokens } from "../../../configs/config";
import { partnerApi } from "../../../configs/api";


export const template: (
  applicationId: string,
  panNumber: string,
  phoneNumber: string,
  emailId: string,
  headTitle: string,
  assetRepository: AssetRepositoryType,
  isPanEditAllowed: boolean
) => TemplateSchema = (
  applicationId,
  panNumber,
  phoneNumber,
  emailId,
  headTitle,
  assetRepository,
  isPanEditAllowed
) => {
  return {
    layout: <Layout>{
      id: ROUTE.MF_FETCH_PORTFOLIO,
      type: LAYOUTS.LIST,
      widgets: [
        ...(headTitle
          ? [
            { id: "header", type: WIDGET.HEADER, position: POSITION.ABSOLUTE_TOP },
            { id: "headerspace", type: WIDGET.SPACE },
          ]
          : [
            { id: "space0", type: WIDGET.SPACE },
            { id: "title", type: WIDGET.TEXT },
            { id: "space1", type: WIDGET.SPACE },
            { id: "subTitle", type: WIDGET.TEXT },
            { id: "space2", type: WIDGET.SPACE },
          ]),
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
          routeId: ROUTE.MF_FETCH_PORTFOLIO,
          payload: {},
        },
      },
      headerspace: <SpaceProps>{ size: SizeTypeTokens.XXL },
      space0: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      title: <TypographyProps>{
        label: "Check available cash limit",
        fontSize: FontSizeTokens.XL,
        color: ColorTokens.Grey_Night,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "700",
        numberOfLines: 1,
      },
      subTitle: <TypographyProps>{
        label: "Cash limit is calculated using your MF portfolio",
        numberOfLines: 1,
        fontFamily: FontFamilyTokens.Inter,
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
       // trailIconName: `${headTitle}` ? "" : IconTokens.Edit,
      
        isDivider:true,
        trailIconName: isPanEditAllowed ? IconTokens.Edit : null,
        subTitleLineHeight: 24,
        action: isPanEditAllowed
          ? {
              routeId: ROUTE.MF_FETCH_PORTFOLIO,
              type: ACTION.EDIT_PAN,
              payload: <PanEditPayload>{
                applicationId,
                targetRoute: ROUTE.MF_FETCH_PORTFOLIO,
                panNumber: panNumber,
              },
            }
          : null,
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
          routeId: ROUTE.MF_FETCH_PORTFOLIO,
          payload: { targetWidgetId: "mobileItem" },
        },
      },
      emailItem: <ListItemProps & WidgetProps>{
        title: "Email",
        subTitle: emailId,
        leadIconName: IconTokens.Email,
        trailIconName: IconTokens.Edit,
        subTitleLineHeight: 24,
        action: {
          type: ACTION.EDIT_EMAIL,
          routeId: ROUTE.MF_FETCH_PORTFOLIO,
          payload: { targetWidgetId: "emailItem" },
        },
      },
      fetchCTA: <ButtonProps & WidgetProps>{
        label: "Get my portfolio",
        //  label: `${headTitle} ? Verify By OTP ? Get MY Portfolio`,
        fontFamily: FontFamilyTokens.Poppins,
        width: ButtonWidthTypeToken.FULL,
        type: ButtonTypeTokens.LargeFilled,
        action: {
          routeId: ROUTE.MF_FETCH_PORTFOLIO,
          type: ACTION.FETCH_MY_PORTFOLIO,
          payload: <FetchPortfolioPayload>{
            applicationId,
            emailId,
            phoneNumber,
            panNumber,
            assetRepository: headTitle ? headTitle : assetRepository,
            //assetRepository: AssetRepositoryType.DEFAULT,
           // assetRepository,
          },
        },
      },
    },
  };
};

export const checkLimitMF: PageType<any> = {
  onLoad: async (
    { network, asyncStorage ,...props},
    { applicationId, email, panNumber, mobileNumber, headTitle }
  ) => {
    const userType = await SharedPropsService.getUserType();
    let phoneNumber = "";
    let panNumberX = "";
    let emailId = "";
    console.log("userType", userType);
    if (userType === "BORROWER") {
      const user: User = await SharedPropsService.getUser();
      panNumberX =
        panNumber || user.linkedBorrowerAccounts[0].accountHolderPAN;
      phoneNumber =
        mobileNumber || user.linkedBorrowerAccounts[0].accountHolderPhoneNumber;
      emailId = `${email || user.linkedBorrowerAccounts[0].accountHolderEmail
        }`.toLowerCase();
      if (!applicationId) {
        applicationId = applicationId || user.linkedApplications[0].applicationId;
      }
      const assetRepository = await SharedPropsService.getAssetRepositoryType();
    } else {
      phoneNumber = await (await SharedPropsService.getPartnerUser()).phoneNumber;
      emailId = await (await SharedPropsService.getPartnerUser()).emailId;
      panNumberX = await (await SharedPropsService.getPartnerUser()).panNumber;
      const assetRepository = headTitle;
    }
    const assetRepository = await SharedPropsService.getAssetRepositoryType();
    console.log("repo",assetRepository);
    // return Promise.resolve(
    //   template(applicationId, panNumberX, phoneNumber, emailId, headTitle,assetRepository)


    const isPanEditAllowed: boolean = await SharedPropsService.getConfig(
      ConfigTokens.IS_PAN_EDIT_ALLOWED
    );

    return template(
      applicationId,
      panNumberX,
      phoneNumber,
      emailId,
      headTitle,
      assetRepository,
      isPanEditAllowed
    );
  },
  actions: {
    [ACTION.AUTO_FETCH_MY_PORTFOLIO]: autoTriggerOtp,
    [ACTION.FETCH_MY_PORTFOLIO]: fetchMyPortfolio,
    [ACTION.EDIT_PAN]: editPanNumber,
    [ACTION.EDIT_MOBILE_NUMBER]: editMobileNumber,
    [ACTION.EDIT_EMAIL]: editEmailId,
    [ACTION.GO_BACK]: goBack,
  },

  clearPrevious: true,
  action: {
    type: ACTION.AUTO_FETCH_MY_PORTFOLIO,
    routeId: ROUTE.MF_FETCH_PORTFOLIO,
    payload: {},
  },
};
