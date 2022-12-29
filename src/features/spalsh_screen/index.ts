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

const template: TemplateSchema = {
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
      widgetItems: [{ id: "icon", type: WIDGET.ICON }],
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
};

export const splashScreenMF: PageType<any> = {
  onLoad: async (__, { ...props }) => {
    /*** Get all params sent via URL ****/
    //Example-1
    //http://localhost:3000/partner/dashboard/helloworld
    // access route.params -> {params: 'helloworld'}
    //Example-2
    //http://localhost:3000?ref=12345
    // access route.params -> {ref_code: '12345'}
    const ref: string = _.get(props, "ref", null);
    const urlParams: string = _.get(props, "urlParams", null);
    if (ref) {
      await SharedPropsService.setPartnerRefCode(ref);
    }
    if (urlParams) {
      await SharedPropsService.setUrlParams(urlParams);
    }

    return Promise.resolve(template);
  },
  actions: {
    [ACTION.AUTH_NAV]: SplashAction,
  },
  action: {
    type: ACTION.AUTH_NAV,
    payload: {},
  },
  bgColor: "#1434CB",
};
