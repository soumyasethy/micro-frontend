import { RouteMap } from "@voltmoney/types";
import { phoneNumberMF } from "./features/phone_number";
import { otpVerifyMF } from "./features/otp_verify";
import { emailVerifyMF } from "./features/email_verify";
import { ROUTE } from "./routes";
import { emailMF } from "./features/enter_email";
import { panVerifyMF } from "./features/pan_verify";
import { panConfirmMF } from "./features/pan_confirm";
import { checkLimitMF } from "./features/check_limit";
import { updateMobileNumberMF } from "./features/update_phoneNo";
import { updateEmailMF } from "./features/update_emailId";
import { otpVerifyAuthCASMF } from "./features/otp_CAS";
import { verificationFailedMF } from "./features/verification_failed";
import { testPageMF } from "./features/test_page";
import { kycAadharVerifyMF } from "./features/kyc_aadhar_init";
import { kycAadharOTPVerifyMF } from "./features/otp_aadhar";
import { bankVerifyMF } from "./features/bank_verification";
import { bankAddMF } from "./features/bank_add";
import { addBankManuallyMF } from "./features/bank_add_manually";
import { bankSearchBranchMF } from "./features/bank_search_branch";
import { kycConfirmMF } from "./features/kyc_confirm";
import { kycStepperMF } from "./features/kyc_stepper";
import { kycAfterCameraMF } from "./features/kyc_after_camera";
import { cameraOpenMF } from "./features/camera_open";
import { kycDigiLockerMF } from "./features/kyc_digilocker";

export const ROUTE_MAP: RouteMap = {
  [ROUTE.PHONE_NUMBER]: phoneNumberMF,
  [ROUTE.OTP_VERIFY]: otpVerifyMF,
  [ROUTE.EMAIL_VERIFY]: emailVerifyMF,
  [ROUTE.ENTER_EMAIL]: emailMF,
  [ROUTE.KYC_PAN_VERIFICATION]: panVerifyMF,
  [ROUTE.PAN_CONFIRM_NAME]: panConfirmMF,
  [ROUTE.MF_PLEDGING]: checkLimitMF,
  [ROUTE.UPDATE_PHONE_NUMBER]: updateMobileNumberMF,
  [ROUTE.UPDATE_EMAIL_ID]: updateEmailMF,
  [ROUTE.OTP_AUTH_CAS]: otpVerifyAuthCASMF,
  [ROUTE.VERIFICATION_FAILED]: verificationFailedMF,
  [ROUTE.TEST_PAGE]: testPageMF,
  [ROUTE.KYC_AADHAAR_VERIFICATION]: kycAadharVerifyMF,
  [ROUTE.KYC_AADHAAR_VERIFICATION_OTP]: kycAadharOTPVerifyMF,
  [ROUTE.BANK_ACCOUNT_VERIFICATION]: bankVerifyMF,
  [ROUTE.BANK_ACCOUNT_ADD]: bankAddMF,
  [ROUTE.BANK_ACCOUNT_ADD_MANUALLY]: addBankManuallyMF,
  [ROUTE.BANK_BRANCH_SEARCH]: bankSearchBranchMF,
  [ROUTE.KYC_AADHAAR_CONFIRM]: kycConfirmMF,
  [ROUTE.KYC_STEPPER]: kycStepperMF,
  [ROUTE.KYC_AFTER_CAMERA]: kycAfterCameraMF,
  [ROUTE.CAMERA_OPEN]: cameraOpenMF,
  [ROUTE.KYC_DIGILOCKER]: kycDigiLockerMF,
};
