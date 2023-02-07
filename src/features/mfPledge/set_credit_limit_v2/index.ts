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
    AccordionProps,
    AccordionTypeTokens,
    ButtonProps,
    ButtonTypeTokens,
    ButtonWidthTypeToken,
    CardProps,
    ColorTokens,
    FontFamilyTokens,
    FontSizeTokens,
    HeaderProps,
    HeaderTypeTokens,
    IconProps,
    IconSizeTokens,
    IconTokens,
    PaddingProps,
    SizeTypeTokens,
    SliderBaseProps,
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
import { ACTION } from "./types";
import {
    editSliderAmount,
    goBack,
    goConfirmPledge,
    goToEditPortFolio,
    OnChangeSlider,
} from "./action";
import { addCommasToNumber } from "../../../configs/utils";
import {
    StepResponseObject,
    UpdateAvailableCASMap,
} from "../unlock_limit/types";
import { AuthCASModel } from "../../../types/AuthCASModel";
import SharedPropsService from "../../../SharedPropsService";
import sharedPropsService from "../../../SharedPropsService";
import { fetchPledgeLimitRepo } from "../unlock_limit/repo";
import { portfolioListDatastoreBuilderSetCreditLimit } from "./utils";
import { getDesiredValue } from "../portfolio_readonly/actions";

export const template: (
) => Promise<TemplateSchema> = async (

    ) => ({
        layout: <Layout>{
            id: ROUTE.SET_CREDIT_LIMIT,
            type: LAYOUTS.LIST,
            widgets: [
                {
                    id: "header",
                    type: WIDGET.HEADER,
                    position: POSITION.ABSOLUTE_TOP,
                },
                {
                    id: "portfolioAccordion",
                    type: WIDGET.ACCORDION,
                    padding:{
                        horizontal:-16
                    }
                },
                {
                    id: "portfolioSpace",
                    type: WIDGET.SPACE
                },
                {
                    id: "creditAccordion",
                    type: WIDGET.ACCORDION,
                    padding:{
                        horizontal:-16
                    }
                },
                {
                    id: "creditSpace",
                    type: WIDGET.SPACE
                },
                {
                    id: "interestAccordion",
                    type: WIDGET.ACCORDION,
                    padding:{
                        horizontal:-16
                    }
                },
                {
                    id: "interestSpace",
                    type: WIDGET.SPACE
                },
                {
                    id: "workAccordion",
                    type: WIDGET.ACCORDION,
                    padding:{
                        horizontal:-16
                    }
                },
                {
                    id: "workSpace",
                    type: WIDGET.SPACE
                },
            ],
        },
        datastore: <Datastore>{
            header: <HeaderProps & WidgetProps>{
                isBackButton: false,
                type: HeaderTypeTokens.DEFAULT,
                title: "Unlock credit limit",
                action: {
                    type: ACTION.GO_BACK,
                    routeId: ROUTE.SET_CREDIT_LIMIT,
                    payload: {},
                },
            },
            portfolioAccordion: <AccordionProps>{
                title: 'Check portfolio credit limit',
                description: 'We would love to hear from you. You can get back to us via Call, Email or WhatsApp.',
                icon: IconTokens.DownArrow,
                type: AccordionTypeTokens.LIST,
                // action:{

                // }
            },
            portfolioSpace: <SpaceProps>{
                size: SizeTypeTokens.XL,
            },
            creditAccordion: <AccordionProps>{
                title: 'Set credit limit',
                description: 'We would love to hear from you. You can get back to us via Call, Email or WhatsApp.',
                icon: IconTokens.DownArrow,
                type: AccordionTypeTokens.LIST,
                // action:{

                // }
            },
            creditSpace: <SpaceProps>{
                size: SizeTypeTokens.XL,
            },
            interestAccordion: <AccordionProps>{
                title: 'Interest and other charges',
                description: 'We would love to hear from you. You can get back to us via Call, Email or WhatsApp.',
                icon: IconTokens.DownArrow,
                type: AccordionTypeTokens.LIST,
                // action:{

                // }
            },
            interestSpace: <SpaceProps>{
                size: SizeTypeTokens.XL,
            },
            workAccordion: <AccordionProps>{
                title: 'How it works?',
                description: 'We would love to hear from you. You can get back to us via Call, Email or WhatsApp.',
                icon: IconTokens.DownArrow,
                type: AccordionTypeTokens.LIST,
                // action:{

                // }
            },
            workSpace: <SpaceProps>{
                size: SizeTypeTokens.XL,
            },
            //   amountStack: <StackProps>{
            //     width: StackWidth.FULL,
            //     type: StackType.column,
            //     alignItems: StackAlignItems.center,
            //     padding: <PaddingProps>{
            //       horizontal: SizeTypeTokens.NONE,
            //       vertical: SizeTypeTokens.NONE,
            //     },
            //     widgetItems: [
            //       { id: "space0", type: WIDGET.SPACE },
            //       { id: "selectText", type: WIDGET.TEXT },
            //       { id: "space1", type: WIDGET.SPACE },
            //       { id: "amountStack2", type: WIDGET.STACK },
            //     ],
            //   },
            //   space0: <SpaceProps>{
            //     size: SizeTypeTokens.Size32,
            //   },
            //   selectText: <TypographyProps>{
            //     label: "Select the amount",
            //     fontFamily: FontFamilyTokens.Poppins,
            //     fontWeight: "500",
            //     fontSize: FontSizeTokens.MD,
            //     color: ColorTokens.Grey_Night,
            //   },
            //   space1: <SpaceProps>{
            //     size: SizeTypeTokens.XL,
            //   },
            //   amountStack2: <StackProps>{
            //     width: StackWidth.FULL,
            //     type: StackType.row,
            //     justifyContent: StackJustifyContent.center,
            //     alignItems: StackAlignItems.center,
            //     padding: <PaddingProps>{
            //       horizontal: SizeTypeTokens.NONE,
            //     },
            //     widgetItems: [
            //       { id: "rupee", type: WIDGET.TEXT },
            //       { id: "amount", type: WIDGET.TEXT },
            //       { id: "space", type: WIDGET.SPACE },
            //       { id: "icon", type: WIDGET.ICON },
            //     ],
            //   },
            //   rupee: <TypographyProps>{
            //     label: "₹",
            //     fontFamily: FontFamilyTokens.Inter,
            //     fontWeight: "700",
            //     fontSize: FontSizeTokens.XXXXL,
            //   },
            //   amount: <TypographyProps>{
            //     label: `${addCommasToNumber(await SharedPropsService.getCreditLimit())}`,
            //     fontFamily: FontFamilyTokens.Poppins,
            //     fontWeight: "700",
            //     fontSize: FontSizeTokens.XXXXL,
            //   },
            //   space: <SpaceProps>{
            //     size: SizeTypeTokens.Size10,
            //   },
            //   icon: <IconProps & WidgetProps>{
            //     name: IconTokens.EditBlue,
            //     size: IconSizeTokens.XL,
            //     action: {
            //       type: ACTION.EDIT_LIMIT,
            //       routeId: ROUTE.SET_CREDIT_LIMIT,
            //       payload: {
            //         maxAmount,
            //         stepResponseObject,
            //         updateAvailableCASMap,
            //       },
            //     },
            //   },
            //   space2: <SpaceProps>{
            //     size: SizeTypeTokens.XXXXXL,
            //   },
            //   slider: <SliderBaseProps & WidgetProps>{
            //     value: await SharedPropsService.getCreditLimit(),
            //     minimumValue: 25000,
            //     maximumValue: maxAmount,
            //     step: 1000,
            //     paddingHorizontal: 10,
            //     action: {
            //       type: ACTION.ON_CHANGE_SLIDER,
            //       routeId: ROUTE.SET_CREDIT_LIMIT,
            //       payload: {
            //         stepResponseObject: stepResponseObject,
            //       },
            //     },
            //   },
            //   space3: <SpaceProps>{
            //     size: SizeTypeTokens.XXL,
            //   },
            //   minMaxStack: <StackProps>{
            //     width: StackWidth.FULL,
            //     type: StackType.row,
            //     justifyContent: StackJustifyContent.spaceBetween,
            //     padding: <PaddingProps>{
            //       horizontal: SizeTypeTokens.NONE,
            //       vertical: SizeTypeTokens.NONE,
            //     },
            //     widgetItems: [
            //       { id: "minText", type: WIDGET.TEXT },
            //       { id: "maxText", type: WIDGET.TEXT },
            //     ],
            //   },
            //   minText: <TypographyProps>{
            //     label: `Min ₹${addCommasToNumber(25000)}`,
            //     fontFamily: FontFamilyTokens.Inter,
            //     fontWeight: "400",
            //     fontSize: FontSizeTokens.XS,
            //     color: ColorTokens.Grey_Night,
            //   },
            //   maxText: <TypographyProps>{
            //     label: `Max ₹${addCommasToNumber(maxAmount)}`,
            //     fontFamily: FontFamilyTokens.Inter,
            //     fontWeight: "400",
            //     fontSize: FontSizeTokens.XS,
            //     color: ColorTokens.Grey_Night,
            //   },
            //   space4: <SpaceProps>{
            //     size: SizeTypeTokens.XXL,
            //   },
            //   // bottomSheet: <BottomSheetProps>{
            //   //   type: BottomSheetType.WEB,
            //   //   widgetHeaderItems: [
            //   //     {
            //   //       id: "bottomSheetStack",
            //   //       type: WIDGET.STACK,
            //   //       padding: {
            //   //         left: 10,
            //   //         right: 10,
            //   //         horizontal: 10,
            //   //       },
            //   //     },
            //   //     {
            //   //       id: "space5",
            //   //       type: WIDGET.SPACE,
            //   //     },
            //   //     {
            //   //       id: "bottomStackText",
            //   //       type: WIDGET.TEXT,
            //   //     },
            //   //   ],
            //   //   widgetItems: [
            //   //     // {
            //   //     //   id: "space6",
            //   //     //   type: WIDGET.SPACE,
            //   //     // },
            //   //     { id: "listItem", type: WIDGET.LIST },
            //   //   ],
            //   //   padding: <PaddingProps>{
            //   //     horizontal: SizeTypeTokens.XS,
            //   //   },
            //   //   initialOffset: 0.4,
            //   //   finalOffSet: 0.85,
            //   // },
            //   bottomSheetStack: <StackProps>{
            //     type: StackType.row,
            //     justifyContent: StackJustifyContent.spaceBetween,
            //     alignItems: StackAlignItems.center,
            //     padding: <PaddingProps>{
            //       horizontal: SizeTypeTokens.XS,
            //       vertical: SizeTypeTokens.XS,
            //     },
            //     widgetItems: [
            //       // { id: "leftSpace", type: WIDGET.SPACE },
            //       { id: "bottomSheetText", type: WIDGET.TEXT },
            //       { id: "editText", type: WIDGET.BUTTON },
            //       // { id: "rightSpace", type: WIDGET.SPACE },
            //     ],
            //   },
            //   bottomSheetText: <TypographyProps>{
            //     label: "Selected mutual funds",
            //     fontWeight: "500",
            //     fontSize: FontSizeTokens.MD,
            //     fontFamily: FontFamilyTokens.Poppins,
            //   },
            //   editText: <ButtonProps & WidgetProps>{
            //     label: "Edit selection",
            //     fontFamily: FontFamilyTokens.Inter,
            //     fontWeight: "600",
            //     type: ButtonTypeTokens.MediumGhost,
            //     paddingHorizontal: SizeTypeTokens.Size6,
            //     paddingVertical: SizeTypeTokens.Size6,
            //     action: {
            //       type: ACTION.EDIT_PORTFOLIO,
            //       payload: {
            //         stepResponseObject: stepResponseObject,
            //         updateAvailableCASMap: updateAvailableCASMap,
            //       },
            //       routeId: ROUTE.SET_CREDIT_LIMIT,
            //     },
            //   },
            //   space11: <SpaceProps>{
            //     size: SizeTypeTokens.LG,
            //   },
            //   bottomSheetStack2: <StackProps>{
            //     type: StackType.row,
            //     justifyContent: StackJustifyContent.spaceBetween,
            //     alignItems: StackAlignItems.center,
            //     padding: <PaddingProps>{
            //       horizontal: SizeTypeTokens.XS,
            //       vertical: SizeTypeTokens.XS,
            //     },
            //     widgetItems: [
            //       // { id: "leftSpace", type: WIDGET.SPACE },
            //       { id: "bottomSheetText2", type: WIDGET.TEXT },
            //     ],
            //   },
            //   bottomSheetText2: <TypographyProps>{
            //     label: `₹${addCommasToNumber(portValue)} out of ₹${addCommasToNumber(
            //       parseInt(stepResponseObject["totalPortfolioAmount"].toString())
            //     )} are selected for pledging.`,
            //     fontFamily: FontFamilyTokens.Inter,
            //     fontWeight: "400",
            //     fontSize: FontSizeTokens.SM,
            //     color: ColorTokens.Grey_Charcoal,
            //   },
            //   space5: <SpaceProps>{
            //     size: SizeTypeTokens.MD,
            //   },
            //   bottomStackText: <TypographyProps>{
            //     label: `₹${addCommasToNumber(
            //       await SharedPropsService.getDesiredPortfolio()
            //     )} out of ₹${addCommasToNumber(
            //       parseInt(stepResponseObject["totalPortfolioAmount"].toString())
            //     )} are selected for pledging.`,
            //     fontFamily: FontFamilyTokens.Inter,
            //     fontWeight: "400",
            //     fontSize: FontSizeTokens.SM,
            //     color: ColorTokens.Grey_Charcoal,
            //   },
            //   space6: <SpaceProps>{
            //     size: SizeTypeTokens.MD,
            //   },
            //   ...(await portfolioListDatastoreBuilderSetCreditLimit(stepResponseObject)),
            //   ctaCard: <CardProps>{
            //     bgColor: ColorTokens.White,
            //     body: { widgetItems: [{ id: "ctaBody", type: WIDGET.STACK }] },
            //     alignItems: StackAlignItems.center,
            //     justifyContent: StackJustifyContent.spaceBetween,
            //   },
            //   ctaBody: <StackProps>{
            //     width: StackWidth.FULL,
            //     type: StackType.column,
            //     alignItems: StackAlignItems.center,
            //     justifyContent: StackJustifyContent.center,
            //     widgetItems: [
            //       {
            //         id: "ctaButton",
            //         type: WIDGET.BUTTON,
            //       },
            //     ],
            //   },
            //   ctaButton: <ButtonProps & WidgetProps>{
            //     label: "Confirm amount and assets",
            //     fontWeight: "700",
            //     fontFamily: FontFamilyTokens.Inter,
            //     fontSize: FontSizeTokens.SM,
            //     type: ButtonTypeTokens.LargeFilled,
            //     width: ButtonWidthTypeToken.FULL,
            //     action: {
            //       type: ACTION.GO_CONFIRM_PLEDGE,
            //       routeId: ROUTE.SET_CREDIT_LIMIT,
            //       payload: {
            //         stepResponseObject: stepResponseObject,
            //       },
            //     },
            //   },
        },
    });

export const setCreditLimitMf2: PageType<any> = {
    bgColor: "#F3F5FC",
    onLoad: async (_) => {


        return Promise.resolve(
            template()
        );
    },
    actions: {
        [ACTION.ON_CHANGE_SLIDER]: OnChangeSlider,
        [ACTION.GO_BACK]: goBack,
        [ACTION.GO_CONFIRM_PLEDGE]: goConfirmPledge,
        [ACTION.EDIT_PORTFOLIO]: goToEditPortFolio,
        [ACTION.EDIT_LIMIT]: editSliderAmount,
    },
};
