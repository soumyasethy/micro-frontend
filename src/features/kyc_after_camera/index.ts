import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  TemplateSchema,
} from "@voltmoney/types";
import { SizeTypeTokens, SpaceProps, WIDGET } from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { ACTION } from "./types";
import { TestAction } from "./actions";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.TEST_PAGE,
    type: LAYOUTS.MODAL,
    widgets: [{ id: "space1", type: WIDGET.SPACE }],
  },
  datastore: <Datastore>{
    space1: <SpaceProps>{ size: SizeTypeTokens.SM },
  },
};

export const kycAfterCameraMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: {
    [ACTION.TEST_ACTION]: TestAction,
  },
};
