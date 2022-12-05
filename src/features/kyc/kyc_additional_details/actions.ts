import { ActionFunction } from "@voltmoney/types";
import {
  ButtonProps,
  ButtonTypeTokens,
  IconProps,
  IconTokens,
} from "@voltmoney/schema";
import {
  DropDownPayload,
  EDUCATION,
  InputPayload,
  KycAdditionalDetailsPayload,
  MARITAL_STATUS,
  MaritalStatusPayload,
} from "./types";
import { AadharInitPayload } from "../kyc_init/types";
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import _ from "lodash";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import { User } from "../../login/otp_verify/types";

let martialStatus: MARITAL_STATUS = MARITAL_STATUS.SINGLE;
let fatherFirstName = "";
let fatherLastName = "";
let motherFirstName = "";
let motherLastName = "";
let qualification: EDUCATION = null;

export const onChangeInput: ActionFunction<InputPayload> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  switch (action.payload.widgetID) {
    case "fatherFirstNameInput": {
      fatherFirstName = action.payload.value;
      break;
    }
    case "fatherLastNameInput": {
      fatherLastName = action.payload.value;
      break;
    }
    case "motherFirstNameInput": {
      motherFirstName = action.payload.value;
      break;
    }
    case "motherLastNameInput": {
      motherLastName = action.payload.value;
      break;
    }
  }

  if (
    martialStatus &&
    fatherFirstName &&
    fatherLastName &&
    motherFirstName &&
    motherLastName &&
    qualification
  ) {
    await setDatastore(ROUTE.KYC_ADDITIONAL_DETAILS, "continue", <ButtonProps>{
      type: ButtonTypeTokens.LargeFilled,
    });
  }
};

export const onSelect: ActionFunction<DropDownPayload> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  qualification = action.payload.value;
  if (
    martialStatus &&
    fatherFirstName &&
    fatherLastName &&
    motherFirstName &&
    motherLastName &&
    qualification
  ) {
    await setDatastore(ROUTE.KYC_ADDITIONAL_DETAILS, "continue", <ButtonProps>{
      type: ButtonTypeTokens.LargeFilled,
    });
  }
};

export const toggleCTA: ActionFunction<MaritalStatusPayload> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  if (action.payload.value == MARITAL_STATUS.SINGLE) {
    await setDatastore(action.routeId, "singleRadio", <IconProps>{
      name: IconTokens.RadioCircleFilled,
    });
    await setDatastore(action.routeId, "marriedRadio", <IconProps>{
      name: IconTokens.RadioCircleNotFilled,
    });
    martialStatus = MARITAL_STATUS.SINGLE;
  } else if (action.payload.value == MARITAL_STATUS.MARRIED) {
    await setDatastore(action.routeId, "singleRadio", <IconProps>{
      name: IconTokens.RadioCircleNotFilled,
    });
    await setDatastore(action.routeId, "marriedRadio", <IconProps>{
      name: IconTokens.RadioCircleFilled,
    });
    martialStatus = MARITAL_STATUS.MARRIED;
  }

  if (
    martialStatus &&
    fatherFirstName &&
    fatherLastName &&
    motherFirstName &&
    motherLastName &&
    qualification
  ) {
    await setDatastore(ROUTE.KYC_ADDITIONAL_DETAILS, "continue", <ButtonProps>{
      type: ButtonTypeTokens.LargeFilled,
    });
  }
};

export const triggerCTA: ActionFunction<KycAdditionalDetailsPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, network }
): Promise<any> => {
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });
  const user: User = await SharedPropsService.getUser();
  const applicationId = user.linkedApplications[0].applicationId;
  const response = await network.post(
    `${api.additionalDetails}${applicationId}`,
    <KycAdditionalDetailsPayload>{
      maritalStatus: martialStatus,
      qualification: qualification,
      fatherFirstName: fatherFirstName,
      fatherLastName: fatherLastName,
      motherFirstName: motherFirstName,
      motherLastName: motherLastName,
    },
    {
      headers: await getAppHeader(),
    }
  );
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: false,
  });
  const currentStepId = _.get(
    response,
    "data.updatedApplicationObj.currentStepId"
  );
  const stepStatusMap = _.get(
    response,
    "data.updatedApplicationObj.stepStatusMap"
  );
  if (currentStepId) {
    user.linkedApplications[0].stepStatusMap = stepStatusMap;
    await SharedPropsService.setUser(user);
    await navigate(currentStepId);
  }
};

export const GoBackAction: ActionFunction<AadharInitPayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};
