import { ActionFunction } from "@voltmoney/types";
import { FetchPortfolioPayload } from "./types";
import { api, StoreKey } from "../../configs/api";

export const fetchMyPortfolio: ActionFunction<FetchPortfolioPayload> = async (
  action,
  _datastore,
  { asyncStorage, ...props }
): Promise<any> => {
  const token = await asyncStorage.get(StoreKey.accessToken);
  const headers = new Headers();
  headers.append("accept", "application/json");
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("X-AppPlatform", "SDK_KFIN");
  headers.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    ...action.payload,
    assetRepository: "CAMS",
    applicationId: "1234",
    emailId: "soumya.sethy@voltmoney.in",
    panNumber: "EDZPS7363L",
    phoneNumber: "+918763666620",
  });

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
  };

  await fetch(api.pledgeInit, requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
