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
            label: 'Confirmation in progress',
            message: 'Its taking longer than usual to verify the account. It takes time to fetch data from depository.',
            type: VerificationCardTypeTokens.InProgress,
            icon: <IconProps>{
                name:"InProgress",
                size: IconSizeTokens.XXXXXXXL,
               // color: ColorTokens.Grey_Night
            }
          //  buttonType: VerificationCardButtonTypeToken.FULL,
            //buttonText: 'Submit'
           // action: '',
          },

    },
};

export const pledgeConfirmationLoadingMF: PageType<any> = {
    onLoad: async () => Promise.resolve(template),
    actions: {
        [ACTION.PLEDGE_VERIFY]: verifyPledging,
    },
};
