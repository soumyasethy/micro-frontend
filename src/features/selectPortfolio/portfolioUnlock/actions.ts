import { ActionFunction, SCREEN_SIZE } from "@voltmoney/types";
import {Share} from "react-native";
import { AssetsPayload
} from "./types";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import _ from "lodash";
import { partnerApi } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import { AvailableCASItem, IsinLTVMap, IsinNAVMap } from "../../fetchDistributorPortfolio/types";
import { getTotalLimit } from "../selectDistributorPortfolio/actions";
import { amountPayload } from "../pledged_amount/types";
import { getScreenType } from "../../../configs/platfom-utils";
import { Dimensions } from "react-native";
import { ButtonProps } from "@voltmoney/schema";

export const onSave: ActionFunction<{}> = async (action, _datastore, {navigate, ...props }): Promise<any> => {
  await navigate(ROUTE.SELECT_DISTRIBUTOR_PORTFOLIO);
};


const getUpdateAvailableCAS = (
  amountRequired: number,
  availableCAS: AvailableCASItem[],
  isinNavMap: IsinNAVMap,
  isinLTVMap: IsinLTVMap
) => {
  const updateAvailableCAS = [];
  for (let i = 0; i < availableCAS.length; i++) {
    let item: AvailableCASItem = availableCAS[i];
    let individualAmount = getTotalLimit([item], isinNavMap, isinLTVMap);
    if (amountRequired >= individualAmount) {
      updateAvailableCAS.push(item);
      amountRequired = amountRequired - individualAmount;
    } else {
      let ratio = amountRequired / individualAmount;
      let newItem = {
        ...item,
        pledgedUnits: Math.ceil(item.totalAvailableUnits * ratio * 1000) / 1000,
      };
      updateAvailableCAS.push(newItem);
      amountRequired = 0;
    }
  }

  if (amountRequired > 0) {
    /// throw error
    return [];
  }
  return updateAvailableCAS;
};

export const onSkip: ActionFunction<AssetsPayload> = async (action, _datastore, { navigate,...props }): Promise<any> => {
  
  // if (amount !== 0) {
  // }
  const stepResponseObject = action.payload.stepResponseObject;
  const updateAvailableCASMap = {};

 // if (amount > 0) {
  //const amount= 30000;
  const amount = action.payload.stepResponseObject.availableCreditAmount;
    stepResponseObject.availableCAS.forEach((item, index) => {
      stepResponseObject.availableCAS[index].pledgedUnits =
        item.totalAvailableUnits;
    });
    stepResponseObject.availableCAS = getUpdateAvailableCAS(
      amount,
      stepResponseObject.availableCAS,
      stepResponseObject.isinNAVMap,
      stepResponseObject.isinLTVMap
    );
    stepResponseObject.availableCAS.map((item, index) => {
      let key = `${item.isinNo}-${item.folioNo}`;
      updateAvailableCASMap[key] = item;
    });
  await SharedPropsService.setAvailableCASMap(updateAvailableCASMap);
  await navigate(ROUTE.SELECT_DISTRIBUTOR_PORTFOLIO, {
    stepResponseObject: stepResponseObject,
    updateAvailableCASMap,
  });
};


export const onCopy: ActionFunction<{}> =
    async (action, _datastore, { network, clipboard, setDatastore, ...props }): Promise<any> => {

        const applicationId = await SharedPropsService.getApplicationId();
        const Linkresponse = await network.get(
            `${partnerApi.referalLink}${applicationId}`,
            {
                headers: await getAppHeader(),
            }
        );
        const link = Linkresponse.data.link;
        const screenType = getScreenType(Dimensions.get("window").width);
        if (
            screenType === SCREEN_SIZE.X_SMALL ||
            screenType === SCREEN_SIZE.SMALL
        ) {
            try {
                const result = await Share.share({
                    message: `Hi\n\nUse Volt to open a credit line(OD) against mutual funds in 5 minutes with trusted lenders such as Bajaj Finance.\n\nInterest rates starting at 9%. Use this link to apply now.\n${link}\n`,
                });
                if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                        // shared with activity type of result.activityType
                    } else {
                        // shared
                    }
                } else if (result.action === Share.dismissedAction) {
                    // dismissed
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            clipboard.set(link);
        }

    };

export const onShare: ActionFunction<AssetsPayload> = async (action, _datastore, {setDatastore,network, navigate,...props }): Promise<any> => {
  
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });
  const applicationId = await SharedPropsService.getApplicationId();
  const portfolioItemList = action.payload.stepResponseObject.availableCAS;

   const response = await network.post(
        `${partnerApi.pledgeSave}`,
        {
          applicationId: applicationId,
          assetRepository: "CAMS",
          portfolioItemList: portfolioItemList,
        },
        { headers: await getAppHeader() }
      );
      await setDatastore(action.routeId, "continue", <ButtonProps>{
        loading: false,
      });
      navigate(ROUTE.INVESTOR);
    
};


export const goBackACtion: ActionFunction<amountPayload> = async (
  action,
  _datastore,
  {goBack }
): Promise<any> => {
  goBack();
};

