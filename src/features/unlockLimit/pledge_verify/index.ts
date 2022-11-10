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
    ColorTokens,
    FontFamilyTokens,
    FontSizeTokens,
    IconProps,
    IconSizeTokens,
    IconTokens,
    InputStateToken,
    InputTypeToken,
    KeyboardTypeToken,
    SizeTypeTokens,
    SpaceProps,
    StackAlignItems,
    StackJustifyContent,
    StackProps,
    StackType,
    TextInputProps,
    TypographyProps,
    WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import {
    ACTION,
    OtpPayload,
} from "./types";
import { verifyOTP } from "./actions";
import { fetchUserRepo } from "./repo";
export const template: (
    phoneNumber: string
) => TemplateSchema = (phoneNumber) => ({

    //export const template: TemplateSchema = {
    layout: <Layout>{
        id: ROUTE.PLEDGE_VERIFY,
        type: LAYOUTS.MODAL,
        widgets: [
            {
                id: "headerStack",
                type: WIDGET.STACK,
            },
            { id: "titleSpace", type: WIDGET.SPACE },
            { id: "subTitle", type: WIDGET.TEXT },
            { id: "subTitleSpace", type: WIDGET.SPACE },
            { id: "input", type: WIDGET.INPUT },
            { id: "inputSpace", type: WIDGET.SPACE },


        ],
    },
    datastore: <Datastore>{
        headerStack: <StackProps>{
            type: StackType.row,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.spaceBetween,
            widgetItems: [
                { id: "title", type: WIDGET.TEXT },
                { id: "leadIcon", type: WIDGET.ICON },
            ],
        },
        title: <TypographyProps>{
            label: "Enter OTP",
            fontSize: FontSizeTokens.XL,
            color: ColorTokens.Grey_Night,
            fontFamily: FontFamilyTokens.Poppins,
            fontWeight: "600",
        },
        leadIcon: <IconProps>{
            name: IconTokens.Cancel,
            size: IconSizeTokens.MD,
            color: ColorTokens.Grey_Night

        },
        titleSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
        subTitle: <TypographyProps>{
            label: "A 4-digit OTP was sent on " + `${phoneNumber}`,
            color: ColorTokens.Grey_Charcoal,
            fontSize: FontSizeTokens.SM,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "400",
        },
        subTitleSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
        input: <TextInputProps & WidgetProps>{
            type: InputTypeToken.OTP,
            state: InputStateToken.DEFAULT,
            charLimit: 4,
            keyboardType: KeyboardTypeToken.numberPad,
            action: {
                type: ACTION.PLEDGE_VERIFY,
                payload: <OtpPayload>{ value: "", widgetId: "input" },
                routeId: ROUTE.PLEDGE_VERIFY,
            },
        },
        inputSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
        message: <TypographyProps>{
            label: "Resend OTP in 14 secs",
            fontSize: FontSizeTokens.XS,
            color: ColorTokens.Grey_Charcoal,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "400",
        },

    },
});

export const pledgeVerifyMF: PageType<any> = {

    onLoad: async () => {
        const response = await fetchUserRepo();
        const phoneNumber = response.user.phoneNumber;
        return Promise.resolve(template(phoneNumber))
    },

    actions: {
        [ACTION.PLEDGE_VERIFY]: verifyOTP,
    },
};
