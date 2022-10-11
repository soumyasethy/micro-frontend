import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../routes";
import { ContinuePayload } from "./types";
import { Auth } from "aws-amplify";

let phoneNumber: string = "";

export const getStarted: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  console.warn("**** using phoneNumber ****", phoneNumber);

  await Auth.signIn(phoneNumber)
    .then(async (session) => {
      console.warn("AWS response[SignIn]", session);
      await navigate(ROUTE.OTP_VERIFY, { phone_number: phoneNumber, session });
    })
    .catch(async (err) => {
      console.warn("AWS Error", err);
      if ((err.code = "UserNotFoundException")) {
        await Auth.signUp({
          username: phoneNumber,
          password: "123456",
          attributes: {
            "custom:isWhatsappEnabled": "true",
          },
        }).then(async (signupResponse) => {
          console.warn("AWS response[SignUp]", signupResponse);
          await Auth.signIn(phoneNumber)
            .then(async (session) => {
              console.warn("AWS response[SignIn Again]", session);
              await navigate(ROUTE.OTP_VERIFY, {
                phone_number: phoneNumber,
                session,
              });
            })
            .catch((newErr) => console.warn("AWS Error", newErr));
        });
        // await navigate(ROUTE.LOGIN, { phone_number: phoneNumber });
      }
    });
};
export const textOnChange: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  // console.warn("**** update phoneNumber ****", action.payload.value);
  phoneNumber = action.payload.value;
};
