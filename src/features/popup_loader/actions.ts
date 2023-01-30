import { ActionFunction } from "@voltmoney/types";
import {ROUTE} from "../../routes";
import {VerificationCardProps} from "@voltmoney/schema";

export const ClosePopup: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack, setDatastore }
): Promise<any> => {
  await setDatastore(
      ROUTE.ALERT_PAGE,
      "alert",
      <VerificationCardProps> {
        loading: false
      }
  )
  await goBack();
};
