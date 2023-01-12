import { ColorTokens, FontFamilyTokens, FontSizeTokens, TypographyProps } from "@voltmoney/schema";
import { ActionFunction } from "@voltmoney/types";
import { partnerApi } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import { StepperPayload } from "../ClientList/types";
import { ClientInProgressPayloadType, ClientPendingPayloadType } from "./types";


export const resumeSteps: ActionFunction<StepperPayload> = async (
    action,
    _datastore,
    { navigate }
): Promise<any> => {
    console.log(action.payload.value);
    if (action.payload.value[0].title == "Basic Details") {
        navigate(ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO);
        return;
    } else
    if (action.payload.value[0].title == "Bank Details") {
        navigate(ROUTE.DIST_BANK_ACCOUNT_ADD);
        return;
    } else
    if (action.payload.value[0].title == "Fetch Portfolio") {
        navigate(ROUTE.DISTRIBUTOR_PORTFOLIO);
        return;
    } else
    if (action.payload.value[0].title == "Select Portfolio") {
        navigate(ROUTE.DISTRIBUTOR_PORTFOLIO);
        return;
    }

};


export const onShare: ActionFunction<{}> = async (action, _datastore, { network,clipboard,setDatastore, ...props }): Promise<any> => {
    const applicationId = await SharedPropsService.getApplicationId();
    const Linkresponse = await network.get(
        `${partnerApi.referalLink}${applicationId}`,
        {
          headers: await getAppHeader(),
        }
      );
      const link = Linkresponse.data.link;
  
    clipboard.set(link);
    await setDatastore(ROUTE.DISTRIBUTOR_CLIENT_LIST_STEPPER, "shareTitle", <
      TypographyProps
    >{
        shareTitle:<TypographyProps>{
        label:"Copied to clipboard",
        fontFamily:FontFamilyTokens.Inter,
        fontSize:FontSizeTokens.SM,
        color:ColorTokens.Primary_100,
        lineHeight:24
      },
    });
  };

export const onTrackCTA: ActionFunction<ClientPendingPayloadType> = async (
    action,
    _datastore,
    { setDatastore }
): Promise<any> => {
    console.warn(
        JSON.stringify(action.payload)
    );
};

export const onManageCTA: ActionFunction<ClientInProgressPayloadType> = async (
    action,
    _datastore,
    { setDatastore }
): Promise<any> => {
    console.warn(
        JSON.stringify(action.payload)
    );
};

export const onClickCTA: ActionFunction<any> = async (
    action,
    _datastore,
    { setDatastore }
): Promise<any> => {
    console.warn("CTA triggerred");
};

export const goBackAction: ActionFunction<any> = async (
    action,
    _datastore,
    { goBack, setDatastore }
): Promise<any> => {
    await goBack();
};
