import { ActionFunction } from "@voltmoney/types";
import { MessageProps, WIDGET } from "@voltmoney/schema";
import { ROUTE } from "../../../routes";

export const goBack: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack, appendWidgets }
): Promise<any> => {
  await appendWidgets(
    ROUTE.MF_PLEDGING,
    {
      error_msg: <MessageProps>{
        label:
          "We couldn’t find a portfolio match your details. Please review & try again.",
      },
    },
    [{ id: "error_msg", type: WIDGET.MESSAGE }]
  );
  await goBack();
};
