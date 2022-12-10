import { RouteMap } from "@voltmoney/types";
import { phoneNumberMF } from "./features/login/phone_number";
import { otpVerifyMF } from "./features/login/otp_verify";
import { emailVerifyMF } from "./features/mfFetch/email_verify";
import { ROUTE } from "./routes";
import { emailMF } from "./features/mfFetch/enter_email";
import { panVerifyMF } from "./features/mfFetch/verifyPan/pan_verify";
import { panConfirmMF } from "./features/mfFetch/verifyPan/pan_confirm";
import { checkLimitMF } from "./features/mfFetch/check_limit";
import { updateMobileNumberMF } from "./features/mfFetch/update_phoneNo";
import { updateEmailMF } from "./features/mfFetch/update_emailId";
import { otpVerifyAuthCASMF } from "./features/mfFetch/otp_CAS";
import { verificationFailedMF } from "./features/mfFetch/verification_failed";
import { testPageMF } from "./features/test_page";
import { kycAadharVerifyMF } from "./features/kyc/kyc_aadhar_init";
import { kycAadharOTPVerifyMF } from "./features/kyc/kyc_otp";
import { bankAccountVerifyMF } from "./features/bankVerify/bank_account_verification";
import { bankSelectMF } from "./features/bankVerify/select_bank";
import { bankAccountAddMF } from "./features/bankVerify/bank_account_add";
import { bankSearchBranchMF } from "./features/bankVerify/bank_search_branch";
import { kycSummaryMf } from "./features/kyc/kyc_summary";
import { kycStepperMF } from "./features/kyc/kyc_stepper";
import { kycAfterCameraMF } from "./features/kyc/kyc_photo_verify";
import { cameraOpenMF } from "./features/kyc/kyc_photo_init";
import { kycDigiLockerMF } from "./features/kyc/kyc_init";
import { alertMF } from "./features/popup_loader";
import { cameraCaptureMF } from "./features/kyc/kyc_photo_upload";
import { splashScreenMF } from "./features/spalsh_screen";
import { pledgeVerifyMF } from "./features/mfPledge/pledge_verify";
import { pledgeLoadingMF } from "./features/mfPledge/pledge_loading";
import { pledgeConfirmationLoadingMF } from "./features/mfPledge/pledge_confirmation_loader";
import { unlockSuccessMF } from "./features/mfPledge/unlock_success";
import { modifyLimitMF } from "./features/mfPledge/modify_limit";
import { pledgeAmountMF } from "./features/mfPledge/pledged_amount";
import { modifyPledgeMF } from "./features/mfPledge/modify_pledged_amount";
import { dashboardMF } from "./features/afterUnlock/dashboard";
import { withdraw_amountMF } from "./features/afterUnlock/withdraw_amount";
import { withdrawalOtpMF } from "./features/afterUnlock/withdrawal_otp";
import { withdrawalSuccessMF } from "./features/afterUnlock/withdrawal_success";
import { repaymentMF } from "./features/afterUnlock/repayment";
import { loanRepaymentMF } from "./features/loanAgreement/loan_repayment";
import { loanWebViewMF } from "./features/loanAgreement/loan_webView";
import { loanAutoPayMF } from "./features/loanAgreement/loan_autopay";
import { agreementWebViewMF } from "./features/loanAgreement/agreement_webview";
import { loanAgreementMF } from "./features/loanAgreement/loan_agreement";
import { accountDetailsMF } from "./features/profile/account_details";
import { contactUsMF } from "./features/profile/contact_us";
import { myProfileMF } from "./features/profile/my_profile";
import { faqMF } from "./features/profile/faq";
import { aboutUsMF } from "./features/profile/about_us";
import { faqDetailsMF } from "./features/profile/faq_details";
import { carousalPageMF } from "./features/carousal/";
import { landingPageMF } from "./features/landing";
import { transactionsMF } from "./features/mfPledge/transactions";
import { privacyPolicyMF } from "./features/privacy_policy";
import { kycAdditionalDetailsMF } from "./features/kyc/kyc_additional_details";
//import { unlockLimitLandingMF } from "./features/mfPledge/unlock_limit_landing";
import { DistributorClientListMF } from "./features/DistributorClientList/ClientList";
import { DistributorBasicDetailsInfo } from "./features/Dist_basicDetails/basicDetailsInfo";
import { kycDocumentUploadMF } from "./features/kyc/kyc_document_upload";
import { checkingLimitMf } from "./features/mfFetch/checking_limit";
import { portfolioReadOnlyMF } from "./features/mfPledge/portfolio_readonly";
import { verificationFailedMFNew } from "./features/mfFetch/verification_failed_new";
import { unlockLimitLandingMFV2 } from "./features/mfPledge/unlock_limit_landing_V2";
import { unlockLimitMFV2 } from "./features/mfPledge/unlock_limit_V2";
import { setCreditLimitMf } from "./features/mfPledge/set_credit_limit";
import { pledgeConfirmationMFV2 } from "./features/mfPledge/pledge_confirmation_V2";
import { portfolioMFV2 } from "./features/mfPledge/portfolio_V2";
import { updateSliderAmountMF } from "./features/mfPledge/update_slider_amount";
import { kycDocumentUploadPOAMF } from "./features/kyc/kyc_doc_upload_POA";
import { kycDocumentUploadPOIMF } from "./features/kyc/kyc_doc_upload_POI";
import { loanAgreementPollingMF } from "./features/loanAgreement/loan_agreement_poll";
import { selectSourceMF } from "./features/mfFetch/select_source";
import {manageLimitMF} from "./features/afterUnlock/manage_limit";
import { setCreditLimitMf2 } from "./features/mfPledge/set_credit_limit_v2";
import { portfoliofromRTAMf } from "./features/mfPledge/portfoliofromRTA";
import {distBankAccountAddMF}  from "./features/bankDetailsDistributor/bank_account_add";
import { distBankSearchBranchMF } from "./features/bankDetailsDistributor/bank_search_branch";
import { distBankSelectMF } from "./features/bankDetailsDistributor/select_bank";
import { distributorPortfolioMF } from "./features/distributorPortfolio";

export const ROUTE_MAP: RouteMap = {
  [ROUTE.PHONE_NUMBER]: phoneNumberMF,
  [ROUTE.OTP_VERIFY]: otpVerifyMF,
  [ROUTE.EMAIL_VERIFY]: emailVerifyMF,
  [ROUTE.ENTER_EMAIL]: emailMF,
  [ROUTE.KYC_PAN_VERIFICATION]: panVerifyMF,
  [ROUTE.PAN_CONFIRM_NAME]: panConfirmMF,
  [ROUTE.MF_FETCH_PORTFOLIO]: checkLimitMF,
  [ROUTE.UPDATE_PHONE_NUMBER]: updateMobileNumberMF,
  [ROUTE.UPDATE_EMAIL_ID]: updateEmailMF,
  [ROUTE.OTP_AUTH_CAS]: otpVerifyAuthCASMF,
  [ROUTE.VERIFICATION_FAILED]: verificationFailedMF,
  [ROUTE.TEST_PAGE]: testPageMF,
  [ROUTE.KYC_AADHAAR_VERIFICATION]: kycAadharVerifyMF,
  [ROUTE.KYC_AADHAAR_VERIFICATION_OTP]: kycAadharOTPVerifyMF,
  [ROUTE.BANK_ACCOUNT_VERIFICATION]: bankAccountVerifyMF,
  [ROUTE.BANK_SELECT]: bankSelectMF,
  [ROUTE.BANK_ACCOUNT_ADD]: bankAccountAddMF,
  [ROUTE.BANK_SEARCH_BRANCH]: bankSearchBranchMF,
  [ROUTE.KYC_SUMMARY]: kycSummaryMf,
  [ROUTE.KYC_STEPPER]: kycStepperMF,
  [ROUTE.KYC_AFTER_CAMERA]: kycAfterCameraMF,
  [ROUTE.KYC_PHOTO_VERIFICATION]: cameraOpenMF,
  [ROUTE.KYC_DIGILOCKER]: kycDigiLockerMF,
  [ROUTE.ALERT_PAGE]: alertMF,
  [ROUTE.CAMERA_CAPTURE]: cameraCaptureMF,
  [ROUTE.SPLASH_SCREEN]: splashScreenMF,
  // [ROUTE.MF_PLEDGE_PORTFOLIO_OLD]: unlockLimitMF,
  // [ROUTE.MF_PLEDGE_PORTFOLIO]: unlockLimitMFV2,
 [ROUTE.MF_PLEDGE_PORTFOLIO]: setCreditLimitMf2,
  [ROUTE.PLEDGE_CONFIRMATION_LOADING]: pledgeConfirmationLoadingMF,
  // [ROUTE.PLEDGE_CONFIRMATION_OLD]: pledgeConfirmationMF,
  [ROUTE.PLEDGE_CONFIRMATION]: pledgeConfirmationMFV2,
  [ROUTE.PLEDGE_VERIFY]: pledgeVerifyMF,
  [ROUTE.PLEDGE_LOADING]: pledgeLoadingMF,
  [ROUTE.UNLOCK_SUCCESS]: unlockSuccessMF,
  [ROUTE.MODIFY_LIMIT]: modifyLimitMF,
  //[ROUTE.PORTFOLIO]: portfolioMF,
  [ROUTE.PORTFOLIO]: portfolioMFV2,
  [ROUTE.PLEDGED_AMOUNT]: pledgeAmountMF,
  [ROUTE.MODIFY_PLEDGED_AMOUNT]: modifyPledgeMF,
  [ROUTE.DASHBOARD]: dashboardMF,
  [ROUTE.WITHDRAW_AMOUNT]: withdraw_amountMF,
  [ROUTE.WITHDRAWAL_OTP]: withdrawalOtpMF,
  [ROUTE.WITHDRAWAL_SUCCESS]: withdrawalSuccessMF,
  [ROUTE.REPAYMENT]: repaymentMF,
  [ROUTE.LOAN_REPAYMENT]: loanRepaymentMF,
  [ROUTE.LOAN_WEBVIEW]: loanWebViewMF,
  [ROUTE.LOAN_AUTOPAY]: loanAutoPayMF,
  [ROUTE.LOAN_AGREEMENT]: loanAgreementMF,
  [ROUTE.AGREEMENT_WEBVIEW]: agreementWebViewMF,
  [ROUTE.ACCOUNT_DETAILS]: accountDetailsMF,
  [ROUTE.CONTACT_US]: contactUsMF,
  [ROUTE.MY_PROFILE]: myProfileMF,
  [ROUTE.FAQ]: faqMF,
  [ROUTE.ABOUTUS]: aboutUsMF,
  [ROUTE.FAQ_DETAILS]: faqDetailsMF,
  [ROUTE.CAROUSAL_PAGE]: carousalPageMF,
  [ROUTE.LANDING_PAGE]: landingPageMF,
  [ROUTE.TRANSACTIONS]: transactionsMF,
  [ROUTE.PRIVACY_POLICY]: privacyPolicyMF,
  [ROUTE.KYC_ADDITIONAL_DETAILS]: kycAdditionalDetailsMF,
  //[ROUTE.UNLOCK_LIMIT_LANDING]: unlockLimitLandingMF,
  [ROUTE.UNLOCK_LIMIT_LANDING]: unlockLimitLandingMFV2,
  [ROUTE.DISTRIBUTOR_CLIENT_LIST]: DistributorClientListMF,
  [ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO]: DistributorBasicDetailsInfo,
  [ROUTE.KYC_DOCUMENT_UPLOAD]: kycDocumentUploadMF,
  [ROUTE.CHECKING_LIMIT]: checkingLimitMf,
  [ROUTE.PORTFOLIO_READONLY]: portfolioReadOnlyMF,
  [ROUTE.VERIFICATION_FAILED_NEW]: verificationFailedMFNew,
  [ROUTE.SET_CREDIT_LIMIT]: setCreditLimitMf,
  [ROUTE.UPDATE_SLIDER_AMOUNT]: updateSliderAmountMF,
  [ROUTE.KYC_DOCUMENT_UPLOAD_POA]: kycDocumentUploadPOAMF,
  [ROUTE.KYC_DOCUMENT_UPLOAD_POI]: kycDocumentUploadPOIMF,
  [ROUTE.LOAN_AGREEMENT_POLLING]: loanAgreementPollingMF,
  [ROUTE.MANAGE_LIMIT]: manageLimitMF,
  [ROUTE.SELECT_SOURCE]: selectSourceMF,
  [ROUTE.SET_CREDIT_LIMIT2]: setCreditLimitMf2,
 // [ROUTE.SET_CREDIT_LIMIT2]: setCreditLimitMf2,
  [ROUTE.PORTFOLIO_FROM_RTA]: portfoliofromRTAMf,
 // [ROUTE.UNLOCK_LIMIT_LANDING]: unlockLimitLandingMF,
  [ROUTE.DIST_BANK_ACCOUNT_ADD]: distBankAccountAddMF,
  [ROUTE.DIST_BANK_SEARCH_BRANCH]: distBankSearchBranchMF,
  [ROUTE.DIST_BANK_SELECT]: distBankSelectMF,
  [ROUTE.DISTRIBUTOR_PORTFOLIO]: distributorPortfolioMF,
};
