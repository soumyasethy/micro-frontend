import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import { api } from "../../../configs/api";
import _ from "lodash";
import { getAppHeader } from "../../../configs/config";



export const tryapp: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, setDatastore, network, showPopup }
): Promise<any> => {
  const applicationId = (await SharedPropsService.getUser())
    .linkedApplications[0].applicationId;
  setInterval(() => {
    const getApiLoad = async () => {
      await network.get(
        `${api.mandateStatus}${applicationId}`,
        { headers: await getAppHeader() }
      ).then(response => {
        console.log('response.status: ', response.status);
        if (response.status == '200') {
          console.log("success",action)
          navigate(ROUTE.LOAN_REPAYMENT);
          showPopup({
            type: "SUCCESS",
            title: "E-mandate successful!",
            subTitle: "Your autopay request has been submitted successfully.",
            ctaLabel: "Proceed to loan agreement",
            ctaAction: action
          });
        }else{
          console.log("error");
        }
      })
    }

  }, 5000);
}


// export const getPolingData: ActionFunction<any> = async (
//   action,
//   _datastore,
//   { navigate, setDatastore, network, showPopup }
// ): Promise<any> => {

//   const applicationId = (await SharedPropsService.getUser())
//     .linkedApplications[0].applicationId;

//   const getApiLoad = async () => {
//     await network.get(
//       `${api.mandateStatus}${applicationId}`,
//       { headers: await getAppHeader() }
//     );
//   }

//   const getLoaderStatus = async () => {
//     setInterval(getApiLoad, 10000);
//   }

//   const response = await getLoaderStatus();

//   if (
//     _.get(
//       response,
//       "data.status",
//       "NOT_COMPLETED"
//     ) === "SUCCESS"
//   ) {
//     navigate(ROUTE.LOAN_REPAYMENT);
//     showPopup({
//       type: "SUCCESS",
//       title: "E-mandate successful!",
//       subTitle: "Your autopay request has been submitted successfully.",
//       ctaLabel: "Proceed to loan agreement",
//       ctaAction: action
//     });
//   } else {
//     console.log("response" + response)
//   }
// };

export const GoNext: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  await navigate(ROUTE.LOAN_AGREEMENT);
};