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
    BorderRadiusTokens,
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
    ProgressIndicatorProps,
    ProgressIndicatorTypeTokens,
    ShimmerIconProps,
    ShimmerIconSizeTokens,
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
//import { goBack, verifyOTP } from "./action";


export const template: (stepper: StepperItem[]) => TemplateSchema = (
    stepper
) => ({
    // export const template: (
    // ) => TemplateSchema = () => ({
    layout: <Layout>{
        id: ROUTE.LOAN_REPAYMENT,
        type: LAYOUTS.LIST,
        widgets: [
            { id: "headerStack", type: WIDGET.HEADER, position: POSITION.FIXED_TOP },
            { id: "headerSpace", type: WIDGET.SPACE },
            { id: "headerSpace1", type: WIDGET.SPACE },
             { id: "iconStack",type: WIDGET.STACK},
           
            { id: "iconSpace", type: WIDGET.SPACE },
            { id: "progressItem", type: WIDGET.PROGRESSINDICATOR },
            { id: "progressSpace", type: WIDGET.SPACE },
            { id: "contentStack", type: WIDGET.STACK },
            { id: "contentSpace", type: WIDGET.SPACE },
            { id: "infoStack", type: WIDGET.STACK, position: POSITION.ABSOLUTE_BOTTOM },
        ],
    },
    datastore: <Datastore>{
        headerStack: <HeaderProps & WidgetProps>{
            leadIcon: "https://reactnative.dev/img/tiny_logo.png",
            title: "Setup AutoPay",
            isBackButton: true,
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
        headerSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
        headerSpace1: <SpaceProps>{ size: SizeTypeTokens.XXXL },
        iconStack: <StackProps>{
            type: StackType.column,
            justifyContent: StackJustifyContent.center,
            alignItems: StackAlignItems.center,
            widgetItems: [
                { id: "iconItem", type: WIDGET.SHIMMERICON },
            ]
        },
        iconItem: <ShimmerIconProps>{
            icon:<IconProps>{
                name:IconTokens.FreeBook,
                size:IconSizeTokens.XXXXXXXXL
            },
            name: 'Freebook',
            size: ShimmerIconSizeTokens.XXXXXL,
            borderRadius: BorderRadiusTokens.BR0,
            padding: SizeTypeTokens.SM,
        },
        iconSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
        progressItem: <ProgressIndicatorProps>{
            size: 3,
            activeIndex: 1,
            type: ProgressIndicatorTypeTokens.LINEAR
        },
        progressSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
        contentStack: <StackProps>{
            type: StackType.column,
            justifyContent: StackJustifyContent.center,
            alignItems: StackAlignItems.center,
            widgetItems: [
                { id: "titleItem", type: WIDGET.TEXT },
                { id: "Space0", type: WIDGET.SPACE },
                { id: "description", type: WIDGET.TEXT },
            ]
        },
      
        titleItem: <TypographyProps>{
            label: "Generating AutoPay link",
            color: ColorTokens.Grey_Night,
            fontSize: FontSizeTokens.SM,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "600",
        },
        Space0: <SpaceProps>{ size: SizeTypeTokens.XS },
        description: <TypographyProps>{
            label: "We’re verifying your details. It may take up to 60 seconds",
            color: ColorTokens.Grey_Charcoal,
            fontSize: FontSizeTokens.XS,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "400",
        },
        contentSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
       
        
        infoStack: <StackProps>{
            type: StackType.row,
            justifyContent: StackJustifyContent.center,
            alignItems: StackAlignItems.center,
            widgetItems: [
                { id: "secureText", type: WIDGET.TEXT },
            ]
        },
        
        secureText: <TypographyProps>{
            label: "Do not leave at this step",
            color: ColorTokens.Grey_Charcoal,
            fontSize: FontSizeTokens.XXS,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "400",
        },
    },
});

export const loanAutoPayMF: PageType<any> = {

    onLoad: async ({ }, { response }) => {
        const stepper: StepperItem[] = await horizontalStepperRepo();
        const responseX = response ? response : await fetchLinkRepo();
        console.log("Link" + responseX);
        return Promise.resolve(template(stepper))
    },

    actions: {
        // [ACTION.REPAYMENT]: authenticateRepayment,
        // [ACTION.GO_BACK]: goBack,
    },
};
