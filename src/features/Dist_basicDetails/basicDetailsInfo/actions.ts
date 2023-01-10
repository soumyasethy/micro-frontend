import { ButtonProps, ButtonTypeTokens, CalendarProps, CalendarStateToken, IconTokens } from "@voltmoney/schema";
import { ActionFunction } from "@voltmoney/types";
import { partnerApi } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import { ACTION, EnableDisableCTA, InputPayload } from "./types";
import moment from "moment";
import { BasicData } from "../../login/otp_verify/types";

let panNumber = "";
let mobileNumber = "";
let email = "";
let dob: string = "";

export const CalendarOnChange: ActionFunction<InputPayload> = async (
  action,
  _datastore,
  { setDatastore, ...props }
): Promise<any> => {
  dob = `${moment(action.payload.value, "DD-MM-yyyy").valueOf()}`;
  if (
    panNumber &&
    mobileNumber &&
    email && dob) {
    await setDatastore(ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO, "continue", <ButtonProps>{
      type: ButtonTypeTokens.LargeFilled,
    })
  } else {
    await setDatastore(ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO, "continue", <ButtonProps>{
      type: ButtonTypeTokens.LargeOutline,
    })
  }
};

export const onChangeInput: ActionFunction<InputPayload> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  switch (action.payload.widgetId) {
    case "panNumberInput": {
      panNumber = action.payload.value;
      const data: BasicData = await SharedPropsService.getBasicData();
      data.panNumber = panNumber;
      await SharedPropsService.setBasicData(data);
      break;
    }
    case "calendarPicker": {
    
      const todate = new Date(dob);
      const month = action.payload.value.substring(3,5);
      const date = action.payload.value.substring(0,2);
      if(parseInt(month) > 12 || parseInt(date) > 31){
        await setDatastore(ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO, "calendarPicker", <CalendarProps>{
         state:CalendarStateToken.ERROR
        })
        dob = "";
      }else{
        await setDatastore(ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO, "calendarPicker", <CalendarProps>{
          state:CalendarStateToken.SUCCESS
         })
         dob = `${moment(action.payload.value, "DD-MM-yyyy").valueOf()}`;
      }
      break;
    }
    case "mobileNumberInput": {
      mobileNumber = action.payload.value;
      const data: BasicData = await SharedPropsService.getBasicData();
      data.mobileNumber = mobileNumber;
      await SharedPropsService.setBasicData(data);
      break;
    }
    case "emailInput": {
      email = action.payload.value;
      const data: BasicData = await SharedPropsService.getBasicData();
      data.email = email;
      await SharedPropsService.setBasicData(data);
      break;
    }
  }

  if (
    panNumber &&
    mobileNumber &&
    email && dob) {
    await setDatastore(ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO, "continue", <ButtonProps>{
      type: ButtonTypeTokens.LargeFilled,
    })
  }
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
  { network, setDatastore, navigate }
): Promise<any> => {

  if (panNumber &&
    mobileNumber &&
    email && dob) {

    await setDatastore(action.routeId, "continue", <ButtonProps>{ loading: true });

    const accountId = (await SharedPropsService.getUser())
      .linkedPartnerAccounts[0].accountId;


    const response = await network
      .post(
        `${partnerApi.customer}${accountId}${'/customer'}`,
        {
          email: email,
          panNumber: panNumber,
          phoneNumber: `+91${mobileNumber}`,
          dob: dob
        },
        { headers: await getAppHeader() }
      )
    await setDatastore(action.routeId, "continue", <ButtonProps>{
      label: "Continue",
      type: ButtonTypeTokens.LargeFilled,
      loading: false,
    });
    if (response.status === 200) {
    
      if (response?.data.stepResponseObject?.fullName) {
        await SharedPropsService.setAccountId(response?.data.updatedApplicationObj?.accountId);
        await SharedPropsService.setApplicationId(response?.data.updatedApplicationObj?.applicationId);
        await navigate(ROUTE.DETAILS_CONFIRM, {
          name: response?.data.stepResponseObject?.fullName,
          targetRoute: ROUTE.DETAILS_CONFIRM,
        });
      }


    let data1 = [];
    let stepper_data = [];
    Object.keys(response.data.partnerViewStepperMap).map(key=> {
      const value = response.data.partnerViewStepperMap[key];
      const stepData:any = new Object();
      if(value.isEditable === true){
       
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
    }

  }
};


export const goBack: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};