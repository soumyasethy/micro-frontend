import { ButtonProps, ButtonTypeTokens, ButtonWidthTypeToken, FontFamilyTokens, WIDGET } from "@voltmoney/schema";
import { ActionFunction, Datastore, POSITION } from "@voltmoney/types";
import { partnerApi } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import { ACTION, ClientInProgressPayloadType, ClientPendingPayloadType, dataTypeClient } from "./types";

export const onTrackCTA: ActionFunction<ClientPendingPayloadType> = async (
    action,
    _datastore,
    { navigate, setDatastore }
): Promise<any> => {
    console.log(action.payload);
    console.log(action.payload.data);

    await SharedPropsService.setAccountId(action.payload.data.accountId);
    await SharedPropsService.setApplicationId(action.payload.data.applicationId);

    let data1 = [];
    let stepper_data = [];
    Object.keys(action.payload.steps).map(key => {
        const value = action.payload.steps[key];
        const stepData: any = new Object();
        if (value.isEditable === true) {
            stepData.title = value.verticalDisplayName;
            stepData.subTitle = value.verticalDescription;
            stepData.id = value.order;
            stepData.horizontalTitle = value.horizontalDisplayName;
            stepData.status = value.status;
            data1.push(stepData);
        }
    })
    stepper_data = data1.sort(function (a, b) {
        return a.id - b.id;
    });
    await SharedPropsService.setStepperData(stepper_data);

    await navigate(ROUTE.DISTRIBUTOR_CLIENT_LIST_STEPPER, {
        applicationId: action.payload.applicationId,
        name: action.payload.name,
        stepperData: action.payload.steps,
        completedSteps: action.payload.completedSteps,
        totalSteps: action.payload.totalSteps
    });

};
export const appendData: ActionFunction<dataTypeClient> = async (
    action,
    _datastore,
    { navigate, setDatastore, removeWidgets, appendWidgets }
): Promise<any> => {
    const datastore: Datastore = {
        continuePendingButton: <ButtonProps>{
            fontFamily: FontFamilyTokens.Poppins,
            label: "Create new application",
            type: ButtonTypeTokens.LargeFilled,
            width: ButtonWidthTypeToken.FULL,
            action: {
                type: ACTION.CTA,
                routeId: ROUTE.DISTRIBUTOR_CLIENT_LIST
            },
        },
        continueInProgressButton: <ButtonProps>{
            fontFamily: FontFamilyTokens.Poppins,
            label: "Create new application",
            type: ButtonTypeTokens.LargeFilled,
            width: ButtonWidthTypeToken.FULL,
            action: {
                type: ACTION.CTA,
                routeId: ROUTE.DISTRIBUTOR_CLIENT_LIST
            },
        },
    };
    if (action.payload.value === 1) {
        await removeWidgets(ROUTE.DISTRIBUTOR_CLIENT_LIST, [
            { id: "continuePendingButton", type: WIDGET.BUTTON },
            { id: "continueInProgressButton", type: WIDGET.BUTTON },
        ]);
    } else {
        if (action.payload.PendingData.length > 0) {
            await appendWidgets(
                ROUTE.DISTRIBUTOR_CLIENT_LIST,
                datastore,
                [{ id: "continuePendingButton", type: WIDGET.BUTTON, position: POSITION.ABSOLUTE_BOTTOM },]
            );
        }
        if (action.payload.InProgressData.length > 0) {
            await appendWidgets(
                ROUTE.DISTRIBUTOR_CLIENT_LIST,
                datastore,
                [{ id: "continueInProgressButton", type: WIDGET.BUTTON, position: POSITION.ABSOLUTE_BOTTOM },]
            );
        }

    }
};
export const pendingTracks: ActionFunction<ClientPendingPayloadType> = async (
    action,
    _datastore,
    { navigate, setDatastore }
): Promise<any> => {
    const stepsData = action.payload.data;
    const applicationId = action.payload.applicationId;
    await SharedPropsService.setApplicationId(applicationId);
    if (stepsData.currentStepId === "MF_PLEDGE_PORTFOLIO") {

        await navigate(ROUTE.DISTRIBUTOR_PORTFOLIO);
        // go to fetch portfolio
    } else if (stepsData.currentStepId === "BANK_ACCOUNT_VERIFICATION") {
        await navigate(ROUTE.DIST_BANK_ACCOUNT_ADD);
        // go to bank add
    } else if (stepsData.currentStepId === "MF_FETCH_PORTFOLIO") {
        // go to fetch portfolio
        await navigate(ROUTE.DISTRIBUTOR_PORTFOLIO);
    } else {
        await navigate(ROUTE.DISTRIBUTOR_CLIENT_LIST);
    }
};

export const notification: ActionFunction<ClientPendingPayloadType> = async (
    action,
    _datastore,
    { setDatastore }
): Promise<any> => {
    console.warn(
        "notification click"
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
    { network, setDatastore, navigate }
): Promise<any> => {
    const applicationId = "";
    const response = await network.post(
        partnerApi.stepperData,
        {},
        { headers: await getAppHeader() }
    );

    let data1 = [];
    let data = [];
    Object.keys(response.data.partnerViewStepperMap).map(key => {
        const value = response.data.partnerViewStepperMap[key];
        const stepData: any = new Object();
        if (value.isEditable === true) {
            stepData.title = value.verticalDisplayName;
            stepData.subTitle = value.verticalDescription;
            stepData.id = value.order;
            stepData.status = value.status;
            data1.push(stepData);
        }
    })
    data = data1.sort(function (a, b) {
        return a.id - b.id;
    });

    await SharedPropsService.setStepperData(data);
    await navigate(ROUTE.BASIC_DETAILS_START);
    // await navigate(ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO);
};
