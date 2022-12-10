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
    ListItemProps,
    SizeTypeTokens,
    SpaceProps,
    StepperItem,
    StepperProps,
    StepperTypeTokens,
    TypographyProps,
    WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import {
    ACTION,
} from "./types";
import { horizontalStepperRepo } from "../../configs/utils";
import { onSave, onSkip } from "./action";


export const template: (
    stepper: StepperItem[]
) => TemplateSchema = (stepper) => ({
    layout: <Layout>{
        id: ROUTE.DISTRIBUTOR_PORTFOLIO,
        type: LAYOUTS.LIST,
        widgets: [
            {
                id: "header",
                type: WIDGET.HEADER,
                position: POSITION.ABSOLUTE_TOP,
            },
            { id: "space0", type: WIDGET.SPACE },
            { id: "space1", type: WIDGET.SPACE },
            { id: "camsList", type: WIDGET.STACK },
            { id: "camsSpace", type: WIDGET.SPACE },
            { id: "karvyList", type: WIDGET.INPUT },
            { id: "karvySpace", type: WIDGET.SPACE },
            {
                id: "continue",
                type: WIDGET.BUTTON,
                position: POSITION.ABSOLUTE_BOTTOM,
            },
            {
                id: "skip",
                type: WIDGET.BUTTON,
                position: POSITION.ABSOLUTE_BOTTOM,
            },
        ],
    },
    datastore: <Datastore>{
        header: <HeaderProps & WidgetProps>{
            isBackButton: true,
            type: HeaderTypeTokens.verification,
            stepperProps: <StepperProps>{
                data: stepper,
                type: StepperTypeTokens.HORIZONTAL,
            },
            title: "Create new applications",
            action: {
                type: ACTION.GO_BACK,
                routeId: ROUTE.DISTRIBUTOR_PORTFOLIO,
                payload: {},
            },

        },
        space0: <SpaceProps>{ size: SizeTypeTokens.SM },
        space1: <SpaceProps>{ size: SizeTypeTokens.XXXL },
        camsList: <ListItemProps>{
            customTitle: {
                label: "Fetch from CAMS",
                fontSize: FontSizeTokens.XL,
                fontWeight: '600',
                fontFamily: FontFamilyTokens.Inter,
                lineHeight: 24,
                color: ColorTokens.Grey_Night
            },
            customSubTitle: {
                label: "We need OTP authentication in the next screen",
                fontSize: FontSizeTokens.LG,
                fontWeight: '400',
                fontFamily: FontFamilyTokens.Inter,
                lineHeight: 18,
                color: ColorTokens.Grey_Charcoal
            },
            trailLabel: <TypographyProps>{
                label: "Fetch",
                fontSize: FontSizeTokens.LG,
                fontWeight: '700',
                color: ColorTokens.Primary_100
            },
            isDivider:true
        },
        camsSpace:<SpaceProps>{
            size:SizeTypeTokens.SM
        },
        karvyList: <ListItemProps>{
            customTitle: {
                label: "Fetch from Karvy",
                fontSize: FontSizeTokens.XL,
                fontWeight: '600',
                fontFamily: FontFamilyTokens.Inter,
                lineHeight: 24,
                color: ColorTokens.Grey_Night
            },
            customSubTitle: {
                label: "We need OTP authentication in the next screen",
                fontSize: FontSizeTokens.LG,
                fontWeight: '400',
                fontFamily: FontFamilyTokens.Inter,
                lineHeight: 18,
                color: ColorTokens.Grey_Charcoal
            },
            trailLabel: <TypographyProps>{
                label: "Fetch",
                fontSize: FontSizeTokens.LG,
                fontWeight: '700',
                color: ColorTokens.Primary_100
            },
            isDivider:true
        },
        karvySpace:<SpaceProps>{
            size:SizeTypeTokens.SM
        },
        continue: <ButtonProps & WidgetProps>{
            label: "Save & Contiune",
            type: ButtonTypeTokens.LargeFilled,
            width: ButtonWidthTypeToken.FULL,
            action: {
                type: ACTION.ON_SAVE,
                routeId: ROUTE.DISTRIBUTOR_PORTFOLIO,
                payload: <{}>{},
            },
        },
        skip: <ButtonProps & WidgetProps>{
            label: "Skip for now",
            type: ButtonTypeTokens.LargeGhost,
            width: ButtonWidthTypeToken.FULL,
            action: {
                type: ACTION.ON_SKIP,
                routeId: ROUTE.DISTRIBUTOR_PORTFOLIO,
                payload: <{}>{},
            },
        },
    },
});

export const distributorPortfolioMF: PageType<any> = {
    onLoad: async ({ }, { }) => {
        const stepper: StepperItem[] = await horizontalStepperRepo(true);
        return Promise.resolve(template(stepper));
    },
    actions: {
        [ACTION.ON_SAVE]: onSave,
        [ACTION.ON_SKIP]: onSkip,
        [ACTION.GO_BACK]: onSkip,
    },

    clearPrevious: true,
};
