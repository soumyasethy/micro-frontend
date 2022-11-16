import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  TemplateSchema,
  WidgetProps,
} from "@voltmoney/types";
import {
  IconSizeTokens,
  IconTokens,
  VerificationCardButtonTypeToken,
  VerificationCardProps,
  VerificationCardTypeTokens,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION } from "./types";
import { CameraConfirmAction } from "./actions";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.KYC_PHOTO_VERIFICATION,
    type: LAYOUTS.MODAL,
    widgets: [{ id: "verify", type: WIDGET.VERIFICATIONCARD }],
  },
  datastore: <Datastore>{
    verify: <VerificationCardProps & WidgetProps>{
      iconName: IconTokens.Camera,
      icon: { name: IconTokens.Camera, size: IconSizeTokens.XXXXL },
      buttonText: "Open Camera",
      buttonType: VerificationCardButtonTypeToken.FULL,
      label: "Take photo",
      message: "Note: This will help to verify your identity",
      type: VerificationCardTypeTokens.Default,
      action: {
        type: ACTION.CAMERA_ACTION,
        routeId: ROUTE.KYC_PHOTO_VERIFICATION,
        payload: {},
      },
    },
  },
};

export const cameraOpenMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: {
    [ACTION.CAMERA_ACTION]: CameraConfirmAction,
  },
};
