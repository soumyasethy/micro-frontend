import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  TemplateSchema,
  WidgetProps,
} from "@voltmoney/types";
import {
  VerificationCardTypeTokens,
  VerificationCardButtonTypeToken,
  VerificationCardProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { ACTION } from "./types";
import { CameraAction } from "./actions";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.TEST_PAGE,
    type: LAYOUTS.MODAL,
    widgets: [{ id: "verify", type: WIDGET.VERIFICATIONCARD }],
  },
  datastore: <Datastore>{
    verify: <VerificationCardProps & WidgetProps>{
      buttonText: "Submit",
      buttonType: VerificationCardButtonTypeToken.FULL,
      label: "Take photo",
      message: "Note: This will help to verify your identity",
      type: VerificationCardTypeTokens.Default,
      action: {
        type: ACTION.CAMERA_ACTION,
        routeId: ROUTE.CAMERA_OPEN,
        payload: {},
      },
    },
  },
};

export const cameraOpenMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: {
    [ACTION.CAMERA_ACTION]: CameraAction,
  },
};
