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
  IconAlignmentTokens, IconProps,
  IconSizeTokens,
  IconTokens,
  ListItemProps, MessageProps,
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
import { AssetRepositoryType, ConfigTokens } from "../../../configs/config";

export const template: (
  applicationId: string,
  panNumber: string,
  phoneNumber: string,
  emailId: string,
  assetRepository: AssetRepositoryType,
  isPanEditAllowed: boolean,
  isGoBackAllowed: boolean,
  setIsUserLoggedIn?: (isUserLoggedIn: boolean) => void
) => Promise<TemplateSchema> = async (
  applicationId,
  panNumber,
  phoneNumber,
  emailId,
  assetRepository,
  isPanEditAllowed,
  isGoBackAllowed,
  setIsUserLoggedIn
) => {
  return {
    layout: <Layout>{
      id: ROUTE.MF_FETCH_PORTFOLIO,
      type: isGoBackAllowed ? LAYOUTS.MODAL : LAYOUTS.LIST,
      widgets: [
        { id: "space0", type: WIDGET.SPACE },
        ...(isGoBackAllowed
          ? [
              {
                id: "headerStack",
                type: WIDGET.STACK,
                position: POSITION.ABSOLUTE_TOP,
                padding: {
                  right: 8,
                  top: 8,
                  bottom: 0,
                  left: 0,
                },
              },
            ]
          : []),
        { id: "title", type: WIDGET.TEXT },
        { id: "space1", type: WIDGET.SPACE },
        { id: "subTitle", type: WIDGET.TEXT },
        { id: "space2", type: WIDGET.SPACE },
        { id: "panItem", type: WIDGET.LIST_ITEM },
        { id: "mobileItem", type: WIDGET.LIST_ITEM },
        { id: "emailItem", type: WIDGET.LIST_ITEM },
        { id: "space3", type: WIDGET.SPACE },
        { id: "investmentInfoTooltip", type: WIDGET.MESSAGE},
        { id: "space4", type: WIDGET.SPACE },
        {
          id: "fetchCTA",
          type: WIDGET.BUTTON,
          position: POSITION.ABSOLUTE_BOTTOM,
        },
      ],
    },
    datastore: <Datastore>{
      header: <HeaderProps>{
        isBackButton: true,
        title: "Back",
        type: HeaderTypeTokens.DEFAULT,
        action: {
          type: ACTION.Go_BACK,
          payload: {},
        },
      },
      space0: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      headerStack: <StackProps>{
        type: StackType.row,
        alignItems: StackAlignItems.flexEnd,
        justifyContent: StackJustifyContent.flexEnd,
        widgetItems: [{ id: "leadIcon", type: WIDGET.BUTTON }],
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
          name: IconTokens.Cancel,
          align: IconAlignmentTokens.right,
          size: IconSizeTokens.XXXXL,
        },
        action: {
          type: ACTION.Go_BACK,
          payload: {},
          routeId: ROUTE.MF_FETCH_PORTFOLIO,
        },
      },
      title: <TypographyProps>{
        label: "Check available cash limit",
        fontSize: FontSizeTokens.XL,
        color: ColorTokens.Grey_Night,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "700",
        numberOfLines: 1,
      },
      subTitle: <TypographyProps>{
        label: "Cash limit is calculated using your mutual fund portfolio",
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
        title: "Mobile Number (linked to investments)",
        subTitle: `${phoneNumber}`.substring(3),
        leadIconName: IconTokens.Phone,
        trailIconName: IconTokens.Edit,
        subTitleLineHeight: 24,
        action: {
          type: ACTION.EDIT_MOBILE_NUMBER,
          routeId: ROUTE.MF_FETCH_PORTFOLIO,
          payload: { targetWidgetId: "mobileItem" },
        },
      },
      emailItem: <ListItemProps & WidgetProps>{
        title: "Email (linked to investments)",
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
      investmentInfoTooltip: <MessageProps>{
        label: "Use mobile number & email linked to your investments.",
        labelColor: ColorTokens.Grey_Charcoal,
        bgColor: ColorTokens.Grey_Milk_1,
        icon: <IconProps>{
          name: IconTokens.Info,
          size: IconSizeTokens.SM,
          color: ColorTokens.Grey_Charcoal,
        }
      },
      space4: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
      fetchCTA: <ButtonProps & WidgetProps>{
        label: "Get my portfolio",
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
            assetRepository,
          },
        },
      },
      space3: <SpaceProps>{ size: SizeTypeTokens.XL },
    },
  };
};

export const checkLimitMF: PageType<any> = {
  onLoad: async (_, { setIsUserLoggedIn }) => {
    const user: User = await SharedPropsService.getUser();
    const panNumberX = user.linkedBorrowerAccounts[0].accountHolderPAN;
    const phoneNumber = user.linkedBorrowerAccounts[0].accountHolderPhoneNumber;
    const emailId =
      `${user.linkedBorrowerAccounts[0].accountHolderEmail}`.toLowerCase();
    const applicationId = user.linkedApplications[0].applicationId;
    const assetRepository = await SharedPropsService.getAssetRepositoryType();

    const isPanEditAllowed: boolean = await SharedPropsService.getConfig(
      ConfigTokens.IS_PAN_EDIT_ALLOWED
    );
    const isGoBackAllowed: boolean = await SharedPropsService.getConfig(
      ConfigTokens.IS_MF_FETCH_BACK_ALLOWED
    );

    return Promise.resolve(
      template(
        applicationId,
        panNumberX,
        phoneNumber,
        emailId,
        assetRepository,
        isPanEditAllowed,
        isGoBackAllowed,
        setIsUserLoggedIn
      )
    );
  },
  actions: {
    [ACTION.AUTO_FETCH_MY_PORTFOLIO]: autoTriggerOtp,
    [ACTION.FETCH_MY_PORTFOLIO]: fetchMyPortfolio,
    [ACTION.EDIT_PAN]: editPanNumber,
    [ACTION.EDIT_MOBILE_NUMBER]: editMobileNumber,
    [ACTION.EDIT_EMAIL]: editEmailId,
    [ACTION.Go_BACK]: goBack,
  },
  clearPrevious: true,
  // action: {
  //   type: ACTION.AUTO_FETCH_MY_PORTFOLIO,
  //   routeId: ROUTE.MF_FETCH_PORTFOLIO,
  //   payload: {},
  // },
};
