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
    IconAlignmentTokens,
    IconProps,
    IconSizeTokens,
    IconTokens,
    InputStateToken,
    InputTypeToken,
    KeyboardTypeToken,
    ShimmerIconProps,
    SizeTypeTokens,
    SpaceProps,
    StackAlignItems,
    StackHeight,
    StackJustifyContent,
    StackProps,
    StackType,
    StepperItem,
    StepperProps,
    StepperTypeTokens,
    TextInputProps,
    TypographyProps,
    WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import {
    ACTION
} from "./types";
import { horizontalStepperRepo } from "../../../configs/utils";
import { fetchPledgeLimitRepo } from "../../unlockLimit/unlock_limit/repo";
import { fetchLinkRepo } from "./repo";
import { authenticateRepayment, goBack } from "./actions";
//import { goBack, verifyOTP } from "./action";


export const template: (stepper: StepperItem[],urlData:string) => TemplateSchema = (
    stepper,urlData
  ) => ({
// export const template: (
// ) => TemplateSchema = () => ({
    layout: <Layout>{
        id: ROUTE.LOAN_REPAYMENT,
        type: LAYOUTS.LIST,
        widgets: [
            { id: "headerStack",type: WIDGET.HEADER,position:POSITION.FIXED_TOP},
            { id: "headerSpace", type: WIDGET.SPACE },
           // { id: "contentStack",type: WIDGET.STACK},
           { id: "headItem",type: WIDGET.TEXT},
            { id: "headSpace", type: WIDGET.SPACE },
            { id: "contentItem",type: WIDGET.TEXT},
            { id: "contentSpace", type: WIDGET.SPACE },
            { id: "iconStack",type: WIDGET.STACK},
            
            { id: "iconSpace", type: WIDGET.SPACE },
            {id: "btnData", type: WIDGET.STACK,position: POSITION.ABSOLUTE_BOTTOM}
        ],
    },
    datastore: <Datastore>{
        headerStack: <HeaderProps & WidgetProps>{
            leadIcon: "https://reactnative.dev/img/tiny_logo.png",
            title: "Loan Agreement",
            type: HeaderTypeTokens.verification,
            stepperProps: <StepperProps>{
              type: StepperTypeTokens.HORIZONTAL,
              data: stepper,
            },
            action: {
              type: ACTION.GO_BACK,
              routeId: ROUTE.LOAN_REPAYMENT,
              payload: {},
            },
        },
        headerSpace: <SpaceProps>{ size: SizeTypeTokens.XXL },
        // contentStack: <StackProps & WidgetProps>{
        //     type: StackType.row,
        //     alignItems: StackAlignItems.center,
        //     justifyContent: StackJustifyContent.flexStart,
        //     widgetItems: [
        //       { id: "subTitle", type: WIDGET.TEXT },
        //       { id: "subTitle2", type: WIDGET.TEXT },
        //       { id: "editNumber", type: WIDGET.TEXT },
        //     ],
        //     action: {
        //     //   type: ACTIONS.GO_BACK,
        //     //   payload: {},
        //     //   routeId: ROUTE.OTP_VERIFY,
        //     },
        // },
        headItem: <TypographyProps>{
            label: "Lorem ipsum",
            fontSize: FontSizeTokens.MD,
            color: ColorTokens.Grey_Night,
            fontFamily: FontFamilyTokens.Poppins,
            fontWeight: "700",
        },
        headSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
        contentItem: <TypographyProps>{
            label: "This registration is required to ensure monthly auto debit of interest from your account.",
            fontSize: FontSizeTokens.SM,
            color: ColorTokens.Grey_Charcoal,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "400",
        },
        contentSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
        iconStack:<StackProps>{
            type: StackType.column,
            justifyContent: StackJustifyContent.center,
            alignItems: StackAlignItems.center,
            widgetItems: [
                { id: "upsideSpace", type: WIDGET.SPACE },
                { id: "upsideSpace1", type: WIDGET.SPACE },
               // { id: "iconcontent", type: WIDGET.ICON },
                { id: "iconcontent", type: WIDGET.SHIMMERICON },
                { id: "downsideSpace", type: WIDGET.SPACE },
                { id: "downsideSpace1", type: WIDGET.SPACE },
            ]
        },
        upsideSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
        upsideSpace1: <SpaceProps>{ size: SizeTypeTokens.MD },
        iconcontent:<ShimmerIconProps>{
            name:"ContractFile",
        },
        downsideSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
        downsideSpace1: <SpaceProps>{ size: SizeTypeTokens.MD },
        iconSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
        btnData:<StackProps>{
            type: StackType.column,
            justifyContent: StackJustifyContent.center,
            alignItems: StackAlignItems.center,
            widgetItems: [
                { id: "btnItem", type: WIDGET.BUTTON },
                { id: "btnSpace", type: WIDGET.SPACE },
                { id: "disclaimerStack", type: WIDGET.STACK }
            ]
        },
        btnItem: <ButtonProps & WidgetProps>{
            label: "Proceed to agreement",
            type: ButtonTypeTokens.LargeFilled,
            labelColor: ColorTokens.White,
            width: ButtonWidthTypeToken.FULL,
            action: {
                type: ACTION.REPAYMENT,
                payload: <{}>{
                    value: urlData,
                    widgetId: "input",
                    isResend: false,
                },
                routeId: ROUTE.LOAN_AGREEMENT,
            },
        },
        btnSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
        disclaimerStack:<StackProps>{
            type: StackType.row,
            justifyContent: StackJustifyContent.center,
            alignItems: StackAlignItems.center,
            widgetItems: [
                { id: "secureIcon", type: WIDGET.ICON },
                { id: "secureSpace", type: WIDGET.SPACE },
                { id: "secureText", type: WIDGET.TEXT },
            ]
        },
        secureIcon:<IconProps>{
            name: IconTokens.SafeGuard,
            size: IconSizeTokens.XS
        },
        secureSpace:<SpaceProps>{
            size: SizeTypeTokens.LG
        },
        secureText: <TypographyProps>{
            label: "Your data is secure with Volt",
            color: ColorTokens.Secondary_100,
            fontSize: FontSizeTokens.XXS,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "500",
        },
    },
});

export const loanAgreementMF: PageType<any> = {

    onLoad: async ({}, { response }) => {
        const stepper: StepperItem[] = await horizontalStepperRepo();
        const responseX = response ? response : await fetchLinkRepo();
        const urlData = responseX.stepResponseObject;
        return Promise.resolve(template(stepper,urlData))
    },

    actions: {
         [ACTION.REPAYMENT]: authenticateRepayment,
         [ACTION.GO_BACK]: goBack,
    },
};
