import { ActionFunction, WidgetProps } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { AmountPayload, ModifyAmountPayload } from "./types";
import { CtaCardProps, ListProps, TypographyProps } from "@voltmoney/schema";
import {
  customEditPortfolio,
  portfolioListDatastoreBuilder,
} from "../portfolio/utils";
import SharedPropsService from "../../../SharedPropsService";
import { getDesiredValue } from "../portfolio_readonly/actions";
import { addCommasToNumber } from "../../../configs/utils";

let amount: number = 0;

export const ModifyAmountAction: ActionFunction<ModifyAmountPayload> = async (
  action,
  _datastore,
  { setDatastore, goBack }
): Promise<any> => {
  const stepResponseObject = action.payload.stepResponseObject;
  await customEditPortfolio(
    action.payload.index,
    amount,
    action.payload.stepResponseObject
  );

  const props = await portfolioListDatastoreBuilder(
    action.payload.stepResponseObject,
    action.payload.portfolioSearchKeyword
  );
  await setDatastore(ROUTE.PORTFOLIO, "listItem", <ListProps & WidgetProps>{
    ...props.listItem,
  });
  await setDatastore(ROUTE.PORTFOLIO, "totalItem", <CtaCardProps>{
    ...props.totalItem,
  });

  const portValue = getDesiredValue(
    action.payload.stepResponseObject.availableCAS,
    action.payload.stepResponseObject.isinNAVMap
  );

  await SharedPropsService.setDesiredPortfolio(portValue);

  await setDatastore(ROUTE.PORTFOLIO, "subTitleText", <TypographyProps>{
    label: `₹${addCommasToNumber(portValue)} out of ₹${addCommasToNumber(
      parseInt(
        action.payload.stepResponseObject["totalPortfolioAmount"].toString()
      )
    )} are selected for pledging.`,
  });

  await goBack();
};
export const EditAmountAction: ActionFunction<AmountPayload> = async (
  action,
  _datastore,
  _
): Promise<any> => {
  amount = parseFloat(action.payload.value);
};

export const goBack: ActionFunction<AmountPayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};
