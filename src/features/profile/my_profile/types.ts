export enum ACTION {
    CONTACT_US = "CONTACT_US",
    PROFILE = "PROFILE",
    FAQ = "FAQ",
    BACK_BUTTON = "BACK_BUTTON",
    ABOUT = "ABOUT",
    LOGOUT = "LOGOUT"
  }
  
  
  export type ProfilePayload = {
    value: ProfileDetails;
  widgetId: string;
  isResend?: boolean;
  };

  export type ProfileDetails={
    bankDetails:BankDetails
    emailId: string,
    name: string,
    panNumber: string,
    phoneNumber: string
  }
  
  export type BankDetails = {
    accountNumber: string,
    bankCode: string,
    bankName: string,
    branchAddress: string,
    branchName: string,
    city: string,
    ifscCode: string,
    micrCode: string
  };