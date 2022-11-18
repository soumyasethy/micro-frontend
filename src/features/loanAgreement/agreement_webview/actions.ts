import { ActionFunction } from "@voltmoney/types";
import { polingDataRepo } from "./repo";
import { ACTION, TestActionPayload } from "./types";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import { api } from "../../../configs/api";
import _ from "lodash";
import { getAppHeader } from "../../../configs/config";

export const getPolingData: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, setDatastore, showPopup, network }
): Promise<any> => {

  const applicationId = (await SharedPropsService.getUser())
    .linkedApplications[0].applicationId;

  const getApiLoad = async () => {
    await network.get(
      `${api.agreementStatus}${applicationId}`,
      { headers: await getAppHeader() }
    );
  }

  const getLoaderStatus = () => {
    setInterval(getApiLoad, 10000);
  }

  const response = getLoaderStatus();

  if (
    _.get(
      response,
      "data.status",
      "NOT_COMPLETED"
    ) === "SUCCESS"
  ) {

    navigate(ROUTE.LOAN_AGREEMENT);
    await showPopup({
      type: "SUCCESS",
      title: "Agreement submitted!",
      subTitle: "Congratulations! Your loan application is created successfully.",
      ctaLabel: "Withdraw now",
      ctaAction: action
    });
  } 
};

export const GoNext: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  await navigate(ROUTE.LOAN_REPAYMENT);
};
export const GoBack: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  goBack();
};