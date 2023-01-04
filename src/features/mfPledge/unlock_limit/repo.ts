import { api } from "../../../configs/api";
import SharedPropsService from "../../../SharedPropsService";
import { defaultHeaders } from "../../../configs/config";
import { AvailableCASItem } from "./types";

export const fetchBankRepo = async () => {
  const requestOptions = {
    method: "GET",
    headers: await defaultHeaders(),
  };
  const applicationId = (await SharedPropsService.getUser())
    .linkedApplications[0].applicationId;
  return await fetch(`${api.bav}${applicationId}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};

export const fetchPledgeLimitRepo = async () => {
  const user = await SharedPropsService.getUser();

  const requestOptions = {
    method: "GET",
    headers: await defaultHeaders(),
  };
  const applicationid = user.linkedApplications[0].applicationId;
  return await fetch(`${api.pledgeLimit}${applicationid}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};

export const PledgeCreateRepo = async (
  assetRepository: string,
  availableCASItem: AvailableCASItem[]
) => {
  const raw = JSON.stringify({
    applicationId: (await SharedPropsService.getUser()).linkedApplications[0]
      .applicationId,
    assetRepository,
    portfolioItemList: availableCASItem,
  });

  const requestOptions = {
    method: "POST",
    headers: await defaultHeaders(),
    body: raw,
  };

  return fetch(api.pledgeCreate, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.log("error", error);
      return error;
    });
};
