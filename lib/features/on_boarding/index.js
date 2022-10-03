import { LAYOUTS, POSITION } from "@voltmoney/types";
import { ButtonTypeTokens, WIDGET } from "@voltmoney/schema";
export const template = {
    layout: {
        id: "PAGE_NAME",
        type: LAYOUTS.LIST,
        widgets: [
            { id: "text", type: WIDGET.BUTTON, position: POSITION.FIXED_BOTTOM },
        ],
    },
    datastore: {
        text: { label: "hello world", type: ButtonTypeTokens.LargeElevated },
    },
};
export const onboardMF = {
    onLoad: async () => Promise.resolve(template),
    actions: {},
};
