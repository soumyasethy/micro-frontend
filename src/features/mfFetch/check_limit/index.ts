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
  ButtonBaseProps,
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  HeaderProps,
  HeaderTypeTokens,
  IconAlignmentTokens,
  IconProps,
  IconSizeTokens,
  IconTokens,
  ListItemProps,
  MessageProps,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  StackWidth,
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
  selectSource,
} from "./actions";
import { User } from "../../login/otp_verify/types";
import SharedPropsService from "../../../SharedPropsService";
import {
  AssetRepositoryMap,
  AssetRepositoryType,
  ConfigTokens,
  getPrimaryAssetRepository,
} from "../../../configs/config";
import { heightMap } from "../../../configs/height";

export const template: (
  applicationId: string,
  panNumber: string,
  phoneNumber: string,
  emailId: string,
  assetRepository: AssetRepositoryType,
  isPanEditAllowed: boolean,
  isRTASwitchEnabled: boolean,
  isGoBackAllowed: boolean,
  setIsUserLoggedIn?: (isUserLoggedIn: boolean) => void
) => Promise<TemplateSchema> = async (
  applicationId,
  panNumber,
  phoneNumber,
  emailId,
  assetRepository,
  isPanEditAllowed,
  isRTASwitchEnabled,
  isGoBackAllowed
) => {
  return {
    layout: <Layout>{
      id: ROUTE.MF_FETCH_PORTFOLIO,
      type: isGoBackAllowed ? LAYOUTS.MODAL : LAYOUTS.LIST,
      style: {
        height: heightMap[ROUTE.MF_FETCH_PORTFOLIO],
      },
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
        { id: "investmentInfoTooltip", type: WIDGET.MESSAGE },
        { id: "space4", type: WIDGET.SPACE },
        {
          id: "fetchCTA",
          type: WIDGET.BUTTON,
          position: POSITION.ABSOLUTE_BOTTOM,
        },
        ...(isRTASwitchEnabled
          ? [
              {
                id: "space5",
                type: WIDGET.SPACE,
                position: POSITION.ABSOLUTE_BOTTOM,
              },
              {
                id: "camsCTAStack",
                type: WIDGET.STACK,
                position: POSITION.ABSOLUTE_BOTTOM,
              },
            ]
          : []),
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
        numberOfLines: 2,
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
        },
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
      camsCTAStack: <StackProps>{
        type: StackType.row,
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.center,
        widgetItems: [
          { id: "text", type: WIDGET.TEXT },
          { id: "space", type: WIDGET.SPACE },
          { id: "icon", type: WIDGET.ICON },
          { id: "space6", type: WIDGET.SPACE },
          { id: "editText", type: WIDGET.BUTTON },
        ],
      },
      text: <TypographyProps>{
        label: "Getting portfolio from",
        fontFamily: FontFamilyTokens.Inter,
        color: ColorTokens.Grey_Charcoal,
        fontWeight: "400",
        fontSize: FontSizeTokens.XXS,
        lineHeight: 16,
      },
      space: <SpaceProps>{ size: SizeTypeTokens.SM },
      icon: <IconProps>{
        name: AssetRepositoryMap.get(assetRepository).ICON,
        size: IconSizeTokens.XXL,
        align: IconAlignmentTokens.left,
      },
      space5: <SpaceProps>{ size: SizeTypeTokens.XL },
      editText: <ButtonBaseProps & WidgetProps>{
        label: "Edit",
        fontFamily: FontFamilyTokens.Inter,
        fontSize: FontSizeTokens.SM,
        type: ButtonTypeTokens.MediumGhost,
        paddingHorizontal: SizeTypeTokens.SM,
        paddingVertical: SizeTypeTokens.SM,
        action: {
          type: ACTION.SELECT_SOURCE,
          routeId: ROUTE.MF_FETCH_PORTFOLIO,
          payload: {},
        },
      },
      space6: <SpaceProps>{ size: SizeTypeTokens.Size10 },
    },
  };
};

export const checkLimitMF: PageType<any> = {
  onLoad: async (_, { setIsUserLoggedIn, assetRepository }) => {
    const user: User = await SharedPropsService.getUser();
    const panNumberX = user.linkedBorrowerAccounts[0].accountHolderPAN;
    const phoneNumber = user.linkedBorrowerAccounts[0].accountHolderPhoneNumber;
    const emailId =
      `${user.linkedBorrowerAccounts[0].accountHolderEmail}`.toLowerCase();
    const applicationId = user.linkedApplications[0].applicationId;

    if (!assetRepository) {
      assetRepository = await getPrimaryAssetRepository();
    }

    const isPanEditAllowed: boolean = await SharedPropsService.getConfig(
      ConfigTokens.IS_PAN_EDIT_ALLOWED
    );

    const isRTASwitchEnabled: boolean = await SharedPropsService.getConfig(
      ConfigTokens.IS_RTA_SWITCH_ENABLED
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
        isRTASwitchEnabled,
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
    [ACTION.SELECT_SOURCE]: selectSource,
  },
  clearPrevious: true,
};
