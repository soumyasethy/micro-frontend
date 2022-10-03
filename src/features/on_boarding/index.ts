import { LAYOUTS, PageType, POSITION, TemplateSchema } from "@voltmoney/types";
import { ButtonTypeTokens, WIDGET } from "@voltmoney/schema";

export const template: TemplateSchema = {
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

export const onboardMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: {},
};
