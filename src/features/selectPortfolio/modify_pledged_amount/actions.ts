import { ActionFunction, WidgetProps } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { AmountPayload, ModifyAmountPayload } from "./types";
import { CtaCardProps, ListProps } from "@voltmoney/schema";
import {
  customEditPortfolio,
  portfolioListDatastoreBuilder,
} from "../../mfPledge/portfolio/utils";
let amount: number = 0;

export const ModifyAmountAction: ActionFunction<ModifyAmountPayload> = async (
  action,
  _datastore,
  { setDatastore, goBack }
): Promise<any> => {
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
