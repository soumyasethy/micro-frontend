export enum ACTION {
  DASHBOARD = "DASHBOARD",
  PROFILE = "PROFILE",
  WITHDRAW = "WITHDRAW",
  REPAYMENT = "REPAYMENT",
  MENU = "MENU",
  CONTACT_US = "CONTACT_US",
  TRANSACTION = "TRANSACTION",
}

export type NavPayload = {
  value: number;
};

export type CreditPayload = {
  value: number;
  widgetId: string;
  repaymentAmount: string;
};
export type RepaymentPayload = {
  repaymentAmount: string;
};

export enum CreditDisbursalStatus {
  APPROVED = "APPROVED",
  REQUESTED = "REQUESTED",
  REJECTED = "REJECTED",
  SETTLED = "SETTLED",
}

export type creditData = {
  linkedCredits: [
    {
      accountId: string;
      actualLoanAmount: number;
      applicationId: string;
      approvedCreditAmount: number;
      availableCreditAmount: number;
      chargesDue: number;
      createdOn: {
        date: number;
        day: number;
        hours: number;
        minutes: number;
        month: number;
        nanos: number;
        seconds: number;
        time: number;
        timezoneOffset: number;
        year: number;
      };
      creditId: string;
      creditStatus: string;
      creditType: string;
      currentApplicableInterestRate: number;
      currentTermStartDate: {
        date: number;
        day: number;
        hours: number;
        minutes: number;
        month: number;
        nanos: number;
        seconds: number;
        time: number;
        timezoneOffset: number;
        year: number;
      };
      lastUpdatedOn: {
        date: number;
        day: number;
        hours: number;
        minutes: number;
        month: number;
        nanos: number;
        seconds: number;
        time: number;
        timezoneOffset: number;
        year: number;
      };
      lenderCreditId: string;
      lendingPartnerId: string;
      marginCallStatus: string;
      originalStartDate: {
        date: number;
        day: number;
        hours: number;
        minutes: number;
        month: number;
        nanos: number;
        seconds: number;
        time: number;
        timezoneOffset: number;
        year: number;
      };
      outstandingInterestDue: number;
      partnerAccountId: "string";
      penalInterestDue: number;
      platformAccountId: "string";
      processingChargeDetails: "string";
      processingCharges: number;
      renewalDate: {
        date: number;
        day: number;
        hours: number;
        minutes: number;
        month: number;
        nanos: number;
        seconds: number;
        time: number;
        timezoneOffset: number;
        year: number;
      };
      tenureInDays: number;
      totalValueOfAssetsPledged: number;
    }
  ];
};
