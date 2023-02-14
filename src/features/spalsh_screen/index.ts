import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  POSITION,
  TemplateSchema,
  WidgetProps,
} from "@voltmoney/types";
import {
  ColorTokens,
  IconProps,
  IconSizeTokens,
  IconTokens,
  StackAlignItems,
  StackHeight,
  StackJustifyContent,
  StackProps,
  StackType,
  StackWidth,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { ACTION } from "./types";
import { SplashAction } from "./actions";
import _ from "lodash";
import SharedPropsService from "../../SharedPropsService";
import {clearAllData, getParameters} from "../../configs/utils";
import {QUERY_PARAMS} from "../../configs/constants";

const template: (isPartnerPlatform) => TemplateSchema = (
  isPartnerPlatform
) => ({
  layout: <Layout>{
    id: ROUTE.SPLASH_SCREEN,
    type: LAYOUTS.LIST,
    widgets: [
      {
        id: "splashStack",
        type: WIDGET.STACK,
        position: POSITION.ABSOLUTE_CENTER,
      },
    ],
  },
  datastore: <Datastore>{
    splashStack: <StackProps>{
      width: StackWidth.FULL,
      height: StackHeight.FULL,
      type: StackType.column,
      justifyContent: StackJustifyContent.center,
      alignItems: StackAlignItems.center,
      widgetItems: isPartnerPlatform ? [] : [{ id: "icon", type: WIDGET.ICON }],
    },
    icon: <IconProps & WidgetProps>{
      name: IconTokens.Volt,
      size: IconSizeTokens.XXXXXXXL,
      action: {
        type: ACTION.AUTH_NAV,
        payload: {},
      },
    },
  },
});

export const splashScreenMF: PageType<any> = {
  onLoad: async ({ ...standardUtilities }, { setIsUserLoggedIn, ...props }) => {
    /*** Get all params sent via URL ****/
    //Example-1
    //http://localhost:3000/partner/dashboard/helloworld
    // access route.params -> {params: 'helloworld'}
    //Example-2
    //http://localhost:3000?ref=12345
    // access route.params -> {ref_code: '12345'}
    const ref: string = _.get(props, "ref", null);
    const urlParams: string = _.get(props, "urlParams", null);
    let mobileNumber = null;
    let isPartnerPlatform: boolean = false;
    if (ref) {
      await SharedPropsService.setPartnerRefCode(ref);
    }
    if (urlParams) {
      await SharedPropsService.setUrlParams(urlParams);

      /*** get params for custom api header if present in url
       *** example, voltmoney.in/partnerplatform?platform=VOLT_MOBILE_APP ****/

      const deleteUserContextCheck = urlParams.toLowerCase().includes(QUERY_PARAMS.DELETE);
      if(deleteUserContextCheck) {
        clearAllData().then(async ()=>{
          await standardUtilities.navigate(ROUTE.PHONE_NUMBER);
        })
      }

      const partnerPlatform = urlParams
        .toLowerCase()
        .includes(QUERY_PARAMS.PARTNER_PLATFORM);
      const platform = urlParams.includes(QUERY_PARAMS.PLATFORM);

      if (partnerPlatform && platform) {
        isPartnerPlatform = true;
        const params =
          standardUtilities.metaData?.platform.OS === "web"
            ? getParameters(urlParams)
            : {};
        const customPlatform = params[QUERY_PARAMS.PLATFORM];
        /*** setting app global api header here if not VOLT_MOBILE_APP ****/
        await SharedPropsService.setAppPlatform(customPlatform);
      }

      /*** if ?user=8763666620 then autofill mobile number in login screen ****/
      const isPreFillMobileNumber = urlParams.includes(QUERY_PARAMS.USER);

      if (
        isPreFillMobileNumber &&
        standardUtilities.metaData?.platform.OS === "web"
      ) {
        const params = getParameters(urlParams);
        mobileNumber = params[QUERY_PARAMS.USER];
      }
    }
    setTimeout(
      async () =>
        await SplashAction(
          {
            type: ACTION.AUTH_NAV,
            routeId: ROUTE.SPLASH_SCREEN,
            payload: { setIsUserLoggedIn, mobileNumber },
          },
          {},
          standardUtilities
        ),
      250
    );
    return Promise.resolve(template(isPartnerPlatform));
  },
  actions: {
    [ACTION.AUTH_NAV]: SplashAction,
  },
  bgColor: "#1434CB",
};
