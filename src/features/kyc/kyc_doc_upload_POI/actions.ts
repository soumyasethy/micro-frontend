import { ActionFunction } from "@voltmoney/types";
import { AadharInitPayload } from "../kyc_init/types";
import { DocumentUploadPayload } from "./types";
import { DropDownPayload } from "../kyc_additional_details/types";
import { ROUTE } from "../../../routes";
import {
  ButtonProps,
  ButtonTypeTokens,
  DocumentPickerProps,
  DocumentPickerState,
} from "@voltmoney/schema";
import { api } from "../../../configs/api";
import SharedPropsService from "../../../SharedPropsService";
import { StepStatusMap, User } from "../../login/otp_verify/types";
import { getAppHeader } from "../../../configs/config";
import { nextStepCredStepper, uploadToS3Bucket } from "../../../configs/utils";
import _ from "lodash";
import { Platform } from "react-native";

let documentUploadUrlMap = {
  frontDocURL: null,
  backDocURL: null,
};

const validation = {
  isFrontDocUploaded: false,
  isBackDocUploaded: false,
};

export const GoBackAction: ActionFunction<AadharInitPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await navigate(ROUTE.KYC_STEPPER);
};
export const triggerAction: ActionFunction<AadharInitPayload> = async (
  action,
  _datastore,
  { setDatastore, network, navigate }
): Promise<any> => {
  const user: User = await SharedPropsService.getUser();
  const applicationId = user.linkedApplications[0].applicationId;

  await setDatastore(ROUTE.KYC_DOCUMENT_UPLOAD_POI, "continue", <ButtonProps>{
    loading: true,
  });

  const response = await network.get(
    `${api.documentValidatePOI}${applicationId}`,
    { headers: await getAppHeader() }
  );
  await setDatastore(ROUTE.KYC_DOCUMENT_UPLOAD_POI, "continue", <ButtonProps>{
    loading: false,
  });

  const currentStepId = _.get(
    response,
    "data.updatedApplicationObj.currentStepId"
  );
  const stepStatusMap: StepStatusMap = _.get(
    response,
    "data.updatedApplicationObj.stepStatusMap"
  );

  if (
    currentStepId == undefined ||
    currentStepId == "KYC_DOCUMENT_UPLOAD_POI"
  ) {
    return;
  } else {
    user.linkedApplications[0].currentStepId = currentStepId;
    user.linkedApplications[0].stepStatusMap = stepStatusMap;
  }

  if (currentStepId) {
    await SharedPropsService.setUser(user);
    const routeObj = await nextStepCredStepper();
    await navigate(routeObj.routeId, routeObj.params);
  }
};

export const documentPickerAction: ActionFunction<
  DocumentUploadPayload
> = async (
  action,
  _datastore,
  { network, setDatastore }
): Promise<any> => {
  if (action.payload.value) {
    let fileExtension = "";
    if (action.payload.value.name === undefined) {
      fileExtension = action.payload.value.fileName.split(".").pop();
    } else {
      fileExtension = action.payload.value.name.split(".").pop();
    }
    await setDatastore(ROUTE.KYC_DOCUMENT_UPLOAD_POI, action.payload.widgetID, <
      DocumentPickerProps
    >{
      state: DocumentPickerState.LOADING,
    });
    if (Platform.OS === "android") {
      uploadToS3Bucket(
        documentUploadUrlMap.frontDocURL,
        action.payload.value,
        await getContentType(fileExtension)
      )
        .then(async () => {
          validation.isFrontDocUploaded = true;
          await setDatastore(
            ROUTE.KYC_DOCUMENT_UPLOAD_POI,
            action.payload.widgetID,
            <DocumentPickerProps>{
              state: DocumentPickerState.SUCCESS,
            }
          );
          await setDatastore(ROUTE.KYC_DOCUMENT_UPLOAD_POI, "continue", <
            ButtonProps
          >{
            type: ButtonTypeTokens.LargeFilled,
          });

          return;
        })
        .catch(async () => {
          await setDatastore(
              ROUTE.KYC_DOCUMENT_UPLOAD_POI,
              action.payload.widgetID,
              <DocumentPickerProps>{
                state: DocumentPickerState.DEFAULT,
              }
          );

         });

      // uploadImage(action.payload.value,documentUploadUrlMap.frontDocURL, fileExtension, action.payload.value.type)
    }

    const response = await network.put(
      action.payload.widgetID === "frontSide"
        ? documentUploadUrlMap.frontDocURL
        : documentUploadUrlMap.backDocURL,
      action.payload.value,
      {
        headers: { "Content-Type": getContentType(fileExtension) },
      }
    );
    if (response.status === 200) {
      if (action.payload.widgetID === "frontSide") {
        validation.isFrontDocUploaded = true;
      }

      await setDatastore(
        ROUTE.KYC_DOCUMENT_UPLOAD_POI,
        action.payload.widgetID,
        <DocumentPickerProps>{
          state: DocumentPickerState.SUCCESS,
        }
      );
    } else {
      await setDatastore(
        ROUTE.KYC_DOCUMENT_UPLOAD_POI,
        action.payload.widgetID,
        <DocumentPickerProps>{
          state: DocumentPickerState.DEFAULT,
        }
      );
    }
  }
  if (validation.isFrontDocUploaded) {
    await setDatastore(ROUTE.KYC_DOCUMENT_UPLOAD_POI, "continue", <ButtonProps>{
      type: ButtonTypeTokens.LargeFilled,
    });
  } else {
    await setDatastore(ROUTE.KYC_DOCUMENT_UPLOAD_POI, "continue", <ButtonProps>{
      type: ButtonTypeTokens.LargeOutline,
    });
  }
};


export const onPageLoad: ActionFunction<DropDownPayload> = async (
  action,
  _datastore,
  { network, removeWidgets, appendWidgets, setDatastore }
): Promise<any> => {
  validation.isFrontDocUploaded = false;
  await setDatastore(ROUTE.KYC_DOCUMENT_UPLOAD_POI, "continue", <ButtonProps>{
    type: ButtonTypeTokens.LargeOutline,
  }); // reset continue button

  const applicationId = (await SharedPropsService.getUser())
    .linkedApplications[0].applicationId;

  const documentUrlResponse = await network.post(
    `${api.kycDocumentPOI}${applicationId}`,
    { documentType: "PAN" },
    { headers: await getAppHeader() }
  );

  documentUploadUrlMap = documentUrlResponse.data.stepResponseObject;

  // await SharedPropsService.setDocumentUploadUrlMap(documentUploadUrlMap);

  // const datastore: Datastore = {
  //   frontSide: <DocumentPickerProps & WidgetProps>{
  //     titleLabel: "Front side",
  //     ctaLabel: "Upload",
  //     state: DocumentPickerState.DEFAULT,
  //     action: {
  //       type: ACTION.SELECT_DOCUMENT,
  //       routeId: ROUTE.KYC_DOCUMENT_UPLOAD_POI,
  //       payload: <DocumentUploadPayload>{
  //         value: { content: null, name: null },
  //         widgetID: "frontSide",
  //       },
  //     },
  //   },
  // };

  // if (documentUploadUrlMap.backDocURL !== null) {
  //   datastore["frontSideSpace"] = <SpaceProps>{ size: SizeTypeTokens.XXXL };
  //   datastore["backSide"] = <DocumentPickerProps & WidgetProps>{
  //     titleLabel: "Back side",
  //     ctaLabel: "Upload",
  //     state: DocumentPickerState.DEFAULT,
  //     action: {
  //       type: ACTION.SELECT_DOCUMENT,
  //       routeId: ROUTE.KYC_DOCUMENT_UPLOAD_POI,
  //       payload: <DocumentUploadPayload>{
  //         value: { content: null, name: null },
  //         widgetID: "backSide",
  //       },
  //     },
  //   };
  // }

  // await appendWidgets(
  //   ROUTE.KYC_DOCUMENT_UPLOAD_POI,
  //   datastore,
  //   [
  //     { id: "frontSide", type: WIDGET.DOCUMENT_PICKER },
  //     { id: "frontSideSpace", type: WIDGET.SPACE },
  //     { id: "backSide", type: WIDGET.DOCUMENT_PICKER },
  //   ],
  //   "dropDownSpace"
  // );
};

const getContentType = (fileExtension) => {
  switch (fileExtension) {
    case "pdf":
      return "application/pdf";
    case "png":
      return "image/png";
    case "jpg":
      return "image/jpeg";
    case "jpeg":
      return "image/jpeg";
    default:
      return "application/pdf";
  }
};
