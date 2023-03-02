import {Datastore, Layout, LAYOUTS, PageType, POSITION, TemplateSchema} from "@voltmoney/types";
import {
  WIDGET,
} from "@voltmoney/schema";
import {ROUTE} from "../../routes";
import {ACTION} from "./types";
import {SideBarBuilderDS} from "../sideNavBar";
import sharedPropsService  from "../../SharedPropsService";
import SharedPropsService  from "../../SharedPropsService";
import {onChangeTab} from "./actions";


export const template: () => Promise<TemplateSchema> = async () => ({
  layout: <Layout>{
    id: ROUTE.TEST_PAGE,
    type: LAYOUTS.LIST,
    widgets: [
      {id: 'sideNav', type: WIDGET.STACK, position: POSITION.NAVBAR_LEFT},
    ],
  },
  datastore: <Datastore>{
      ...await SideBarBuilderDS(ROUTE.TEST_PAGE),
  }
});

export const PartnerWebDashboardPageMF: PageType<any> = {
  onLoad: async ({asyncStorage, network, navigate, ...props  }, {
     setIsUserLoggedIn: boolean,
  }) => {
    // --- Need refactor ---- //
    const user = JSON.parse(localStorage.getItem('USER_CONTEXT'));
    const token = localStorage.getItem('ACCESS_TOKEN');
    const dashboardActiveId = localStorage.getItem('DASHBOARD_ACTIVE_ID');
    await SharedPropsService.setToken(token);
    await sharedPropsService.setUser(user);
    // const partnerAccountId = user?.linkedPartnerAccounts[0].accountId;
    // const authToken = await SharedPropsService.getToken();
    console.log("dashboardActiveId: ", dashboardActiveId);
    await sharedPropsService.setPartnerSideBarActiveId(dashboardActiveId);
    if(dashboardActiveId === 'activeCustomerPage') {
      await navigate(ROUTE.PARTNER_ACTIVE_CUSTOMER);
    } else if (dashboardActiveId === 'referredPartnerPage') {
      await navigate(ROUTE.PARTNER_REFERRED_PARTNER);
    } else {
      await navigate(ROUTE.PARTNER_LEAD);
    }
    // ---- //
    return Promise.resolve(template());
  },
  actions: {
    // [ACTION.CHANGE_INPUT]: TestAction,
    // [ACTION.CHANGE_TAB]: onChangeTab,
    // [ACTION.ON_SEARCH_LEADS]: onSearchLead,
    // [ACTION.ON_SELECT]:onSelectLeads,
    // [ACTION.ON_SORT]: onSortLeads,
    // [ACTION.ON_SELECT_ALL_LEADS]:onSelectAllLeads,
    // [ACTION.ON_SEARCH_AC]: onSearchActiveCustomer,
    // [ACTION.ON_FILTER_LEADS_BY_STATUS]: onFilterLeadsByCurrentStepId,
    // [ACTION.ON_LOAD]: onLoadAction,
    // [ACTION.VALIDATE_FORM_1] : TestAction,
    // [ACTION.VALIDATE_FORM_2] : TestAction,
    // [ACTION.FILTER_BY_DATE]: filterbyDate,
    // [ACTION.ON_SORT_AC]: onSortActiveCustomer,
    // [ACTION.ON_SEARCH_RP]: onSearchReferredPartner,
    // [ACTION.ON_SORT_RP]: onSortReferredPartner
  },
  // action: {
  //   routeId: ROUTE.PARTNER_DASHBOARD,
  //   type: ACTION.ON_LOAD,
  //   payload: {
  //
  //   }
  // },
};
