import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify";

const cognitoConfig = {
  userPoolId: "ap-south-1_SJsMBrpQV",
  arn: "arn:aws:cognito-idp:ap-south-1:560013782704:userpool/ap-south-1_SJsMBrpQV",
  clientID: "5let0kbcceb4h6sf8hppdic48c",
  region: "ap-south-1",
};
const userPool = new CognitoUserPool({
  UserPoolId: cognitoConfig.userPoolId,
  ClientId: cognitoConfig.clientID,
});

export const cognitoCheckUserExist = async ({
  phoneNumber,
}: {
  phoneNumber: string;
}): Promise<any> => {
  const response = await Auth.signIn(phoneNumber);
  return response;
};

export const cognitoRepo = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<CognitoUserSession> => {
  const authenticationDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });
  const cognitoUser = new CognitoUser({
    Username: email,
    Pool: userPool,
  });
  return new Promise((resolve, reject) => {
    cognitoUser.setAuthenticationFlowType("CUSTOM_AUTH");
    cognitoUser.initiateAuth(authenticationDetails, {
      onSuccess: function (result) {
        return resolve(result);
      },
      onFailure: function (err) {
        console.warn("onFailure", err);
        reject(err);
      },
      customChallenge: function (challengeParameters) {
        // const challengeResponses = password;
        cognitoUser.sendCustomChallengeAnswer(password, this);
        // console.warn("customChallenge", challengeParameters);
      },
    });
  });
};
