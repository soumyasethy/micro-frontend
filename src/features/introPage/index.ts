import {Datastore, Layout, LAYOUTS, PageType, POSITION, TemplateSchema, WidgetProps,} from "@voltmoney/types";
import {
    AspectRatioToken,
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
    ImageProps,
    ImageSizeTokens,
    ResizeModeToken,
    SizeTypeTokens,
    SpaceProps,
    StackAlignItems,
    StackProps,
    StackType,
    TypographyProps,
    WIDGET,
} from "@voltmoney/schema";
import {ROUTE} from "../../routes";
import {ACTION} from "./type";
import {ApplyNowAction} from "./action";

export const template: (props)=>TemplateSchema = (props)=>({
    layout: <Layout>{
        id: ROUTE.TEST_PAGE,
        type: LAYOUTS.LIST,
        widgets: [
            { id: 'header', type: WIDGET.HEADER, position: POSITION.ABSOLUTE_TOP},
            { id: 'space1', type: WIDGET.SPACE },
            { id: 'image', type: WIDGET.IMAGE },
            { id: 'space2', type: WIDGET.SPACE },
            { id: 'text1', type: WIDGET.TEXT },
            { id: 'space3', type: WIDGET.SPACE },
            { id: 'text2', type: WIDGET.TEXT },
            { id: 'space6', type: WIDGET.SPACE },
            { id: 'benefitStackItem1', type: WIDGET.STACK },
            { id: 'space7', type: WIDGET.SPACE },
            { id: 'benefitStackItem2', type: WIDGET.STACK },
            { id: 'space8', type: WIDGET.SPACE },
            { id: 'benefitStackItem3', type: WIDGET.STACK },
            { id: 'space9', type: WIDGET.SPACE },
            { id: 'benefitStackItem4', type: WIDGET.STACK },
            { id: 'applyNowButtom', type: WIDGET.BUTTON, position: POSITION.ABSOLUTE_BOTTOM }
        ],
    },
    datastore: <Datastore>{
        image: <ImageProps>{
            size: ImageSizeTokens.FULL,
            resizeMode: ResizeModeToken.COVER,
            aspectRatio: AspectRatioToken.A2_1,
            uri: "https://volt-images.s3.ap-south-1.amazonaws.com/stepper.svg",
        },
        header: <HeaderProps>{
            type: HeaderTypeTokens.DEFAULT,
            isBackButton: false,
            title: 'Loan against MF'
        },
        text1: <TypographyProps> {
            label: 'Don’t redeem it, Lein it instead',
            fontFamily: FontFamilyTokens.Poppins,
            fontSize: FontSizeTokens.MD,
            fontWeight: '600',
            lineHeight: 24,
            color: ColorTokens.Grey_Night
        },
        text2: <TypographyProps> {
            label: 'Don’t sacrifice your long term goals for short term needs',
            fontFamily: FontFamilyTokens.Inter,
            fontSize: FontSizeTokens.SM,
            fontWeight: '400',
            lineHeight: 24,
            numberOfLines: 2,
            color: ColorTokens.Grey_Night
        },
        benefitStackItem1: <StackProps> {
            type: StackType.row,
            alignItems: StackAlignItems.center,
            widgetItems: [
                { id: 'successIcon', type: WIDGET.ICON },
                { id: 'space5', type: WIDGET.SPACE },
                { id: 'benefitText1', type: WIDGET.TEXT }
            ]
        },
        benefitStackItem2: <StackProps> {
            type: StackType.row,
            alignItems: StackAlignItems.center,
            widgetItems: [
                { id: 'successIcon', type: WIDGET.ICON },
                { id: 'space12', type: WIDGET.SPACE },
                { id: 'benefitText2', type: WIDGET.TEXT }
            ]
        },
        benefitStackItem3: <StackProps> {
            type: StackType.row,
            alignItems: StackAlignItems.center,
            widgetItems: [
                { id: 'successIcon', type: WIDGET.ICON },
                { id: 'space10', type: WIDGET.SPACE },
                { id: 'benefitText3', type: WIDGET.TEXT }
            ]
        },
        benefitStackItem4: <StackProps> {
            type: StackType.row,
            alignItems: StackAlignItems.center,
            widgetItems: [
                { id: 'successIcon', type: WIDGET.ICON },
                { id: 'space11', type: WIDGET.SPACE },
                { id: 'benefitText4', type: WIDGET.TEXT }
            ]
        },
        benefitText1: <TypographyProps> {
          label: 'Get up to Rs. 50L in 5 minutes',
          fontWeight: '500',
          fontSize: FontSizeTokens.SM,
          fontFamily: FontFamilyTokens.Inter,
          lineHeight: 24,
          color: ColorTokens.Grey_Charcoal
        },
        benefitText2: <TypographyProps> {
            label: 'Only pay interest for what you withdraw',
            fontWeight: '500',
            fontSize: FontSizeTokens.SM,
            fontFamily: FontFamilyTokens.Inter,
            lineHeight: 24,
            color: ColorTokens.Grey_Charcoal
        },
        benefitText3: <TypographyProps> {
            label: 'Interest rates starting at 9%',
            fontWeight: '500',
            fontSize: FontSizeTokens.SM,
            fontFamily: FontFamilyTokens.Inter,
            lineHeight: 24,
            color: ColorTokens.Grey_Charcoal
        },
        benefitText4: <TypographyProps> {
            label: '100% digital, no paperwork',
            fontWeight: '500',
            fontSize: FontSizeTokens.SM,
            fontFamily: FontFamilyTokens.Inter,
            lineHeight: 24,
            color: ColorTokens.Grey_Charcoal
        },
        successIcon: <IconProps> {
          name: IconTokens.SystemSuccess,
          size: IconSizeTokens.LG,
          color: ColorTokens.Grey_Charcoal
        },
        applyNowButtom: <ButtonProps & WidgetProps> {
            label: 'Apply now',
            type: ButtonTypeTokens.LargeSoftFilled,
            width: ButtonWidthTypeToken.FULL,
            action: {
                routeId: ROUTE.INTRO_PAGE,
                type: ACTION.APPLY_NOW,
                payload: {props}
            }
        },
        space1: <SpaceProps> {
            size: SizeTypeTokens.XL
        },
        space2: <SpaceProps> {
            size: SizeTypeTokens.Size32
        },
        space3: <SpaceProps> {
            size: SizeTypeTokens.SM
        },
        space4: <SpaceProps> {
            size: SizeTypeTokens.XL
        },
        space5: <SpaceProps> {
            size: SizeTypeTokens.MD
        },
        space6: <SpaceProps> {
            size: SizeTypeTokens.XL
        },
        space7: <SpaceProps> {
            size: SizeTypeTokens.XL
        },
        space8: <SpaceProps> {
            size: SizeTypeTokens.XL
        },
        space9: <SpaceProps> {
            size: SizeTypeTokens.XL
        },
        space10: <SpaceProps> {
            size: SizeTypeTokens.MD
        },
        space11: <SpaceProps> {
            size: SizeTypeTokens.MD
        },
        space12: <SpaceProps> {
            size: SizeTypeTokens.MD
        }
    },
});

export const introPageMF: PageType<any> = {
    onLoad: async ({}, { ...props }) => {
        return Promise.resolve(template(props))
    },
    actions: {
        [ACTION.APPLY_NOW]: ApplyNowAction,
    },
};
