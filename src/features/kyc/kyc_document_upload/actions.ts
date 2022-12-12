import { ActionFunction } from "@voltmoney/types";
import { AadharInitPayload } from "../kyc_init/types";
import { DocPayload } from "./types";

const responseDocLink = {
  frontDocURL:
    "https://account-secure-documents-alpha.s3.ap-south-1.amazonaws.com/cfa6d282-15e0-45d6-a1ee-25886eae7681-AADHAAR-FRONT?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221212T080133Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43199&X-Amz-Credential=AKIAWQKYFOIIO5P7CGSW%2F20221212%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=d43999bdbdb3ee4fd00caf344c47b38a20eab696e34ec5f2627e9320cabcd4c5",
  backDocURL:
    "https://account-secure-documents-alpha.s3.ap-south-1.amazonaws.com/cfa6d282-15e0-45d6-a1ee-25886eae7681-AADHAAR-BACK?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221212T080133Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=AKIAWQKYFOIIO5P7CGSW%2F20221212%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=c76594d4aa1e092bf77c3a839c2e2ea1ab6af9f59dad2272090e34393c018b7b",
};

export const GoBackAction: ActionFunction<AadharInitPayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};
export const documentPickerAction: ActionFunction<DocPayload> = async (
  action,
  _datastore,
  { network }
): Promise<any> => {
  const headers = {
    "Content-Type": "application/pdf",
  };
  console.warn("documentPickerAction", action, headers);
  if (action.payload.value) {
    const response = await network.put(
      action.payload.widgetID === "frontSide"
        ? responseDocLink.frontDocURL
        : responseDocLink.backDocURL,
      action.payload.value.content,
      {
        headers: { ...headers },
      }
    );
    console.warn("response", response);
  }
};
