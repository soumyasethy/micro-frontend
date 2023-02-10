import { ActionFunction, Datastore, WidgetProps } from "@voltmoney/types";
import { StepResponseObject } from "../../mfPledge/unlock_limit/types";
import {
  ListItemDataProps,
  ListProps,
  ListTypeTokens,
} from "@voltmoney/schema";
import {
  addCommasToNumber,
  roundDownToNearestHundred,
} from "../../../configs/utils";
import {
  getPortfolioValue,
  getTotalLimit,
} from "../../mfPledge/portfolio_readonly/actions";
import { GetMoreMfPortfolioPayload } from "../unlock_limit_V2/types";
import SharedPropsService from "../../../SharedPropsService";
import { AssetRepositoryType, ConfigTokens } from "../../../configs/config";
import { ROUTE } from "../../../routes";

export const TestAction: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  console.warn("**** Test Action Triggered ****", action);
};

export const portfolioListDatastoreBuilder = async (
  stepResponseObject: StepResponseObject,
  pageType: string,
  searchKeyword: string = ""
): Promise<Datastore> => {
  const selectedMap = {};
  const listItemDataProps: ListItemDataProps[] = [];

  stepResponseObject.availableCAS.forEach((item, index) => {
    if (item.assetRepository !== pageType) {
      return;
    }

    const title = `₹${addCommasToNumber(
      roundDownToNearestHundred(
        getTotalLimit(
          [item],
          stepResponseObject.isinNAVMap,
          stepResponseObject.isinLTVMap
        )
      )
    )}`;

    const portfolioValue = `Value ${addCommasToNumber(
      roundDownToNearestHundred(
        getPortfolioValue([item], stepResponseObject.isinNAVMap)
      )
    )}`;

    listItemDataProps.push({
      label: item.schemeName,
      info: "",
      trailTitle: title,
      trailSubTitle: "",
      secondaryText: portfolioValue,
    });
  });

  const props = <ListProps & WidgetProps>{
    type: ListTypeTokens.CHECKLIST,
    data: [
      ...listItemDataProps.filter((item) =>
        JSON.stringify(item.label.toUpperCase()).includes(
          searchKeyword.toUpperCase()
        )
      ),
    ],
    selectedMap: { ...selectedMap },
  };

  const datastoreObj: Datastore = {
    listItem: <ListProps & WidgetProps>{
      hideCheck: true,
      ...props,
    },
  };
  return datastoreObj;
};

export const goBackAction: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  console.warn("**** goBack Action Triggered ****", action);
  goBack();
};


export const getMoreMfPortfolio: ActionFunction<
  GetMoreMfPortfolioPayload
> = async (action, _datastore, { navigate, ...props }): Promise<any> => {
  /*** Change page view type LAYOUT.LIST to LAYOUT.MODAL */
  await SharedPropsService.setConfig(
    ConfigTokens.IS_MF_FETCH_BACK_ALLOWED,
    true
  );

  /*** disable pan edit option */
  await SharedPropsService.setConfig(ConfigTokens.IS_PAN_EDIT_ALLOWED, false);
  /*** Enable auto otp trigger when user lands on MF_Fetch */
  await SharedPropsService.setConfig(
    ConfigTokens.IS_MF_FETCH_AUTO_TRIGGER_OTP,
    true
  );
  /*** Go to re-fetch portfolio from other Asset Type **/
  await navigate(ROUTE.MF_FETCH_PORTFOLIO, {setIsUserLoggedIn: true,
    assetRepository: action.payload.assetRepository });

};

