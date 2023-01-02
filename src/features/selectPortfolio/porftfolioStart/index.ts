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
    DividerProps,
    DividerSizeTokens,
    FontFamilyTokens,
    FontSizeTokens,
    HeaderProps,
    HeaderTypeTokens,
    IconProps,
    IconSizeTokens,
    IconTokens,
    ListItemProps,
    SizeTypeTokens,
    SpaceProps,
    StackAlignItems,
    StackJustifyContent,
    StackProps,
    StackType,
    StepperItem,
    StepperProps,
    StepperTypeTokens,
    TypographyProps,
    WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import {
    ACTION, AssetsPayload,
} from "./types";
import { horizontalDistributorStepperRepo } from "../../../configs/utils";
import { onSave, onShare, onSkip } from "./actions";
import { LimitPayload, StepResponseObject } from "../../fetchDistributorPortfolio/types";


export const template: (
    stepper: StepperItem[],
    stepResponseObject:StepResponseObject,
    amount: string
) => TemplateSchema = (stepper,stepResponseObject, amount) => ({
    layout: <Layout>{
        id: ROUTE.PORTFOLOIO_START,
        type: LAYOUTS.LIST,
        widgets: [
            {
                id: "header",
                type: WIDGET.HEADER,
                position: POSITION.ABSOLUTE_TOP,
            },
            { id: "space0", type: WIDGET.SPACE },
            { id: "space1", type: WIDGET.SPACE },
            { id: "midStack", type: WIDGET.STACK, position: POSITION.ABSOLUTE_CENTER },

            {
                id: "continue",
                type: WIDGET.BUTTON,
                position: POSITION.ABSOLUTE_BOTTOM,
            },
        ],
    },
    datastore: <Datastore>{
        header: <HeaderProps & WidgetProps>{
            isBackButton: true,
            type: HeaderTypeTokens.verification,
            leftCta: "Share",
            trailIcon: "Share",
            stepperProps: <StepperProps>{
                data: stepper,
                type: StepperTypeTokens.HORIZONTAL,
            },
            title: "Create new application",
            action: {
                type: ACTION.GO_BACK,
                routeId: ROUTE.PORTFOLOIO_START,
                payload: {},
            },
            // leftAction: {
            //     type: ACTION.SHARE,
            //     routeId: ROUTE.DISTRIBUTOR_PORTFOLIO,
            //     payload: {},
            // },
        },
        space0: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
        space1: <SpaceProps>{ size: SizeTypeTokens.XXL },
        midStack: <StackProps>{
            type: StackType.column,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.center,
            widgetItems: [
                { id: "iconStack", type: WIDGET.STACK },
                { id: "iconSpace", type: WIDGET.SPACE },
                { id: "headStack", type: WIDGET.STACK },
                { id: "headSpace", type: WIDGET.SPACE },
                { id: "infoStack", type: WIDGET.STACK },
                { id: "infoSpace", type: WIDGET.SPACE },
                {
                    id: "modify",
                    type: WIDGET.BUTTON,
                    //  position: POSITION.ABSOLUTE_BOTTOM,
                },
                { id: "btnSpace", type: WIDGET.SPACE },
                {
                    id: "modifyAmount",
                    type: WIDGET.BUTTON,
                    // position: POSITION.ABSOLUTE_BOTTOM,
                },
            ],
        },
        iconStack: <StackProps>{
            type: StackType.row,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.center,
            widgetItems: [
                { id: "iconItems", type: WIDGET.ICON }
            ],
        },
        iconItems: <IconProps>{
            name: IconTokens.Coin,
            size: IconSizeTokens.XXXXXXL,
            //color:ColorTokens.YE
        },
        iconSpace: <SpaceProps>{
            size: SizeTypeTokens.XXXL
        },

        headStack: <StackProps>{
            type: StackType.column,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.center,
            widgetItems: [
                { id: "headItems1", type: WIDGET.TEXT },
                { id: "headItems2", type: WIDGET.TEXT }
            ],
        },
        headItems1: <TypographyProps>{
            label: "Rs. "+ `${amount}`.replace(
                /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
                ","
              ) +" is the",
            fontSize: FontSizeTokens.XXL,
            fontWeight: '600',
            color: ColorTokens.Grey_Night,
            lineHeight: 28,
            fontFamily: FontFamilyTokens.Poppins
        },
        headItems2: <TypographyProps>{
            label: "unlocked credit limit",
            fontSize: FontSizeTokens.XXL,
            fontWeight: '600',
            color: ColorTokens.Grey_Night,
            lineHeight: 28,
            fontFamily: FontFamilyTokens.Poppins
        },
        headSpace: <SpaceProps>{
            size: SizeTypeTokens.MD
        },
        infoStack: <StackProps>{
            type: StackType.column,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.center,
            widgetItems: [
                { id: "infoItems1", type: WIDGET.TEXT },
                { id: "infoItems2", type: WIDGET.TEXT },
                { id: "infoItems3", type: WIDGET.TEXT }
            ],
        },
        infoItems1: <TypographyProps>{
            label: "Volt picked the right portfolio. Click the button",
            fontSize: FontSizeTokens.SM,
            fontWeight: '400',
            color: ColorTokens.Grey_Charcoal,
            lineHeight: 24,
            fontFamily: FontFamilyTokens.Inter
        },
        infoItems2: <TypographyProps>{
            label: "below to change/edit portfolio or update the",
            fontSize: FontSizeTokens.SM,
            fontWeight: '400',
            color: ColorTokens.Grey_Charcoal,
            lineHeight: 24,
            fontFamily: FontFamilyTokens.Inter
        },
        infoItems3: <TypographyProps>{
            label: "Modify credit limit",
            fontSize: FontSizeTokens.SM,
            fontWeight: '400',
            color: ColorTokens.Grey_Charcoal,
            lineHeight: 24,
            fontFamily: FontFamilyTokens.Inter
        },
        infoSpace: <SpaceProps>{
            size: SizeTypeTokens.XXXL
        },

        modify: <ButtonProps & WidgetProps>{
            label: "Modify credit amount",
            type: ButtonTypeTokens.LargeGhost,
            labelColor: ColorTokens.Primary_100,
            width: ButtonWidthTypeToken.FULL,
            action: {
                type: ACTION.ON_SAVE,
                routeId: ROUTE.PORTFOLOIO_START,
                payload: <{}>{},
            },
        },
        btnSpace: <SpaceProps>{
            size: SizeTypeTokens.MD
        },
        modifyAmount: <ButtonProps & WidgetProps>{
            label: "Modify portfolio amount",
            type: ButtonTypeTokens.LargeGhost,
            width: ButtonWidthTypeToken.FULL,
            action: {
                type: ACTION.ON_SKIP,
                routeId: ROUTE.PORTFOLOIO_START,
                payload: <AssetsPayload>{
                    value: "",
                    widgetId: "input",
                    stepResponseObject,
                  },
                // payload: <LimitPayload>{
                //     value:stepResponseObject
                // },
            },
        },
        continue: <ButtonProps & WidgetProps>{
            label: "Confirm & share link",
            type: ButtonTypeTokens.LargeFilled,
            width: ButtonWidthTypeToken.FULL,
            action: {
                type: ACTION.SHARE,
                routeId: ROUTE.PORTFOLOIO_START,
                payload: <AssetsPayload>{
                    value: "",
                    widgetId: "input",
                    stepResponseObject,
                },
            },
        },
    },
});

export const portfolioStartMF: PageType<any> = {
    onLoad: async ({ }, {
        // amount,
        stepResponseObject }) => {
        console.log("stepResponseObject",stepResponseObject);
        const amount = stepResponseObject.availableCreditAmount;
        const stepper: StepperItem[] = await horizontalDistributorStepperRepo();
        return Promise.resolve(template(stepper, stepResponseObject,
            amount
            ));
    },
    actions: {
        [ACTION.ON_SAVE]: onSave,
        [ACTION.ON_SKIP]: onSkip,
        [ACTION.GO_BACK]: onSkip,
        [ACTION.SHARE]: onShare,
    },

    clearPrevious: true,
};
