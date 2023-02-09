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
  /*** check if the user has pledged any mf portfolio */
  console.log("more mf portfolio");
  const assetRepoMap = {};
  /*** Get unique asset repository from the cas list */
  for (let i = 0; i < action.payload.casList.length; i++) {
    const item = action.payload.casList[i];
    assetRepoMap[item.assetRepository] = true;
  }
  /*** Change page view type LAYOUT.LIST to LAYOUT.MODAL */
  await SharedPropsService.setConfig(
    ConfigTokens.IS_MF_FETCH_BACK_ALLOWED,
    true
  );
  /*** switch between assetRepositoryType */
  for (const assetRepositoryType of Object.keys(assetRepoMap)) {
    if (assetRepositoryType === AssetRepositoryType.KARVY) {
      await SharedPropsService.setAssetRepositoryType(AssetRepositoryType.CAMS);
    } else if (assetRepositoryType === AssetRepositoryType.CAMS) {
      await SharedPropsService.setAssetRepositoryType(
        AssetRepositoryType.KARVY
      );
    }
  }
  /*** disable pan edit option */
  await SharedPropsService.setConfig(ConfigTokens.IS_PAN_EDIT_ALLOWED, false);
  /*** Enable auto otp trigger when user lands on MF_Fetch */
  await SharedPropsService.setConfig(
    ConfigTokens.IS_MF_FETCH_AUTO_TRIGGER_OTP,
    true
  );
  /*** Go to re-fetch portfolio from other Asset Type **/
  await navigate(ROUTE.PORTFOLIO_FROM_RTA);
  /*** remove fetch more asset type option from UI */
  // await removeGetMorePortfolio(
  //   {
  //     type: ACTION.REMOVE_GET_MORE_MF_PORTFOLIO,
  //     routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
  //     payload: {},
  //   },
  //   {},
  //   { navigate, ...props }
  // );
};

