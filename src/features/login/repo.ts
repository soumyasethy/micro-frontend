import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
} from "amazon-cognito-identity-js";

const cognitoConfig = {
  userPoolId: "ap-south-1_FSibHwXRW", //
  arn: "arn:aws:cognito-idp:ap-south-1:560013782704:userpool/ap-south-1_FSibHwXRW",
  clientID: "9e1gbnl9vq32idlvpol6h900g",
  region: "ap-south-1",
};
const userPool = new CognitoUserPool({
  UserPoolId: cognitoConfig.userPoolId,
  ClientId: cognitoConfig.clientID,
});
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
        // User authentication was successful
        return resolve(result);
      },
      onFailure: function (err) {
        // User authentication was not successful
        console.warn("onFailure", err);
        reject(err);
      },
      customChallenge: function (challengeParameters) {
        // User authentication depends on challenge response
        const challengeResponses = password;
        cognitoUser.sendCustomChallengeAnswer(challengeResponses, this);
        // console.warn("customChallenge", challengeParameters);
      },
    });
  });
};
