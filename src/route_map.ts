import { RouteMap } from "@voltmoney/types";
import { phoneNumberMF } from "./features/login/phone_number";
import { otpVerifyMF } from "./features/login/otp_verify";
import { emailVerifyMF } from "./features/authCAS/email_verify";
import { ROUTE } from "./routes";
import { emailMF } from "./features/authCAS/enter_email";
import { panVerifyMF } from "./features/authCAS/verifyPan/pan_verify";
import { panConfirmMF } from "./features/authCAS/verifyPan/pan_confirm";
import { checkLimitMF } from "./features/authCAS/check_limit";
import { updateMobileNumberMF } from "./features/authCAS/update_phoneNo";
import { updateEmailMF } from "./features/authCAS/update_emailId";
import { otpVerifyAuthCASMF } from "./features/authCAS/otp_CAS";
import { verificationFailedMF } from "./features/authCAS/verification_failed";
import { testPageMF } from "./features/test_page";
import { kycAadharVerifyMF } from "./features/kyc/kyc_aadhar_init";
import { kycAadharOTPVerifyMF } from "./features/kyc/kyc_otp";
import { bankVerifyMF } from "./features/bankVerify/bank_verify";
import { bankVerifyManuallyMF } from "./features/bankVerify/select_bank";
import { bankSelectMF } from "./features/bankVerify/bank_very_manually";
import { bankSearchBranchMF } from "./features/bankVerify/search_branch";
import { kycSummaryMf } from "./features/kyc/kyc_summary";
import { kycStepperMF } from "./features/kyc/kyc_stepper";
import { kycAfterCameraMF } from "./features/kyc/kyc_photo_verify";
import { cameraOpenMF } from "./features/kyc/kyc_photo_verification";
import { kycDigiLockerMF } from "./features/kyc/kyc_init";
import { alertMF } from "./features/popup_loader";
import { cameraCaptureMF } from "./features/kyc/kyc_photo_init";
import { splashScreenMF } from "./features/spalsh_screen";
import { unlockLimitMF } from "./features/unlockLimit/unlock_limit";
import { pledgeVerifyMF } from "./features/unlockLimit/pledge_verify";
import { pledgeLoadingMF } from "./features/unlockLimit/pledge_loading";
import { pledgeConfirmationLoadingMF } from "./features/unlockLimit/pledge_confirmation_loader";
import { pledgeConfirmationMF } from "./features/unlockLimit/pledge_confirmation";
import { unlockSuccessMF } from "./features/unlockLimit/unlock_success";
import { modifyLimitMF } from "./features/unlockLimit/modify_limit";
import { portfolioMF } from "./features/unlockLimit/portfolio";
import { pledgeAmountMF } from "./features/unlockLimit/pledged_amount";
import { modifyPledgeMF } from "./features/unlockLimit/modify_pledged_amount";
import { dashboardMF } from "./features/unlockLimit/afterUnlock/dashboard";
import { withdraw_amountMF } from "./features/unlockLimit/afterUnlock/withdraw_amount";
import { withdrawalOtpMF } from "./features/unlockLimit/afterUnlock/withdrawal_otp";
import { withdrawalSuccessMF } from "./features/unlockLimit/afterUnlock/withdrawal_success";
import { repaymentMF } from "./features/unlockLimit/afterUnlock/repayment";
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
  [ROUTE.BANK_ACCOUNT_VERIFICATION]: bankVerifyMF,
  [ROUTE.BANK_VERIFY_MANUALLY]: bankVerifyManuallyMF,
  [ROUTE.BANK_SELECT]: bankSelectMF,
  [ROUTE.BANK_BRANCH_SEARCH]: bankSearchBranchMF,
  [ROUTE.KYC_SUMMARY]: kycSummaryMf,
  [ROUTE.KYC_STEPPER]: kycStepperMF,
  [ROUTE.KYC_AFTER_CAMERA]: kycAfterCameraMF,
  [ROUTE.KYC_PHOTO_VERIFICATION]: cameraOpenMF,
  [ROUTE.KYC_DIGILOCKER]: kycDigiLockerMF,
  [ROUTE.ALERT_PAGE]: alertMF,
  [ROUTE.CAMERA_CAPTURE]: cameraCaptureMF,
  [ROUTE.SPLASH_SCREEN]: splashScreenMF,
  [ROUTE.MF_PLEDGE_PORTFOLIO]: unlockLimitMF,
  [ROUTE.PLEDGE_CONFIRMATION_LOADING]: pledgeConfirmationLoadingMF,
  [ROUTE.PLEDGE_CONFIRMATION]: pledgeConfirmationMF,
  [ROUTE.PLEDGE_VERIFY]: pledgeVerifyMF,
  [ROUTE.PLEDGE_LOADING]: pledgeLoadingMF,
  [ROUTE.UNLOCK_SUCCESS]: unlockSuccessMF,
  [ROUTE.MODIFY_LIMIT]: modifyLimitMF,
  [ROUTE.PORTFOLIO]: portfolioMF,
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
};
