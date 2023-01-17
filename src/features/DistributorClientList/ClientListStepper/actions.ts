import { ActionFunction, SCREEN_SIZE } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { StepperPayload } from "../ClientList/types";
import { ClientInProgressPayloadType, ClientPendingPayloadType } from "./types";
import { Share } from 'react-native';
import SharedPropsService from "../../../SharedPropsService";
import { partnerApi } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import { getScreenType } from "../../../configs/platfom-utils";
import { Dimensions } from "react-native";

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


export const onShare: ActionFunction<{}> =
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
