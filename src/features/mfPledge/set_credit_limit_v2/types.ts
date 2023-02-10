import { AvailableCASItem } from "../unlock_limit/types";

export enum ACTION {
    ON_CHANGE_SLIDER = "ON_CHANGE_SLIDER",
    GO_BACK = "GO_BACK",
    GO_CONFIRM_PLEDGE = "GO_CONFIRM_PLEDGE",
    EDIT_PORTFOLIO = 'EDIT_PORTFOLIO',
    EDIT_LIMIT= 'EDIT_LIMIT',
    UNLOCK_LIMIT = "UNLOCK_LIMIT",
    GET_MORE_MF_PORTFOLIO = "GET_MORE_MF_PORTFOLIO",
    REMOVE_GET_MORE_MF_PORTFOLIO = "REMOVE_GET_MORE_MF_PORTFOLIO",
    MODIFY_LIMIT = "MODIFY_LIMIT",
    NAV_NEXT = "NAV_NEXT",
    NAV_PORTFOLIO = "NAV_PORTFOLIO",
    PORTFOLIO = "PORTFOLIO",
    VIEW_ALL = "VIEW_ALL",
    NAV_TO_CONTACT_US = "NAV_TO_CONTACT_US",
    CHECK_LIMIT = "CHECK_LIMIT",
  }



  export type accordionData = { 
    activeIndex ?: number,
  };


  export type GetMoreMfPortfolioPayload = { 
    casList: AvailableCASItem[] ,
    value?: string;
    widgetID: string;
  };

  export type amountPayload = {
    availabeLimit: number;
    portfolioValue: number;
  };

  export type pagePayload = {
    value?: string;
    widgetID: string;
  };

  export type TestActionPayload = {};
  