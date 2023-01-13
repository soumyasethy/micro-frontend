import { ActionFunction } from "@voltmoney/types";
import {
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  HeaderProps,
  TypographyProps,
} from "@voltmoney/schema";

import {
  ACTION, AssetsPayload, EditItemPayload
} from "./types";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import _ from "lodash";
import { partnerApi } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import { AvailableCASItem, IsinLTVMap, IsinNAVMap, LimitPayload } from "../../fetchDistributorPortfolio/types";
import { getTotalLimit } from "../selectDistributorPortfolio/actions";
import { amountPayload } from "../pledged_amount/types";


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
        pledgedUnits: Math.ceil(item.totalAvailableUnits * ratio * 100) / 100,
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
  // } else {
  //   stepResponseObject.availableCAS.map((item, index) => {
  //     let key = `${item.isinNo}-${item.folioNo}`;
  //     item.pledgedUnits = item.totalAvailableUnits;
  //     updateAvailableCASMap[key] = item;
  //   });
  // }
  await SharedPropsService.setAvailableCASMap(updateAvailableCASMap);
  await navigate(ROUTE.SELECT_DISTRIBUTOR_PORTFOLIO, {
    stepResponseObject: stepResponseObject,
    updateAvailableCASMap,
  });
  
  // await navigate(ROUTE.SELECT_DISTRIBUTOR_PORTFOLIO,{
  //   stepResponseObject: action.payload.value,
  // });
 
};

export const onModify: ActionFunction<EditItemPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  let portfolioSearchKeyword = "";
 /* const selectedMap = {};
  action.payload.stepResponseObject.availableCAS.forEach((item, index) => {
    const key = `${item.isinNo}-${item.folioNo}`;
    selectedMap[index] = updateAvailableCASMap[key].pledgedUnits > 0;
    action.payload.stepResponseObject.availableCAS[index] = updateAvailableCASMap[key];

    const title = `₹ ${addCommasToNumber(
      roundDownToNearestHundred(
        getTotalLimit(
          [updateAvailableCASMap[key]],
          stepResponseObject.isinNAVMap,
          stepResponseObject.isinLTVMap
        )
      )
    )}`;

    const subTitle = `/ ₹ ${addCommasToNumber(
      roundDownToNearestHundred(
        getActualLimit(
          [updateAvailableCASMap[key]],
          stepResponseObject.isinNAVMap,
          stepResponseObject.isinLTVMap
        )
      )
    )}`;

    listItemDataProps.push({
      label: updateAvailableCASMap[key].schemeName,
      info: "",
      trailIcon: {
        name:
          updateAvailableCASMap[key].pledgedUnits > 0
            ? IconTokens.CheckedSquare
            : IconTokens.NotCheckedSquare,
      },
      trailTitle: title,
      trailSubTitle: subTitle,
      action: "edit",
      trailIconAction: {
        type: ACTION.EDIT_ITEM,
        routeId: ROUTE.SELECT_DISTRIBUTOR_PORTFOLIO,
        payload: <EditItemPayload>{
          stepResponseObject,
          selectedMap: selectedMap,
        },
      },
    });
  });

*/





  navigate(ROUTE.MODIFY_PLEDGED_AMOUNT, {
    index: action.payload.value,
    stepResponseObject: action.payload.stepResponseObject,
    selectedMap: action.payload.selectedMap,
    portfolioSearchKeyword,
  });
};



export const onCopy: ActionFunction<{}> = async (action, _datastore, { network,clipboard,setDatastore, ...props }): Promise<any> => {
    const applicationId = await SharedPropsService.getApplicationId();
  const Linkresponse = await network.get(
      `${partnerApi.referalLink}${applicationId}`,
      {
        headers: await getAppHeader(),
      }
    );
    const link = Linkresponse.data.link;

  clipboard.set(link);
  await setDatastore(ROUTE.PORTFOLIO_UNLOCK, "header", <
    HeaderProps
  >{
    leftTitle:<TypographyProps>{
      label:"Copied share link",
      fontFamily:FontFamilyTokens.Inter,
      fontSize:FontSizeTokens.SM,
      color:ColorTokens.Primary_100,
      lineHeight:24,

    },
  });
};

export const onShare: ActionFunction<AssetsPayload> = async (action, _datastore, {network, navigate,...props }): Promise<any> => {
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

    //  const Linkresponse = await network.get(
    //     `${partnerApi.referalLink}${applicationId}`,
    //     {
    //       headers: await getAppHeader(),
    //     }
    //   );
      navigate(ROUTE.INVESTOR);
    
};


export const goBackACtion: ActionFunction<amountPayload> = async (
  action,
  _datastore,
  {goBack }
): Promise<any> => {
  goBack();
};

