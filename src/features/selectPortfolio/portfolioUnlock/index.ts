import {
    Datastore,
    Layout,
    LAYOUTS,
    PageType,
    POSITION,
    TemplateSchema,
    WidgetProps,
} from "@voltmoney/types";
import { Dimensions } from "react-native";
import {
    ButtonProps,
    ButtonTypeTokens,
    ButtonWidthTypeToken,
    ColorTokens,
    FontFamilyTokens,
    FontSizeTokens,
    HeaderProps,
    HeaderTypeTokens,
    IconProps,
    IconSizeTokens,
    IconTokens,
    SizeTypeTokens,
    SpaceProps,
    StackAlignItems,
    StackJustifyContent,
    StackProps,
    StackType,
    StepperProps,
    StepperTypeTokens,
    TypographyProps,
    WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import {
    ACTION, AssetsPayload, EditItemPayload,
} from "./types";
import { goBackACtion, onCopy, onSave, onShare, onSkip } from "./actions";
import { StepResponseObject } from "../../fetchDistributorPortfolio/types";
import SharedPropsService from "../../../SharedPropsService";
import { getScreenType } from "../../../configs/platfom-utils";


export const template: (
    screenType:string,
     stepper:any,
    stepResponseObject:StepResponseObject,
    amount: string
) => TemplateSchema = (screenType,
    stepper,stepResponseObject, amount
    ) => ({
    layout: <Layout>{
        id: ROUTE.PORTFOLIO_UNLOCK,
        type: LAYOUTS.LIST,
        widgets: [
            {
                id: "header",
                type: WIDGET.HEADER,
                position: POSITION.ABSOLUTE_TOP,
            },
            { id: "space0", type: WIDGET.SPACE },
            { id: "space1", type: WIDGET.SPACE },
             { id: "midStack", type: WIDGET.STACK,
             // position: POSITION.ABSOLUTE_CENTER 
            },

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
              type: ACTION.BACK_BUTTON,
              routeId: ROUTE.PORTFOLIO_UNLOCK,
              payload: {},
            },
            leftTitle:<TypographyProps>{
                label: `${screenType}` === "extra_small" ? "Share link" : "Copy link",
                fontFamily:FontFamilyTokens.Inter,
                fontSize:FontSizeTokens.SM,
                color:ColorTokens.Primary_100,
                lineHeight:24,
        
              },
              leftAction: {
                type: ACTION.COPY,
                routeId: ROUTE.PORTFOLIO_UNLOCK,
                payload: {},
              },
          },
       
        space0: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
        space1: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
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
                },
                { id: "btnSpace", type: WIDGET.SPACE },
                {
                    id: "modifyAmount",
                    type: WIDGET.BUTTON,
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
            label: "credit limit",
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
            label: "Modify credit limit",
            type: ButtonTypeTokens.LargeGhost,
            labelColor: ColorTokens.Primary_100,
            width: ButtonWidthTypeToken.FULL,
        },
        btnSpace: <SpaceProps>{
            size: SizeTypeTokens.SM
        },
        modifyAmount: <ButtonProps & WidgetProps>{
            label: "Modify portfolio amount",
            type: ButtonTypeTokens.LargeGhost,
            width: ButtonWidthTypeToken.FULL,
            action: {
                type: ACTION.ON_SKIP,
                routeId: ROUTE.PORTFOLIO_UNLOCK,
                payload: <AssetsPayload>{
                    value: "",
                    widgetId: "input",
                    stepResponseObject,
                  },
            },
        },
        continue: <ButtonProps & WidgetProps>{
            label: "Confirm & share link",
            type: ButtonTypeTokens.LargeFilled,
            width: ButtonWidthTypeToken.FULL,
            action: {
                type: ACTION.SHARE,
                routeId: ROUTE.PORTFOLIO_UNLOCK,
                payload: <AssetsPayload>{
                    value: "",
                    widgetId: "input",
                    stepResponseObject,
                },
            },
        },
    },
});

export const portfolioUnlockMF: PageType<any> = {
    onLoad: async ({ }, {
        stepResponseObject }) => {
            const screenType = getScreenType(Dimensions.get("window").width);
        console.log("stepResponseObject",stepResponseObject);
        const amount = stepResponseObject.availableCreditAmount;
        let filtered_data = [];
        let stepper_data = await SharedPropsService.getStepperData();
        stepper_data.forEach((item, index) => {
          if (item.horizontalTitle === "Select Portfolio") {
            item.status = "IN_PROGRESS";
          }
          if (item.horizontalTitle === "Fetch Portfolio") {
            item.status = "COMPLETED";
          }
          filtered_data.push(item);
        })
    
        await SharedPropsService.setStepperData(filtered_data);
        return Promise.resolve(template(screenType,
             filtered_data, stepResponseObject,
             amount
            ));
    },
    actions: {
        [ACTION.ON_SAVE]: onSave,
        [ACTION.ON_SKIP]: onSkip,
        [ACTION.BACK_BUTTON]: goBackACtion,
        [ACTION.SHARE]: onShare,
        [ACTION.COPY]: onCopy,
    },
    clearPrevious: true,
};
