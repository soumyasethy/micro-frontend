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
  CameraPickerProps,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { ACTION, CameraPayload } from "./types";
import { CameraAction } from "./actions";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.CAMERA_CAPTURE,
    type: LAYOUTS.LIST,
    widgets: [
      // { id: "verify", type: WIDGET.VERIFICATIONCARD },
      { id: "camera", type: WIDGET.CAMERA },
    ],
  },
  datastore: <Datastore>{
    camera: <CameraPickerProps & WidgetProps>{
      action: {
        type: ACTION.CAMERA_ACTION,
        routeId: ROUTE.CAMERA_CAPTURE,
        payload: <CameraPayload>{ value: "" },
      },
    },
    // verify: <VerificationCardProps & WidgetProps>{
    //   buttonText: "Submit",
    //   buttonType: VerificationCardButtonTypeToken.FULL,
    //   label: "Take photo",
    //   message: "Note: This will help to verify your identity",
    //   type: VerificationCardTypeTokens.Default,
    //   action: {
    //     type: ACTION.CAMERA_ACTION,
    //     routeId: ROUTE.CAMERA_CAPTURE,
    //     payload: <CameraPayload>{ value: "" },
    //   },
    // },
  },
};

export const cameraCaptureMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: {
    [ACTION.CAMERA_ACTION]: CameraAction,
  },
};
