import { LAYOUTS, POSITION, } from "@voltmoney/types";
import { ButtonTypeTokens, ButtonWidthTypeToken, IconTokens, keyboardTypeToken, WIDGET, } from "@voltmoney/schema";
export const template = {
    layout: {
        id: "PAGE_NAME",
        type: LAYOUTS.LIST,
        widgets: [
            { id: "back", type: WIDGET.BUTTON, position: POSITION.FIXED_TOP },
            { id: "continue", type: WIDGET.BUTTON, position: POSITION.FIXED_BOTTOM },
            { id: "title", type: WIDGET.TEXT },
            { id: "subTitle", type: WIDGET.TEXT },
            { id: "input", type: WIDGET.INPUT },
        ],
    },
    datastore: {
        back: {
            // label: "back",
            type: ButtonTypeTokens.LargeElevated,
            icon: { name: IconTokens.Back },
        },
        continue: {
            label: "continue",
            type: ButtonTypeTokens.LargeElevated,
            width: ButtonWidthTypeToken.FULL,
        },
        title: { label: "Verify your email id" },
        subTitle: {
            label: "Your Volt app will only work with this email id",
        },
        input: {
            caption: "Enter your other email",
            title: "Email id",
            keyboardType: keyboardTypeToken.email,
        },
    },
};
export const onboardMF = {
    onLoad: async () => Promise.resolve(template),
    actions: {},
};
