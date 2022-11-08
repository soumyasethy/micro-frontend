import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  TemplateSchema,
  WidgetProps,
} from "@voltmoney/types";
import {
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  SizeTypeTokens,
  SpaceProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { ACTION } from "./types";
import { TestAction } from "./actions";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.TEST_PAGE,
    type: LAYOUTS.MODAL,
    widgets: [
      { id: "space1", type: WIDGET.SPACE },
      { id: "button", type: WIDGET.BUTTON },
    ],
  },
  datastore: <Datastore>{
    space1: <SpaceProps>{ size: SizeTypeTokens.SM },
    button: <ButtonProps & WidgetProps>{
      label: "hello world",
      loading: true,
      type: ButtonTypeTokens.LargeFilled,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.TEST_ACTION,
        routeId: ROUTE.TEST_PAGE,
        payload: { hello: "world" },
      },
    },
  },
};

export const testPageMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: {
    [ACTION.TEST_ACTION]: TestAction,
  },
};
