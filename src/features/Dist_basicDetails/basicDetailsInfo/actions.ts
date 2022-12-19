import { ButtonProps, ButtonTypeTokens } from "@voltmoney/schema";
import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { EnableDisableCTA, InputPayload } from "./types";

let panNumber = "";
let fullName = "";
let mobileNumber = "";
let email = "";

export const onChangeInput: ActionFunction<InputPayload> = async (
    action,
    _datastore,
    { setDatastore }
  ): Promise<any> => {
    switch (action.payload.widgetId) {
      case "panNumberInput": {
        panNumber = action.payload.value;
        break;
      }
      case "fullNameInput": {
        fullName = action.payload.value;
        break;
      }
      case "mobileNumberInput": {
        mobileNumber = action.payload.value;
        break;
      }
      case "emailInput": {
        email = action.payload.value;
        break;
      }
    }

    if (
        panNumber &&
        fullName &&
        mobileNumber &&
        email)
        {   await setDatastore(ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO, "continue", <ButtonProps>{
                                type: ButtonTypeTokens.LargeFilled,
        })}
  };

export const toggleCTA: ActionFunction<EnableDisableCTA> = async (
    action,
    _datastore,
    { setDatastore }
): Promise<any> => {
    await setDatastore(action.routeId, action.payload.targetWidgetId, <
      ButtonProps
    >{
      type: action.payload.value
        ? ButtonTypeTokens.LargeFilled
        : ButtonTypeTokens.LargeOutline,
    });
  };
  
export const triggerCTA: ActionFunction<EnableDisableCTA> = async (
    action,
    _datastore,
    { setDatastore, navigate }
): Promise<any> => {
    if( panNumber &&
        fullName &&
        mobileNumber &&
        email ) {
            
        await setDatastore(action.routeId, "continue", <ButtonProps>{loading: true});

        console.warn("Data Object: " + JSON.stringify({
            panNumber,
            fullName,
            mobileNumber,
            email
        }));
        

        setTimeout(async()=> {
            await setDatastore(action.routeId, "continue", <ButtonProps>{loading: false});
        }, 2000);
        
    }
  };
