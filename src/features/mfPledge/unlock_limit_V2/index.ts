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
  CardProps,
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  IconAlignmentTokens,
  IconProps,
  IconSizeTokens,
  IconTokens,
  ImageProps,
  LimitCardProps,
  ListItemProps,
  PromoCardProps,
  ResizeModeToken,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  StackWidth,
  StepperStateToken,
  TagProps,
  TagTypeTokens,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION, AvailableCASItem, StepResponseObject } from "./types";
import {
  continueLimit,
  getMoreMfPortfolio,
  selectPortfolio,
  removeGetMorePortfolio,
  ViewAllAction,
  NavSliderAction,
  NavToContactUs,
} from "./actions";
import { fetchPledgeLimitRepo } from "./repo";
import {
  addCommasToNumber,
  isMorePortfolioRenderCheck,
  roundDownToNearestHundred,
} from "../../../configs/utils";
import { StepStatusMap, User } from "../../login/otp_verify/types";
import { api } from "../../../configs/api";
import { APP_CONFIG, getAppHeader } from "../../../configs/config";
import SharedPropsService from "../../../SharedPropsService";
import { NavigationNext } from "../../kyc/kyc_init/types";
import _ from "lodash";
import { NavigateNext } from "../pledge_verify/actions";
import { AuthCASModel } from "../../../types/AuthCASModel";
import {UpdateAvailableCASMap} from "../unlock_limit_V2/types";

/*** This will be used to auto trigger removeGetMorePortfolio action when user has already pledged both CAMS and KARVY from UI */
let availableCASX: AvailableCASItem[];

export const template: (
  availableCreditAmount: number,
  availableCAS: AvailableCASItem[],
  stepResponseObject: StepResponseObject,
  shouldShowGetMorePortfolio: boolean,
  totalPortfolioAmount: number,
  processingFeesBreakUp: { [key in string]: number },
  updateAvailableCASMap: UpdateAvailableCASMap
) => TemplateSchema = (
  availableCreditAmount,
  availableCAS,
  stepResponseObject,
  shouldShowGetMorePortfolio,
  totalPortfolioAmount,
  processingFeesBreakUp = {},
  updateAvailableCASMap
) => {
  const listItemLayout = Object.keys(processingFeesBreakUp).map(
    (key, index) => {
      return {
        id: `list_${index}`,
        type: WIDGET.LIST_ITEM,
        padding: {
          // left:0,
        },
      };
    }
  );

  const listLayoutDs = {};
  Object.keys(processingFeesBreakUp).forEach((key, index) => {
    console.log("key", processingFeesBreakUp);
    listLayoutDs[`list_${index}`] = <ListItemProps>{
      customTitle: <TypographyProps>{
        label: `${key}`,
        color: ColorTokens.Grey_Night,
        fontWeight: "400",
        fontSize: FontSizeTokens.SM,
        fontFamily: FontFamilyTokens.Inter,
        lineHeight: 24,
      },

      isDivider: true,
      trailLabel: <TypographyProps>{
        label: `₹${processingFeesBreakUp[key] || 0}`.replace(
          /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
          ","
        ),
        color: ColorTokens.Grey_Night,
        fontWeight: "600",
        subTitle: "",
        fontSize: FontSizeTokens.SM,
        fontFamily: FontFamilyTokens.Inter,
        lineHeight: 24,
      },
      onPress: () => {},
    };
    return listLayoutDs;
  });

  return {
    layout: <Layout>{
      id: ROUTE.MF_PLEDGE_PORTFOLIO,
      type: LAYOUTS.LIST,
      widgets: [
        {
          id: "card",
          type: WIDGET.CARD,
          position: POSITION.ABSOLUTE_TOP,
        },
        // {
        //   id: "Mspace0",
        //   type: WIDGET.SPACE,
        //   position: POSITION.ABSOLUTE_TOP,
        // },
        {
          id: "creditLimitCard",
          type: WIDGET.CARD,
          padding: {
            horizontal: 0,
            all: 0,
          },
        },
        {
          id: "Mspace1",
          type: WIDGET.SPACE,
        },
        {
          id: "chargesCard",
          type: WIDGET.CARD,
          padding: {
            horizontal: 0,
            all: 0,
          },
        },
        {
          id: "Mspace2",
          type: WIDGET.SPACE,
        },
        {
          id: "promoCard",
          type: WIDGET.PROMOCARD,
          padding: {
            horizontal: 0,
            all: 0,
          },
        },
        {
          id: "Mspace3",
          type: WIDGET.SPACE,
        },
        {
          id: "Mspace4",
          type: WIDGET.SPACE,
        },
        {
          id: "ctaCard",
          type: WIDGET.CARD,
          padding: {
            horizontal: 0,
            all: 0,
          },
          position: POSITION.STICKY_BOTTOM,
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
        padding: { horizontal: SizeTypeTokens.LG },
        widgetItems: [
          { id: "title", type: WIDGET.TEXT },
          { id: "headerRight", type: WIDGET.STACK },
        ],
      },
      headerRight: <StackProps>{
        type: StackType.row,
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.flexEnd,
        padding: { horizontal: SizeTypeTokens.LG },
        widgetItems: [{ id: "contactUs", type: WIDGET.TAG }],
      },
      contactUs: <TagProps & WidgetProps>{
        icon: {
          align: IconAlignmentTokens.left,
          name: IconTokens.FAQ,
          size: IconSizeTokens.XL,
        },
        label: "Need help?",
        labelColor: ColorTokens.Primary_100,
        type: TagTypeTokens.DEFAULT,
        bgColor: ColorTokens.Primary_05,
        action: {
          type: ACTION.NAV_TO_CONTACT_US,
          routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
          payload: {},
        },
      },
      contactUsSpace: <SpaceProps>{ size: SizeTypeTokens.SM },
      title: <TypographyProps>{
        label: "Unlock limit",
        fontSize: FontSizeTokens.MD,
        color: ColorTokens.Grey_Night,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "700",
      },
      // Mspace0: <SpaceProps>{ size: SizeTypeTokens.XL },
      creditLimitCard: <CardProps>{
        bgColor: ColorTokens.White,
        body: { widgetItems: [{ id: "body", type: WIDGET.STACK }] },
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.spaceBetween,
      },
      body: <StackProps>{
        width: StackWidth.FULL,
        type: StackType.column,
        widgetItems: [
          { id: "creditLimit", type: WIDGET.TEXT },
          { id: "space1", type: WIDGET.SPACE },
          { id: "limitCard", type: WIDGET.LIMIT_CARD },
          { id: "space2", type: WIDGET.SPACE },
          { id: "lendingStack", type: WIDGET.STACK },
        ],
      },
      creditLimit: <TypographyProps>{
        label: "Your credit limit",
        fontSize: FontSizeTokens.MD,
        fontWeight: "700",
        fontFamily: FontFamilyTokens.Poppins,
      },
      space1: <SpaceProps>{ size: SizeTypeTokens.XL },
      limitCard: <LimitCardProps & WidgetProps>{
        label: "Available credit limit",
        limitAmount: addCommasToNumber(
          roundDownToNearestHundred(availableCreditAmount)
        ).toString(),
        fetchedAmount: `${addCommasToNumber(
          parseInt(stepResponseObject["totalPortfolioAmount"].toString())
        )}`,
        isView: false,
      },
      space2: <SpaceProps>{ size: SizeTypeTokens.XXL },
      lendingStack: <StackProps>{
        width: StackWidth.FULL,
        type: StackType.row,
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.center,
        widgetItems: [
          { id: "lending", type: WIDGET.TEXT },
          { id: "space3", type: WIDGET.SPACE },
          { id: "bajaj", type: WIDGET.IMAGE },
          { id: "space4", type: WIDGET.SPACE },
          { id: "mirae", type: WIDGET.IMAGE },
        ],
      },
      lending: <TypographyProps>{
        label: "Lending partners",
        fontWeight: "400",
        fontFamily: FontFamilyTokens.Inter,
        fontSize: FontSizeTokens.XS,
      },
      space3: <SpaceProps>{ size: SizeTypeTokens.XL },
      bajaj: <ImageProps>{
        uri: "https://volt-images.s3.ap-south-1.amazonaws.com/bajaj.svg",
        height: 14,
        width: 52,
        resizeMode: ResizeModeToken.CONTAIN,
        padding: SizeTypeTokens.NONE,
      },
      space4: <SpaceProps>{ size: SizeTypeTokens.MD },
      mirae: <ImageProps>{
        uri: "https://volt-images.s3.ap-south-1.amazonaws.com/mirae-assets.svg",
        height: 19,
        width: 77,
        resizeMode: ResizeModeToken.CONTAIN,
        padding: SizeTypeTokens.NONE,
      },
      Mspace1: <SpaceProps>{ size: SizeTypeTokens.XL },
      chargesCard: <CardProps>{
        bgColor: ColorTokens.White,
        body: { widgetItems: [{ id: "chargesBody", type: WIDGET.STACK }] },
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.spaceBetween,
      },
      chargesBody: <StackProps>{
        width: StackWidth.FULL,
        type: StackType.column,
        widgetItems: [
          { id: "charges", type: WIDGET.TEXT },
          { id: "space5", type: WIDGET.SPACE },
          { id: "interestRate", type: WIDGET.TEXT },
          { id: "space6", type: WIDGET.SPACE },
          { id: "viewAll", type: WIDGET.BUTTON },
        ],
      },
      charges: <TypographyProps>{
        label: "Interest and other charges",
        fontSize: FontSizeTokens.MD,
        fontWeight: "700",
        fontFamily: FontFamilyTokens.Poppins,
      },
      space5: <SpaceProps>{ size: SizeTypeTokens.XL },
      interestRate: <TypographyProps>{
        label: "Interest rates starting @ 9%",
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
        fontSize: FontSizeTokens.SM,
      },
      space6: <SpaceProps>{ size: SizeTypeTokens.XL },
      viewAll: <ButtonProps & WidgetProps>{
        label: "View all charges",
        type: ButtonTypeTokens.MediumGhost,
        paddingHorizontal: SizeTypeTokens.NONE,
        paddingVertical: SizeTypeTokens.NONE,
        action: {
          type: ACTION.VIEW_ALL,
          routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
          payload: {
            stepResponseObject: stepResponseObject,
            processingFeesBreakUp: processingFeesBreakUp,
          },
        },
      },
      Mspace2: <SpaceProps>{ size: SizeTypeTokens.XL },
      promoCard: <PromoCardProps>{
        data: [
          {
            id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
            title: "Instant access to cash",
            subTitle: "Pay interest only on the borrow amount",
            image:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOuSURBVHgBlVVdiBtVFP7uzcxssm6SadaudjWS+AObrSIt9cm/rlWXotIHoaCgFMQXfVlfKtpWC32oCtLYUvAH7GMriIqwyrKW1rrUF6Gt7o+0uJvuuu1uaJppOplkfm/vhM1kEia72Q9C7rn3nO8799yTE4I1wCbHH3BC9Hd3bcAYimR25rAO0LUcTLAE/0q5HwnSmcrMrymsA6sKHBmZk7/8bmDrciFSWNlKaWr32N73pt8aGbmQqvuxy6dfs6dPz9kzv33VykGCiLP7rj4VouQQX2537XSyjJ1PX/POv/65F7PXJchRe/SD1/OMAS97GTvkUbL5uam6LbSSH/tofh8cHPKLKyWxyefFbWVcmnUw/ITyEvPtM8Ms21X1Eb6cCrzB0QPzJ/jGnlbR+/o07Hp+EavB0bQaGw1HYNns1a7HXvih6QbH9i98zHPYExSckA2sBdrd3TBERLz9Wub75x8CYQfbBd9/r4aOwF+DVTSF3i6/rf8znvEEKCXfrha3aWMVncDRdZ69KNOenmcFge5194SjBxa3MGY/ExggUiTCOsJddif8vP5h1G/iGMZyTYAxZxdpbVZuF9NRFB+Oo7eyiHXBceCUVZCu8PvW9Hg/DRG21X9uxiUsPHkPCgMyHIHgYqwfN51w5wKUgkZjIJLEl6E0dRjbVLtViMB4PA79lT44CakhyChOaoNYLwgjEzojb1BenoQjS6gM93GBGM+AIBZtdv7PknFOT3ZEbFoEZy9Gl8jkje2RzFBO0LdtmDQHow/6ncQQ0MPbWvV151g1jc3iDfTSSlvyhbyI78/KWCoK/+7I7q51BjUz0bkgZ1dA9E2IChNwSssEEusmxeifcRz/8W4sFwXeIyRXP6Pc+gltEO9ptv2l0qohXMtHcHXxLpwcTeKPvxu/ZErYWH0txP7HX6UkFDDIrQJCm1KxWRNTFxoPVTYtb807PPfpkcFTnti7Q0QlFj5EGwSVauJWv2e70/SW0ZhVhJBv/PHeT+zwFXYGK/O/FRZ/roLCnQ2GxBUFck71zhQ+HkqG6WX/WXYw7Y/1/tGkKt7k6eSCBNxSbVB1JCeWmshLPHM/OX/QodbYpiFxeIalEMIvfNdrFzdr6ZICcUZtCizpBpSV0nDiy5xo+JNsJreqQEPIPshb4Z1Q3tjYdf4mqNp4RNNhKFarqNq1Nlf4gP7CgpHNZrcoQVyBAi4+P15IikulHbynd9uMDFQsO62ZJie28jzsPI88ZzL9RDviOu4A5zhsmkEc0QAAAAAASUVORK5CYII=",
          },
          {
            id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
            title: "Low interest rates",
            subTitle: "Pay interest only on the borrow amount",
            image:
              "data:image/png;base64,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",
          },
          {
            id: "58694a0f-3da1-471f-bd96-145571e29d72",
            title: "Withdraw as per requirements",
            subTitle: "Pay interest only on the borrow amount",
            image:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOuSURBVHgBlVVdiBtVFP7uzcxssm6SadaudjWS+AObrSIt9cm/rlWXotIHoaCgFMQXfVlfKtpWC32oCtLYUvAH7GMriIqwyrKW1rrUF6Gt7o+0uJvuuu1uaJppOplkfm/vhM1kEia72Q9C7rn3nO8799yTE4I1wCbHH3BC9Hd3bcAYimR25rAO0LUcTLAE/0q5HwnSmcrMrymsA6sKHBmZk7/8bmDrciFSWNlKaWr32N73pt8aGbmQqvuxy6dfs6dPz9kzv33VykGCiLP7rj4VouQQX2537XSyjJ1PX/POv/65F7PXJchRe/SD1/OMAS97GTvkUbL5uam6LbSSH/tofh8cHPKLKyWxyefFbWVcmnUw/ITyEvPtM8Ms21X1Eb6cCrzB0QPzJ/jGnlbR+/o07Hp+EavB0bQaGw1HYNns1a7HXvih6QbH9i98zHPYExSckA2sBdrd3TBERLz9Wub75x8CYQfbBd9/r4aOwF+DVTSF3i6/rf8znvEEKCXfrha3aWMVncDRdZ69KNOenmcFge5194SjBxa3MGY/ExggUiTCOsJddif8vP5h1G/iGMZyTYAxZxdpbVZuF9NRFB+Oo7eyiHXBceCUVZCu8PvW9Hg/DRG21X9uxiUsPHkPCgMyHIHgYqwfN51w5wKUgkZjIJLEl6E0dRjbVLtViMB4PA79lT44CakhyChOaoNYLwgjEzojb1BenoQjS6gM93GBGM+AIBZtdv7PknFOT3ZEbFoEZy9Gl8jkje2RzFBO0LdtmDQHow/6ncQQ0MPbWvV151g1jc3iDfTSSlvyhbyI78/KWCoK/+7I7q51BjUz0bkgZ1dA9E2IChNwSssEEusmxeifcRz/8W4sFwXeIyRXP6Pc+gltEO9ptv2l0qohXMtHcHXxLpwcTeKPvxu/ZErYWH0txP7HX6UkFDDIrQJCm1KxWRNTFxoPVTYtb807PPfpkcFTnti7Q0QlFj5EGwSVauJWv2e70/SW0ZhVhJBv/PHeT+zwFXYGK/O/FRZ/roLCnQ2GxBUFck71zhQ+HkqG6WX/WXYw7Y/1/tGkKt7k6eSCBNxSbVB1JCeWmshLPHM/OX/QodbYpiFxeIalEMIvfNdrFzdr6ZICcUZtCizpBpSV0nDiy5xo+JNsJreqQEPIPshb4Z1Q3tjYdf4mqNp4RNNhKFarqNq1Nlf4gP7CgpHNZrcoQVyBAi4+P15IikulHbynd9uMDFQsO62ZJie28jzsPI88ZzL9RDviOu4A5zhsmkEc0QAAAAAASUVORK5CYII=",
          },
          {
            id: "58694a0f-3da1-471f-bd96-145571e29d71",
            title: "No foreclosure charges",
            subTitle: "Pay interest only on the borrow amount",
            image:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOuSURBVHgBlVVdiBtVFP7uzcxssm6SadaudjWS+AObrSIt9cm/rlWXotIHoaCgFMQXfVlfKtpWC32oCtLYUvAH7GMriIqwyrKW1rrUF6Gt7o+0uJvuuu1uaJppOplkfm/vhM1kEia72Q9C7rn3nO8799yTE4I1wCbHH3BC9Hd3bcAYimR25rAO0LUcTLAE/0q5HwnSmcrMrymsA6sKHBmZk7/8bmDrciFSWNlKaWr32N73pt8aGbmQqvuxy6dfs6dPz9kzv33VykGCiLP7rj4VouQQX2537XSyjJ1PX/POv/65F7PXJchRe/SD1/OMAS97GTvkUbL5uam6LbSSH/tofh8cHPKLKyWxyefFbWVcmnUw/ITyEvPtM8Ms21X1Eb6cCrzB0QPzJ/jGnlbR+/o07Hp+EavB0bQaGw1HYNns1a7HXvih6QbH9i98zHPYExSckA2sBdrd3TBERLz9Wub75x8CYQfbBd9/r4aOwF+DVTSF3i6/rf8znvEEKCXfrha3aWMVncDRdZ69KNOenmcFge5194SjBxa3MGY/ExggUiTCOsJddif8vP5h1G/iGMZyTYAxZxdpbVZuF9NRFB+Oo7eyiHXBceCUVZCu8PvW9Hg/DRG21X9uxiUsPHkPCgMyHIHgYqwfN51w5wKUgkZjIJLEl6E0dRjbVLtViMB4PA79lT44CakhyChOaoNYLwgjEzojb1BenoQjS6gM93GBGM+AIBZtdv7PknFOT3ZEbFoEZy9Gl8jkje2RzFBO0LdtmDQHow/6ncQQ0MPbWvV151g1jc3iDfTSSlvyhbyI78/KWCoK/+7I7q51BjUz0bkgZ1dA9E2IChNwSssEEusmxeifcRz/8W4sFwXeIyRXP6Pc+gltEO9ptv2l0qohXMtHcHXxLpwcTeKPvxu/ZErYWH0txP7HX6UkFDDIrQJCm1KxWRNTFxoPVTYtb807PPfpkcFTnti7Q0QlFj5EGwSVauJWv2e70/SW0ZhVhJBv/PHeT+zwFXYGK/O/FRZ/roLCnQ2GxBUFck71zhQ+HkqG6WX/WXYw7Y/1/tGkKt7k6eSCBNxSbVB1JCeWmshLPHM/OX/QodbYpiFxeIalEMIvfNdrFzdr6ZICcUZtCizpBpSV0nDiy5xo+JNsJreqQEPIPshb4Z1Q3tjYdf4mqNp4RNNhKFarqNq1Nlf4gP7CgpHNZrcoQVyBAi4+P15IikulHbynd9uMDFQsO62ZJie28jzsPI88ZzL9RDviOu4A5zhsmkEc0QAAAAAASUVORK5CYII=",
          },
        ],
        heading: "Why Volt?",
      },
      Mspace3: <SpaceProps>{ size: SizeTypeTokens.Size80 },
      Mspace4: <SpaceProps>{ size: SizeTypeTokens.Size80 },
      ctaCard: <CardProps>{
        bgColor: ColorTokens.White,
        body: { widgetItems: [{ id: "ctaBody", type: WIDGET.STACK }] },
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.spaceBetween,
      },
      ctaBody: <StackProps>{
        width: StackWidth.FULL,
        type: StackType.column,
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.center,
        widgetItems: [
          {
            id: "ctaTextStack",
            type: WIDGET.STACK,
          },
          { id: "space7", type: WIDGET.SPACE },
          {
            id: "ctaButton",
            type: WIDGET.BUTTON,
          },
        ],
      },
      ctaTextStack: <StackProps>{
        width: StackWidth.FULL,
        type: StackType.row,
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.center,
        widgetItems: [
          {
            id: "icon",
            type: WIDGET.ICON,
          },
          {
            id: "space8",
            type: WIDGET.SPACE,
          },
          {
            id: "secureText",
            type: WIDGET.TEXT,
          },
        ],
      },
      space7: <SpaceProps>{ size: SizeTypeTokens.MD },
      icon: <IconProps>{
        name: IconTokens.ShieldRuppee,
        color: ColorTokens.System_Happy,
        size: IconSizeTokens.LG,
      },
      space8: <SpaceProps>{ size: SizeTypeTokens.SM },
      secureText: <TypographyProps>{
        label: "100% safe and secure",
        fontWeight: "500",
        fontFamily: FontFamilyTokens.Inter,
        fontSize: FontSizeTokens.XS,
        color: ColorTokens.System_Happy,
      },
      ctaButton: <ButtonProps & WidgetProps>{
        label: "Set credit limit",
        fontWeight: "700",
        fontFamily: FontFamilyTokens.Inter,
        fontSize: FontSizeTokens.SM,
        type: ButtonTypeTokens.LargeFilled,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: ACTION.NAV_NEXT,
          payload: {
            maxAmount: availableCreditAmount,
            stepResponseObject: stepResponseObject,
            updateAvailableCASMap: updateAvailableCASMap
          },
        },
      },
      // unlockItem: <ButtonProps & WidgetProps>{
      //   label: "Unlock limit",
      //   fontFamily: FontFamilyTokens.Inter,
      //   type: ButtonTypeTokens.LargeFilled,
      //   icon: {
      //     name: IconTokens.Lock,
      //     align: IconAlignmentTokens.left,
      //   },
      //   width: ButtonWidthTypeToken.FULL,
      //   action: {
      //     type: ACTION.UNLOCK_LIMIT,
      //     payload: <LimitPayload>{
      //       value: stepResponseObject,
      //       widgetId: "continue",
      //       isResend: false,
      //     },
      //     routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
      //   },
      // },
      // modifyItem: <ButtonProps & WidgetProps>{
      //   label: "Modify Limit",
      //   fontFamily: FontFamilyTokens.Inter,
      //   type: ButtonTypeTokens.LargeGhost,
      //   width: ButtonWidthTypeToken.FULL,
      //   icon: {
      //     name: IconTokens.ChervonDownRight,
      //     align: IconAlignmentTokens.right,
      //     size: IconSizeTokens.XL,
      //   },
      //   action: {
      //     type: ACTION.MODIFY_LIMIT,
      //     payload: {
      //       value: stepResponseObject,
      //       widgetId: "continue",
      //       isResend: false,
      //     },
      //     routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
      //   },
      // },
    },
  };
};

export const unlockLimitMFV2: PageType<any> = {
  onLoad: async ({ showPopup, network, goBack }) => {
    const updateAvailableCASMap = {};
    const user: User = await SharedPropsService.getUser();
    const authCAS: AuthCASModel = await SharedPropsService.getAuthCASResponse();
    const pledgeLimitResponse = authCAS
      ? { data: authCAS }
      : await fetchPledgeLimitRepo().then((response) => ({
          data: response,
        }));
    /* const pledgeLimitResponse = await network.get(
      `${api.pledgeLimit}${user.linkedApplications[0].applicationId}`,
      { headers: await getAppHeader() }
    );*/
    /*** update authCAS in SharedPropsService if fetched from api ***/

    if (!authCAS && pledgeLimitResponse.data) {
      await SharedPropsService.setAuthCASResponse(pledgeLimitResponse.data);
    }
    const availableCreditAmount: number =
      pledgeLimitResponse.data.stepResponseObject.availableCreditAmount || 0;
    const totalPortfolioAmount: number =
      pledgeLimitResponse.data.stepResponseObject.totalPortfolioAmount || 0;

    const availableCAS: AvailableCASItem[] =
      pledgeLimitResponse.data.stepResponseObject.availableCAS || [];
    await SharedPropsService.setCasListOriginal(availableCAS);
    const stepResponseObject = pledgeLimitResponse.data.stepResponseObject;

    //
    stepResponseObject.availableCAS.map((item, index) => {
      let key = `${item.isinNo}-${item.folioNo}`;
      item.pledgedUnits = item.totalAvailableUnits;
      updateAvailableCASMap[key] = item;
    });
    await SharedPropsService.setAvailableCASMap(updateAvailableCASMap);
    //
    /*** Show popup as soon as we land here if MF_PLEDGE_PORTFOLIO is PENDING_CALLBACK ***/
    const stepStatusMap: StepStatusMap =
      pledgeLimitResponse.data.updatedApplicationObj.stepStatusMap;
    if (
      stepStatusMap.MF_PLEDGE_PORTFOLIO === StepperStateToken.PENDING_CALLBACK
    ) {
      setTimeout(async () => {
        await showPopup({
          title: `Pledging...`,
          subTitle: "Please wait while we confirm your pledge with depository.",
          type: "DEFAULT",
          iconName: IconTokens.Volt,
        });
      }, 250);

      /***** Starting Polling to check status of MF_PLEDGE_PORTFOLIO *****/
      const PollerRef = setInterval(async () => {
        const mfPledgeStatusResponse = await network.get(
          `${api.borrowerApplication}${user.linkedApplications[0].applicationId}`,
          { headers: await getAppHeader() }
        );
        user.linkedApplications[0] = _.get(mfPledgeStatusResponse, "data");
        await SharedPropsService.setUser(user);
        if (
          _.get(
            mfPledgeStatusResponse,
            "data.stepStatusMap.MF_PLEDGE_PORTFOLIO"
          ) === "COMPLETED" &&
          _.get(mfPledgeStatusResponse, "data.currentStepId") !==
            "MF_PLEDGE_PORTFOLIO"
        ) {
          clearInterval(PollerRef);
          await goBack();
          await showPopup({
            autoTriggerTimerInMilliseconds: APP_CONFIG.POLLING_INTERVAL,
            isAutoTriggerCta: true,
            title: "Limit unlocked successfully!",
            subTitle: "You will be redirected to next step in few seconds",
            type: "SUCCESS",
            ctaLabel: "Continue",
            primary: true,
            ctaAction: {
              type: ACTION.NAV_NEXT,
              routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
              payload: <NavigationNext>{
                stepId: _.get(mfPledgeStatusResponse, "data.currentStepId"),
              },
            },
          });
        }
      }, APP_CONFIG.POLLING_INTERVAL);
    }
    const isGetMorePortfolio = await isMorePortfolioRenderCheck();

    const mfPortfolioArray: AvailableCASItem[] = (
      stepResponseObject as StepResponseObject
    ).availableCAS;

    mfPortfolioArray.forEach((_item, index) => {
      mfPortfolioArray[index].is_pledged = _item.pledgedUnits > 0;
    });

    console.log("mfPortfolioArray", mfPortfolioArray);

    const applicationId = (await SharedPropsService.getUser())
      .linkedApplications[0].applicationId;

    const response = await network.post(
      api.processingCharges,
      {
        applicationId: applicationId,
        mutualFundPortfolioItems: mfPortfolioArray,
      },
      { headers: await getAppHeader() }
    );

    console.log("response", response);
    const processingFeesBreakUp = _.get(
      response,
      "data.stepResponseObject.processingChargesBreakup",
      {}
    );

    console.log("processingFeesBreakUp", processingFeesBreakUp);

    return Promise.resolve(
      template(
        availableCreditAmount,
        availableCASX,
        stepResponseObject as StepResponseObject,
        isGetMorePortfolio,
        totalPortfolioAmount,
        processingFeesBreakUp,
        updateAvailableCASMap,
      )
    );
  },

  actions: {
    [ACTION.UNLOCK_LIMIT]: continueLimit,
    [ACTION.MODIFY_LIMIT]: selectPortfolio,
    [ACTION.GET_MORE_MF_PORTFOLIO]: getMoreMfPortfolio,
    [ACTION.REMOVE_GET_MORE_MF_PORTFOLIO]: removeGetMorePortfolio,
    [ACTION.VIEW_ALL]: ViewAllAction,
    [ACTION.NAV_NEXT]: NavSliderAction,
    [ACTION.NAV_TO_CONTACT_US]: NavToContactUs,
  },
  clearPrevious: false,
  bgColor: "#F3F5FC",
  // action: {
  //   type: ACTION.REMOVE_GET_MORE_MF_PORTFOLIO,
  //   routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
  //   payload: {},
  // },
};
