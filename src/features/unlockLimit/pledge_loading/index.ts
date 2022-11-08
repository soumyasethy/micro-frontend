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
    InputStateToken,
    InputTypeToken,
    KeyboardTypeToken,
    SizeTypeTokens,
    SpaceProps,
    TextInputProps,
    TypographyProps,
    VerificationCardButtonTypeToken,
    VerificationCardProps,
    VerificationCardTypeTokens,
    WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import {
    ACTION,
    VerifyPayload,
} from "./types";
import { verifyPledging  } from "./actions";

export const template: TemplateSchema = {
    layout: <Layout>{
        id: ROUTE.PLEDGE_LOADING,
        type: LAYOUTS.MODAL,
        widgets: [
            { id: "space1", type: WIDGET.SPACE },
            { id: "alert", type: WIDGET.VERIFICATIONCARD },
          //  { id: "stack", type: WIDGET.STACK },
        ],
    },
    datastore: <Datastore>{
        
        space1: <SpaceProps>{ size: SizeTypeTokens.SM },
        alert: <VerificationCardProps & WidgetProps>{
            label: 'Pledging...',
            message: 'We’re fetching data from MF depositaries',
            type: VerificationCardTypeTokens.Default,
            icon: <IconProps>{
                name:"Volt",
                size: IconSizeTokens.XXXXXL
            },
            baseIcon: <IconProps>{
                name:"Rectangle",
                size: IconSizeTokens.XXXXXL
            },
            buttonType: VerificationCardButtonTypeToken.FULL,
           // action: '',
          },

    },
};

export const pledgeLoadingMF: PageType<any> = {
    onLoad: async () => Promise.resolve(template),
    actions: {
        [ACTION.PLEDGE_VERIFY]: verifyPledging,
    },
};
