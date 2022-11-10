import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  TemplateSchema,
  WidgetProps,
} from "@voltmoney/types";
import { WIDGET, CameraPickerProps } from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION, CameraPayload } from "./types";
import { CameraAction, CancelCameraAction } from "./actions";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.CAMERA_CAPTURE,
    type: LAYOUTS.LIST,
    widgets: [{ id: "camera", type: WIDGET.CAMERA, padding: {horizontal: 0} }],
  },
  datastore: <Datastore>{
    camera: <CameraPickerProps & WidgetProps>{
      action: {
        type: ACTION.CAMERA_ACTION,
        routeId: ROUTE.CAMERA_CAPTURE,
        payload: <CameraPayload>{ value: "" },
      },
      cancelAction: {
        type: ACTION.CANCEL_CAMERA,
        routeId: ROUTE.CAMERA_CAPTURE,
        payload: { value: "" },
      },
    },
  },
};

export const cameraCaptureMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: {
    [ACTION.CAMERA_ACTION]: CameraAction,
    [ACTION.CANCEL_CAMERA]: CancelCameraAction,
  },
};
